/**
 * 역할: PostCSS 설정 파일 - Tailwind CSS 처리를 위한 CSS 전처리기 설정
 * 연결: app/globals.css 및 모든 CSS 파일 처리
 * 의존성: @tailwindcss/postcss 플러그인
 */
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
