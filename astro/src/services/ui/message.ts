/** トースト出力用Hook */
let showToastHook: Function;
/** ローディング画面のオンオフ用Hook */
let setIsLoadingHook: Function;

let nextPageToasts: any[] = [];

/** メッセージ管理のセットアップ */
export function setupMessage(
  showToastArg: Function,
  setIsLoadingArg: Function,
) {
  console.log('setupMessage');

  showToastHook = showToastArg;
  setIsLoadingHook = setIsLoadingArg;

  showToastNextPageExec();
}

/** トースト出力 */
export function showToast(message: string, type: string = 'notice') {
  showToastHook(message, type);
}

/** 次のページにトースト出力を設定する */
export function showToastNextPage(message: string, type: string = 'notice') {
  nextPageToasts.push({
    message,
    type,
  });
}

/** 次のページにトースト出力 */
function showToastNextPageExec() {
  if (nextPageToasts.length > 0) {
    nextPageToasts.forEach((row) => showToast(row.message, row.type));
    nextPageToasts = [];
  }
}

/** ローディング画面のオンオフ */
export function setIsLoading(isLoading: boolean) {
  setIsLoadingHook(isLoading);
}
