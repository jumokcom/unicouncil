/**
 * 역할: 로그인 폼 UI 컴포넌트
 * 연결: app/login/page.tsx에서 사용
 * 의존성: components/auth/OAuthHandler.tsx
 * 기능: 로고, 동아리 정보, 카카오 로그인 버튼
 */

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { handleKakaoLogin, handlePostLogin } from './OAuthHandler';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 로그인 상태 체크 (페이지 로드 시)
  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        await handlePostLogin(session.user.id, (path) => router.push(path));
      }
    };
    
    checkAuthState();
  }, [router]);

  // OAuth 핸들러 콜백들
  const oAuthCallbacks = {
    onLoginStart: () => setLoading(true),
    onLoginEnd: () => setLoading(false),
    onError: (message: string) => alert(message),
    onRedirect: (path: string) => router.push(path)
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(to bottom right, #68e1fe, #ccfff0)",
      }}
    >
      <div className="text-center text-gray-800 max-w-sm w-full">
        {/* 로고 */}
        <div className="mb-6 md:mb-8">
          <Image
            src="/images/coma-logo.png"
            alt="COMA 로고"
            width={250}
            height={250}
            className="mx-auto mb-4 md:mb-6"
            priority
          />

          {/* 동아리 정보 */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            COMA
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-1">
            순천대학교 코딩동아리
          </p>
          <p
            className="text-lg md:text-xl font-semibold mb-8 md:mb-10"
            style={{ color: "#68e1fe" }}
          >
            CODING MASTER
          </p>
        </div>

        {/* 카카오 로그인 버튼 */}
        <LoginButton loading={loading} onLogin={() => handleKakaoLogin(oAuthCallbacks)} />

        {/* 안내 텍스트 */}
        <p className="text-sm text-gray-600 mt-6 md:mt-4 leading-relaxed">
          최초 로그인 시 간단한 정보를 입력받습니다
        </p>
      </div>
    </div>
  );
}

// 로그인 버튼 컴포넌트
function LoginButton({ loading, onLogin }: { loading: boolean; onLogin: () => void }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onLogin}
        disabled={loading}
        className="w-full max-w-[280px] py-2 px-4 text-black font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform shadow-lg hover:shadow-xl border-2"
        style={{
          background: loading ? "#b2fff9" : "linear-gradient(to right, #68e1fe, #b2fff9)",
          borderColor: "#000000",
        }}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <span>로그인 중...</span>
          </>
        ) : (
          <>
            <span className="text-xl">💬</span>
            <span>카카오로 시작하기</span>
          </>
        )}
      </button>
    </div>
  );
}
