# everything-claude-code (ECC) 벤치마킹 분석

> **성격**: 벤치마킹 참고용 분석. 우리 프로젝트가 반드시 따라야 할 정답이 아니며, 전략·패턴을 파악해 우리 방향성에 맞게 취사선택하기 위한 자료.
>
> **분석 일자**: 2026-04-21
> **원본 위치**: `C:\workspace\everything-claude-code\docs\ecc-strategic-analysis.md` (+ 하위 구현 디렉토리)
> **분석 기준 버전**: ECC `1.10.0`

---

## 1. 설계 철학 요약

ECC는 Claude Code **공식 플러그인 형태의 범용 하네스**로, **79 command × 48 agent × ~170 skill** 규모의 계층적 위임 구조를 가진다. 핵심은 **이벤트 기반 훅 자동화**(SessionStart → PreToolUse → PostToolUse → Stop)이며, **배치 최적화(Accumulator)**, **디스패처 패턴(다중 훅 단일 프로세스)**, **프로파일 게이팅(minimal/standard/strict)** 으로 오버헤드를 최소화한다. 라우팅은 명시적 트리거보다 **description 기반 의도 해석** 우선.

---

## 2. 주요 전략 카테고리별 핵심 패턴

### 에이전트 구조
- **오케스트레이터**(`planner`, `chief-of-staff`) + **48개 워커** (언어·도메인·테스트·리뷰 특화)
- 모델 구성: **Sonnet 45개, Opus 3개** (비용 최적화)
- 커맨드 → `Task` 위임 또는 description 기반 자동 라우팅
- 워크플로우: **직렬(feature-dev) 또는 병렬(code-review)** 선택 가능

### 플로우 / 파이프라인
- 사용자 커맨드 → 에이전트 순차/병렬 실행 → 검증 → Stop 훅 일괄 처리
- 각 단계 간 **수동 승인 게이트** (예: planner 확인 후 코드 작성)
- **루프는 `loop-operator` 에이전트가 상태 모니터링만 수행** — 반복 자동화 아님, 재진입은 사용자가 명령

### Command 체계
- 79개 slash command를 **9개 카테고리**로 구성 (Review / Build / Plan / Test / Orchestration / Skill / Harness / Utility / PRP)
- 각 커맨드: YAML frontmatter + Markdown 프롬프트
- 대부분 에이전트 위임 패턴, 일부(`harness-audit`, `doctor`)는 내부 스크립트도 호출

### Skill / Hook / Rule 활용
- **Skill (~170개)**: description 기반 자동 주입 — 언어 패턴 / 테스트 / 보안 / 도메인 수직
- **Hook (20+)**: 이벤트 매처별로 분산, 프로파일별 게이팅
- **Rule**: 언어별 정적 가이드라인, **CLAUDE.md 참조로 수동 설치** (자동 주입 아님)

### 문서화 / 산출물 관리
- `CLAUDE.md`가 세션별 진입점, 프로젝트 규칙 참조
- 설계서/분석서는 에이전트가 생성 후 세션 transcript로 저장 (`stop:session-end` 훅)
- 재사용 패턴은 `continuous-learning-v2` skill과 연동해 자동 추출
- Git commit은 conventional 기반, PR 생성 후 post-bash 훅이 리뷰 안내

### Git / 히스토리 전략
- **Pre-bash 훅**: `block-no-verify`, `commit-quality` — 커밋 메시지·스테이징 파일 lint·secret 탐지
- **Post-bash 훅**: PR 생성 감지 후 코드 리뷰 명령 자동 제안
- **Governance 모드**: `ECC_GOVERNANCE_CAPTURE=1`로 정책 위반 이벤트 기록

### 프리셋 / 컨벤션 제공 방식
- **설치 manifest** (typescript / python / golang 등)로 선택형 설치
- **언어 자동 감지**: marker 파일(`tsconfig.json`, `Cargo.toml`, `pyproject.toml` 등)
- **빌드 시스템 감지**: `package-manager.js`가 npm/pnpm/yarn/bun 자동 감지 후 `~/.claude/package-manager.json`에 캐시

