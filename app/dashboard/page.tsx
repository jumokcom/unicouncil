/**
 * 역할: 대시보드 페이지 - 부원 이상 접근, 주요 정보 요약 표시
 * 연결: components/layout/auth-guard.tsx로 권한 체크, components/layout/sidebar.tsx 메뉴
 * 의존성: lib/supabase.ts, types/database.types.ts
 * Supabase 기능: Auth (사용자 확인), Database (대시보드 데이터), RLS (권한 제어)
 */

export default function DashboardPage() {
  // 대시보드 구현 예정
  return <div>Dashboard Page</div>
}
