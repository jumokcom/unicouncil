/**
 * 역할: 환영 섹션 컴포넌트
 * 연결: components/home/HomePage.tsx에서 사용
 * 기능: 환영 메시지 및 개발 노트
 */

'use client';

export default function WelcomeSection() {
  return (
    <>
      {/* 환영 메시지 */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">환영합니다! 🎉</h1>
        <p className="text-gray-600">COMA 동아리 관리 시스템입니다.</p>
      </div>

      {/* 개발 노트 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800">🚧 개발 중</h3>
        <div className="mt-2 text-sm text-blue-700 space-y-1">
          <div>• 로그인 상태에 따른 조건부 렌더링 구현 예정</div>
          <div>• 로그인 전: 동아리 소개 및 홍보 페이지</div>
          <div>• 로그인 후: 개인 대시보드 (현재 화면)</div>
        </div>
      </div>
    </>
  );
}
