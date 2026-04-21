---
description: 개발 단계 실행 — frontend-dev, backend-dev, db-designer가 병렬로 코드를 구현합니다.
allowed-tools:
  - Task
  - Read
  - Write
  - Edit
  - Bash
---

# /develop

**개발 단계 (단계 3)** 를 실행합니다. `harness.config.json`에서 선택한 영역별 dev 에이전트를 병렬 호출하여 실제 코드를 생성합니다.

## 수행 절차

1. **사전 점검**
   - `verify-design.json`의 `pass: true` 확인. 미통과 시 `/design` 선행 안내
   - `current-stage.json`에 `{ "stage": "dev", "loopCount": 0 }` 기록
   - harness.config.json의 `presets`를 읽어 활성 영역 결정

2. **개발 에이전트 병렬 호출** (Task 도구)
   - 활성 영역별로 병렬 호출:
     - frontend → `frontend-dev`
     - backend → `backend-dev`
     - database → `db-designer`
   - 각 에이전트는 해당 프리셋의 structure.md·conventions.json 준수

3. **상호 계약 점검**
   - frontend ↔ backend: API 계약 일치 (architect의 api-spec.md 기준)
   - backend ↔ database: 엔티티-스키마 매핑 일치 (domain-model.md 기준)
   - 불일치 발견 시 verifier가 보완 지시 생성

4. **verifier + code-reviewer 호출** (동시, READ-ONLY)
   - strict 프로파일이면 추가로 `security-reviewer` + `performance-analyzer`도 병렬 호출
   - 모든 리포트를 verifier가 종합하여 최종 판정
   - 결과를 `.preset-harness/state/verify-dev.json`에 저장

5. **루프 판정**
   - 통과 → 다음 단계(`/test` 또는 `/verify`) 안내
   - 실패 → 보완 지시를 들고 해당 영역 에이전트 재진입 (최대 반복 횟수까지)

6. **통과 시 phase 커밋 제안** (git-master, `feat(dev): ...` 형식)

## 출력

- 생성된 코드 파일 수·위치 (영역별)
- API 계약 정합성 요약
- 검증 결과(성공/보완 지시 개수)
- 다음 단계 안내

## 제약

- 병렬은 `Task` 도구 내에서만. 프로세스 병렬 금지
- 여러 에이전트가 동일 파일을 동시에 수정하려 하면 경고 후 순차 처리
- 프리셋 네이밍/구조 위반은 반드시 루프 재진입 (strict는 즉시 block)
