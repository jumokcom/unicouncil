/**
 * 역할: 프로필 폼 훅 - 프로필 데이터 로직 분리
 * 연결: components/profile/ProfileFormContainer.tsx에서 사용
 * Supabase 기능: Database (프로필 CRUD)
 * 기능: 프로필 데이터 로드, 저장, 상태 관리
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface FormData {
  name: string;
  department: string;
  student_id: string;
  birth_date: string;
  phone: string;
  gender: 'male' | 'female' | '';
}

export function useProfileForm(user: User) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    department: '',
    student_id: '',
    birth_date: '',
    phone: '',
    gender: ''
  });
  const router = useRouter();

  // 프로필 완성 여부 체크
  const isProfileComplete = (): boolean => {
    return !!(formData.name && 
           formData.department && 
           formData.student_id && 
           formData.birth_date && 
           formData.phone && 
           formData.gender);
  };

  const completedFieldsCount = Object.values(formData).filter(Boolean).length;

  // 기존 프로필 데이터 로드
  useEffect(() => {
    const loadProfile = async () => {
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (profile) {
        setFormData({
          name: profile.name || '',
          department: profile.department || '',
          student_id: profile.student_id || '',
          birth_date: profile.birth_date || '',
          phone: profile.phone || '',
          gender: profile.gender || ''
        });
      }
    };
    
    loadProfile();
  }, [user.id]);

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isProfileComplete()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString()
        });
        
      if (error) {
        console.error('프로필 저장 오류:', error);
        alert('프로필 저장 중 오류가 발생했습니다.');
        return;
      }
      
      alert('프로필이 저장되었습니다!');
      router.push('/');
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 입력 값 변경 처리
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 취소 처리 (메인 페이지로 이동)
  const handleCancel = () => {
    router.push('/');
  };

  return {
    formData,
    loading,
    isProfileComplete,
    completedFieldsCount,
    handleSubmit,
    handleChange,
    handleCancel
  };
}
