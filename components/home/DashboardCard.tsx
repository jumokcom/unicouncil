/**
 * 역할: 대시보드 카드 컴포넌트
 * 연결: components/home/DashboardGrid.tsx에서 사용
 * 기능: 재사용 가능한 카드 UI
 */

'use client';

interface DashboardCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function DashboardCard({ icon, title, description, onClick }: DashboardCardProps) {
  return (
    <div 
      className={`bg-white rounded-lg p-4 shadow ${
        onClick ? 'hover:shadow-md transition-shadow cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <h3 className="font-semibold text-gray-800 mb-2">
        {icon} {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
