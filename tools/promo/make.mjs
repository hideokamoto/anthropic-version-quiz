// プロモ素材をまとめて作る
//   - public/og-image.png        OGP 画像（1200x630）
//   - public/lp/promo.mp4        紹介欄の縦型動画（720x1280）と、そのポスター画像
//   - promo-out/youtube.mp4      YouTube 用の紹介動画（1920x1080）とサムネイル
//
// 使い方（ffmpeg が必要）:
//   npx ng build                 # base-href は既定の / のまま
//   node tools/promo/make.mjs
// ブラウザを別途用意している環境では PW_CHROMIUM_PATH=/path/to/chromium を付ける
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  answerKeys,
  expectQuestion,
  launch,
  MODE,
  newPage,
  SEED,
  serve,
  startRecorder,
} from './lib.mjs';

const ROOT = path.resolve(import.meta.dirname, '../..');
const DIST = path.join(ROOT, 'dist/anthropic-version-quiz/browser');
const WORK = path.join(ROOT, 'promo-out/work');
const OUT = path.join(ROOT, 'promo-out');
const OVERLAYS = 'file://' + path.join(import.meta.dirname, 'overlays.html');

/** 3問目だけわざと間違え、5問中4問正解にする */
const WRONG_AT = 2;
const SP = { viewport: { width: 390, height: 694 }, deviceScaleFactor: 2 };

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  throw new Error(`${DIST} がない。先に npx ng build を実行する`);
}
fs.mkdirSync(WORK, { recursive: true });

const ffmpeg = (args) =>
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const pause = (page, ms) => page.waitForTimeout(ms);

const server = await serve(DIST);
const browser = await launch();
// テロップは「2問目が 4.1/4.7/4.8 のどれかを名乗ったモデルの問題」の前提で書いているので、
// その出題になるシードを探す（問題データが変わっても、同じ手順で決まったシードが選ばれる）
const OPUS_ONLY = /^数列の「4\.[178]」を名乗ったモデルは？$/;
let seed = SEED;
let uiKey, apiKey;
for (; seed < SEED + 200; seed++) {
  [uiKey, apiKey] = await answerKeys(browser, server.url, ['ui', 'api'], seed);
  if (OPUS_ONLY.test(uiKey[1].question)) break;
}
if (!OPUS_ONLY.test(uiKey[1].question)) throw new Error('条件に合う出題のシードが見つからない');
console.log(
  'seed',
  seed,
  uiKey.map((k) => k.question),
);
const pick = (key, i) => (i === WRONG_AT ? (key[i].correct + 1) % 4 : key[i].correct);

/** claude.ai モードを5問遊ぶ。各場面の始まりに印を付ける */
async function playUi(page, rec, { scrollBy }) {
  await page.getByRole('button', { name: MODE.ui }).click();
  for (let i = 0; i < 5; i++) {
    rec.mark(`q${i + 1}`);
    await expectQuestion(page, uiKey[i].question);
    await pause(page, i < 2 ? 1600 : 1000);
    await page.locator('.choice').nth(pick(uiKey, i)).click();
    rec.mark(`a${i + 1}`);
    await pause(page, i < 2 ? 1700 : 1200);
    if (i === 0) {
      // 解答後に出る公式ドキュメントへのリンクを見せる
      await page.mouse.wheel(0, scrollBy);
      await pause(page, 1500);
    }
    await page.locator('.feedback .primary').click();
  }
  rec.mark('result');
  const rank = await page.locator('.rank').textContent();
  if (!rank?.includes('リリースノート常駐者')) throw new Error(`称号が想定と違う: ${rank}`);
}

// ---- 1) 縦型（紹介欄・ショート動画用） ----
let short;
{
  const { ctx, page } = await newPage(browser, { ...SP, tap: true, seed });
  await page.goto(server.url + '/');
  const rec = await startRecorder(ctx, page, path.join(WORK, 'short'));
  rec.mark('home');
  await pause(page, 2600);
  await playUi(page, rec, { scrollBy: 260 });
  await pause(page, 2500);
  await page.mouse.wheel(0, 320);
  await pause(page, 2000);
  short = await rec.stop();
  await ctx.close();
}

