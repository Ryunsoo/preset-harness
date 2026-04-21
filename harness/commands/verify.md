---
description: 검증 단계 실행 — verifier가 산출물 정합성·품질을 종합 판정하고 보완 지시를 생성합니다.
allowed-tools:
  - Task
  - Read
  - Bash
---

# /verify

**검증 단계 (단계 4)** 또는 단일 단계 재검증을 실행합니다.

## 호출 모드

- **기본**: 현재 단계의 산출물을 대상으로 종합 검증
- **인자 `<stage>`** (예: `/verify design`): 해당 단계를 명시 대상으로 검증

## 수행 절차

1. **대상 산출물 확인**
   - 인자로 단계가 지정되면 해당 단계 산출물만 대상
   - 인자 없으면 `current-stage.json`의 현재 단계 기준

2. **검증 에이전트 호출** (Task 도구, 모두 READ-ONLY)
   - 항상: `verifier`
   - 개발·테스트 단계 대상이면: `code-reviewer` 병렬 호출
   - `strict` 프로파일이면 추가: `security-reviewer` + `performance-analyzer` 병렬

3. **종합 판정**
   - 각 에이전트 리포트를 verifier가 종합 → `.preset-harness/state/verify-<stage>.json`
   - issues 리스트 + `nextAction` (`proceed` / `reenter` / `block`) 생성

4. **사용자 리포트 출력**
   - severity별 정리된 이슈 요약
   - Critical 이슈가 있으면 최상단 강조
   - `nextAction` 권고 + 근거

5. **후속 행동 안내**
   - `proceed` → 다음 단계 커맨드 안내
   - `reenter` → 해당 단계 커맨드 재실행 안내 (보완 지시 적용됨)
   - `block` → 반복 한도 초과. 사용자 개입 필요 사유 설명

## 제약

- 본 커맨드는 **파일을 수정하지 않음**. 모든 호출 에이전트는 READ-ONLY
- `minimal` 프로파일에서는 `nextAction: block` 설정 금지
- verifier 없이 reviewer만 단독 실행 금지 (판정 주체는 verifier)
