# 🛁 お湯の計算アプリ

水とお湯を混ぜて目標温度にするための計算アプリです。

## セットアップ

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動 (ブラウザで確認)
npm run dev

# 本番用ビルド
npm run build
```

---

## 🚀 無料で公開する方法（Vercel）

### 1. GitHubにアップロード

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/water-mixer-app.git
git push -u origin main
```

### 2. Vercelでデプロイ

1. https://vercel.com にアクセス（無料アカウント作成）
2. 「Add New Project」→ GitHubリポジトリを選択
3. そのまま「Deploy」をクリック
4. 完成！ `https://water-mixer-app.vercel.app` のようなURLが発行されます

---

## 🚀 別の公開方法（Netlify）

```bash
npm run build
```

1. https://netlify.com にアクセス（無料アカウント作成）
2. 「Add new site」→「Deploy manually」
3. `dist` フォルダをドラッグ＆ドロップ
4. 完成！URLが発行されます

---

## ファイル構成

```
water-mixer-app/
├── index.html          # HTMLエントリーポイント
├── package.json        # 依存パッケージ定義
├── vite.config.js      # ビルド設定
└── src/
    ├── main.jsx        # Reactエントリーポイント
    └── App.jsx         # メインコンポーネント
```
