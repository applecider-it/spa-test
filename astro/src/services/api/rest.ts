import axios from 'axios';

/** REST送信 */
export async function sendRest<T>(uri: string, data: unknown): Promise<T> {
  const res = await axios.post<T>('http://localhost:4000' + uri, data, {
    withCredentials: true,
  });
  return res.data;
}
