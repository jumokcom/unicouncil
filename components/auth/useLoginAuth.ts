/**
 * 역할: 로그인 페이지 인증 로직 훅
 * 연결: components/auth/LoginForm.tsx에서 사용
 * 의존성: OAuthHandler.tsx, Supabase
 * Supabase 기능: Auth (세션 확인, 상태 변화 감지)
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { handleKakaoLogin, handlePostLogin } from './OAuthHandler';

export function useLoginAuth() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // 로그인 상태 체크 (페이지 로드 시)
  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        await handlePostLogin(session.user.id, (path) => router.push(path));
      }
      
      setUser(session?.user ?? null);
    };
    
    checkAuthState();

    // 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  // 페이지 이동 함수
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // OAuth 핸들러 콜백들
  const oAuthCallbacks = {
    onLoginStart: () => setLoading(true),
    onLoginEnd: () => setLoading(false),
    onError: (message: string) => alert(message),
    onRedirect: (path: string) => router.push(path)
  };

  // 로그인 실행 함수
  const handleLogin = () => {
    handleKakaoLogin(oAuthCallbacks);
  };

  return {
    loading,
    user,
    handleNavigation,
    handleLogin
  };
}
