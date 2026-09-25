# Anthropic数列クイズ

3, 3.5, 3.5v2, 3.7, 4, 4.1, 4.5, 4.6, 4.7, 4.8, 5, 5.1, 5.5 … Claude のバージョン番号「Anthropic数列」をどこまで追えているか試す、ブラウザだけで動く非公式クイズです。

- **claude.ai モード**：モデルの表示名・公開順・claude.ai での挙動
- **API モード**：モデル ID・命名規則・Amazon Bedrock / Google Cloud の ID

各モード25問のプールから、1プレイごとにランダムで5問を出題します。解答後には、そのバージョンの公式ドキュメントと、正解の根拠にしたページへのリンクを表示します。

## クレジット

- アイディア元：[@_watany](https://x.com/_watany) さんが X に投稿した「Anthropic数列」
- 問題の事実確認に使った資料：[Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)、[Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)、[Claude Platform リリースノート](https://platform.claude.com/docs/en/release-notes/overview)、[Claude ヘルプセンター](https://support.claude.com/en/articles/12138966-release-notes)、anthropic.com の各発表記事（アプリ内の「クレジット」ページに一覧があります）

Anthropic とは関係のないファンメイドです。正解は 2026-09-25 時点の公式ドキュメントで確認したものです。

## 開発

Node.js 24 以上が必要です（Angular 22 の要件）。

```bash
npm ci
npm start                 # http://localhost:4200/
npx ng test --watch=false # ユニットテスト（問題データの検査を含む）
```

- 問題データ：`src/app/data/questions.ts`
- リンク定義：`src/app/data/links.ts`
- 数列の年表：`src/app/data/sequence.ts`

問題を追加するときは、`docs`（そのバージョンの公式ドキュメント）と `sources`（正解の根拠）に、公式ページへのリンクを必ず入れてください。テストでチェックしています。

## デプロイ

`main` に push すると、GitHub Actions がテストとビルドを実行して GitHub Pages に公開します。初回だけ、リポジトリの Settings → Pages → Build and deployment の Source を「GitHub Actions」に設定してください。
