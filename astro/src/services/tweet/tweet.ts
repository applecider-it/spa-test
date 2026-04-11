import { sendRest } from '@/services/api/rest';

/**
 * ツイート管理
 */

/** ツイート一覧取得 */
const tweets = async () => {
  const data = {};
  const uri = '/tweet/tweets';

  try {
    const res = await sendRest<any[]>(uri, data);
    console.log('res', res);

    return res;
  } catch (e) {
    console.error(e);
  }
};

/** ツイート取得 */
const tweet = async (id: number) => {
  const data = {id};
  const uri = '/tweet/tweet';

  try {
    const res = await sendRest<any[]>(uri, data);
    console.log('res', res);

    return res;
  } catch (e) {
    console.error(e);
  }
};

export const Tweet = {
  tweets,
  tweet,
};
