# 벤치마킹 종합 인사이트 (OMC × ECC) — 우리 방향성 관점 재조합

> **목적**: 두 하네스의 전략을 비교하고, 우리 **"프리셋 하네스 환경 구축"** 프로젝트 방향성에 맞게 어느 쪽을 어떻게 차용할지 매핑한다. B단계(전체 아키텍처 스케치)의 주 입력 자료.
>
> **성격**: 벤치마킹은 참고용이며, 반드시 따라야 하는 규범이 아니다. 이 문서는 "현시점 판단"이며 설계 진행 중 언제든 갱신 가능.
>
> **선행 문서**: [`omc-analysis.md`](./omc-analysis.md), [`ecc-analysis.md`](./ecc-analysis.md)
> **최종 갱신**: 2026-04-21

---

## 1. 두 하네스 강점 비교 (한눈에)

| 측면 | **OMC (oh-my-claudecode)** | **ECC (everything-claude-code)** |
|---|---|---|
| **라우팅 방식** | 훅 기반 키워드 자동 라우팅 | Description 기반 의도 매칭 |
| **상태 저장** | `.omc/` 파일 + 모드 루프 지속성 | 세션 transcript + learning skill |
| **훅 철학** | 비즈니스 로직 통합(ralph 모니터링) | 순수 이벤트 자동화(pre/post/stop 분리) |
| **규모** | 19 에이전트 × 38 스킬 (전문화) | 48 에이전트 × ~170 스킬 (포괄성) |
| **프리셋 제공** | 모드별(autopilot/ralph/team) 선택 | 프로파일별(minimal/standard/strict) 게이팅 + manifest 언어별 설치 |
| **배치 최적화** | 명시적 `compact` 커맨드 | 자동 Accumulator (Stop 시 배치) |
| **루프** | **자동 재진입(완료 보장)** — ralph | **모니터링만, 수동 재명령** — loop-operator |
| **검증자 분리** | READ-ONLY vs 쓰기 에이전트 이원화 | 직렬/병렬 워크플로우 선택 |
| **외부 모델** | Codex/Gemini 통합(`omc ask`) | Claude 중심 |

### 핵심 관찰: **두 하네스의 강점이 보완적이다**

- **OMC의 강점** → 우리의 **"루프 기반 반복 검증"·"꼼꼼한 검증"** 요구에 부합
- **ECC의 강점** → 우리의 **"개발 스펙별 선택형 프리셋"·"오버헤드 최소화"** 요구에 부합
- 두 축을 **재조합**하면 우리 방향성에 맞는 설계가 도출됨

---

## 2. 우리 9개 방향성별 차용 전략 매핑

> `rough-requirements.md`에 나온 방향성 기준.

| # | 우리 방향성 | 1차 차용 | 구체 차용 요소 | 커스터마이징 포인트 |
|---|---|---|---|---|
| 1 | **영역별 프리셋** (분석/FE/BE/DB/플로우) | ECC | Manifest 기반 선택 설치 + marker 자동 감지 (`tsconfig.json`, `pyproject.toml` 등) | 우리는 영역(FE/BE/DB/디자인) × 스펙(React/Spring/PostgreSQL 등) **2차원 매트릭스**로 확장 |
| 2 | **Orchestrator 중심 다중 에이전트** | OMC + ECC | OMC의 4레인 분류 + ECC의 직렬/병렬 선택 워크플로우 | 에이전트 규모는 **소규모(10개 내외)** 로 시작, 필요 시 확장 |
| 3 | **단계별 + 전체 플로우 command** | OMC | `ralplan → autopilot` 계층 (단계별·E2E 둘 다) | 우리는 **분석 → 설계 → 개발 → 검증 → 테스트** 5단계 고정 + `run-all` 전체 command |
| 4 | **루프 기반 반복 검증 (자동 재진입)** | **OMC 전용** | ralph의 "완료 보장" 루프 — 검증 실패 시 자동 재실행 | ECC의 loop-operator는 부족. 우리는 ralph 패턴을 **단계별 재진입** 로직으로 각색 |
| 5 | **꼼꼼한 문서화** (설계서는 근거 자료) | OMC + ECC | OMC의 `.omc/plans/`, `.omc/prd/` 파일 영속 + ECC의 Meta Skills (rules-distill) | 우리는 **`harness/docs/{requirements,design,dev,verify,test}/`** 같이 단계별 폴더 고정 |
| 6 | **Git commit 전략** | OMC + ECC | OMC의 `git-master` 에이전트 + 단계별 phase 커밋 + ECC의 pre-bash lint (commit-quality, block-secrets) | 우리는 **각 단계 완료 시 자동 phase 커밋** 기본값으로 |
| 7 | **Claude Code 장치 적극 활용** (skills/hooks/commands/agents/rules) | OMC + ECC | OMC의 훅 라이프사이클 + ECC의 디스패처 + 프로파일 게이팅 | 훅은 **단순하게 시작**, 프로파일은 **기본 2~3단계**만 (over-engineering 회피) |
| 8 | **개발 스펙별 선택형 프리셋** | **ECC 전용** | Manifest + marker 감지 + `package-manager.js` 패턴 | 우리는 FE/BE/DB/디자인 영역별 `preset-*.json` 매니페스트 |
| 9 | **디자인 제안용 프리셋 2~3개** | ECC | Skill 카테고리화로 디자인 프리셋을 `skills/design/{minimal, corporate, playful}` 형태로 구조화 | 디자인 스펙은 **시각 가이드 + 컴포넌트 라이브러리 + 컬러 팔레트 번들** |

