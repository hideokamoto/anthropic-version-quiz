# 問題プール案（v1・企画時のメモ）

> 実装後の正本は `src/app/data/questions.ts` です。このファイルは企画時の記録として残しています。

1プレイはこのプールからランダムに5問。正解・解説はすべて下記の出典で確認済み（2026-09-25 取得）。

## 出典略号

| 略号 | URL |
|---|---|
| OV | https://platform.claude.com/docs/en/about-claude/models/overview |
| DEP | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| IDS | https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions |
| ARN | https://platform.claude.com/docs/en/release-notes/overview |
| PR | https://platform.claude.com/docs/en/about-claude/pricing |
| MP | 各モデルページ https://platform.claude.com/docs/en/models/{model}/overview |
| FI | https://platform.claude.com/docs/en/models/fable-5/introducing-claude-fable-5-and-claude-mythos-5 |
| CRN | https://support.claude.com/en/articles/12138966-release-notes |
| CMS | https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings |
| N3 | https://www.anthropic.com/news/claude-3-family |
| N35 | https://www.anthropic.com/news/claude-3-5-sonnet |
| N35v2 | https://www.anthropic.com/news/3-5-models-and-computer-use |
| N37 | https://www.anthropic.com/news/claude-3-7-sonnet |
| N4 | https://www.anthropic.com/news/claude-4 |

---

## claude.ai モード（表示名・公開順・claude.ai 上の挙動）

