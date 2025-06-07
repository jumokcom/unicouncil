/**
 * 역할: 프로필 저장 버튼 컴포넌트
 * 연결: components/profile/ProfileFormContainer.tsx에서 사용
 * 기능: 프로필 저장 버튼 UI (로딩 상태 포함)
 */

interface ProfileSaveButtonProps {
  loading: boolean;
  disabled: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProfileSaveButton({ loading, disabled, onSubmit }: ProfileSaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onSubmit}
      className="w-full py-3 px-4 text-black font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform shadow-lg hover:shadow-xl border-2"
      style={{
        background: loading ? "#b2fff9" : "linear-gradient(to right, #68e1fe, #b2fff9)",
        borderColor: "#000000",
      }}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
          저장 중...
        </>
      ) : (
        '프로필 저장'
      )}
    </button>
  );
}
