import axios from 'axios';

/** REST送信 */
export async function sendRest<T>(uri: string, data: unknown): Promise<T> {
  try {
    const res = await axios.post<T>('http://localhost:4000' + uri, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.error || '送信に失敗しました');
    } else if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('送信に失敗しました');
    }
  }
}
