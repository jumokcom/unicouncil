/**
 * 역할: 프로필 페이지 헤더 컴포넌트 (로고 + 타이틀)
 * 연결: components/profile/ProfileForm.tsx에서 사용
 * 기능: COMA 로고, 타이틀, 서브타이틀 렌더링 (재사용 가능)
 */

import Image from 'next/image';

export default function ProfileHeader() {
  return (
    <div className="text-center mb-8">
      <Image
        src="/images/coma-logo.png"
        alt="COMA 로고"
        width={200}
        height={200}
        className="mx-auto mb-4"
        priority
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
        COMA
      </h1>
      <p className="text-base md:text-lg text-gray-700 mb-1">
        순천대학교 코딩동아리
      </p>
      <p
        className="text-lg md:text-xl font-semibold mb-6"
        style={{ color: "#68e1fe" }}
      >
        CODING MASTER
      </p>
    </div>
  );
}
