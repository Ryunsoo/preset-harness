---
description: 테스트 단계 실행 — tester가 시나리오를 생성·실행하고 실패 시 개발 단계 재진입을 트리거합니다.
allowed-tools:
  - Task
  - Read
  - Write
  - Edit
  - Bash
---

# /test

**테스트 단계 (단계 5)** 를 실행합니다. 요구사항·설계 기반 테스트 케이스 생성 → 실행 → 리포트 → (실패 시) 개발 재진입.

## 수행 절차

1. **사전 점검**
   - `verify-dev.json`의 `pass: true` 확인. 미통과 시 `/verify` 선행 안내
   - `current-stage.json`에 `{ "stage": "test", "loopCount": 0 }` 기록

2. **tester 호출** (Task 도구)
   - `harness/agents/tester.md` 지시로 테스트 케이스·코드 생성
   - 프리셋의 `testing` 설정을 따라 도구·위치 결정
   - 생성된 테스트를 실행하고 결과 수집

3. **리포트 생성**
   - `docs/test/report-<timestamp>.md`에 결과 기록
   - 통과·실패·커버리지·스킵 케이스 구분

4. **실패 처리**
   - 실패 케이스가 있으면 `verifier`에게 넘겨 보완 지시 변환 요청
   - 보완 지시를 들고 개발 단계(`/develop`) 재진입 (루프 카운트 증가)
   - `loopCount >= maxLoop` 초과 시 중단

5. **통과 시 phase 커밋 제안** (git-master, `test: ...` 형식)

## 출력

- 통과/실패/커버리지 요약 (%)
- 실패 케이스 상위 N건 (재현 경로)
- 커버리지 미달 영역 (있으면)
- 다음 단계 안내 (전체 종료 또는 재진입)

## 제약

- 프리셋 `testing` 프레임워크만 사용 (임의 도구 추가 금지)
- 네트워크·외부 API는 모의/컨테이너로 대체
- 프로덕션 데이터 참조 금지
- 기존 통과 테스트를 근거 없이 skip 금지
