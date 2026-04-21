# postgresql 프리셋

> **영역**: Database
> **버전**: 0.1.0
> **기준일**: 2026-04-21

---

## 1. 개요

PostgreSQL 16+ 기반 RDBMS 프리셋. 풍부한 데이터 타입·JSONB·파티셔닝·고급 인덱스가 필요한 경우, 또는 일반 용도 기본 선택으로 적합.

## 2. 제공하는 것 (Included)

| 범주 | 선택 |
|---|---|
| DB 엔진 | PostgreSQL 16+ |
| 인코딩 | UTF8 |
| 타임존 | UTC 저장, 응용 레이어에서 변환 |
| 네이밍 | snake_case 일괄 |
| ID 전략 | `bigint generated always as identity` 기본, 필요 시 `uuid` |
| 타임스탬프 | `created_at`, `updated_at` (timestamptz, NOT NULL) |
| 마이그레이션 | Flyway 또는 Prisma Migrate (application 프리셋에 따라 선택) |
| 백업 기본값 | 일 1회 스냅샷, 30일 보관 |

## 3. 전제 조건

- PostgreSQL 16+ 인스턴스 (관리형 또는 셀프호스트)
- 마이그레이션 도구는 backend 프리셋에 맞춰 선택: Java계열 → Flyway, Node계열 → Prisma Migrate

## 4. 적합한 경우

- 트랜잭션·복합 쿼리·집계가 많은 서비스
- JSONB·전문 검색(tsvector)·지리정보(PostGIS) 필요
- 제약 조건(FK, CHECK)을 엄격히 적용하려는 팀

## 5. 부적합한 경우

- 매우 단순한 키-값 저장소 → Redis/Dynamo 고려
- 이벤트 로그·시계열 대량 ingest → TimescaleDB/ClickHouse 등 검토
- OLAP 중심 분석 워크로드 → 별도 데이터웨어하우스 필요

## 6. 관련 파일

- [`conventions.json`](./conventions.json)
- [`structure.md`](./structure.md)
- [`examples/`](./examples/)

## 7. 변경 이력

| 날짜 | 버전 | 변경 | 작성자 |
|---|---|---|---|
| 2026-04-21 | 0.1.0 | 초안 작성 (D-2) | |
