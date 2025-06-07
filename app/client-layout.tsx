/**
 * 역할: 클라이언트 레이아웃 컴포넌트 - pathname 기반 조건부 레이아웃
 * 연결: app/layout.tsx에서 사용
 * 의존성: Next.js usePathname hook
 * 기능: 특정 페이지는 레이아웃 제외 (로그인 등)
 */
'use client'
import { usePathname } from 'next/navigation'

// 레이아웃을 적용하지 않을 페이지들
const excludeLayoutPaths = ['/login']

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const shouldExcludeLayout = excludeLayoutPaths.includes(pathname)

  // 로그인 페이지는 레이아웃 없이 children만 렌더링
  if (shouldExcludeLayout) {
    return <>{children}</>
  }

  // 일반 페이지들은 기존 레이아웃 적용
  return (
    <>
      {/* 모바일 레이아웃 (md 미만) */}
      <div className="md:hidden h-screen w-screen flex flex-col">
        {/* 모바일 헤더: 12% */}
        <header className="h-[12vh] bg-blue-600 text-white flex items-center px-4 border-b border-blue-700">
          <h1 className="text-lg font-bold">동아리 관리</h1>
          <button className="ml-auto text-xl">☰</button>
        </header>
        
        {/* 모바일 메인: 88% + 스크롤 */}
        <main className="h-[88vh] overflow-auto bg-gray-50">
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>

      {/* PC 레이아웃 (md 이상) */}
      <div className="hidden md:flex h-screen w-screen">
        {/* 사이드바: 18% */}
        <aside className="w-[18vw] h-full bg-gray-100 border-r border-gray-300">
          <div className="p-4 border-b border-gray-300">
            <h1 className="text-xl font-bold text-gray-800">동아리 관리</h1>
          </div>
          <nav className="p-4">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="p-2 bg-blue-100 rounded">대시보드</div>
              <div className="p-2 hover:bg-gray-200 rounded">부원 관리</div>
              <div className="p-2 hover:bg-gray-200 rounded">일정 캘린더</div>
              <div className="p-2 hover:bg-gray-200 rounded">동아리방</div>
              <div className="p-2 hover:bg-gray-200 rounded">활동 앨범</div>
              <div className="p-2 hover:bg-gray-200 rounded">계정 공유</div>
              <div className="p-2 hover:bg-gray-200 rounded">신규 신청</div>
            </div>
          </nav>
        </aside>
        
        {/* 메인 영역: 82% */}
        <div className="w-[82vw] h-full flex flex-col">
          {/* PC 헤더: 10% */}
          <header className="h-[10vh] bg-white border-b border-gray-300 flex items-center px-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-800">대시보드</h2>
              <span className="text-sm text-gray-500">/ 홈</span>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-800">알림</button>
              <button className="text-sm text-gray-600 hover:text-gray-800">프로필</button>
            </div>
          </header>
          
          {/* PC 메인: 90% + 스크롤 */}
          <main className="h-[90vh] overflow-auto bg-gray-50">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
