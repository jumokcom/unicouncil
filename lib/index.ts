/**
 * 역할: 라이브러리 설정 인덱스 - 외부 서비스 및 라이브러리 설정의 진입점
 * 연결: 전체 애플리케이션에서 외부 서비스 접근시 사용
 * 의존성: 각종 외부 라이브러리 및 서비스
 * 포함: Supabase, 인증, 데이터베이스 타입 등
 */

// 라이브러리 설정들을 이곳에서 export
export { supabase } from './supabase';
// export type { Database } from './database.types';
