/**
 * 역할: 클라이언트 메인 레이아웃 컴포넌트
 * 연결: app/layout.tsx에서 사용
 * 의존성: components/layout/MainHeader, MobileHeader, NavigationSidebar
 * 기능: pathname 기반 조건부 레이아웃, 사용자 상태 관리
 */

'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import MainHeader from './MainHeader';
import MobileHeader from './MobileHeader';
import NavigationSidebar from './NavigationSidebar';

const excludeLayoutPaths = ['/login', '/auth/callback', '/', '/profile'];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const shouldExcludeLayout = excludeLayoutPaths.includes(pathname);

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

  // 레이아웃 제외 페이지
  if (shouldExcludeLayout) {
    return <>{children}</>;
  }

  return (
    <>
      {/* 모바일 레이아웃 */}
      <div className="md:hidden h-screen w-screen flex flex-col">
        <MobileHeader user={user} loading={loading} onNavigate={handleNavigation} />
        <main className="h-[88vh] overflow-auto bg-gray-50">
          <div className="p-4">{children}</div>
        </main>
      </div>

      {/* PC 레이아웃 */}
      <div className="hidden md:flex h-screen w-screen">
        <NavigationSidebar onNavigate={handleNavigation} />
        <div className="w-[82vw] h-full flex flex-col">
          <MainHeader user={user} loading={loading} onNavigate={handleNavigation} />
          <main className="h-[90vh] overflow-auto bg-gray-50">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
