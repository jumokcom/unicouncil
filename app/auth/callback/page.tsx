/**
 * 역할: OAuth 콜백 페이지 - 간소화된 래퍼
 * 연결: app/login/page.tsx에서 OAuth redirectTo 경로
 * 의존성: components/auth/AuthCallback.tsx
 * 기능: AuthCallback 컴포넌트 렌더링
 */

import AuthCallback from '@/components/auth/AuthCallback';

export default function AuthCallbackPage() {
  return <AuthCallback />;
}
