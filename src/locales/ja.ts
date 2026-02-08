import type { TranslationKey } from "./en";

const ja: Record<TranslationKey, string> = {
  appName: "FreeSubsTracker",
  appTagline: "無料サブスク管理ツール",
  loading: "読み込み中...",
  monthlyCost: "月額コスト",
  annualCost: "年額コスト",
  subscriptions: "サブスクリプション",
  addSubscription: "サブスク追加",
  name: "名前",
  namePlaceholder: "例: Netflix",
  cost: "費用",
  cycle: "周期",
  monthly: "月額",
  annual: "年額",
  category: "カテゴリー",
  categoryPlaceholder: "カテゴリー名",
  customCategory: "+ カスタム...",
  actions: "操作",
  add: "追加",
  save: "保存",
  cancel: "キャンセル",
  delete: "削除",
  mo: "月",
  yr: "年",
  noSubscriptions:
    "サブスクリプションはまだありません。上から追加してください！",
  yourData: "データ",
  dataDescription:
    "データはあなたのものです。データはブラウザのローカルストレージに保存されます。バックアップにはエクスポートを使用してください。",
  export: "エクスポート",
  import: "インポート",
  dismiss: "閉じる",
  howToUse: "使い方",
  howToStep1:
    "<strong>プロフィールを選択</strong> — プロフィールタブ（例：Personal、Business）を選ぶか、<strong>+</strong> ボタンで新規作成。",
  howToStep2:
    "<strong>サブスクを追加</strong> — 名前、費用、周期（月額/年額）、カテゴリーを入力。カテゴリーのドロップダウンで<strong>+ カスタム...</strong>を選んで独自カテゴリーを作成。",
  howToStep3:
    "<strong>編集・削除</strong> — サブスクをクリックして編集。<strong>削除</strong>ボタンで削除。",
  howToStep4:
    "<strong>エクスポート＆インポート</strong> — JSONファイルとしてバックアップし、別の端末でインポート。",
  privacyNote:
    '<strong class="text-foreground">プライバシー:</strong> データはブラウザに保存されます。サーバー・アカウント・トラッキングなし。ブラウザデータを消すとサブスクも消えます — <strong>エクスポート</strong>でバックアップを。',
  profilePlaceholder: "プロフィール名",
  deleteProfileConfirm:
    "<strong>{name}</strong>を削除しますか？このプロフィールのサブスクリプションはすべて完全に削除されます。",
  errorSomethingWrong: "エラーが発生しました",
  errorTryRefresh:
    "ページを更新してください。問題が続く場合は、このサイトのブラウザデータを消去してください。",
  refreshPage: "ページを更新",
  importErrorTooLarge: "ファイルが大きすぎます（最大5 MB）。",
  importErrorNoValid:
    "ファイルに有効なサブスクリプションが見つかりませんでした。",
  importErrorInvalid:
    "無効なファイル形式です。有効なJSONファイルを使用してください。",
  builtBy: "開発者:",
  openSourceText: "オープンソース、ソースコードは",
  github: "GitHub",
};

export default ja;
