import { useEffect, useState } from 'react';
import { sendRest } from '@/services/api/rest';
import { AuthResult, User } from '@/types/types';

/** 認証チェック */
const authCheck = async (): Promise<AuthResult> => {
  const data = {};
  const uri = '/auth';

  const res = await sendRest<AuthResult>(uri, data);

  console.log('res', res);

  return res;
};

/**
 * 認証管理フック
 * 
 * loading=trueの時は、認証確認中。
 * user=nullの時は、認証失敗。
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const result = await authCheck();
      setUser(result.user);
      setLoading(false);
    };

    init();
  }, []);

  return {
    user,
    loading,
  };
};
