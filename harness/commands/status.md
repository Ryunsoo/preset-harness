---
description: 현재 단계·루프 진행 상황·프리셋 구성을 한눈에 표시합니다.
allowed-tools:
  - Read
  - Bash
---

# /status

현재 프로젝트의 하네스 상태를 조회합니다.

## 수행 절차

1. `harness.config.json` 로드 (없으면 "하네스 초기화 안 됨" 안내)
2. `.preset-harness/state/current-stage.json` 로드 (없으면 "진행 시작 전" 안내)
3. `.preset-harness/state/verify-<stage>.json` 최근 파일 확인

## 출력 포맷

```
[프리셋 하네스 상태]

프로젝트    <이름>
client     <이름>
프로파일   standard
프리셋     FE: react-ts | BE: node-express | DB: postgresql | Design: minimal

[단계 진행]
  1. 분석    PASS (loop 1/3)
  2. 설계    PASS (loop 2/3)
  3. 개발    IN PROGRESS (loop 1/3, verifier 미통과)
  4. 검증    -
  5. 테스트  -

[최근 검증]
  verify-dev.json: 2 errors, 3 warnings → reenter 권고

다음 권장 커맨드: /develop (보완 지시 적용)
```

## 제약

- 파일 수정하지 않음 (read-only)
- 상태 파일이 없는 단계는 `-`로 표시
