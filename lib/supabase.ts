/**
 * 역할: Supabase 클라이언트 설정 - 데이터베이스 연결 및 인증 관리
 * 연결: 전체 앱에서 데이터베이스 접근시 사용
 * 의존성: @supabase/supabase-js, .env.local 환경변수
 * 환경변수: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
