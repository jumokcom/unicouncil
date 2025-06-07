/**
 * 역할: 프로필 완성 여부 체크 유틸리티
 * 연결: components/auth/OAuthHandler.tsx, LoginForm.tsx에서 사용
 * 의존성: lib/supabase.ts
 * Supabase 기능: Database (프로필 정보 조회)
 */

import { supabase } from '@/lib/supabase';

export interface ProfileData {
  name?: string;
  department?: string;
  student_id?: string;
  birth_date?: string;
  phone?: string;
  gender?: 'male' | 'female';
}

// 프로필 완성 여부 체크 함수
export const checkProfileComplete = (profile: ProfileData | null): boolean => {
  return !!(
    profile?.name && 
    profile?.department && 
    profile?.student_id && 
    profile?.birth_date && 
    profile?.phone && 
    profile?.gender
  );
};

// 사용자 프로필 조회 함수
export const getUserProfile = async (userId: string): Promise<ProfileData | null> => {
  try {
    const { data: profile, error } = await supabase
      .from('users')
      .select('name, department, student_id, birth_date, phone, gender')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('프로필 조회 오류:', error);
      throw error;
    }

    return profile;
  } catch (error) {
    console.error('getUserProfile 오류:', error);
    return null;
  }
};

// 프로필 완성 체크 및 리다이렉트 결정
export const getRedirectPath = async (userId: string): Promise<string> => {
  const profile = await getUserProfile(userId);
  
  if (!profile || !checkProfileComplete(profile)) {
    return '/profile'; // 프로필 미완성
  }
  
  return '/'; // 홈으로
};
