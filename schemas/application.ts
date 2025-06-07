/**
 * 역할: 신규 부원 신청 폼 검증 스키마 - Zod를 사용한 입력값 검증
 * 연결: app/applications/new/page.tsx에서 폼 검증시 사용
 * 의존성: Zod 라이브러리, React Hook Form
 * 검증 항목: 이름, 학과, 학번, 전화번호, 지원동기 등
 */

import { z } from 'zod'

export const applicationSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 2글자 이상이어야 합니다')
    .max(10, '이름은 10글자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z\s]+$/, '이름은 한글, 영문만 입력 가능합니다'),
  
  department: z
    .string()
    .min(1, '학과를 선택하세요')
    .max(50, '학과명이 너무 깁니다'),
  
  studentId: z
    .string()
    .regex(/^\d{8,10}$/, '학번은 8-10자리 숫자여야 합니다'),
  
  phone: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '전화번호 형식: 010-0000-0000'),
  
  email: z
    .string()
    .email('올바른 이메일 형식을 입력하세요')
    .optional(),
  
  motivation: z
    .string()
    .min(50, '지원동기는 50글자 이상 작성해주세요')
    .max(1000, '지원동기는 1000글자 이하로 작성해주세요'),
  
  experience: z
    .string()
    .max(500, '경험은 500글자 이하로 작성해주세요')
    .optional(),
  
  agreeToTerms: z
    .boolean()
    .refine(value => value === true, '개인정보 수집 동의는 필수입니다')
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

// 부서별 선택 옵션
export const DEPARTMENTS = [
  '컴퓨터공학과',
  '소프트웨어학과', 
  '정보통신공학과',
  '전자공학과',
  '기계공학과',
  '기타'
] as const