| # | 問題 | 選択肢（★=正解） | 解説 | 出典 |
|---|---|---|---|---|
| U1 | 数列の「4.1」を名乗ったモデルは？ | ★Opus 4.1 / Sonnet 4.1 / Haiku 4.1 / Opus・Sonnet 両方 | 4.1 は Opus だけ。2025/8/5 公開 | ARN, PR |
| U2 | 数列の「4.7」を名乗ったモデルは？ | ★Opus 4.7 だけ / Sonnet 4.7 だけ / Opus と Sonnet / Opus・Sonnet・Haiku | 4.7 は Opus のみ（2026/4/16） | ARN, DEP |
| U3 | 数列の「4.8」を名乗ったモデルは？ | ★Opus 4.8 だけ / Sonnet 4.8 だけ / Opus と Sonnet / Fable 4.8 | 4.8 も Opus のみ（2026/5/28） | ARN, DEP |
| U4 | 「4.5」世代で最初に公開されたのは？ | ★Sonnet 4.5 / Haiku 4.5 / Opus 4.5 / 3つ同時 | Sonnet 9/29 → Haiku 10/15 → Opus 11/24（2025年） | ARN |
| U5 | 「4.6」世代で先に公開されたのは？ | ★Opus 4.6 / Sonnet 4.6 / 同日 / Haiku 4.6 | Opus 2/5、Sonnet 2/17（2026年） | ARN |
| U6 | 「5」世代で最初に公開されたのは？ | ★Fable 5 / Sonnet 5 / Opus 5 / Haiku 5 | Fable 5 が 6/9、Sonnet 5 が 6/30、Opus 5 が 7/24（2026年） | ARN |
| U7 | 数列の「5.1」に当たるモデルは？ | ★Fable 5.1 と Mythos 5.1 / Opus 5.1 / Sonnet 5.1 / Haiku 5.1 | 2026/9/1 に2モデル同時公開 | ARN |
| U8 | 「5.5 ファミリー」の最初のモデルは？ | ★Opus 5.5 / Fable 5.5 / Sonnet 5.5 / Mythos 5.5 | リリースノートに "the first model in our new Claude 5.5 family" と記載 | CRN |
| U9 | 2026年9月時点の公式料金表に載っていない名前は？ | ★Haiku 4 / Haiku 4.5 / Haiku 3.5 / Sonnet 4 | Haiku は 3 → 3.5 → 4.5 と進み、Haiku 4 は料金表にも廃止予定表にも載っていない | PR, DEP |
| U10 | Claude 3 ファミリー（2024/3/4）の3モデルを、発表での「性能の低い順」に並べると？ | ★Haiku → Sonnet → Opus / Sonnet → Haiku → Opus / Opus → Sonnet → Haiku / Haiku → Opus → Sonnet | 発表文 "in ascending order of capability: Claude 3 Haiku, Claude 3 Sonnet, and Claude 3 Opus" | N3 |
| U11 | Claude 3.5 Sonnet の発表時、claude.ai ではどう提供された？ | ★無料で使えた / Pro 限定 / API 限定 / 招待制 | 発表文 "now available for free on Claude.ai" | N35 |
| U12 | 通称「3.5v2」を、Anthropic は発表時に何と呼んだ？ | ★upgraded Claude 3.5 Sonnet / Claude 3.6 Sonnet / Claude 3.5 Sonnet v2 / Claude 3.5 Sonnet Pro | 発表タイトルは "a new Claude 3.5 Sonnet"、本文は "upgraded Claude 3.5 Sonnet"。「3.5v2」も「3.6」も公式名ではない | N35v2 |
| U13 | Claude 3.7 Sonnet と同時に発表されたものは？ | ★Claude Code / Claude Design / Computer use / Artifacts | 発表タイトルが "Claude 3.7 Sonnet and Claude Code" | N37 |
| U14 | Claude 3.7 Sonnet が発表時に名乗った「市場初」は？ | ★初のハイブリッド推論モデル / 初の 1M コンテキスト / 初の画像生成 / 初の音声対応 | "the first hybrid reasoning model on the market" | N37 |
| U15 | 3.7 の次、モデル名の語順はどう変わった？ | ★「Claude 3.7 Sonnet」→「Claude Sonnet 4」 / 変わっていない / 「Claude 4 Sonnet」になった / 「Sonnet Claude 4」になった | Claude 4 から「ファミリー名 → 番号」の順。現在の公式ドキュメントは過去のモデルも「Claude Sonnet 3.7」と書き直している | N4, ARN |
| U16 | Claude Opus 4.7 と一緒に登場した claude.ai の新機能は？ | ★Claude Design / Claude Code / Artifacts / Projects | 2026/4/17 のリリースノート "With Opus 4.7, we also launched Claude Design" | CRN |
| U17 | Opus 4 と Opus 4.1 が claude.ai のモデル選択から外されたのは？ | ★2026年1月 / 2025年8月 / 2026年6月 / 外されていない | 2026/1/16 のリリースノート | CRN |
| U18 | Fable 5 と Mythos 5 は公開の3日後に何があった？ | ★提供停止（7/1 に再開） / 値下げ / 名前の変更 / Opus への統合 | 6/12 に停止、7/1 に再開 | CRN |
| U19 | claude.ai で Thinking を**オフにできない**モデルは？ | ★Opus 5.5 / Sonnet 4.6 / Opus 4.6 / Opus 4.7 | 公式ヘルプで、Opus 5.5・Fable 5.1・Opus 5 は Thinking をオフにできないと明記 | CMS |
| U20 | effort の「Extra high (xhigh)」が使えるのはどのモデルから？ | ★Opus 4.7 以降 / Opus 4.5 以降 / Opus 5 以降 / Sonnet 4.6 以降 | "Available on Opus 4.7 and newer models" | CMS |
| U21 | Opus 5.5 の料金は Opus 5 と比べてどうなった？ | ★安くなった / 同じ / 高くなった / 無料になった | Opus 5 は $5/$25、Opus 5.5 は $4/$20（入力/出力、100万トークンあたり）。リリースノートでは「Opus 5 より 40% 安く動く」 | PR, CRN |
| U22 | Opus 4.1 から Opus 4.5 で、API の料金はどうなった？ | ★1/3 になった / 同じ / 2倍になった / 半額になった | $15/$75 → $5/$25 | PR |
| U23 | Fable 5 と Mythos 5 の違いとして公式に書かれているのは？ | ★Fable には安全分類器があり、Mythos にはない / Mythos の方が安い / Fable は画像が読めない / Mythos は日本語非対応 | Mythos 5 は Project Glasswing 参加者向けの限定提供 | FI |
| U24 | 数列の「3」から「5.5」までに登場した Opus のうち、実在**しない**のは？ | ★Opus 4.2 / Opus 4.1 / Opus 4.8 / Opus 5 | 4.1 の次の Opus は 4.5 | PR, DEP |
| U25 | 現行ラインナップで、コンテキストウィンドウが 1M **ではない**のは？ | ★Haiku 4.5 / Sonnet 5 / Opus 5.5 / Fable 5.1 | Haiku 4.5 だけ 200K | OV |

