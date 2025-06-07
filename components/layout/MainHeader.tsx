/**
 * 역할: PC용 메인 헤더 컴포넌트
 * 연결: components/layout/ClientLayout.tsx에서 사용
 * 의존성: components/layout/AuthenticationButtons.tsx
 * 기능: 페이지 제목 표시 및 인증 버튼
 */

'use client';
import { User } from '@supabase/supabase-js';
import AuthenticationButtons from './AuthenticationButtons';

interface MainHeaderProps {
  user: User | null;
  loading: boolean;
  onNavigate: (path: string) => void;
}

export default function MainHeader({ user, loading, onNavigate }: MainHeaderProps) {
  return (
    <header className="h-[10vh] bg-white border-b border-gray-300 flex items-center px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-800">홈</h2>
        <span className="text-sm text-gray-500">/ 홈</span>
      </div>
      <AuthenticationButtons 
        user={user} 
        loading={loading} 
        onNavigate={onNavigate} 
        isMobile={false}
      />
    </header>
  );
}
