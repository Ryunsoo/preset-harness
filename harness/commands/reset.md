---
description: 하네스 진행 상태(.preset-harness/)를 초기화합니다. 사용자 명시 승인 필수.
allowed-tools:
  - AskUserQuestion
  - Bash
  - Read
---

# /reset

하네스의 **런타임 상태**를 초기화합니다. `docs/`와 소스 코드는 건드리지 않으며 `.preset-harness/` 하위만 삭제합니다.

## 수행 절차

1. **현황 요약 출력**
   - 현재 단계·루프·최근 검증 결과를 `/status` 로직으로 표시

2. **확인 질문** (AskUserQuestion, 3-옵션)
   - `상태만 초기화 (state/)` — 루프 카운트·단계 포인터 삭제
   - `전체 초기화 (.preset-harness/ 전체)` — plans/, logs/, state/, artifacts/ 모두 삭제
   - `취소`

3. **실행**
   - 선택에 따라 해당 경로만 `rm -rf`
   - `.gitignore` 덕분에 Git에는 영향 없음

4. **확인 출력**
   - 삭제된 경로 목록
   - 다음 권장 커맨드 (`/status` 또는 `/analyze`)

## 제약

- **`docs/`·소스 코드·`harness/`·`harness.config.json`은 절대 삭제하지 않음**
- 사용자 명시 승인 없이 실행 금지
- 진행 중인 Task(서브에이전트)가 있으면 먼저 종료 권고
