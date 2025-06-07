/**
 * 역할: 사용자 역할 상수 정의 - 권한 시스템의 핵심 타입
 * 연결: components/layout/auth-guard.tsx, sidebar.tsx에서 권한 체크
 * 의존성: types/database.types.ts와 연동
 * Supabase 연동: user_roles 테이블의 role 컬럼과 일치해야 함
 */

export const ROLES = {
  GUEST: 'guest',
  MEMBER: 'member', 
  STAFF: 'staff',
  ADMIN: 'admin'
} as const

export type Role = typeof ROLES[keyof typeof ROLES]

// 권한 계층 구조 (상위 권한은 하위 권한 포함)
export const ROLE_HIERARCHY: Record<Role, Role[]> = {
  guest: ['guest'],
  member: ['guest', 'member'],
  staff: ['guest', 'member', 'staff'],
  admin: ['guest', 'member', 'staff', 'admin']
}

// 페이지별 최소 권한 요구사항
export const PAGE_PERMISSIONS = {
  '/dashboard': 'member',
  '/members': 'member',
  '/accounts': 'member',
  '/albums': 'member',
  '/applications': 'staff',
  '/admin': 'admin'
} as const
