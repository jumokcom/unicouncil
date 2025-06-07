/**
 * 역할: 로그인 후 버튼들 컴포넌트
 * 연결: components/layout/AuthenticationButtons.tsx에서 사용
 * 기능: 프로필, 로그아웃 버튼 UI (모바일/PC 대응)
 */

interface AuthUserButtonsProps {
  onNavigate: (path: string) => void;
  onLogout: () => void;
  isMobile?: boolean;
}

export default function AuthUserButtons({ onNavigate, onLogout, isMobile = false }: AuthUserButtonsProps) {
  // 모바일
  if (isMobile) {
    return (
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onNavigate('/profile')} 
          className="px-3 py-1 text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform shadow-md border"
          style={{
            background: "#b2fff9",
            borderColor: "#68e1fe"
          }}
        >
          프로필
        </button>
        <button 
          onClick={onLogout} 
          className="px-3 py-1 text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform shadow-md border"
          style={{
            background: "#ff6b6b",
            borderColor: "#ff5252"
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  // PC
  return (
    <div className="ml-auto flex items-center space-x-4">
      <button 
        onClick={() => onNavigate('/profile')} 
        className="px-4 py-2 text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl border-2"
        style={{
          background: "linear-gradient(to right, #68e1fe, #b2fff9)",
          borderColor: "#000000"
        }}
      >
        프로필
      </button>
      <button 
        onClick={onLogout} 
        className="px-4 py-2 text-black font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl border-2"
        style={{
          background: "linear-gradient(to right, #ff6b6b, #ff8a80)",
          borderColor: "#000000"
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
