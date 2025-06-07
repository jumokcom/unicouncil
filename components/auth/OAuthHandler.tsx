/**
 * 역할: OAuth 로그인 처리 컴포넌트
 * 연결: components/auth/LoginForm.tsx에서 사용
 * 의존성: lib/supabase.ts, components/auth/ProfileChecker.tsx
 * Supabase 기능: Auth (signInWithOAuth)
 */

import { supabase } from '@/lib/supabase';
import { getRedirectPath } from './ProfileChecker';

export interface OAuthHandlerProps {
  onLoginStart: () => void;
  onLoginEnd: () => void;
  onError: (message: string) => void;
  onRedirect: (path: string) => void;
}

// 카카오 OAuth 로그인 처리
export const handleKakaoLogin = async ({ onLoginStart, onLoginEnd, onError }: Omit<OAuthHandlerProps, 'onRedirect'>) => {
  try {
    onLoginStart();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("로그인 오류:", error.message);
      onError("로그인 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("카카오 로그인 오류:", error);
    onError("로그인 중 오류가 발생했습니다.");
  } finally {
    onLoginEnd();
  }
};

// 로그인 후 처리 (페이지 로드 시)
export const handlePostLogin = async (userId: string, onRedirect: (path: string) => void) => {
  try {
    const redirectPath = await getRedirectPath(userId);
    onRedirect(redirectPath);
  } catch (error) {
    console.error('로그인 후 처리 오류:', error);
  }
};
