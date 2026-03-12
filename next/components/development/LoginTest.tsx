'use client';
import { sendRest } from '@/services/api/rest';
import { useRouter } from 'next/navigation';

export default function LoginTest() {
  const router = useRouter();

  const execLogin = async () => {
    const data = {};
    const uri = '/login';

    const res = await sendRest<{ message: string }>(uri, data);

    console.log('res', res);

    router.push('/');
  };

  const execLogout = async () => {
    const data = {};
    const uri = '/logout';

    const res = await sendRest<{ message: string }>(uri, data);

    console.log('res', res);

    //router.push('/');
    location.href = "/";
  };

  return (
    <div>
      <button type="button" onClick={execLogin} className="app-btn-primary">
        ログイン
      </button>
      <button type="button" onClick={execLogout} className="app-btn-primary ml-5">
        ログアウト
      </button>
    </div>
  );
}
