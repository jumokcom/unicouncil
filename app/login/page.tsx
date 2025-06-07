/**
 * 역할: 로그인 페이지 - 간소화된 래퍼
 * 연결: app/layout.tsx에서 라우팅
 * 의존성: components/auth/LoginForm.tsx
 * 기능: LoginForm 컴포넌트 렌더링
 */

import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return <LoginForm />;
}
