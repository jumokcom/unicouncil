/**
 * 역할: 프로필 페이지 - 필수 정보 입력 및 개인정보 관리
 * 연결: app/login/page.tsx, app/auth/callback에서 프로필 미완성 시 리다이렉트
 * 의존성: lib/supabase.ts, Next.js router
 * Supabase 기능: Auth (현재 사용자 확인), Database (users 테이블 CRUD)
 * 기능: 5개 필수 필드 입력 (이름, 학과, 학번, 생년월일, 전화번호, 성별)
 * 완성 후: 홈("/")으로 자동 이동
 */

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface FormData {
  name: string;
  department: string;
  student_id: string;
  birth_date: string;
  phone: string;
  gender: 'male' | 'female' | '';
}

export default function ProfilePage() {
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

  // 프로필 완성 여부 체크 (이메일 제외, 5개 필드)
  const isProfileComplete = () => {
    return formData.name && 
           formData.department && 
           formData.student_id && 
           formData.birth_date && 
           formData.phone && 
           formData.gender;
  };

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
      router.push('/'); // 홈으로 이동
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
          프로필 정보 입력 (5개 필드)
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름 *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          {/* 학과 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              학과 *
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="학과를 입력하세요"
              required
            />
          </div>

          {/* 학번 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              학번 *
            </label>
            <input
              type="text"
              value={formData.student_id}
              onChange={(e) => handleChange('student_id', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="학번을 입력하세요"
              required
            />
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              생년월일 *
            </label>
            <input
              type="date"
              value={formData.birth_date}
              onChange={(e) => handleChange('birth_date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              전화번호 *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="010-0000-0000"
              required
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              성별 *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="mr-2"
                />
                남성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="mr-2"
                />
                여성
              </label>
            </div>
          </div>

          {/* 저장 버튼 */}
          <button
            type="submit"
            disabled={!isProfileComplete() || loading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '저장 중...' : '프로필 저장'}
          </button>
        </form>
        
        {/* 완성도 표시 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            프로필 완성도: {Object.values(formData).filter(Boolean).length}/5
          </p>
          {!isProfileComplete() && (
            <p className="text-sm text-red-600 mt-1">
              모든 필드를 입력해야 저장할 수 있습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
