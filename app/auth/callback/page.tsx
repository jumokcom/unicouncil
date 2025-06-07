/**
 * 역할: OAuth 콜백 페이지 - 로그인 후 프로필 완성 여부에 따라 리다이렉트
 * 연결: app/login/page.tsx에서 OAuth redirectTo 경로
 * 의존성: lib/supabase.ts, Next.js router
 * Supabase 기능: Auth (세션 확인), Database (프로필 정보 조회)
 */

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  // 프로필 완성 여부 체크 함수 (이메일 제외, 5개 필드)
  const checkProfileComplete = (profile: any) => {
    return profile?.name && 
           profile?.department && 
           profile?.student_id && 
           profile?.birth_date && 
           profile?.phone && 
           profile?.gender;
  };

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

        // users 테이블에서 프로필 정보 조회 (이메일 제외)
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('name, department, student_id, birth_date, phone, gender')
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('프로필 조회 오류:', profileError);
        }

        if (!profile || !checkProfileComplete(profile)) {
          // 프로필 미완성 -> 프로필 페이지로
          router.push('/profile');
        } else {
          // 프로필 완성 -> 홈으로
          router.push('/');
        }
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
