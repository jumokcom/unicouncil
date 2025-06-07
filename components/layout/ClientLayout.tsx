/**
 * 역할: 클라이언트 메인 레이아웃 컴포넌트 (통합 버전)
 * 연결: app/layout.tsx에서 사용
 * 의존성: lib/supabase.ts
 * 기능: pathname 기반 조건부 레이아웃, 사용자 상태 관리, 모든 서브컴포넌트 포함
 */

'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

const excludeLayoutPaths = ['/login', '/auth/callback'];

// AuthButtons 컴포넌트 (인라인)
function AuthButtons({ user, loading, onNavigate, isMobile = false }: {
  user: User | null;
  loading: boolean;
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    const spinnerClass = isMobile 
      ? "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
      : "w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin";
    
    return (
      <div className={isMobile ? "" : "ml-auto flex items-center space-x-4"}>
        <div className={spinnerClass}></div>
      </div>
    );
  }

  if (!user) {
    const loginButtonClass = isMobile
      ? "px-3 py-1 bg-white text-blue-600 rounded text-sm hover:bg-gray-100"
      : "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors";
    
    return (
      <div className={isMobile ? "" : "ml-auto flex items-center space-x-4"}>
        <button onClick={() => onNavigate('/login')} className={loginButtonClass}>
          로그인
        </button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex items-center space-x-2">
        <button onClick={() => onNavigate('/profile')} className="text-white text-sm hover:text-gray-200">
          프로필
        </button>
        <button onClick={handleLogout} className="text-white text-sm hover:text-gray-200">
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center space-x-4">
      <button onClick={() => onNavigate('/profile')} className="text-sm text-gray-600 hover:text-gray-800">
        프로필
      </button>
      <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
        로그아웃
      </button>
    </div>
  );
}

// Header 컴포넌트 (인라인)
function Header({ user, loading, onNavigate }: {
  user: User | null;
  loading: boolean;
  onNavigate: (path: string) => void;
}) {
  return (
    <header className="h-[10vh] bg-white border-b border-gray-300 flex items-center px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-800">홈</h2>
        <span className="text-sm text-gray-500">/ 홈</span>
      </div>
      <AuthButtons user={user} loading={loading} onNavigate={onNavigate} isMobile={false} />
    </header>
  );
}

// MobileHeader 컴포넌트 (인라인)
function MobileHeader({ user, loading, onNavigate }: {
  user: User | null;
  loading: boolean;
  onNavigate: (path: string) => void;
}) {
  return (
    <header className="h-[12vh] bg-blue-600 text-white flex items-center px-4 border-b border-blue-700">
      <h1 className="text-lg font-bold">동아리 관리</h1>
      <div className="ml-auto">
        <AuthButtons user={user} loading={loading} onNavigate={onNavigate} isMobile={true} />
      </div>
    </header>
  );
}

// Sidebar 컴포넌트 (인라인)
function Sidebar({ onNavigate }: { onNavigate: (path: string) => void }) {
  const menuItems = [
    { path: '/', label: '홈', active: true },
    { path: '/members', label: '부원 관리' },
    { path: '/calendar', label: '일정 캘린더' },
    { path: '/room-status', label: '동아리방' },
    { path: '/albums', label: '활동 앨범' },
    { path: '/accounts', label: '계정 공유' },
    { path: '/applications', label: '신규 신청' }
  ];

  return (
    <aside className="w-[18vw] h-full bg-gray-100 border-r border-gray-300">
      <div className="p-4 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-800">동아리 관리</h1>
      </div>
      <nav className="p-4">
        <div className="space-y-2 text-sm text-gray-600">
          {menuItems.map((item) => (
            <button 
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full text-left p-2 rounded ${
                item.active ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

// 메인 ClientLayout 컴포넌트
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const shouldExcludeLayout = excludeLayoutPaths.includes(pathname);

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

  const handleNavigation = (path: string) => {
    router.push(path);
  };

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
        <Sidebar onNavigate={handleNavigation} />
        <div className="w-[82vw] h-full flex flex-col">
          <Header user={user} loading={loading} onNavigate={handleNavigation} />
          <main className="h-[90vh] overflow-auto bg-gray-50">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
