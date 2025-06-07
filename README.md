# UniCouncils

University Council Management System

## 프로젝트 초기 설정

### 1. 빈 폴더에 Next.js 설치

```bash
# 빈 폴더에서 Next.js 프로젝트 생성
npx create-next-app@latest . --typescript --tailwind --eslint --app

# 추가 패키지 설치
npm install @supabase/supabase-js react-hook-form zod @hookform/resolvers
```

### 2. 프로젝트 구조 생성

```
project/
├── app/                    # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx         # 전체 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── login/page.tsx     # OAuth 로그인
│   ├── about/page.tsx     # 동아리 소개
│   ├── dashboard/page.tsx # 대시보드 (RLS로 권한 제어)
│   ├── members/page.tsx   # 부원 관리
│   ├── accounts/page.tsx  # 계정 공유
│   ├── albums/            # 활동 앨범 (Storage 활용)
│   ├── applications/      # 신규 부원 신청
│   ├── calendar/page.tsx  # 일정 캘린더
│   ├── room-status/page.tsx # 동아리방 사용 현황
│   └── admin/             # 관리자 (RLS로 권한 제어)
├── components/
│   ├── ui/                # shadcn/ui 컴포넌트
│   └── layout/            # 레이아웃 (인증 가드 포함)
├── lib/
│   ├── supabase.ts        # Supabase 클라이언트
│   └── utils.ts           # cn 함수 등 최소 유틸리티
├── types/
│   └── database.types.ts  # Supabase 자동 생성 타입
├── schemas/               # 최소한의 폼 검증만
│   └── application.ts     # 신청서 검증
├── constants/             # 라우트, 권한 상수
│   ├── routes.ts
│   └── roles.ts
└── utils/                 # 최소한의 유틸리티만
```

### 3. Supabase 설정

#### `lib/supabase.ts` 생성
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### `.env.local` 생성
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. GitHub 레포지토리 연결

```bash
# Git 초기화 (create-next-app이 자동으로 함)
git add .
git commit -m "Initial Next.js setup with Supabase"

# GitHub 레포지토리 연결
git remote add origin [레포지토리-URL]
git branch -M main
git push -u origin main
```

### 5. Vercel 배포

1. **Vercel 접속**: https://vercel.com
2. **GitHub 로그인**: "Continue with GitHub"
3. **프로젝트 가져오기**: "New Project" → 레포지토리 선택
4. **환경변수 설정**:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [Supabase URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [Supabase Anon Key]
   ```
5. **Deploy 클릭**

### 6. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

## 기술 스택

- **언어**: TypeScript
- **프레임워크**: Next.js (App Router)
- **스타일링**: Tailwind CSS
- **데이터베이스**: Supabase
- **폼 처리**: React Hook Form + Zod
- **배포**: Vercel

## 🎯 프로젝트 목표
**동아리 관리 시스템을 통한 Supabase 마스터하기**

### 주요 기능
1. **로그인** (OAuth)
2. **부원 정보 관리** (CRUD + RLS)
3. **동아리 소개** (정적 페이지)
4. **간부 조직도** (Database 조회)
5. **부원 정리** (Database + 권한)
6. **계정 공유** (Database + 보안)
7. **활동 앨범** (Storage + Database)
8. **신규 부원 신청** (폼 + Database)
9. **관리자 페이지** (RLS + 권한 관리)
10. **권한 시스템** (게스트/부원/간부/관리자)
11. **일정 캘린더** (개강총회, 행사, 종강총회, 스터디 - Database + Realtime)
12. **동아리방 사용 현황** (예약 시스템 - Database + RLS + Realtime)

## 개발 규칙

- 한 파일 = 한 기능
- UI 컴포넌트: 100줄 내외
- 폼/페이지 컴포넌트: 200줄 내외
- 복잡한 로직은 Supabase로 해결
- 타입 안전성 우선
- Supabase 기능 최대 활용
