/**
 * 역할: ESLint 설정 파일 - 코드 품질 및 스타일 가이드 설정
 * 연결: 전체 TypeScript/JavaScript 파일의 린팅 규칙 적용
 * 의존성: @eslint/eslintrc, Next.js ESLint 규칙
 */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
