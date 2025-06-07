/**
 * 역할: 홈 페이지 메인 컴포넌트
 * 연결: app/page.tsx에서 사용
 * 의존성: components/home/WelcomeSection.tsx, DashboardGrid.tsx, AuthenticationButtons.tsx
 * 기능: 홈 페이지 전체 레이아웃 (로그인 페이지와 동일한 디자인) + 우측 상단 인증 버튼
 */

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import WelcomeSection from './WelcomeSection';
import DashboardGrid from './DashboardGrid';
import AuthenticationButtons from '@/components/layout/AuthenticationButtons';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 사용자 상태 확인
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // 페이지 이동 함수
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // TODO: 로그인 상태 확인 후 조건부 렌더링 구현
  // 현재는 임시 대시보드 콘텐츠로 표시
  
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
          loading={loading} 
          onNavigate={handleNavigation}
        />
      </div>

      <div className="px-6 py-8">
        {/* 로고 및 타이틀 섹션 */}
        <div className="text-center mb-8">
          <Image
            src="/images/coma-logo.png"
            alt="COMA 로고"
            width={200}
            height={200}
            className="mx-auto mb-4"
            priority
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            COMA
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-1">
            순천대학교 코딩동아리
          </p>
          <p
            className="text-lg md:text-xl font-semibold mb-6"
            style={{ color: "#68e1fe" }}
          >
            CODING MASTER
          </p>
        </div>

        {/* 콘텐츠 섹션 */}
        <div className="max-w-4xl mx-auto space-y-6">
          <WelcomeSection />
          <DashboardGrid />
        </div>
      </div>
    </div>
  );
}
