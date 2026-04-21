# 프리셋 하네스 아키텍처 스케치 (B단계)

> **성격**: 전체 구조의 **스케치**. 세부 구현은 아직 확정하지 않았으며, C단계(요구사항 form 설계) 진입 전 합의된 뼈대 수준의 문서.
>
> **기준일**: 2026-04-21
> **선행 문서**: [`rough-requirements.md`](./rough-requirements.md), [`benchmarks/synthesis.md`](./benchmarks/synthesis.md)
> **다음 단계**: C — 요구사항 form 설계

---

## 1. 설계 원칙

1. **선택형 프리셋 하네스** — 한 틀에 모든 것을 고정하지 않고, client 스펙에 따라 영역(FE/BE/DB/디자인) × 프로파일(minimal/standard/strict) 조합 선택
2. **오케스트레이터 중심 다중 에이전트** — 단일 세션 내 `Task` 서브에이전트로만 병렬화 (프로세스 병렬 제외)
3. **루프 기반 완료 보장** — 전 단계에 자동 재진입 루프. READ-ONLY 검증자가 판정, 최대 반복 횟수로 탈출
4. **파일 기반 상태·산출물** — DB 없이 Markdown/JSON으로 영속. Git이 히스토리의 1차 소스
5. **최소 훅, 환경변수 킬 스위치** — 4개 훅으로 시작. 관성/디버깅 시 우회 가능
6. **문서화는 유지보수 근거** — 설계서는 추후 기능 확장·수정의 근거 자료. 변경 이력은 Git + Change Log 섹션
7. **작은 단위 진행** — 한 번에 전부 만들지 않는다. 최소 세트로 시작, 검증 후 확장

---

## 2. 시스템 개요도

```
┌─────────────────────────────────────────────────────────────┐
│                   Claude Code 세션 (단일)                    │
│                                                              │
│  ┌────────────────┐         ┌─────────────────────────┐    │
│  │  사용자(FDE)   │ ←────→  │    Orchestrator         │    │
│  │  /slash cmds   │         │   (Opus, 본체)          │    │
│  └────────────────┘         └────────┬────────────────┘    │
│                                      │ Task 위임             │
│         ┌──────────────────┬─────────┴─────────┬──────────┐ │
│         ▼                  ▼                   ▼          ▼ │
│   ┌──────────┐      ┌────────────┐     ┌──────────┐   ... │
│   │ analyst  │      │ architect  │     │ verifier │       │
│   │ (Opus)   │      │ (Opus)     │     │(R-O,Opus)│       │
│   └──────────┘      └────────────┘     └──────────┘       │
│                                                              │
│  [Hooks]  SessionStart · UserPromptSubmit · PostToolUse ·   │
│           Stop                                               │
│                                                              │
│  [State]  .preset-harness/state/*.json                      │
│  [Docs]   docs/{requirements,design,dev,verify,test}/*.md   │
│  [Config] harness.config.json (대화형 인터뷰로 생성)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 디렉토리 구조

```
preset-harness/                          # 프로젝트 루트
├── docs/                                # 사람이 읽는 문서 (Git 추적)
│   ├── rough-requirements.md            # 초기 요구사항 (작성 완료)
│   ├── benchmarks/                      # 벤치마킹 분석 (작성 완료)
│   │   ├── omc-analysis.md
│   │   ├── ecc-analysis.md
│   │   └── synthesis.md
│   ├── architecture.md                  # 이 문서
│   ├── requirements/                    # 단계 1 산출물 (영역별 분리)
│   │   ├── overview.md
│   │   ├── design.md
│   │   ├── frontend.md
│   │   ├── backend.md
│   │   ├── database.md
│   │   ├── screens/                     # 화면별 기획 (선택, 옵션 B)
│   │   │   ├── README.md                #   화면 인덱스·상태
│   │   │   └── <screen-id>.md           #   screen 단위 파일
│   │   └── assets/
│   │       └── screens/                 # 목업·와이어프레임 이미지
│   │           └── <screen-id>.png
│   ├── design/                          # 단계 2 산출물
│   ├── dev/                             # 단계 3 산출물
│   ├── verify/                          # 단계 4 산출물
│   └── test/                            # 단계 5 산출물
├── harness/                             # 하네스 자체 구현
│   ├── agents/                          # 에이전트 프롬프트 (*.md)
│   ├── commands/                        # slash commands (*.md)
│   ├── hooks/                           # 훅 스크립트
│   ├── presets/                         # 프리셋 매니페스트
│   │   ├── frontend/
│   │   ├── backend/
│   │   ├── database/
│   │   └── design/
│   └── templates/                       # 문서 템플릿
├── .preset-harness/                     # 런타임 상태 (추적 여부 미정 → §10)
│   ├── state/                           # 세션 상태, 루프 진행 상황
│   ├── plans/                           # 단계별 계획
│   └── logs/                            # 실행 로그
└── harness.config.json                  # 대화형 인터뷰로 생성
```

**설계 근거**:
- `docs/`는 사용자/외부 공개용 문서 (OMC의 `.omc/` + ECC의 `docs/` 절충 → docs는 사람용)
- `harness/`는 하네스 구현체 (ECC의 `agents/`, `commands/`, `hooks/` 구조 차용)
- `.preset-harness/`는 런타임 상태 (OMC의 `.omc/` 차용, 추적 여부는 C단계에서 결정)

---

## 4. 전체 플로우

```
 [시작]
   │
   ▼
