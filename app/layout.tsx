/**
 * 역할: 루트 레이아웃 컴포넌트 - 완전 비율 기반 반응형 레이아웃 (모바일/PC)
 * 연결: app/globals.css, 모든 하위 페이지들과 연결
 * 의존성: Next.js metadata, Tailwind CSS
 * 구조: md 기준으로 모바일(세로스택) / PC(L자레이아웃) 분기
 * 예외: 로그인 페이지는 레이아웃 제외
 */
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: "COMA - 동아리 관리 시스템",
  description: "순천대학교 코딩동아리 CODING MASTER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
