/**
 * 역할: OAuth 콜백 처리 컴포넌트
 * 연결: app/auth/callback/page.tsx에서 사용
 * 의존성: components/auth/ProfileChecker.tsx
 * Supabase 기능: Auth (세션 확인)
 */

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getRedirectPath } from '@/components/auth/ProfileChecker';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL 해시에서 세션 정보 추출
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('인증 오류:', error);
          router.push('/login');
          return;
        }

        if (!session) {
          console.error('세션 없음');
          router.push('/login');
          return;
        }

        // 프로필 완성 여부에 따라 리다이렉트
        const redirectPath = await getRedirectPath(session.user.id);
        router.push(redirectPath);
      } catch (error) {
        console.error('콜백 처리 오류:', error);
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
