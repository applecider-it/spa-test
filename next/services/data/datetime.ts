/** ローケルごとの日時表記 */
export function toLocaleString(date: string) {
  return new Date(date).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });
}
