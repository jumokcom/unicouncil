/**
 * 역할: 로딩 스피너 컴포넌트
 * 연결: components/layout/AuthenticationButtons.tsx에서 사용
 * 기능: 모바일/PC용 로딩 스피너 UI
 */

interface LoadingSpinnerProps {
  isMobile?: boolean;
}

export default function LoadingSpinner({ isMobile = false }: LoadingSpinnerProps) {
  const spinnerClass = isMobile 
    ? "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    : "w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin";
  
  return (
    <div className={isMobile ? "" : "ml-auto flex items-center space-x-4"}>
      <div className={spinnerClass}></div>
    </div>
  );
}