## API モード（モデルID・命名規則・プラットフォーム）

| # | 問題 | 選択肢（★=正解） | 解説 | 出典 |
|---|---|---|---|---|
| A1 | 通称「3.5v2」のモデル ID は？ | ★`claude-3-5-sonnet-20241022` / `claude-3-5-sonnet-v2` / `claude-3-6-sonnet-20241022` / `claude-3-5-sonnet-20240620` | 最後の選択肢は初代 3.5 Sonnet の ID | DEP |
| A2 | 3.7 Sonnet の ID で正しいのは？ | ★`claude-3-7-sonnet-20250219` / `claude-sonnet-3-7-20250219` / `claude-3.7-sonnet` / `claude-sonnet-3-7` | 語順が入れ替わるのは 4 から | DEP |
| A3 | Claude Sonnet 4 の ID で正しいのは？ | ★`claude-sonnet-4-20250514` / `claude-4-sonnet-20250514` / `claude-sonnet-4-0` / `claude-4-sonnet` | 4 から `claude-{ファミリー}-{番号}` の語順 | DEP |
| A4 | 日付なしの ID（例：`claude-opus-4-6`）が使われ始めた世代は？ | ★4.6 / 4 / 4.5 / 5 | "Starting with the Claude 4.6 generation, model IDs use a dateless format" | IDS |
| A5 | `claude-sonnet-4-6` のような日付なし ID の性質は？ | ★固定されたスナップショット / 常に最新版を指すエイリアス / 月ごとに更新される / ベータ版専用 | 公式に「evergreen なポインタだと思うのはよくある誤解」と明記 | IDS |
| A6 | `claude-sonnet-4-5` は何？ | ★日付付き ID を指すエイリアス / 固定スナップショット / 4.5 世代のすべてのモデルを指す / 廃止済みの ID | 4.6 より前のモデルの日付なし表記はエイリアス | IDS, OV |
| A7 | 現行ラインナップ4モデルのうち、今も日付付き ID なのは？ | ★Haiku 4.5 / Sonnet 5 / Opus 5.5 / Fable 5.1 | `claude-haiku-4-5-20251001` | OV |
| A8 | Haiku 4.5 は 2025/10/15 公開。ID に入っている日付は？ | ★20251001 / 20251015 / 20251022 / 20250929 | ID の日付と公開日は一致しない | MP(haiku-4-5) |
| A9 | Opus 4.5 は 2025/11/24 公開。ID に入っている日付は？ | ★20251101 / 20251124 / 20251120 / 20251001 | `claude-opus-4-5-20251101` | MP(opus-4-5) |
| A10 | Google Cloud で日付付き ID を書く時の区切り文字は？ | ★`@` / `-` / `:` / `/` | `claude-haiku-4-5@20251001` | OV, IDS |
| A11 | Amazon Bedrock の ID に付く接頭辞は？ | ★`anthropic.` / `aws.` / `bedrock/` / `claude:` | `anthropic.claude-opus-5-5` | OV |
| A12 | Bedrock（InvokeModel）での Opus 4.5 の ID は？ | ★`anthropic.claude-opus-4-5-20251101-v1:0` / `anthropic.claude-opus-4-5` / `claude-opus-4-5@20251101` / `bedrock.claude-opus-4-5-v1` | InvokeModel 用の ID には `-v1:0` が付く | MP(opus-4-5) |
| A13 | Bedrock（InvokeModel）での Opus 4.6 の ID は？ | ★`anthropic.claude-opus-4-6-v1` / `anthropic.claude-opus-4-6-v1:0` / `anthropic.claude-opus-4-6` / `claude-opus-4-6@v1` | 同じ 4.6 世代でも Sonnet 4.6 は `anthropic.claude-sonnet-4-6`（`-v1` なし） | MP(opus-4-6), MP(sonnet-4-6) |
| A14 | ID に「.」（ドット）が入っていたモデルは？ | ★Claude 2.1（`claude-2.1`） / Claude 3.5 Sonnet / Claude 3.7 Sonnet / Claude Opus 4.1 | 3 以降はハイフン区切り | DEP |
| A15 | Mythos 5.1 の ID は？ | ★`claude-mythos-5-1` / `claude-fable-5-1-mythos` / `claude-mythos-preview` / `claude-5-1-mythos` | `claude-mythos-preview` は別モデル（2026/6/9 に非推奨） | DEP |
| A16 | 3.5 Sonnet の2つの ID（20240620 / 20241022）が廃止された日は？ | ★2025/10/28（同日） / 別々の日 / 2026/2/19 / まだ廃止されていない | 2つとも 2025/10/28 に廃止 | DEP |
| A17 | Claude 3 Opus（`claude-3-opus-20240229`）の後継として推奨されている ID は？ | ★`claude-opus-4-8` / `claude-opus-5-5` / `claude-opus-4-1-20250805` / `claude-3-5-sonnet-20241022` | 廃止予定ページの推奨置き換え先 | DEP |
| A18 | 4.7 以降のモデルに `temperature` を既定値以外で渡すと？ | ★400 エラー / 無視される / 警告だけ出る / そのまま効く | `temperature`・`top_p`・`top_k` は Opus 4.7 以降で非推奨 | DEP |
| A19 | Sonnet 5 に `thinking: {type: "enabled", budget_tokens: N}` を送ると？ | ★400 エラー / そのまま動く / adaptive に変換される / 無視される | 手動の extended thinking は Sonnet 4.6 で非推奨、Sonnet 5 で削除 | ARN |
| A20 | API の effort の既定値が `medium` なのは？ | ★Opus 5.5 / Fable 5.1 / Sonnet 5 / Opus 5 | 他は `high` | OV, MP |
| A21 | トークナイザーが新しくなり、同じ文章でトークン数が約30%増えたのはどのモデルから？ | ★Opus 4.7 / Opus 4.5 / Opus 5 / Sonnet 4.6 | Fable 5 と Mythos 5 も Opus 4.7 のトークナイザーを使う | ARN, OV |
| A22 | 現行モデルで最大出力（同期 API）が 64K なのは？ | ★Haiku 4.5 / Sonnet 5 / Opus 5.5 / Fable 5.1 | 他は 128K | OV |
| A23 | プロンプトキャッシュの読み出しが基本入力料金の 2.5% になるのは？ | ★Fable 5.1 と Mythos 5.1 / Opus 5.5 / Haiku 4.5 / 全モデル | 通常は 10%、Opus 5.5 は 5% | OV |
| A24 | Sonnet 5 の料金 $2/$10 について、実際に起きたことは？ | ★予定されていた $3/$15 への値上げが取りやめになった / 値上げされた / 無料になった / Batch 専用になった | 2026/8/10 に導入価格が正式価格になった | ARN |
| A25 | 2026年9月時点で、廃止予定表で「Retired」になっている ID は？ | ★`claude-opus-4-1-20250805` / `claude-opus-4-5-20251101` / `claude-sonnet-4-5-20250929` / `claude-haiku-4-5-20251001` | Opus 4.1 は 2026/8/5 に廃止 | DEP |

---

## 出題しないと決めたもの

- **claude.ai の過去の UI 表示**（例：2024年のモデル選択に「(New)」と出ていたか）：ログインが必要な画面で、一次情報で確認できないため
- **3.5 Sonnet の公開日**：API リリースノートは 2024/6/20、発表記事は 2024/6/21 で、日付が一致しない（おそらく時差）ため、日単位では問わない
- **番号が飛んだ理由**（4.2〜4.4 が無い理由など）：公式の説明がないため