// ---- 2) 横型（YouTube）: PC の2カラム表示で claude.ai モード → API モード ----
let yt;
{
  const { ctx, page } = await newPage(browser, {
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1.5,
    tap: true,
    seed,
  });
  await page.goto(server.url + '/');
  const rec = await startRecorder(ctx, page, path.join(WORK, 'yt'));
  rec.mark('home');
  await pause(page, 4000);
  await playUi(page, rec, { scrollBy: 300 });
  await pause(page, 2500);
  await page.mouse.wheel(0, 400);
  await pause(page, 1500);
  await page.mouse.wheel(0, -400);
  await pause(page, 600);
  await page.getByRole('link', { name: 'モード選択へ' }).click();
  await pause(page, 1200);
  await page.getByRole('button', { name: MODE.api }).click();
  rec.mark('api');
  for (let i = 0; i < 2; i++) {
    await expectQuestion(page, apiKey[i].question);
    await pause(page, 1500);
    await page.locator('.choice').nth(apiKey[i].correct).click();
    await pause(page, 2200);
    if (i === 0) await page.locator('.feedback .primary').click();
  }
  rec.mark('end');
  yt = await rec.stop();
  await ctx.close();
}

// ---- 3) 横型に差し込むスマホの場面: タブで紹介を開いて戻る ----
let sp;
{
  const { ctx, page } = await newPage(browser, { ...SP, tap: true, seed });
  await page.goto(server.url + '/');
  const rec = await startRecorder(ctx, page, path.join(WORK, 'sp'));
  await pause(page, 1500);
  await page.getByRole('tab', { name: 'このクイズについて' }).click();
  await pause(page, 2200);
  await page.mouse.wheel(0, 360);
  await pause(page, 1800);
  await page.mouse.wheel(0, -360);
  await pause(page, 800);
  await page.getByRole('button', { name: 'クイズで遊ぶ' }).click();
  await pause(page, 1800);
  sp = await rec.stop();
  await ctx.close();
}

// ---- 重ねる画像を書き出す ----
const shot = async (file, viewport, query, transparent = true) => {
  const page = await browser.newPage({ viewport });
  await page.goto(`${OVERLAYS}?${new URLSearchParams(query)}`);
  await page.screenshot({ path: path.join(WORK, file), omitBackground: transparent });
  await page.close();
  return path.join(WORK, file);
};
const V_SHORT = { width: 720, height: 1280 };
const V_YT = { width: 1920, height: 1080 };

const SHORT_CAPS = [
  [
    'home',
    'q1',
    { h: '次の項は、[いくつ？]', s: 'Claude のバージョン番号「Anthropic数列」クイズ' },
  ],
  ['q1', 'a1', { step: 'STEP 1', h: '[4択]で答える', s: '1プレイ5問。出題は毎回ランダム' }],
  [
    'a1',
    'q2',
    { step: 'STEP 2', h: '根拠は[公式ドキュメント]', s: '答えるたびに、出典のリンクが出る' },
  ],
  [
    'q2',
    'a3',
    { h: '「4.1」「4.7」「4.8」|名乗ったのは[Opusだけ]', s: '小数点に翻弄される引っかけ多め' },
  ],
  ['a3', 'result', { h: 'まちがえても[学べる]', s: '不正解でも、正解と根拠がすぐわかる' }],
  [
    'result',
    null,
    { step: 'STEP 3', h: '[称号]つきでシェア', s: '5問中4問正解「リリースノート常駐者」' },
  ],
];
const YT_CAPS = [
  [
    'home',
    'q1',
    {
      h: 'Claude のバージョン番号を追う[4択クイズ]',
      s: 'PC・タブレットでは、左でクイズ、右で遊び方を表示',
    },
  ],
  [
    'q1',
    'a1',
    {
      step: 'claude.ai モード',
      h: '表示名・公開順・claude.ai での挙動',
      s: '1プレイ5問。出題は毎回ランダム',
    },
  ],
  [
    'a1',
    'q2',
    { h: '答えるたびに[根拠のリンク]', s: '公式ドキュメント・リリースノート・発表記事へ' },
  ],
  [
    'q2',
    'a3',
    { h: '「4.1」「4.7」「4.8」を名乗ったのは[Opusだけ]', s: '小数点に翻弄される引っかけ多め' },
  ],
  ['a3', 'result', { h: 'まちがえても[学べる]', s: '不正解でも、正解と根拠がすぐわかる' }],
  ['result', 'api', { h: '[称号]つきで X にシェア', s: '5問中4問正解は「リリースノート常駐者」' }],
  [
    'api',
    null,
    {
      step: 'API モード',
      h: 'モデル ID・命名規則・[Bedrock / Google Cloud] の ID',
      s: 'ID の日付や区切り文字まで問う',
    },
  ],
];

/** テロップを時間の区間ごとに重ねる filter を作る */
function captionFilter(inputLabel, caps, marks, files, firstInput) {
  const parts = [];
  let cur = inputLabel;
  caps.forEach(([from, to], i) => {
    const a = marks[from].toFixed(3);
    const enable = to ? `between(t,${a},${marks[to].toFixed(3)})` : `gte(t,${a})`;
    const next = `c${firstInput + i}`;
    parts.push(`[${cur}][${firstInput + i}:v]overlay=enable='${enable}'[${next}]`);
    cur = next;
  });
  return { filter: parts.join(';'), out: cur, inputs: files.flatMap((f) => ['-i', f]) };
}

