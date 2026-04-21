# node-express 프리셋

> **영역**: Backend
> **버전**: 0.1.0
> **기준일**: 2026-04-21

---

## 1. 개요

Node.js 22+ / TypeScript / Express 5 / Prisma ORM 기반 경량 백엔드 프리셋. 빠른 개발·중간 규모 API 서비스에 적합.

## 2. 제공하는 것 (Included)

| 범주 | 선택 |
|---|---|
| 런타임·언어 | Node.js 22+ / TypeScript 5 strict |
| 프레임워크 | Express 5 |
| 패키지 매니저 | pnpm 9 |
| ORM | Prisma |
| 검증 | Zod |
| 인증 기본 | JWT (jose) |
| 로깅 | pino (JSON 구조화) |
| 관측성 | OpenTelemetry (HTTP·DB 자동 계측) |
| 린트·포맷 | ESLint + Prettier |
| 테스트 | Vitest + supertest (통합) + Testcontainers (DB) |
| 프로세스 관리 | pm2 또는 컨테이너 (환경에 따라) |

## 3. 전제 조건

- Node.js 22+, pnpm 9+
- Docker (통합 테스트·로컬 DB)
- 대상 DB 프리셋 선택 필요 (`postgresql` 권장)

## 4. 적합한 경우

- 중간 규모 API·BFF
- FE와 언어 공유(TS)로 팀 이동성 필요
- 빠른 프로토타이핑, 스타트업 초중기

## 5. 부적합한 경우

- 매우 무거운 트랜잭션·도메인 로직 → `spring-boot` 권장
- 고성능 이벤트 처리·스트리밍 → NestJS·Fastify·Rust 계열 검토

## 6. 관련 파일

- [`conventions.json`](./conventions.json)
- [`structure.md`](./structure.md)
- [`examples/`](./examples/)

## 7. 변경 이력

| 날짜 | 버전 | 변경 | 작성자 |
|---|---|---|---|
| 2026-04-21 | 0.1.0 | 초안 작성 (D-2) | |
