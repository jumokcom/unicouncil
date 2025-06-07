/**
 * 역할: 홈 페이지 메인 컴포넌트
 * 연결: app/page.tsx에서 사용
 * 의존성: components/home/WelcomeSection.tsx, DashboardGrid.tsx
 * 기능: 홈 페이지 전체 레이아웃
 */

'use client';
import WelcomeSection from './WelcomeSection';
import DashboardGrid from './DashboardGrid';

export default function HomePage() {
  // TODO: 로그인 상태 확인 후 조건부 렌더링 구현
  // 현재는 임시 대시보드 콘텐츠로 표시
  
  return (
    <div className="space-y-6">
      <WelcomeSection />
      <DashboardGrid />
    </div>
  );
}
