/**
 * 역할: 홈 페이지 - 간소화된 래퍼
 * 연결: app/layout.tsx에서 기본 라우트
 * 의존성: components/home/HomePage.tsx
 * 기능: HomePage 컴포넌트 렌더링
 */

import HomePage from '@/components/home/HomePage';

export default function Page() {
  return <HomePage />;
}
