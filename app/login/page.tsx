/**
 * 역할: 로그인 페이지 - Supabase OAuth를 사용한 소셜 로그인
 * 연결: app/layout.tsx에서 라우팅, app/auth/callback에서 OAuth 콜백 처리
 * 의존성: @supabase/supabase-js, lib/supabase.ts
 * Supabase 기능: Auth (signInWithOAuth), Database (프로필 완성 여부 체크)
 * 로그인 후: 프로필 미완성 시 /profile, 완성 시 / 로 리다이렉트
 */

"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
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

  // 로그인 상태 체크 (페이지 로드 시)
  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // 이미 로그인된 상태면 프로필 체크 후 리다이렉트
        await handlePostLogin(session.user.id);
      }
    };
    
    checkAuthState();
  }, []);

  // 로그인 후 처리 함수
  const handlePostLogin = async (userId: string) => {
    try {
      // users 테이블에서 프로필 정보 조회 (이메일 제외)
      const { data: profile, error } = await supabase
        .from('users')
        .select('name, department, student_id, birth_date, phone, gender')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116: 데이터 없음
        console.error('프로필 조회 오류:', error);
        return;
      }

      if (!profile || !checkProfileComplete(profile)) {
        // 프로필 미완성 -> 프로필 페이지로
        router.push('/profile');
      } else {
        // 프로필 완성 -> 홈으로
        router.push('/');
      }
    } catch (error) {
      console.error('로그인 후 처리 오류:', error);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("로그인 오류:", error.message);
        alert("로그인 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
        <div className="flex justify-center">
          <button
            onClick={handleKakaoLogin}
            disabled={loading}
            className="
              w-full max-w-[280px]
              py-2 px-4
              text-black font-semibold
              rounded-lg transition-all duration-200
              flex items-center justify-center gap-3
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:scale-105 transform
              shadow-lg hover:shadow-xl
              border-2
            "
            style={{
              background: loading
                ? "#b2fff9"
                : "linear-gradient(to right, #68e1fe, #b2fff9)",
              borderColor: "#000000",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "#b2fff9";
                e.currentTarget.style.borderColor = "#333333";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background =
                  "linear-gradient(to right, #68e1fe, #b2fff9)";
                e.currentTarget.style.borderColor = "#000000";
              }
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

        {/* 안내 텍스트 */}
        <p className="text-sm text-gray-600 mt-6 md:mt-4 leading-relaxed">
          최초 로그인 시 간단한 정보를 입력받습니다
        </p>
      </div>
    </div>
  );
}
