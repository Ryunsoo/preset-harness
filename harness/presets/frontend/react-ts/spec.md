# react-ts 프리셋

> **영역**: Frontend
> **버전**: 0.1.0
> **기준일**: 2026-04-21

---

## 1. 개요

React 18+ / TypeScript / Vite 기반 SPA 프리셋. 별도 서버 렌더링 요구가 없는 일반적인 대시보드·관리자 페이지·웹 앱에 적합.

## 2. 제공하는 것 (Included)

| 범주 | 선택 |
|---|---|
| 언어 | TypeScript 5+ (strict) |
| UI 프레임워크 | React 18+ |
| 빌드 도구 | Vite 5+ |
| 패키지 매니저 | pnpm |
| 라우팅 | React Router 6 |
| Client state | Zustand |
| Server state | TanStack Query v5 |
| Form state | React Hook Form + Zod |
| HTTP 클라이언트 | fetch 래퍼 (`examples/api-client.ts`) |
| 스타일링 | CSS Modules (기본) / Tailwind (옵션) |
| 린트 | ESLint (typescript-eslint, react, react-hooks) |
| 포맷 | Prettier |
| 테스트 | Vitest (unit) / React Testing Library / Playwright (E2E) |

## 3. 전제 조건

- Node.js 22+
- pnpm 9+
- 최신 브라우저 (ES2022 이상)

## 4. 적합한 경우

- 독립 SPA가 필요한 웹 앱
- 관리자 페이지·대시보드
- SSR/SEO가 중요하지 않은 내부 도구

## 5. 부적합한 경우

- SEO·초기 렌더 성능이 중요한 마케팅 사이트 → `nextjs-ts` 권장
- 네이티브 앱 → React Native 프리셋 (추후 추가)
- 복잡한 폼·문서 편집기 중심 앱에서 Zustand만으로 부족할 수 있음 → 도메인 스토어 레이어 별도 설계 필요

## 6. 관련 파일

- [`conventions.json`](./conventions.json) — 린트·포맷·네이밍·라이브러리 선택
- [`structure.md`](./structure.md) — 권장 폴더 구조
- [`examples/`](./examples/) — 대표 컴포넌트·API 클라이언트 예시

## 7. 변경 이력

| 날짜 | 버전 | 변경 | 작성자 |
|---|---|---|---|
| 2026-04-21 | 0.1.0 | 초안 작성 (D-1 샘플 프리셋) | |
