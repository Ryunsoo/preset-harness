---
description: phase 커밋 히스토리를 단계별로 정리해 보여줍니다.
allowed-tools:
  - Bash
  - Read
---

# /history

현재 프로젝트의 phase 커밋 히스토리를 단계별로 필터링해 보여줍니다.

## 수행 절차

1. Git 저장소 확인 (`git rev-parse --is-inside-work-tree`). 아니면 "Git 저장소 아님" 안내 후 종료
2. `git log`를 Conventional Commits 패턴으로 파싱
   - `docs(requirements): ...`, `docs(design): ...`, `feat(dev): ...`, `test: ...` 등
3. 단계별 그룹으로 묶어 시각화

## 출력 포맷

```
[phase 커밋 히스토리]

■ 분석 (analysis)
  2026-04-21 a1b2c3d  docs(requirements): initial overview/backend/database

■ 설계 (design)
  2026-04-21 d4e5f6a  docs(design): architecture v1
  2026-04-22 b7c8d9e  docs(design): ADR-003 반영

■ 개발 (dev)
  2026-04-22 1a2b3c4  feat(dev): user module 구현

■ 검증·테스트
  (아직 없음)
```

## 제약

- git log만 조회 (쓰기 없음)
- `--author`, `--since` 등 인자는 지원하지 않음 (단순화 목적, 필요하면 사용자가 직접 git 사용)
- 커밋이 100개 이상이면 최근 50개만 표시 후 "더 보려면 `git log` 사용" 안내