---

## 3. 명확히 "버릴" 요소

우리 방향성과 충돌하거나 오버엔지니어링이라 **채택하지 않을 것들**:

- **OMC의 tmux 기반 `/team` 프로세스 병렬**: 단일 Claude Code 세션 전제에서 복잡도 과함
- **OMC의 외부 모델 통합(Codex/Gemini)**: client가 Claude만 쓸 가능성 큼
- **OMC의 40+ 훅 핸들러 세분화**: 프리셋 하네스에는 과도함
- **OMC/ECC 양쪽의 스킬/에이전트 과다 규모**: 38~170개는 커뮤니티 누적 결과. 우리는 **핵심 10~20개**로 시작
- **ECC의 수동 Rule 설치**: 우리는 CLAUDE.md 자동 생성/주입 필요
- **ECC의 description 기반 자동 라우팅의 모호함**: 우리는 **명시적 트리거(키워드 + 명령) 우선**, description은 보조

---

## 4. B단계(아키텍처 스케치)에서 결정해야 할 오픈 이슈

B단계로 넘어가기 전에 사용자와 합의해야 할 항목들:

### 4-1. 실행 모델
- [ ] **단일 세션 전제 vs 멀티 세션/프로세스**: 우리 하네스는 단일 Claude Code 세션 내에서만 동작하는가?
- [ ] **병렬 처리의 범위**: 에이전트 병렬은 `Task` 도구 기반 서브에이전트 수준에 한정할 것인가?

### 4-2. 루프 자동화 메커니즘
- [ ] **ralph 스타일 자동 재진입**을 어느 단계에 적용할 것인가? (설계 누락 / 검증 실패 / 테스트 실패 각각?)
- [ ] **루프 종료 조건**: 성공 판정 기준은 누가(어떤 에이전트) 내리는가?
- [ ] **루프 탈출 장치**: 무한 루프 방지용 최대 반복 횟수 / 사용자 중단 장치?

### 4-3. 프리셋 선택 메커니즘
- [ ] **영역 × 스펙 매트릭스**: FE 5종 × BE 3종 × DB 3종 조합 수를 어디까지 허용할 것인가?
- [ ] **설치 방식**: CLI 설치 스크립트? slash command? 대화형 인터뷰?
- [ ] **프로파일 단계 수**: ECC처럼 minimal/standard/strict 3단계? 아니면 더 단순하게?

### 4-4. 문서화 포맷
- [ ] **요구사항 form의 구체 스키마**: 개요/디자인/FE/BE 분리 문서의 필드 정의
- [ ] **설계서 템플릿**: 유지보수 근거가 되어야 하므로 변경 이력 추적 방식 필요
- [ ] **저장 위치**: `docs/` vs `.preset-harness/` vs 별도 위치?

### 4-5. 훅 복잡도 수준
- [ ] **훅 기본 세트**: 우리는 몇 개의 훅으로 시작할 것인가? (제안: `SessionStart`, `UserPromptSubmit`(키워드), `PostToolUse`(검증), `Stop`(단계 마무리) 정도)
- [ ] **킬 스위치**: OMC의 `DISABLE_OMC` 같은 우회 장치 기본 제공?

### 4-6. 오케스트레이터·에이전트 구성
- [ ] **초기 에이전트 목록**: 최소 구성안 (analyst / architect / designer / frontend-dev / backend-dev / db-designer / verifier / tester / git-master 정도?)
- [ ] **모델 티어 매핑**: 어느 에이전트가 Opus/Sonnet/Haiku?

---

## 5. B단계 진입 전 요약

**한 줄 결론**: OMC의 **ralph 루프 + 역할 이원화 + 파일 상태 저장** 위에 ECC의 **manifest 기반 선택 설치 + 프로파일 게이팅 + Accumulator 배치 최적화** 를 얹고, 두 쪽 다 갖고 있는 **훅 라이프사이클 자동화**는 공통 기반으로 가져가되 **복잡도는 프리셋 하네스 수준으로 축소**한다.

**다음 단계 입력**: 이 문서 + [`../rough-requirements.md`](../rough-requirements.md) → B단계에서 아키텍처 스케치 도출.
