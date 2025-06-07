/**
 * 역할: 홈 페이지 - 로그인 상태에 따라 다른 화면 제공
 * 연결: app/layout.tsx에서 기본 라우트, app/login/page.tsx에서 로그인 후 리다이렉트
 * 기능: 로그인 전 - 동아리 소개 및 홍보, 로그인 후 - 개인 대시보드
 * Supabase 기능: Auth (로그인 상태 확인)
 */

'use client';

export default function HomePage() {
  // TODO: 로그인 상태 확인 후 조건부 렌더링 구현
  // 현재는 임시 대시보드 콘텐츠로 표시
  
  return (
    <div className="space-y-6">
      {/* 환영 메시지 */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">환영합니다! 🎉</h1>
        <p className="text-gray-600">COMA 동아리 관리 시스템입니다.</p>
      </div>

      {/* 임시 대시보드 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 내 정보 */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">📋 내 정보</h3>
          <p className="text-gray-600 text-sm">프로필 및 개인 설정</p>
        </div>
        
        {/* 최근 일정 */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">📅 다가오는 일정</h3>
          <p className="text-gray-600 text-sm">이번 주 동아리 활동</p>
        </div>
        
        {/* 최근 공지 */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">📢 최근 공지</h3>
          <p className="text-gray-600 text-sm">새로운 소식 확인</p>
        </div>
        
        {/* 빠른 액션 */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">⚡ 빠른 작업</h3>
          <p className="text-gray-600 text-sm">자주 사용하는 기능</p>
        </div>
        
        {/* 동아리 현황 */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">👥 동아리 현황</h3>
          <p className="text-gray-600 text-sm">부원 수 및 활동 통계</p>
        </div>
        
        {/* 최근 앨범 */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">📸 최근 앨범</h3>
          <p className="text-gray-600 text-sm">새로 업로드된 사진</p>
        </div>
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
    </div>
  );
}
