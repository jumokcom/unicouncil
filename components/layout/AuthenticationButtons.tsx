/**
 * 역할: 인증 상태별 버튼 컨테이너
 * 연결: components/layout/MainHeader.tsx, MobileHeader.tsx에서 사용
 * 의존성: LoadingSpinner.tsx, AuthLoginButton.tsx, AuthUserButtons.tsx, useAuthActions.ts
 * 기능: 인증 상태에 따른 버튼 렌더링
 */

'use client';
import { User } from '@supabase/supabase-js';
import LoadingSpinner from './LoadingSpinner';
import AuthLoginButton from './AuthLoginButton';
import AuthUserButtons from './AuthUserButtons';
import { useAuthActions } from './useAuthActions';

interface AuthenticationButtonsProps {
  user: User | null;
  loading: boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export default function AuthenticationButtons({ 
  user, 
  loading, 
  onNavigate, 
  isMobile = false 
}: AuthenticationButtonsProps) {
  const { handleLogout } = useAuthActions();

  // 로딩 상태
  if (loading) {
    return <LoadingSpinner isMobile={isMobile} />;
  }

  // 로그인하지 않은 상태
  if (!user) {
    return <AuthLoginButton onNavigate={onNavigate} isMobile={isMobile} />;
  }

  // 로그인한 상태
  return (
    <AuthUserButtons 
      onNavigate={onNavigate} 
      onLogout={handleLogout} 
      isMobile={isMobile} 
    />
  );
}
