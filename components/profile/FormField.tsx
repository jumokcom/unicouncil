/**
 * 역할: 재사용 가능한 폼 필드 컴포넌트
 * 연결: components/profile/ProfileForm.tsx에서 사용
 * 기능: 텍스트/날짜/라디오 입력 필드 통합
 */

'use client';

interface FormFieldProps {
  label: string;
  type: 'text' | 'date' | 'tel' | 'radio';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  name?: string;
}

export default function FormField({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  options,
  name
}: FormFieldProps) {
  const baseInputClass = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (type === 'radio' && options) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && '*'}
        </label>
        <div className="flex space-x-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseInputClass}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
