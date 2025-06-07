/**
 * 역할: 프로필 페이지 - 간소화된 래퍼
 * 연결: app/layout.tsx에서 라우팅
 * 의존성: components/profile/ProfileForm.tsx
 * 기능: ProfileForm 컴포넌트 렌더링
 */

import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  return <ProfileForm />;
}
