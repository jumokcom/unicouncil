/**
 * 역할: 인증 상태별 버튼 컴포넌트
 * 연결: components/layout/MainHeader.tsx, MobileHeader.tsx에서 사용
 * 의존성: @supabase/supabase-js, lib/supabase.ts
 * Supabase 기능: Auth (로그아웃)
 */

'use client';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

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
  // 로그아웃 처리
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 로딩 상태
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

  // 로그인하지 않은 상태
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

  // 로그인한 상태 - 모바일
  if (isMobile) {
    return (
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onNavigate('/profile')} 
          className="text-white text-sm hover:text-gray-200"
        >
          프로필
        </button>
        <button 
          onClick={handleLogout} 
          className="text-white text-sm hover:text-gray-200"
        >
          로그아웃
        </button>
      </div>
    );
  }

  // 로그인한 상태 - PC
  return (
    <div className="ml-auto flex items-center space-x-4">
      <button 
        onClick={() => onNavigate('/profile')} 
        className="text-sm text-gray-600 hover:text-gray-800"
      >
        프로필
      </button>
      <button 
        onClick={handleLogout} 
        className="text-sm text-red-600 hover:text-red-800"
      >
        로그아웃
      </button>
    </div>
  );
}
