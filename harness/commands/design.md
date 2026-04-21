---
description: 설계 단계 실행 — architect + designer가 설계 산출물을 생성하고 verifier가 판정합니다.
allowed-tools:
  - Task
  - Read
  - Write
  - Edit
  - Bash
---

# /design

**설계 단계 (단계 2)** 를 실행합니다. architect와 designer를 (가능하면) 병렬 호출하여 `docs/design/` 산출물을 생성합니다.

## 수행 절차

1. **사전 점검**
   - 이전 단계(분석) 상태 확인: `docs/requirements/overview.md` 존재 + `verify-analysis.json`의 `pass: true`
   - 미통과 시 `/analyze` 선행 안내 후 종료
   - `current-stage.json`에 `{ "stage": "design", "loopCount": 0 }` 기록

2. **설계 에이전트 병렬 호출** (Task 도구, 병렬)
   - `architect` 호출: architecture.md / domain-model.md / api-spec.md / adr/
   - `designer` 호출 (design 영역이 선택됐을 때만): screens.md / components.md / tokens-applied.md
   - 두 산출물 간 크로스 참조 정합성 점검은 verifier가 판정

3. **verifier 호출**
   - 결과를 `.preset-harness/state/verify-design.json`에 저장

4. **루프 판정** (analyze와 동일)
   - 통과 시 다음 단계(`/develop`) 안내
   - 실패 + `loopCount < maxLoop` → 보완 지시를 들고 architect/designer 재진입
   - 한도 초과 시 중단

5. **통과 시 phase 커밋 제안** (git-master, `docs: design stage`)

## 출력

- 생성된 설계 문서 목록
- ADR 번호·제목
- 루프 반복 내역
- 다음 단계 안내

## 제약

- designer는 `docs/requirements/design.md`가 없으면 건너뜀 (경고 출력)
- architect와 designer가 서로의 산출물을 직접 수정하지 않음 (충돌은 verifier가 보완 지시로 중재)