### 컨텍스트 관리 전략
- **세션 영속화**: `session-start.js` 훅이 이전 상태 로드
- **Accumulator 패턴**: `post-edit-accumulator`가 Edit 누적 → Stop 훅에서 프로젝트 루트별로 그룹화 후 1회 처리 (50회 편집 시 50배 성능 이득)
- **MCP 헬스 체크**: pre/post 양쪽에서 불건강 서버 사전 차단
- **토큰 예산 관리**: `strategic-compact` skill 위주

---

## 3. 우리 프로젝트에 적용하면 좋을 요소 (Top 7)

| # | 요소 | 우리 방향성과의 매칭 |
|---|---|---|
| 1 | **Accumulator 배치 최적화** | Edit마다 포맷/타입체크하지 말고 Stop에서 변경 파일만 모아 1회 처리 → 단계별 검증 효율 극대화 |
| 2 | **디스패처 기반 훅 조합** | 다수 훅을 단일 디스패처가 내부 모듈 순차 실행 → 50~100ms 절감, 병렬 처리 오버헤드 방지 |
| 3 | **프로파일 게이팅 (minimal / standard / strict)** | 환경변수 1개로 검증 수준 조절 → **"선택형 프리셋"** 방향과 직결 |
| 4 | **Description 기반 자동 라우팅** | Skill/Agent 활성화를 description으로 결정 → 오케스트레이터 위임 편의성 |
| 5 | **Governance 모드 격리** | 기본은 자유, 필요 시에만 secret 유출/정책 캡처 활성화 → DX 해치지 않으면서 규정 준수 |
| 6 | **Meta Skills** (`skill-stocktake`, `skill-comply`, `rules-distill`) | 하네스 자체를 감시하는 자기 거버넌스 → 설계서 누락/테스트 실패 재진입의 근거 |
| 7 | **Manifest 기반 언어별 설치 + marker 자동 감지** | **"개발 스펙별 선택형 프리셋"** 방향과 정확히 일치 |

---

## 4. 우리 방향성과 맞지 않거나 조심할 요소

- **Rule은 수동 설치**: CLAUDE.md 참조로 수동 복사 방식 → 우리는 CLAUDE.md 자동 생성 또는 설치 스크립트 추가 필요.
- **Loop는 모니터링 중심, 반복 자동화 아님**: 재시도는 사용자가 수동 명령해야 함 → 우리의 **"루프 기반 반복 검증(자동 재진입)"** 과 거리 있음. **OMC의 ralph 방식이 우리에 더 가깝다.**
- **Skill 활성화의 False Positive 위험**: description 자동 매칭은 편하지만 의도치 않은 주입 가능. 우리는 트리거 명시화 강화 필요.
- **북마크 규모 관리**: 79 × 48 × ~170 조합은 사용자 진입점 혼란 가능성. 우리는 처음부터 **"영역별 + 단계별 + 전체 플로우"** 3종 command로 명확성 확보.

---

## 5. 다음에 직접 참고할 파일 경로

| 경로 | 용도 |
|---|---|
| `C:\workspace\everything-claude-code\hooks\hooks.json` | 훅 매니페스트 및 이벤트 정의 |
| `C:\workspace\everything-claude-code\scripts\lib\hook-flags.js` | 프로파일 게이팅 구현 |
| `C:\workspace\everything-claude-code\scripts\hooks\stop-format-typecheck.js` | 배치 최적화(Accumulator) 핵심 |
| `C:\workspace\everything-claude-code\scripts\hooks\bash-hook-dispatcher.js` | 디스패처 패턴 |
| `C:\workspace\everything-claude-code\scripts\hooks\gateguard-fact-force.js` | 블로킹 게이트 구현 |
| `C:\workspace\everything-claude-code\.claude-plugin\plugin.json` | 플러그인 매니페스트 (agents/skills 등록) |
| `C:\workspace\everything-claude-code\commands\feature-dev.md` | 직렬/병렬 워크플로우 예시 |
| `C:\workspace\everything-claude-code\agents\loop-operator.md` | 루프 모니터링 에이전트 |
| `C:\workspace\everything-claude-code\docs\SKILL-PLACEMENT-POLICY.md` | Skill 배치 전략 |
| `C:\workspace\everything-claude-code\manifests\` | 언어별 선택형 설치 매니페스트 |
