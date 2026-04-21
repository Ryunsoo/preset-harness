# spring-boot 프리셋

> **영역**: Backend
> **버전**: 0.1.0
> **기준일**: 2026-04-21

---

## 1. 개요

Spring Boot 3.3+ / Java 21 / Gradle / JPA 기반 엔터프라이즈 백엔드 프리셋. 트랜잭션·규제 대응·성숙한 생태계가 중요한 환경에 적합.

## 2. 제공하는 것 (Included)

| 범주 | 선택 |
|---|---|
| 언어 | Java 21 (virtual threads 활용) |
| 프레임워크 | Spring Boot 3.3+ |
| 빌드 도구 | Gradle 8 (Kotlin DSL) |
| ORM | Spring Data JPA + Hibernate |
| 검증 | Jakarta Validation |
| 문서화 | springdoc-openapi |
| 관측성 | Spring Actuator + Micrometer |
| 로깅 | Logback (JSON 구조화) |
| 테스트 | JUnit 5 + Mockito + Testcontainers (DB 통합) |
| 커버리지 | JaCoCo |

## 3. 전제 조건

- Java 21 JDK
- Gradle 8.5+
- Docker (Testcontainers 통합 테스트용)

## 4. 적합한 경우

- 복잡한 트랜잭션·도메인 로직
- 규제 요구(금융·의료·공공) 대응
- 대규모 팀·장기 유지보수

## 5. 부적합한 경우

- 단순 CRUD·빠른 프로토타이핑 → `node-express` 권장
- 실시간·스트리밍 주도 워크로드 → Reactor/WebFlux 기반 별도 프리셋 검토
- 서버리스 콜드스타트 민감 환경 → GraalVM native-image 별도 고려 필요

## 6. 관련 파일

- [`conventions.json`](./conventions.json)
- [`structure.md`](./structure.md)
- [`examples/`](./examples/)

## 7. 변경 이력

| 날짜 | 버전 | 변경 | 작성자 |
|---|---|---|---|
| 2026-04-21 | 0.1.0 | 초안 작성 (D-2) | |
