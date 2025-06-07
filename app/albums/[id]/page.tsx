/**
 * 역할: 개별 앨범 상세 페이지 - 특정 앨범의 사진들 표시
 * 연결: app/albums/page.tsx에서 라우팅, app/albums/upload/page.tsx와 연동
 * 의존성: lib/supabase.ts, types/database.types.ts, components/ui
 * Supabase 기능: Database (album_photos 조회), Storage (이미지 로드)
 * 동적 라우팅: [id] 파라미터로 앨범 식별
 */

export default async function AlbumDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Next.js 15에서 params는 Promise로 변경됨
  const { id } = await params;
  
  // 개별 앨범 상세 구현 예정
  return (
    <div>
      <h1>Album Detail Page</h1>
      <p>Album ID: {id}</p>
    </div>
  )
}
