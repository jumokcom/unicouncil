/**
 * 역할: 프로필 페이지 메인 래퍼
 * 연결: app/profile/page.tsx에서 사용
 * 의존성: ProfileHeader.tsx, ProfileFormContainer.tsx, AuthenticationButtons.tsx
 * Supabase 기능: Auth (사용자 확인)
 * 디자인: 로그인 페이지와 동일한 스타일 + 우측 상단 인증 버튼
 */

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import ProfileHeader from './ProfileHeader';
import ProfileFormContainer from './ProfileFormContainer';
import AuthenticationButtons from '@/components/layout/AuthenticationButtons';

export default function ProfileForm() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 사용자 인증 확인
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };
    
    loadUser();
  }, [router]);

  // 페이지 이동 함수
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // 로딩 상태
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #68e1fe, #ccfff0)",
        }}
      >
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 사용자가 없는 경우
  if (!user) {
    return null;
  }

  return (
    <div
      className="min-h-screen relative"
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

      <div className="px-6 py-8">
        {/* 로고 및 타이틀 섹션 */}
        <ProfileHeader />

        {/* 프로필 폼 섹션 */}
        <div className="max-w-2xl mx-auto">
          <ProfileFormContainer user={user} />
        </div>
      </div>
    </div>
  );
}
