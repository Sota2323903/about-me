## about-me — 学生自己紹介サイト

デモ: https://sota2323903.github.io/about-me/

NieR:Automata の世界観にインスパイアされた、マルチページ構成の自己紹介サイトです。ガラス調UI、グラデーション背景、読み込みアニメーション、ギャラリーのフィルタやモーダルなど、見た目と操作感にこだわっています。

## ページ一覧
- index.html: メインハブ（サイト内ナビゲーション、各カードの概要）
- profile.html: メインプロフィール（基本情報、スキル、探索エリア、哲学）
- hobby.html: 趣味データベース（カードレイアウト、統計、進行中の活動）
- from.html: 出身地データ（地理座標・文化分析・記憶アーカイブ、ギャラリー導線）
- gallery.html: ギャラリーアーカイブ（写真のフィルタ表示、モーダル閲覧）
- contact.html: 通信ターミナル（問い合わせフォーム、送信シミュレーション）

## 主な機能
- ページごとの読み込み画面（プログレス/ステータス表示、フェードアウト）
- レスポンシブ対応のカード/グリッドUI
- ギャラリーのカテゴリフィルタとモーダル表示
- スクロール/ホバー時の軽量アニメーション（IntersectionObserverなど）
- お問い合わせフォームの入力バリデーションと送信進行表示（疑似）
- 絵文字・特殊Unicodeを排し、CSSやASCII表示に統一

## 技術スタック
- HTML5 / CSS3（純粋なCSS、カスタムアニメーション）
- JavaScript（バンドラなし、バニラJS）
- フォント: Google Fonts（Orbitron / Noto Sans JP、styles.cssで集中管理）

## ローカルでの確認方法
特別なビルドは不要です。任意のHTTPサーバ、またはブラウザで`index.html`を開いてください。

例（VS Code拡張 Live Server 推奨）
1. VS Codeでこのフォルダを開く
2. `index.html`を右クリック → “Open with Live Server”
3. ブラウザでページ遷移やギャラリー動作を確認

## デプロイ（GitHub Pages）
このリポジトリは GitHub Pages で公開しています。更新手順:
1. 変更を`main`へコミット/プッシュ
2. GitHubのSettings → Pages → Branch: `main` / root を選択
3. 反映後、上記デモURLで確認

## ディレクトリ構成（抜粋）
```
index.html
profile.html
hobby.html
from.html
gallery.html
contact.html
css/
	styles.css            # 共通スタイルとアニメーション
	hobby-styles.css      # 趣味ページ固有スタイル
	origin-styles.css     # 出身地ページ固有スタイル
	gallery-styles.css    # ギャラリー固有スタイル
	contact-styles.css    # お問い合わせ固有スタイル
js/
	script.js             # 共通の軽量インタラクション
	hobby-script.js       # 趣味ページ用
	origin-script.js      # 出身地ページ用
	photo-data.js         # ギャラリーのデータ/描画
	gallery-script.js     # ギャラリーのフィルタ/モーダル
	gallery-loading.js    # ギャラリーのロード演出
	contact-script.js     # お問い合わせのバリデーション/進行表示
image/
	...                   # 画像アセット
```

## 品質・メンテナンス
- 未使用/重複コードの削減: 参照のない@keyframesや未使用クラス、未使用JSの整理
- フォント読み込みの重複排除（`styles.css`で集中管理）
- ナビゲーションのリンク整備（英語ファイル名で統一）
- 絵文字/特殊Unicodeの除去とCSS/ASCIIによる代替表示

## アクセシビリティ配慮
- フォーカス可能要素へのキーボード操作（Enter/Space）
- ARIA/ラベルの追加（ギャラリー要素など）
- 視認性の高いコントラストとフォント選定

## 今後の改善候補
- 画像遅延読み込み（lazy loading）導入
- Lighthouse/DevTools Coverage に基づくさらなる未使用CSS削減
- 連絡フォームの実送信API連携

## クレジット/注意
- 本サイトは NieR:Automata の表現に触発されています。ゲームに関する権利は各権利者（SQUARE ENIX 等）に帰属します。
- 画像は個人撮影/サンプルを主とし、第三者の権利を侵害しない範囲で利用しています。

---
作者: Sota2323903
公開: 2025-08-30 時点

