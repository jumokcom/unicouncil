/**
 * 역할: 모바일용 헤더 컴포넌트
 * 연결: components/layout/ClientLayout.tsx에서 사용
 * 의존성: components/layout/AuthButtons.tsx
 * 기능: 모바일 헤더 제목 표시 및 인증 버튼
 */

'use client';
import { User } from '@supabase/supabase-js';
import AuthenticationButtons from './AuthenticationButtons';

interface MobileHeaderProps {
  user: User | null;
  loading: boolean;
  onNavigate: (path: string) => void;
}

export default function MobileHeader({ user, loading, onNavigate }: MobileHeaderProps) {
  return (
    <header className="h-[12vh] bg-blue-600 text-white flex items-center px-4 border-b border-blue-700">
      <h1 className="text-lg font-bold">동아리 관리</h1>
      <div className="ml-auto">
        <AuthenticationButtons 
          user={user} 
          loading={loading} 
          onNavigate={onNavigate} 
          isMobile={true}
        />
      </div>
    </header>
  );
}
