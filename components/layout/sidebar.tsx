/**
 * 역할: 사이드바 네비게이션 컴포넌트
 * 연결: components/layout/ClientLayout.tsx에서 사용
 * 의존성: Next.js router
 * 기능: 메뉴 항목 표시 및 페이지 이동
 */

'use client';

interface SidebarProps {
  onNavigate: (path: string) => void;
}

const menuItems = [
  { path: '/', label: '홈', active: true },
  { path: '/members', label: '부원 관리' },
  { path: '/calendar', label: '일정 캘린더' },
  { path: '/room-status', label: '동아리방' },
  { path: '/albums', label: '활동 앨범' },
  { path: '/accounts', label: '계정 공유' },
  { path: '/applications', label: '신규 신청' }
];

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="w-[18vw] h-full bg-gray-100 border-r border-gray-300">
      <div className="p-4 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-800">동아리 관리</h1>
      </div>
      <nav className="p-4">
        <div className="space-y-2 text-sm text-gray-600">
          {menuItems.map((item) => (
            <button 
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full text-left p-2 rounded ${
                item.active 
                  ? 'bg-blue-100 hover:bg-blue-200' 
                  : 'hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}
