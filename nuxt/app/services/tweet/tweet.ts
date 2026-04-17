import { sendRest } from '@/services/api/rest';

/**
 * ツイート管理
 */

/** ツイート一覧取得 */
export const getTweets = async () => {
  const data = {};
  const uri = '/tweet/tweets';

  const res = await sendRest<any[]>(uri, data);
  console.log('res', res);

  return res;
};

/** ツイート取得 */
export const getTweet = async (id: number) => {
  const data = { id };
  const uri = '/tweet/tweet';

  const res = await sendRest<any[]>(uri, data);
  console.log('res', res);

  return res;
};

/** ツイート送信 */
export const storeTweet = async (content: string) => {
  const data = { content };
  const uri = '/tweet/store';

  const res = await sendRest<{ status: string; tweet?: any }>(uri, data);
  console.log('res', res);

  return res;
};
