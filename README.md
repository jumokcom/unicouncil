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
├── components/
│   ├── ui/                # 재사용 UI 컴포넌트
│   ├── forms/             # 폼 컴포넌트
│   └── layout/            # 레이아웃 컴포넌트
├── hooks/                 # 커스텀 훅
├── lib/                   # 라이브러리 설정
├── types/                 # TypeScript 타입
├── utils/                 # 유틸리티 함수
└── constants/             # 상수
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

## 개발 규칙

- 한 파일 = 한 기능
- UI 컴포넌트: 100줄 내외
- 폼/페이지 컴포넌트: 200줄 내외
- 복잡한 로직은 커스텀 훅으로 분리
- 타입 안전성 우선
