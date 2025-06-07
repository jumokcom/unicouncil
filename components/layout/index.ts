/**
 * 역할: 레이아웃 컴포넌트 인덱스 - 전체 앱 구조와 네비게이션 컴포넌트들의 진입점
 * 연결: app/layout.tsx에서 전체 레이아웃 구성, 보호된 페이지에서 인증 체크
 * 의존성: lib/supabase.ts, constants/routes.ts, constants/roles.ts
 * 포함: Header, Sidebar, AuthGuard 등 레이아웃 및 보안 컴포넌트
 */

// AuthGuard만 export (다른 것들은 직접 import 사용)
export { AuthGuard } from './auth-guard'
