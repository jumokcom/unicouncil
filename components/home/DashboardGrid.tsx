/**
 * 역할: 대시보드 그리드 컴포넌트
 * 연결: components/home/HomePage.tsx에서 사용
 * 의존성: components/home/DashboardCard.tsx
 * 기능: 대시보드 카드들 그리드 레이아웃
 */

'use client';
import { useRouter } from 'next/navigation';
import DashboardCard from './DashboardCard';

const dashboardItems = [
  {
    icon: '📋',
    title: '내 정보',
    description: '프로필 및 개인 설정',
    path: '/profile'
  },
  {
    icon: '📅',
    title: '다가오는 일정',
    description: '이번 주 동아리 활동',
    path: '/calendar'
  },
  {
    icon: '📢',
    title: '최근 공지',
    description: '새로운 소식 확인',
    path: '/'
  },
  {
    icon: '⚡',
    title: '빠른 작업',
    description: '자주 사용하는 기능',
    path: '/'
  },
  {
    icon: '👥',
    title: '동아리 현황',
    description: '부원 수 및 활동 통계',
    path: '/members'
  },
  {
    icon: '📸',
    title: '최근 앨범',
    description: '새로 업로드된 사진',
    path: '/albums'
  }
];

export default function DashboardGrid() {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardItems.map((item, index) => (
        <DashboardCard
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
          onClick={() => handleCardClick(item.path)}
        />
      ))}
    </div>
  );
}