┌──────────────────┐
│ /init-harness    │  대화형 인터뷰 → harness.config.json 생성
│ (프리셋 선택)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐         ┌───────────────────────┐
│ 단계 1: 분석     │ ──fail─▶│ verifier 판정         │
│ (analyst)        │         │ → 재진입 (최대 N회)   │
└────────┬─────────┘         └───────────────────────┘
         │ pass
         ▼
┌──────────────────┐         ┌───────────────────────┐
│ 단계 2: 설계     │ ──fail─▶│ verifier 판정         │
│ (architect +     │         │ → 재진입 또는 단계 1  │
│  designer)       │         │   되돌아가기         │
└────────┬─────────┘         └───────────────────────┘
         │ pass (사용자 승인 게이트)
         ▼
┌──────────────────┐
│ 단계 3: 개발     │  frontend-dev / backend-dev / db-designer 병렬
│ (Task 병렬)      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐         ┌───────────────────────┐
│ 단계 4: 검증     │ ──fail─▶│ 단계 3 재진입         │
│ (code-reviewer + │         │ (최대 N회)            │
│  security + perf)│         └───────────────────────┘
└────────┬─────────┘
         │ pass
         ▼
┌──────────────────┐         ┌───────────────────────┐
│ 단계 5: 테스트   │ ──fail─▶│ 단계 3 재진입         │
│ (tester)         │         │ (최대 N회)            │
└────────┬─────────┘         └───────────────────────┘
         │ pass
         ▼
┌──────────────────┐
│ git-master:      │  각 단계 phase별 원자 커밋 (사용자 확인)
│ phase 커밋       │
└────────┬─────────┘
         │
         ▼
       [완료]
