/**
 * 역할: 프로필 폼 컨테이너 컴포넌트
 * 연결: components/profile/ProfileForm.tsx에서 사용
 * 의존성: FormField.tsx, ProgressIndicator.tsx, useProfileForm.ts, ProfileActionButtons.tsx
 * 기능: 프로필 폼 UI 렌더링 (저장/취소 버튼 포함)
 */

'use client';
import { User } from '@supabase/supabase-js';
import FormField from './FormField';
import ProgressIndicator from './ProgressIndicator';
import ProfileActionButtons from './ProfileActionButtons';
import { useProfileForm } from './useProfileForm';

const genderOptions = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' }
];

interface ProfileFormContainerProps {
  user: User;
}

export default function ProfileFormContainer({ user }: ProfileFormContainerProps) {
  const {
    formData,
    loading,
    isProfileComplete,
    completedFieldsCount,
    handleSubmit,
    handleChange,
    handleCancel
  } = useProfileForm(user);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        프로필 정보 입력 (6개 필드)
      </h2>
      
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

        <ProfileActionButtons
          loading={loading}
          disabled={!isProfileComplete() || loading}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </form>
      
      <ProgressIndicator 
        completedFields={completedFieldsCount}
        totalFields={6}
        isComplete={isProfileComplete()}
      />
    </div>
  );
}
