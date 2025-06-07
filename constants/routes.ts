/**
 * 역할: 라우트 상수 정의 - 애플리케이션 전체 경로 관리
 * 연결: components/layout/header.tsx, sidebar.tsx에서 네비게이션 생성시 사용
 * 의존성: 없음 (순수 상수)
 * 목적: URL 변경 시 한 곳에서만 수정, 타입 안전성 보장
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ABOUT: '/about',
  ORGANIZATION: '/organization',
  DASHBOARD: '/dashboard',
  MEMBERS: '/members',
  ACCOUNTS: '/accounts',
  ALBUMS: '/albums',
  APPLICATIONS: '/applications',
  NEW_APPLICATION: '/applications/new',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings'
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteValue = typeof ROUTES[RouteKey]