const shortCapFiles = [];
for (const [i, [, , q]] of SHORT_CAPS.entries()) {
  shortCapFiles.push(await shot(`short-cap${i}.png`, V_SHORT, { kind: 'short', ...q }));
}
const shortEnd = await shot('short-end.png', V_SHORT, { kind: 'short-end' }, false);
const ytCapFiles = [];
for (const [i, [, , q]] of YT_CAPS.entries()) {
  ytCapFiles.push(await shot(`yt-cap${i}.png`, V_YT, { kind: 'yt-cap', ...q }));
}
const ytTitle = await shot('yt-title.png', V_YT, { kind: 'yt-title' }, false);
const ytEnd = await shot('yt-end.png', V_YT, { kind: 'yt-end' }, false);
const ytSp = await shot('yt-sp.png', V_YT, {
  kind: 'yt-sp',
  step: 'スマホ',
  h: 'クイズと遊び方を|[タブ]で切り替え',
  s: '出題中に遊び方を開いても、|解答の状態はそのまま',
});
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto('file://' + path.join(import.meta.dirname, 'og-image.html'));
  await page.screenshot({ path: path.join(ROOT, 'public/og-image.png') });
  await page.close();
}
await browser.close();
server.close();

// ---- 縦型を合成 ----
{
  const c = captionFilter('v', SHORT_CAPS, short.marks, shortCapFiles, 1);
  const endIdx = 1 + shortCapFiles.length;
  ffmpeg([
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    short.list,
    ...c.inputs,
    '-loop',
    '1',
    '-t',
    '3.2',
    '-i',
    shortEnd,
    '-filter_complex',
    `[0:v]fps=30,scale=432:768:flags=lanczos,pad=720:1280:144:318:color=#1c1b19[v];${c.filter};` +
      `[${c.out}]format=yuv420p,setsar=1[main];` +
      `[${endIdx}:v]fps=30,format=yuv420p,setsar=1,fade=t=in:st=0:d=0.4[end];[main][end]concat=n=2:v=1[out]`,
    '-map',
    '[out]',
    '-c:v',
    'libx264',
    '-profile:v',
    'high',
    '-crf',
    '24',
    '-preset',
    'slow',
    '-movflags',
    '+faststart',
    '-an',
    path.join(ROOT, 'public/lp/promo.mp4'),
  ]);
  ffmpeg([
    '-ss',
    (short.marks.a1 + 1.2).toFixed(2),
    '-i',
    path.join(ROOT, 'public/lp/promo.mp4'),
    '-frames:v',
    '1',
    '-c:v',
    'libwebp',
    '-quality',
    '82',
    path.join(ROOT, 'public/lp/promo-poster.webp'),
  ]);
}

// ---- 横型（YouTube）を合成: タイトル → PC の録画 → スマホの場面 → 締め ----
{
  const c = captionFilter('pc', YT_CAPS, yt.marks, ytCapFiles, 2);
  const spIdx = 2 + ytCapFiles.length;
  ffmpeg([
    '-loop',
    '1',
    '-t',
    '3.5',
    '-i',
    ytTitle,
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    yt.list,
    ...c.inputs,
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    sp.list,
    '-i',
    ytSp,
    '-loop',
    '1',
    '-t',
    '5',
    '-i',
    ytEnd,
    '-filter_complex',
    `[0:v]fps=30,format=yuv420p,setsar=1,fade=t=out:st=3.1:d=0.4[title];` +
      `[1:v]fps=30,scale=1920:1080:flags=lanczos[pc];${c.filter};[${c.out}]format=yuv420p,setsar=1[main];` +
      `[${spIdx}:v]fps=30,scale=500:888:flags=lanczos,pad=1920:1080:1160:96:color=#1c1b19[sp0];` +
      `[sp0][${spIdx + 1}:v]overlay,format=yuv420p,setsar=1,fade=t=in:st=0:d=0.4[sp];` +
      `[${spIdx + 2}:v]fps=30,format=yuv420p,setsar=1,fade=t=in:st=0:d=0.4[end];` +
      `[title][main][sp][end]concat=n=4:v=1[out]`,
    '-map',
    '[out]',
    '-c:v',
    'libx264',
    '-profile:v',
    'high',
    '-crf',
    '20',
    '-preset',
    'slow',
    '-movflags',
    '+faststart',
    '-an',
    path.join(OUT, 'youtube.mp4'),
  ]);
  ffmpeg([
    '-i',
    ytTitle,
    '-vf',
    'scale=1280:720:flags=lanczos',
    path.join(OUT, 'youtube-thumbnail.png'),
  ]);
}

console.log('done');
