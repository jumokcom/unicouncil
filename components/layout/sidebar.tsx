/**
 * 역할: 사이드바 컴포넌트 - 역할별 메뉴 네비게이션
 * 연결: app/layout.tsx에서 사용, constants/routes.ts, constants/roles.ts
 * 의존성: lib/supabase.ts (사용자 역할 확인), components/ui
 * Supabase 기능: Auth (권한 체크), Database (사용자 역할 조회)
 * 권한별 메뉴: 게스트/부원/간부/관리자 각각 다른 메뉴 표시
 */

// 역할별 사이드바 메뉴 구현 예정
export function Sidebar() {
  return <aside>Sidebar Component</aside>
}
