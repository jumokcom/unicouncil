/**
 * 역할: 홈 페이지 - 크기 확인용 임시 콘텐츠
 * 연결: app/layout.tsx에서 기본 라우트
 * 목적: 레이아웃 비율 확인 및 스크롤 테스트
 */

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* 크기 확인용 제목 */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">동아리 관리 시스템</h1>
        <p className="text-gray-600">레이아웃 크기 확인용 페이지입니다.</p>
      </div>

      {/* 스크롤 확인용 카드들 */}
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold text-gray-800">카드 {i + 1}</h3>
          <p className="text-gray-600 mt-2">
            스크롤 테스트를 위한 콘텐츠입니다. 
            이 카드들이 많아지면 메인 영역에서 스크롤이 생깁니다.
          </p>
          <div className="mt-3 flex space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">태그1</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">태그2</span>
          </div>
        </div>
      ))}

      {/* 크기 정보 표시 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800">📏 레이아웃 크기 정보</h3>
        <div className="mt-2 text-sm text-yellow-700 space-y-1">
          <div><strong>모바일:</strong> 헤더 12vh + 메인 88vh</div>
          <div><strong>PC:</strong> 사이드바 18vw + (헤더 10vh + 메인 90vh)</div>
          <div><strong>분기점:</strong> md (768px)</div>
        </div>
      </div>
    </div>
  );
}
