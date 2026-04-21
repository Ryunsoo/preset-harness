---
doc_type: database
version: 0.1.0
status: draft
client: "<client 이름>"
author: "<FDE 이름>"
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
required_sections:
  - DB 타입·선택 프리셋
  - 데이터 보존 요구
  - 예상 규모
  - 멀티 리전·가용성
approval:
  by: ""
  at: ""
---

> **FDE 입력 영역**
>
> 본 문서는 FDE/client가 합의할 **입력**만 기재합니다.
> 네이밍 컨벤션·마이그레이션 규칙·백업 기본값은 선택한 프리셋
> (`harness/presets/database/<preset>/`)에 사전 정의되며,
> ER·테이블·인덱스는 설계 단계에서 overview.md 기능과 backend.md 도메인 기반으로
> 에이전트가 자동 설계합니다.

# DB 타입·선택 프리셋

- 프리셋: `<postgresql | mysql | ...>`
- 근거:

## 데이터 보존 요구

> 규제·업무상 데이터 보관 요구사항.

- 보관 기간:
- 삭제 / 익명화 정책:
- 감사 로그 요구:

## 예상 규모

> 초기·1년 후 예상 데이터 크기, 일일 트랜잭션, 동시 접속.

## 멀티 리전·가용성

> 리전 요구, 백업 RPO / RTO, DR 요구.

---

## 변경 이력 (Change Log)

| 날짜 | 버전 | 변경 내용 | 작성자 |
|---|---|---|---|
