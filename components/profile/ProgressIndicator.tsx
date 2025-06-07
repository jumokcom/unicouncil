/**
 * 역할: 프로필 완성도 표시 컴포넌트
 * 연결: components/profile/ProfileForm.tsx에서 사용
 * 기능: 완성도 진행률 및 안내 메시지
 */

'use client';

interface ProgressIndicatorProps {
  completedFields: number;
  totalFields: number;
  isComplete: boolean;
}

export default function ProgressIndicator({ 
  completedFields, 
  totalFields, 
  isComplete 
}: ProgressIndicatorProps) {
  const progressPercentage = (completedFields / totalFields) * 100;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md">
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">
            프로필 완성도: {completedFields}/{totalFields}
          </p>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        {/* 진행률 바 */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {!isComplete && (
        <p className="text-sm text-red-600">
          모든 필드를 입력해야 저장할 수 있습니다.
        </p>
      )}
      
      {isComplete && (
        <p className="text-sm text-green-600">
          ✅ 모든 정보가 입력되었습니다!
        </p>
      )}
    </div>
  );
}
