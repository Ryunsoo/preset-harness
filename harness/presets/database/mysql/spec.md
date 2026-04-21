# mysql 프리셋

> **영역**: Database
> **버전**: 0.1.0
> **기준일**: 2026-04-21

---

## 1. 개요

MySQL 8+ / InnoDB 기반 RDBMS 프리셋. 대중적 관리형 서비스(AWS RDS·Aurora MySQL)와의 호환성이 중요한 경우, 또는 기존 MySQL 운영 경험이 있는 팀에 적합.

## 2. 제공하는 것 (Included)

| 범주 | 선택 |
|---|---|
| DB 엔진 | MySQL 8+ / InnoDB |
| 문자셋 | `utf8mb4` / 콜레이션 `utf8mb4_0900_ai_ci` |
| 타임존 | UTC 저장, 응용 레이어에서 변환 |
| 네이밍 | snake_case 일괄 |
| ID 전략 | `bigint UNSIGNED AUTO_INCREMENT` 기본, 필요 시 UUID(BIN(16)) |
| 타임스탬프 | `created_at`, `updated_at` (DATETIME(6) NOT NULL) |
| 마이그레이션 | Flyway 또는 Prisma Migrate |
| 백업 기본값 | 일 1회 스냅샷, 30일 보관 |

## 3. 전제 조건

- MySQL 8.0+ 인스턴스
- `sql_mode` = `STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION` (프리셋 강제)
- 마이그레이션 도구는 backend 프리셋에 맞춰 선택

## 4. 적합한 경우

- 관리형 MySQL(RDS/Aurora) 기반 운영
- 기존 MySQL 데이터·운영 노하우 재사용
- 단순~중간 수준 트랜잭션 요구

## 5. 부적합한 경우

- JSONB·전문 검색·지리정보 등 고급 기능 필요 → `postgresql` 권장
- 체크 제약·배제 제약 등 엄격한 무결성 요구 → MySQL 8+도 CHECK는 있으나 제한적. postgresql 권장
- 대량 분석 쿼리 → OLAP 시스템 분리

## 6. 관련 파일

- [`conventions.json`](./conventions.json)
- [`structure.md`](./structure.md)
- [`examples/`](./examples/)

## 7. 변경 이력

| 날짜 | 버전 | 변경 | 작성자 |
|---|---|---|---|
| 2026-04-21 | 0.1.0 | 초안 작성 (D-2) | |
