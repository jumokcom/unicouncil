/**
 * 역할: 로그인 버튼 컴포넌트 (인증 전용)
 * 연결: components/layout/AuthenticationButtons.tsx에서 사용
 * 기능: 로그인 버튼 UI (모바일/PC 대응)
 */

interface AuthLoginButtonProps {
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

export default function AuthLoginButton({ onNavigate, isMobile = false }: AuthLoginButtonProps) {
  const loginButtonClass = isMobile
    ? "px-3 py-1 bg-white text-black rounded text-sm hover:bg-gray-100 transition-colors"
    : "px-4 py-2 text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl border-2";
  
  const buttonStyle = isMobile ? {} : {
    background: "linear-gradient(to right, #68e1fe, #b2fff9)",
    borderColor: "#000000"
  };
  
  return (
    <div className={isMobile ? "" : "ml-auto flex items-center space-x-4"}>
      <button 
        onClick={() => onNavigate('/login')} 
        className={loginButtonClass}
        style={buttonStyle}
      >
        로그인
      </button>
    </div>
  );
}
