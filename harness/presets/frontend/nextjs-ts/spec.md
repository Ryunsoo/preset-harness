# nextjs-ts 프리셋

> **영역**: Frontend
> **버전**: 0.1.0
> **기준일**: 2026-04-21

---

## 1. 개요

Next.js 15+ App Router / TypeScript / React Server Components·Server Actions 기반. SEO·초기 렌더 성능이 중요한 웹 앱, 정적·동적 하이브리드에 적합.

## 2. 제공하는 것 (Included)

| 범주 | 선택 |
|---|---|
| 언어 | TypeScript 5+ (strict) |
| 프레임워크 | Next.js 15+ (App Router) |
| 렌더링 | RSC 기본 / 'use client' 명시 / Server Actions |
| 패키지 매니저 | pnpm |
| Client state | Zustand |
| Server state | TanStack Query v5 (클라이언트 컴포넌트 한정) |
| Form state | React Hook Form + Zod |
| 스타일링 | Tailwind CSS |
| 린트 | ESLint (`next/core-web-vitals`, `@typescript-eslint`) |
| 포맷 | Prettier |
| 테스트 | Vitest / React Testing Library / Playwright |

## 3. 전제 조건

- Node.js 22+
- pnpm 9+
- 배포 타겟: Vercel 또는 Node 서버 셀프호스트

## 4. 적합한 경우

- SEO·OG·마케팅 페이지가 중요한 앱
- 정적·동적 하이브리드 (ISR/SSR/SSG 혼합)
- 인증 보호 페이지 + 공개 페이지 공존

## 5. 부적합한 경우

- 순수 내부 대시보드·관리자 도구 → `react-ts` 권장 (Vite 쪽이 빌드·개발 속도 우위)
- 완전 정적 사이트 → Astro/11ty 등 경량 SSG 고려

## 6. 관련 파일

- [`conventions.json`](./conventions.json)
- [`structure.md`](./structure.md)
- [`examples/`](./examples/)

## 7. 변경 이력

| 날짜 | 버전 | 변경 | 작성자 |
|---|---|---|---|
| 2026-04-21 | 0.1.0 | 초안 작성 (D-2) | |