```

**트리거 커맨드**:
- 단계별: `/analyze`, `/design`, `/develop`, `/verify`, `/test`
- 전체: `/run-all`
- 인터뷰: `/init-harness`
- 유틸: `/status`, `/reset`, `/history`

**루프 재진입 지점** (모든 단계 적용):
- 설계 누락 → 분석 단계 재진입
- 검증 실패 → 개발 단계 재진입
- 테스트 실패 → 개발 단계 재진입
- 각 단계 내 품질 부족 → 같은 단계 반복 (최대 반복 횟수까지)

---

## 5. 에이전트 카탈로그 (초안 13개)

> 모델 티어는 초안이며 실제 운영 중 조정 가능.

| # | 에이전트 | 단계 | 역할 | 모델 | R/W |
|---|---|---|---|---|---|
| 1 | **orchestrator** | 전 단계 | 전체 흐름 조율, Task 위임, 루프 관리 | Opus | W |
| 2 | **analyst** | 분석 | 요구사항 분석, 영역별 문서 초안 작성 | Opus | W |
| 3 | **architect** | 설계 | 시스템 아키텍처, 기술 스택 매칭, 컨벤션 정의 | Opus | W |
| 4 | **designer** | 설계 | 화면·UX 설계, 디자인 프리셋 적용/제안 | Sonnet | W |
| 5 | **frontend-dev** | 개발 | FE 프리셋 기반 구현 | Sonnet | W |
| 6 | **backend-dev** | 개발 | BE 프리셋 기반 구현 | Sonnet | W |
| 7 | **db-designer** | 개발 | DB 프리셋 기반 스키마·마이그레이션 | Sonnet | W |
| 8 | **verifier** | 검증 | 설계서/구현 정합성 판정 + **보완 지시 생성** (루프 판정자) | Opus | **R-O** |
| 9 | **code-reviewer** | 검증 | 코드 퀄리티·컨벤션 위반 점검 | Sonnet | **R-O** |
| 10 | **security-reviewer** | 검증 | 보안 취약점 점검 (OWASP 등) | Opus | **R-O** |
| 11 | **performance-analyzer** | 검증 | 성능 병목·N+1·번들 크기 점검 | Sonnet | **R-O** |
| 12 | **tester** | 테스트 | 테스트 케이스 생성·실행·리포트 | Sonnet | W |
| 13 | **git-master** | 전 단계 | phase별 원자 커밋 관리, 메시지 작성 | Haiku | W |

**역할 이원화 원칙** (OMC 차용): 8~11번은 READ-ONLY, 판정자는 쓰기 실행가와 분리.

---

## 6. Command 체계

| 분류 | Command | 용도 |
|---|---|---|
| **설치·초기화** | `/init-harness` | 대화형 인터뷰 → `harness.config.json` 생성 및 프리셋 설치 |
| **단계별 실행** | `/analyze` | 분석 단계 (analyst 호출) |
| | `/design` | 설계 단계 (architect + designer) |
| | `/develop` | 개발 단계 (frontend-dev / backend-dev / db-designer 병렬) |
| | `/verify` | 검증 단계 (verifier + code/security/perf 리뷰어) |
| | `/test` | 테스트 단계 (tester) |
| **전체 실행** | `/run-all` | 분석 → 테스트 전체 파이프라인 (각 단계 루프 포함) |
| **유틸** | `/status` | 현재 단계·루프 진행 상황 조회 |
| | `/reset` | 진행 상태 초기화 (사용자 확인 필수) |
| | `/history` | 단계별 phase 커밋 히스토리 |

**설계 근거**: 단계별 + 전체 + 유틸 3분류로 명확성 확보 (OMC의 다층 모드 복잡도 회피, ECC의 9 카테고리 79개 과도함 회피).

---

## 7. 훅 정의 (핵심 4개)

| 훅 | 책임 | 동작 |
|---|---|---|
| **SessionStart** | 프리셋·상태 로드 | `harness.config.json` 파싱, `.preset-harness/state/` 복원, CLAUDE.md 주입 |
| **UserPromptSubmit** | 키워드 라우팅 | "분석", "설계", "개발", "검증", "테스트" 등 키워드 감지 시 해당 커맨드/스킬 자동 주입 |
| **PostToolUse** | 변경 감지·누적 | Edit/Write 도구 사용 시 변경 파일 누적 (ECC Accumulator 패턴). Stop에서 일괄 처리 |
| **Stop** | 단계 마무리 | 누적 변경 검증 → verifier 트리거 → phase 커밋 제안 (사용자 확인) |

**킬 스위치**:
- `DISABLE_PRESET_HARNESS=1` — 전체 하네스 비활성
- `SKIP_HOOKS=1` — 훅만 비활성 (커맨드는 사용 가능)

**구현 방향 (C단계에서 결정)**: Node.js 또는 Bash 스크립트. 크로스플랫폼 고려 시 Node.js가 유리.

---

## 8. 프로파일 정의 (3단계)

| 항목 | **minimal** | **standard** | **strict** |
|---|---|---|---|
| 용도 | 프로토타이핑·PoC | 일반 client 개발 | 프로덕션·보안 필수 |
| 루프 자동 재진입 | 비활성 (경고만) | 활성 (최대 3회) | 활성 (최대 5회) |
| verifier 판정 | 경고 리포트만 | 실패 시 재진입 | 실패 시 재진입 + 중단 |
| code-reviewer | 선택 | 기본 활성 | 필수 |
| security-reviewer | 비활성 | 선택 | **필수** |
| performance-analyzer | 비활성 | 선택 | **필수** |
| 훅 발동 | SessionStart만 | 전체 4개 | 전체 4개 + strict 정책 |
| phase 커밋 강제 | 제안만 | 제안 | 단계별 강제 |

**선택 방식**: `/init-harness` 인터뷰에서 선택, `harness.config.json`의 `profile` 필드. 환경변수 `PRESET_HARNESS_PROFILE`로도 덮어쓰기 가능.

---

## 9. 프리셋 매트릭스 (최소 세트)

### 9-1. Frontend (2종)
- `react-ts` — React 18+ / TypeScript / Vite / TanStack Query / Zustand
- `nextjs-ts` — Next.js 15+ / TypeScript / App Router / Server Actions

### 9-2. Backend (2종)
- `spring-boot` — Spring Boot 3+ / Java 21 / JPA / Gradle
- `node-express` — Node.js 22+ / Express / TypeScript / Prisma

### 9-3. Database (2종)
- `postgresql` — PostgreSQL 16+ / 네이밍: snake_case / 마이그레이션 규칙
- `mysql` — MySQL 8+ / 네이밍: snake_case / 마이그레이션 규칙

### 9-4. Design (3종, 제안용)
- `minimal` — 뉴트럴 팔레트 / sans-serif / 여백 중심
- `corporate` — 기업형 블루 계열 / 정형 그리드 / 신뢰감
- `playful` — 비비드 팔레트 / rounded / 모션 강조

**확장 원칙**: 최소 세트 운영 검증 후 React Native, Python/FastAPI, MongoDB, Kotlin 등 추가 검토.

---

## 10. C단계 진입 전 남은 오픈 이슈

> 아키텍처 스케치 수준에서는 결정하지 않고, C단계(요구사항 form 설계) 또는 D단계(구현 착수)에서 결정할 항목.

1. ~~**`.preset-harness/` 디렉토리 Git 추적 여부**~~ **(D-4 진입 시 결정 완료)** — 전체 gitignore. 공식 산출물은 `docs/`에 있으므로 이중 저장 불필요. 팀 인수인계가 필요하면 state 파일만 수동 공유.
2. ~~**`harness.config.json` 포맷**~~ **(D-4 진입 시 결정 완료)** — 표준 **JSON**. 주석 불필요, 파서 범용성 우선.
3. ~~**훅 구현 언어**~~ **(D-4 진입 시 결정 완료)** — **Node.js (ESM, `.mjs`)**. 크로스플랫폼, JSON 처리 용이, 타입 안전 경로.
4. ~~**영역별 요구사항 문서의 구체 스키마**~~ **(C단계에서 결정 완료)** → [`requirements-form-spec.md`](./requirements-form-spec.md)
5. **verifier 판정 기준의 구체화**
   - 단계별 "통과" 조건은 무엇인가? (예: 분석 단계 = 요구사항 필드 충족률 ≥ 90%)
6. **phase 커밋 메시지 컨벤션**
   - Conventional Commits? 자체 포맷?
7. **단계별 최대 반복 횟수의 기본값**
   - standard=3, strict=5로 스케치했으나 확정 필요
8. ~~**Claude Code 플러그인 형태로 배포할지 여부**~~ **(D-1 진입 시 결정 완료)** — 프로젝트 내부 템플릿만. degit/git clone 방식 배포, `.claude-plugin/plugin.json` manifest 없음. 각 client 프로젝트에 `harness/` 복사 후 `.claude/` 스코프 설정 활용.

---

## 11. 변경 이력 (Change Log)

| 날짜 | 변경 | 근거 |
|---|---|---|
| 2026-04-21 | 초안 작성 | B단계 오픈 이슈 6개 합의 결과 반영 |
| 2026-04-21 | C단계 반영 | verifier 동작 방식에 "보완 지시 생성" 명시 / 요구사항 form 스펙 분리 ([`requirements-form-spec.md`](./requirements-form-spec.md)) / 프리셋 문서화 위치(`harness/presets/<area>/<preset>/`) 확정 / 3분할 원칙(FDE·프리셋·에이전트) 도입 |
| 2026-04-21 | D-1 진입 | 배포 형태 결정: 프로젝트 내부 템플릿 방식 (플러그인 manifest 미사용) |
| 2026-04-21 | D-1 완료 | 샘플 프리셋 `react-ts` 구현 (spec/conventions/structure/examples 5파일) |
| 2026-04-21 | D-2 완료 | 프리셋 8종 전체 구현: FE(nextjs-ts) / BE(spring-boot, node-express) / DB(postgresql, mysql) / Design(minimal, corporate, playful) — 총 9 프리셋 × ~5 파일 = 45 파일 |
| 2026-04-21 | D-3 진입 | 에이전트 프롬프트 형식 결정: 하이브리드(공통 frontmatter + 5 공통 섹션 헤더 고정 / 본문은 역할 복잡도별 편차 허용). 오픈 이슈 #5(최대 반복 횟수) 확정: standard=3, strict=5 |
| 2026-04-21 | D-3 완료 | 13개 에이전트 프롬프트 작성 완료 (harness/agents/). 총 656줄, 최소 40줄(git-master) ~ 최대 70줄(verifier) |
| 2026-04-21 | D-4 진입 | 선결 이슈 3건 확정: #1 `.preset-harness/` 전체 gitignore · #2 `harness.config.json`은 JSON · #3 훅은 Node.js(ESM .mjs). `.gitignore` 생성 |
| 2026-04-21 | D-4 완료 | 10개 slash command 작성 완료 (harness/commands/): init-harness, analyze, design, develop, verify, test, run-all, status, reset, history |
| 2026-04-21 | D-5 완료 | 훅 4개 + 공통 라이브러리 Node.js 구현 (harness/hooks/): session-start, user-prompt-submit, post-tool-use(Accumulator), stop. settings.json.template 생성. 런타임 스모크 테스트 통과 |
| 2026-04-21 | 화면 기획 구조 추가 | 옵션 B 채택: `docs/requirements/screens/<id>.md` + `docs/requirements/assets/screens/` 구조. 템플릿(`harness/templates/requirements/screens/TEMPLATE.md`)과 인덱스(`README.md`) 작성. design.md는 IA·컨셉 수준으로 경량화 유지. requirements-form-spec.md 보강 |
| 2026-04-21 | FDE 가이드 추가 | [`docs/fde-guide.md`](./fde-guide.md) 작성. 0~10 섹션: 시작 체크리스트 / 3분할 원칙 / 문서별 작성 팁(overview·design·경량3·screens) / verifier 지시 대응 / 승인 게이트 / FAQ / 작성 속도 전략 |
| 2026-04-21 | Bootstrap 설치 스크립트 추가 | `scripts/install.mjs` 생성 — `harness/commands/·agents/`를 `.claude/` 경로로 복사, `settings.json.template`을 `settings.json`으로 복사. Claude Code의 slash command·agent 인식 경로 문제 해결(옵션 1 채택). README.md 추가 |
