---
description: 분석 단계 실행 — analyst가 요구사항 문서를 작성·갱신하고 verifier가 판정합니다.
allowed-tools:
  - Task
  - Read
  - Write
  - Edit
  - Bash
---

# /analyze

**분석 단계 (단계 1)** 를 실행합니다. `docs/requirements/*.md`를 생성·갱신하고 verifier 판정을 통과할 때까지 루프.

## 수행 절차

1. **사전 점검**
   - `harness.config.json`이 없으면 `/init-harness` 선행을 안내하고 종료
   - `.preset-harness/state/current-stage.json`에 `{ "stage": "analysis", "loopCount": 0 }` 기록

2. **analyst 호출** (Task 도구)
   - `harness/agents/analyst.md` 지시 사항에 따라 요구사항 문서 생성·갱신
   - 입력: harness.config.json, 기존 docs/requirements/*, (있다면) verifier 보완 지시
   - 산출물: docs/requirements/*.md 생성/갱신 + 문서별 Change Log 업데이트

3. **verifier 호출** (Task 도구, READ-ONLY)
   - `harness/agents/verifier.md` 지시 사항으로 판정
   - 결과 JSON을 `.preset-harness/state/verify-analysis.json`에 저장

4. **루프 판정**
   - `pass: true` → 통과. 단계 완료 처리 후 다음 단계(`/design`) 안내
   - `pass: false` 이고 `loopCount < maxLoop` → 보완 지시를 들고 2번(analyst)으로 재진입
   - `loopCount >= maxLoop` → 중단. 사용자에게 보완 지시 리포트 제시 후 수동 개입 요청

5. **통과 시 phase 커밋 제안**
   - `git-master` 호출 (Task 도구). 사용자 승인 후 `docs: analysis stage 완료` 형태로 커밋

## 출력

- 루프 반복 횟수 및 판정 내역 요약
- 생성/갱신된 문서 목록
- 다음 단계 안내

## 제약

- 프로파일이 `minimal`이면 verifier 실패 시에도 자동 재진입하지 않음 (경고 리포트만)
- 사용자 승인 없이 커밋 실행 금지
- 루프 상태는 `.preset-harness/state/`에만 기록 (Git 추적 대상 아님)
