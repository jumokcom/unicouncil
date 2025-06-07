/**
 * 역할: 프로필 입력 폼 컴포넌트
 * 연결: app/profile/page.tsx에서 사용
 * 의존성: components/profile/FormField.tsx, ProgressIndicator.tsx
 * Supabase 기능: Auth (사용자 확인), Database (프로필 CRUD)
 */

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import FormField from './FormField';
import ProgressIndicator from './ProgressIndicator';

interface FormData {
  name: string;
  department: string;
  student_id: string;
  birth_date: string;
  phone: string;
  gender: 'male' | 'female' | '';
}

const genderOptions = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' }
];

export default function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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

  // 현재 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      
      // 기존 프로필 데이터 로드
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
    
    loadUser();
  }, [router]);

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
          id: user?.id,
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          프로필 정보 입력 (6개 필드)
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="이름"
            type="text"
            value={formData.name}
            onChange={(value) => handleChange('name', value)}
            placeholder="이름을 입력하세요"
            required
          />

          <FormField
            label="학과"
            type="text"
            value={formData.department}
            onChange={(value) => handleChange('department', value)}
            placeholder="학과를 입력하세요"
            required
          />

          <FormField
            label="학번"
            type="text"
            value={formData.student_id}
            onChange={(value) => handleChange('student_id', value)}
            placeholder="학번을 입력하세요"
            required
          />

          <FormField
            label="생년월일"
            type="date"
            value={formData.birth_date}
            onChange={(value) => handleChange('birth_date', value)}
            required
          />

          <FormField
            label="전화번호"
            type="tel"
            value={formData.phone}
            onChange={(value) => handleChange('phone', value)}
            placeholder="010-0000-0000"
            required
          />

          <FormField
            label="성별"
            type="radio"
            value={formData.gender}
            onChange={(value) => handleChange('gender', value)}
            options={genderOptions}
            name="gender"
            required
          />

          <button
            type="submit"
            disabled={!isProfileComplete() || loading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '저장 중...' : '프로필 저장'}
          </button>
        </form>
        
        <ProgressIndicator 
          completedFields={completedFieldsCount}
          totalFields={6}
          isComplete={isProfileComplete()}
        />
      </div>
    </div>
  );
}
