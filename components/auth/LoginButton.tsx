/**
 * 역할: 카카오 로그인 버튼 컴포넌트
 * 연결: components/auth/LoginForm.tsx에서 사용
 * 기능: 카카오 로그인 버튼 UI (로딩 상태 포함)
 */

interface LoginButtonProps {
  loading: boolean;
  onLogin: () => void;
}

export default function LoginButton({ loading, onLogin }: LoginButtonProps) {
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
