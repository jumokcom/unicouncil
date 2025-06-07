/**
 * 역할: 레이아웃 래퍼 - ClientLayout 컴포넌트로 위임
 * 연결: app/layout.tsx에서 사용
 * 의존성: components/layout/ClientLayout.tsx
 */

import ClientLayout from '@/components/layout/ClientLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
