// プロモ素材の撮影に使う共通処理
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
};

/** ビルド済みのアプリを配信する（ルーティングはハッシュなので静的配信だけでよい） */
export function serve(root) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, url);
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(root, 'index.html');
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () =>
      resolve({ url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() }),
    ),
  );
}

export function launch() {
  return chromium.launch(
    process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  );
}

// Math.random を固定シードにして、出題と選択肢の並びを毎回同じにする
function seedScript(seed) {
  let s = seed >>> 0;
  Math.random = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 録画ではタップ位置が見えないので、タップした所に波紋を出す
function tapScript() {
  addEventListener(
    'pointerdown',
    (e) => {
      const d = document.createElement('div');
      Object.assign(d.style, {
        position: 'fixed',
        left: e.clientX - 22 + 'px',
        top: e.clientY - 22 + 'px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        pointerEvents: 'none',
        background: 'rgba(184,83,47,.35)',
        border: '2px solid rgba(184,83,47,.8)',
        zIndex: 99999,
        transition: 'transform .45s ease-out, opacity .45s ease-out',
      });
      document.body.appendChild(d);
      requestAnimationFrame(() => {
        d.style.transform = 'scale(1.8)';
        d.style.opacity = '0';
      });
      setTimeout(() => d.remove(), 500);
    },
    true,
  );
}

export const SEED = 20261020;

export async function newPage(
  browser,
  { viewport, deviceScaleFactor, tap = false, seed = SEED, ...rest },
) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor,
    locale: 'ja-JP',
    colorScheme: 'light',
    ...rest,
  });
  await ctx.addInitScript(seedScript, seed);
  if (tap) await ctx.addInitScript(tapScript);
  return { ctx, page: await ctx.newPage() };
}

/**
 * スクリーンショットを撮り続けて動画のフレームにする。
 * Playwright の recordVideo は CSS px の解像度でしか撮れないため、
 * deviceScaleFactor を効かせた高解像度の動画はこの方法で作る。
 */
export async function startRecorder(ctx, page, dir) {
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, f));
  const cdp = await ctx.newCDPSession(page);
  const now = () => performance.now() / 1000;
  const t0 = now();
  const frames = [];
  const marks = {};
  let running = true;
  const loop = (async () => {
    while (running) {
      const t = now() - t0;
      const { data } = await cdp.send('Page.captureScreenshot', {
        format: 'jpeg',
        quality: 92,
        optimizeForSpeed: true,
      });
      const file = path.join(dir, `${String(frames.length).padStart(5, '0')}.jpg`);
      fs.writeFileSync(file, Buffer.from(data, 'base64'));
      frames.push({ file, t });
    }
  })();
  return {
    mark: (label) => (marks[label] = now() - t0),
    async stop() {
      const end = now() - t0;
      running = false;
      await loop;
      // ffmpeg の concat 用一覧。各フレームを次のフレームまで表示する
      const lines = frames.flatMap((f, i) => [
        `file '${f.file}'`,
        `duration ${((frames[i + 1]?.t ?? end) - f.t).toFixed(4)}`,
      ]);
      lines.push(`file '${frames.at(-1).file}'`);
      const list = path.join(dir, 'frames.txt');
      fs.writeFileSync(list, lines.join('\n') + '\n');
      return { list, marks, duration: end };
    },
  };
}

export const MODE = { ui: /claude\.ai モード/, api: /API モード/ };

/**
 * 同じシードで、撮影と同じ順にモードを遊び、各問の問題文と正解の位置を調べる。
 * 乱数は出題時にしか使わないので、モードを遊ぶ順が同じなら撮影時も同じ問題が出る
 */
export async function answerKeys(browser, base, modes, seed = SEED) {
  const { ctx, page } = await newPage(browser, { viewport: { width: 390, height: 844 }, seed });
  await page.goto(base + '/');
  const keys = [];
  for (const mode of modes) {
    await page.getByRole('button', { name: MODE[mode] }).click();
    const key = [];
    for (let i = 0; i < 5; i++) {
      // 次の問題へ進んだ直後は前の問題が残っていることがあるので、進捗の表示が変わるのを待つ
      await page.locator('app-quiz .progress', { hasText: ` ${i + 1} / 5` }).waitFor();
      const question = await page.locator('app-quiz h2').textContent();
      await page.locator('.choice').first().click();
      await page.locator('.choice.correct').waitFor();
      const correct = (
        await page
          .locator('.choice')
          .evaluateAll((els) => els.map((el) => el.classList.contains('correct')))
      ).indexOf(true);
      key.push({ question, correct });
      await page.locator('.feedback .primary').click();
    }
    keys.push(key);
    await page.getByRole('link', { name: 'モード選択へ' }).click();
  }
  await ctx.close();
  return keys;
}

/** 撮影中の問題が下調べと同じかを確かめる（ずれたらテロップと合わなくなる） */
export async function expectQuestion(page, expected) {
  await page
    .waitForFunction(
      (text) => document.querySelector('app-quiz h2')?.textContent === text,
      expected,
      {
        timeout: 5000,
      },
    )
    .catch(async () => {
      const actual = await page.locator('app-quiz h2').textContent();
      throw new Error(`出題がずれた: ${actual} != ${expected}`);
    });
}
