/**
 * 역할: UI 컴포넌트 인덱스 - shadcn/ui 기반 재사용 가능한 UI 컴포넌트들의 진입점
 * 연결: 모든 페이지와 컴포넌트에서 import으로 사용
 * 의존성: Tailwind CSS, Radix UI, utils/index.ts의 cn 함수
 * 포함: Button, Card, Input, Modal 등 기본 UI 요소들
 */

// shadcn/ui 컴포넌트들을 이곳에서 export
export { Button } from './button'
export { Card, CardHeader, CardContent, CardFooter } from './card'
export { Input } from './input'
export { Modal, ModalContent, ModalHeader, ModalFooter } from './modal'
