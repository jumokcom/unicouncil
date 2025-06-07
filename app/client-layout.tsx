/**
 * 역할: 클라이언트 레이아웃 컴포넌트 - pathname 기반 조건부 레이아웃
 * 연결: app/layout.tsx에서 사용
 * 의존성: Next.js usePathname hook, Supabase Auth
 * 기능: 특정 페이지는 레이아웃 제외 (로그인 등), 로그인 상태에 따른 헤더 변경
 */
'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

// 레이아웃을 적용하지 않을 페이지들
const excludeLayoutPaths = ['/login', '/auth/callback']

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const shouldExcludeLayout = excludeLayoutPaths.includes(pathname)

  // 사용자 상태 확인
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 로그아웃 처리
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('로그아웃 오류:', error)
      alert('로그아웃 중 오류가 발생했습니다.')
    }
    // 로그아웃 후 메인 페이지에 그대로 머물기 (리다이렉트 없음)
  }

  // 페이지 이동 함수
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  // 로그인 페이지는 레이아웃 없이 children만 렌더링
  if (shouldExcludeLayout) {
    return <>{children}</>
  }

  // 사용자 상태별 헤더 버튼 컴포넌트
  const HeaderButtons = () => {
    if (loading) {
      return (
        <div className="ml-auto flex items-center space-x-4">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )
    }

    if (!user) {
      // 로그인하지 않은 상태
      return (
        <div className="ml-auto flex items-center space-x-4">
          <button 
            onClick={() => handleNavigation('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            로그인
          </button>
        </div>
      )
    }

    // 로그인한 상태
    return (
      <div className="ml-auto flex items-center space-x-4">
        <button 
          onClick={() => handleNavigation('/profile')}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          프로필
        </button>
        <button 
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-800"
        >
          로그아웃
        </button>
      </div>
    )
  }

  // 모바일 헤더 버튼 컴포넌트
  const MobileHeaderButtons = () => {
    if (loading) {
      return <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    }

    if (!user) {
      return (
        <button 
          onClick={() => handleNavigation('/login')}
          className="px-3 py-1 bg-white text-blue-600 rounded text-sm hover:bg-gray-100"
        >
          로그인
        </button>
      )
    }

    return (
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => handleNavigation('/profile')}
          className="text-white text-sm hover:text-gray-200"
        >
          프로필
        </button>
        <button 
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-200"
        >
          로그아웃
        </button>
      </div>
    )
  }

  // 일반 페이지들은 기존 레이아웃 적용
  return (
    <>
      {/* 모바일 레이아웃 (md 미만) */}
      <div className="md:hidden h-screen w-screen flex flex-col">
        {/* 모바일 헤더: 12% */}
        <header className="h-[12vh] bg-blue-600 text-white flex items-center px-4 border-b border-blue-700">
          <h1 className="text-lg font-bold">동아리 관리</h1>
          <div className="ml-auto">
            <MobileHeaderButtons />
          </div>
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
              <button 
                onClick={() => handleNavigation('/')}
                className="w-full text-left p-2 bg-blue-100 rounded hover:bg-blue-200"
              >
                홈
              </button>
              <button 
                onClick={() => handleNavigation('/members')}
                className="w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                부원 관리
              </button>
              <button 
                onClick={() => handleNavigation('/calendar')}
                className="w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                일정 캘린더
              </button>
              <button 
                onClick={() => handleNavigation('/room-status')}
                className="w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                동아리방
              </button>
              <button 
                onClick={() => handleNavigation('/albums')}
                className="w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                활동 앨범
              </button>
              <button 
                onClick={() => handleNavigation('/accounts')}
                className="w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                계정 공유
              </button>
              <button 
                onClick={() => handleNavigation('/applications')}
                className="w-full text-left p-2 hover:bg-gray-200 rounded"
              >
                신규 신청
              </button>
            </div>
          </nav>
        </aside>
        
        {/* 메인 영역: 82% */}
        <div className="w-[82vw] h-full flex flex-col">
          {/* PC 헤더: 10% */}
          <header className="h-[10vh] bg-white border-b border-gray-300 flex items-center px-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-800">홈</h2>
              <span className="text-sm text-gray-500">/ 홈</span>
            </div>
            <HeaderButtons />
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
