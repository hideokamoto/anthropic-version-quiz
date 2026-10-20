# Anthropic数列クイズ

3, 3.5, 3.5v2, 3.7, 4, 4.1, 4.5, 4.6, 4.7, 4.8, 5, 5.1, 5.5 … Claude のバージョン番号「Anthropic数列」をどこまで追えているか試す、ブラウザだけで動く非公式クイズです。

- **claude.ai モード**：モデルの表示名・公開順・claude.ai での挙動
- **API モード**：モデル ID・命名規則・Amazon Bedrock / Google Cloud の ID

各モード26問のプールから、1プレイごとにランダムで5問を出題します。解答後には、そのバージョンの公式ドキュメントと、正解の根拠にしたページへのリンクを表示します。

## クレジット

- アイディア元：[@_watany](https://x.com/_watany) さんの[「Anthropic数列」の投稿](https://x.com/_watany/status/2102653393500299316)
- 問題の事実確認に使った資料：[Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)、[Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)、[Claude Platform リリースノート](https://platform.claude.com/docs/en/release-notes/overview)、[Claude ヘルプセンター](https://support.claude.com/en/articles/12138966-release-notes)、anthropic.com の各発表記事（アプリ内の「クレジット」ページに一覧があります）

Anthropic とは関係のないファンメイドです。正解は 2026-09-29 時点の公式ドキュメントで確認したものです。

## ライセンス

このアプリのソースコードは [GNU General Public License v3.0](LICENSE) で公開しています。同梱しているライブラリのライセンスは、アプリ内の「ライセンス」ページで確認できます（ビルド時に Angular CLI が出力する `3rdpartylicenses.txt` を表示しています）。

## 開発

Node.js 24 以上が必要です（Angular 22 の要件）。

```bash
npm ci
npm start                 # http://localhost:4200/
npx ng test --watch=false # ユニットテスト（問題データの検査を含む）
npm run build:pages       # GitHub Pages 向けの本番ビルド（ライブラリのライセンス一覧も出力）
```

- 問題データ：`src/app/data/questions.ts`
- リンク定義：`src/app/data/links.ts`
- 数列の年表：`src/app/data/sequence.ts`

問題を追加するときは、`docs`（そのバージョンの公式ドキュメント）と `sources`（正解の根拠）に、公式ページへのリンクを必ず入れてください。テストでチェックしています。

## 紹介動画・OGP 画像の再生成

紹介欄の縦型動画（`public/lp/promo.mp4` とポスター画像）、OGP 画像（`public/og-image.png`）、YouTube 用の紹介動画（`promo-out/youtube.mp4` とサムネイル。git 管理外）は、`tools/promo/make.mjs` が Playwright でアプリを操作して撮影し、ffmpeg で合成します。ffmpeg が必要です。

```bash
npx ng build                    # base-href は既定の / のまま
npx playwright-core install chromium   # 初回のみ（ブラウザを別途用意している環境では不要）
node tools/promo/make.mjs       # 別途用意したブラウザを使うときは PW_CHROMIUM_PATH=/path/to/chromium を付ける
```

- `Math.random` を固定シードに差し替えるので、出題・選択肢の並びは毎回同じになります。テロップは「2問目が 4.1/4.7/4.8 を名乗ったモデルの問題」という前提で書いているため、その出題になるシードを探してから撮影します。
- 撮影中の問題が下調べと違ったり、結果の称号が想定と違ったりしたときは、テロップと食い違わないように止まります。
- テロップや締めの画面は `tools/promo/overlays.html`、OGP 画像は `tools/promo/og-image.html` で編集します。

## デプロイ

`main` に push すると、GitHub Actions がテストとビルドを実行して GitHub Pages に公開します。初回だけ、リポジトリの Settings → Pages → Build and deployment の Source を「GitHub Actions」に設定してください。
