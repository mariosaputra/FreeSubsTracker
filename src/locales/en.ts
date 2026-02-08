const en = {
  appName: "FreeSubsTracker",
  appTagline: "Free Subscriptions Tracker",
  loading: "Loading subscriptions...",
  monthlyCost: "Monthly Cost",
  annualCost: "Annual Cost",
  subscriptions: "Subscriptions",
  addSubscription: "Add Subscription",
  name: "Name",
  namePlaceholder: "e.g. Netflix",
  cost: "Cost",
  cycle: "Cycle",
  monthly: "Monthly",
  annual: "Annual",
  category: "Category",
  categoryPlaceholder: "Category name",
  customCategory: "+ Custom...",
  actions: "Actions",
  add: "Add",
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  mo: "mo",
  yr: "yr",
  noSubscriptions: "No subscriptions yet. Add one above!",
  yourData: "Data",
  dataDescription:
    "You own your data. Data is stored in your browser's local storage. Export to back up",
  export: "Export",
  import: "Import",
  dismiss: "Dismiss",
  howToUse: "How to use",
  howToStep1:
    "<strong>Select a profile</strong> — Pick a profile tab (e.g. Personal, Business) or create a new one with the <strong>+</strong> button.",
  howToStep2:
    "<strong>Add subscriptions</strong> — Fill in the name, cost, cycle (monthly/annual), and category. Use <strong>+ Custom...</strong> in the category dropdown to create your own.",
  howToStep3:
    "<strong>Edit or delete</strong> — Click any subscription to edit it. Hit <strong>Delete</strong> to remove it.",
  howToStep4:
    "<strong>Export &amp; Import</strong> — Back up your data as a JSON file and import it on another device.",
  privacyNote:
    '<strong class="text-foreground">Privacy:</strong> Data stays in your browser. No server, no account, no tracking. Clearing browser data deletes subscriptions — use <strong>Export</strong> to back up.',
  profilePlaceholder: "Profile name",
  deleteProfileConfirm:
    "Delete <strong>{name}</strong>? All subscriptions in this profile will be permanently removed.",
  errorSomethingWrong: "Something went wrong",
  errorTryRefresh:
    "Try refreshing the page. If the problem persists, clear your browser data for this site.",
  refreshPage: "Refresh Page",
  importErrorTooLarge: "File is too large (max 5 MB).",
  importErrorNoValid: "No valid subscriptions found in file.",
  importErrorInvalid: "Invalid file format. Please use a valid JSON file.",
  builtBy: "Built by",
  openSourceText: "Open Source, source code available on",
  github: "GitHub",
} as const;

export type TranslationKey = keyof typeof en;
export default en;
