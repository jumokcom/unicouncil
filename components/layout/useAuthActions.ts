/**
 * 역할: 인증 관련 액션 훅
 * 연결: components/layout/AuthenticationButtons.tsx에서 사용
 * Supabase 기능: Auth (로그아웃)
 * 기능: 로그아웃 후 메인 페이지로 리다이렉트
 */

import { supabase } from '@/lib/supabase';

export function useAuthActions(onNavigate?: (path: string) => void) {
  // 로그아웃 처리
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
      return;
    }
    
    // 로그아웃 성공 후 메인 페이지로 이동
    if (onNavigate) {
      onNavigate('/');
    }
  };

  return {
    handleLogout
  };
}
