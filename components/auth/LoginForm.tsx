/**
 * 역할: 로그인 페이지 메인 래퍼
 * 연결: app/login/page.tsx에서 사용
 * 의존성: ProfileHeader.tsx, LoginButton.tsx, useLoginAuth.ts, AuthenticationButtons.tsx
 * 기능: 로그인 페이지 레이아웃 + 우측 상단 인증 버튼
 */

'use client';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LoginButton from './LoginButton';
import AuthenticationButtons from '@/components/layout/AuthenticationButtons';
import { useLoginAuth } from './useLoginAuth';

export default function LoginForm() {
  const { loading, user, handleNavigation, handleLogin } = useLoginAuth();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{
        background: "linear-gradient(to bottom right, #68e1fe, #ccfff0)",
      }}
    >
      {/* 우측 상단 인증 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <AuthenticationButtons 
          user={user} 
          loading={false} 
          onNavigate={handleNavigation}
        />
      </div>

      <div className="text-center text-gray-800 max-w-sm w-full">
        {/* 로고 및 타이틀 섹션 (재사용) */}
        <ProfileHeader />

        {/* 카카오 로그인 버튼 */}
        <LoginButton loading={loading} onLogin={handleLogin} />

        {/* 안내 텍스트 */}
        <p className="text-sm text-gray-600 mt-6 md:mt-4 leading-relaxed">
          최초 로그인 시 간단한 정보를 입력받습니다
        </p>
      </div>
    </div>
  );
}
