# oh-my-claudecode (OMC) 벤치마킹 분석

> **성격**: 벤치마킹 참고용 분석. 우리 프로젝트가 반드시 따라야 할 정답이 아니며, 전략·패턴을 파악해 우리 방향성에 맞게 취사선택하기 위한 자료.
>
> **분석 일자**: 2026-04-21
> **원본 위치**: `C:\workspace\oh-my-claudecode\docs\harness-analysis.md` (+ 하위 구현 디렉토리)

---

## 1. 설계 철학 요약

OMC는 **훅 기반 투명한 컨텍스트 주입**, **엄격한 역할 분리(READ-ONLY 검증자 vs 쓰기 실행가)**, **`.omc/` 파일 저장소 기반 모드 지속성**, **다층 오케스트레이션(19개 서브에이전트 × 38개 스킬)** 을 핵심으로 설계됐다. 전체 흐름은 **키워드 감지 → 스킬 자동 라우팅 → 모드 루프(ralph/autopilot/ultrawork) → 상태 저장**이라는 일관된 파이프라인을 따르며, "완료 보장(Complete-until-done)" 원칙을 자동 루프로 구현한다.

---

## 2. 주요 전략 카테고리별 핵심 패턴

### 에이전트 구조
- 오케스트레이터(Claude 본체) 중심, 19개 서브에이전트를 **4개 레인**(Build/Analysis, Review, Domain, Coordination)으로 분류
- **모델 티어링**: Haiku(경량 탐색) / Sonnet(표준 구현) / Opus(전략·계획) 복잡도별 라우팅
- **역할 이원화**: READ-ONLY 분석가(`analyst`, `critic`, `code-reviewer`) ↔ 쓰기 실행가(`executor`, `debugger`) → 검증 독립성 보장

### 플로우 / 파이프라인
- 기본 흐름: `deep-interview → ralplan(Planner/Architect/Critic 합의) → autopilot/ralph 루프`
- **ralph**: "완료 보장" 루프 — `ultrawork` 병렬 실행 + `architect` 검증 반복
- **autopilot**: E2E 자동화 (ralph + ultraqa 포함)
- **ultrawork**: 병렬 컴포넌트 전용 (지속성 없음)

### Command 체계
- **키워드 자동 트리거**: `autopilot`, `ralph`, `ultrawork` 등 키워드 감지 시 `UserPromptSubmit` 훅이 keyword-detector를 통해 SKILL.md 자동 주입
- **명시 호출**: `/team` 등 slash command로 직접 실행
- 단계별 스킬(`plan` → `ralplan` → `autopilot`)과 E2E 실행(autopilot) 모두 제공
- 모드 상태는 `.omc/state/` JSON에 영속 저장

### Skill / Hook / Rule 활용
- **Skill (38개)**: 워크플로우 모듈화 — 설정 / 조율 / 계획 / 실행 / 검증 / 외부연계 / 관리 카테고리
- **Hook (11개 라이프사이클, 20+ 핸들러)**: `SessionStart` / `UserPromptSubmit` / `PreToolUse` / `PostToolUse` / `Stop` 등에서 키워드 감지·컨텍스트 주입·규칙 적용·지속성 관리
- **킬 스위치**: `OMC_SKIP_HOOKS`, `DISABLE_OMC` 환경변수로 투명한 우회 제공

### 문서화 / 산출물 관리
- `.omc/plans/*.plan.md` — Planner 산출물
- `.omc/prd/` — Ralph용 PRD
- `.omc/notepad/` — **3섹션 메모리** (PRIORITY / WORKING / MANUAL)
- `project-memory.json` — 기술 스택·규칙 자동 감지 저장
- 모든 상태 **파일 기반** (DB 없음)

### Git / 히스토리 전략
- `git-master` 에이전트가 원자 커밋 관리
- 각 phase(planning / execution / verification) 완료 후 커밋
- `post-tool-verifier`가 파일 변경 감시, `code-simplifier`가 자동 정리(opt-in)
- 컴팩션 직전 `pre-compact.mjs`가 스냅샷 기록

### 프리셋 / 컨벤션 제공 방식
- 모델 라우팅 설정: `~/.claude/omc.jsonc`의 `team.roleRouting`으로 역할별 provider/model 지정
- `agent-overrides`로 특정 에이전트의 모델 티어 명시 가능
- **불명확**: 언어/프레임워크별 분기가 설정 수준인지 스킬 수준인지

### 컨텍스트 관리 전략
- **Notepad**: 세션별 3섹션, auto-prune 7일
- **Project Memory**: 기술스택·directives 영속
- **State Manager**: 모드별 JSON
- **Boulder State**: 활성 계획 추적
- `SubagentStart`/`SubagentStop` 훅으로 서브에이전트 생명주기 기록
- `session-search`로 과거 세션 검색 가능

---

## 3. 우리 프로젝트에 적용하면 좋을 요소 (Top 7)

| # | 요소 | 우리 방향성과의 매칭 |
|---|---|---|
| 1 | **Hooks 기반 라이프사이클 제어** | 프리셋 로드/모드 지속성/단계별 검증을 `SessionStart`/`PreToolUse`/`PostToolUse`로 자동화 → 사용자가 반복 설정 불필요 |
| 2 | **keyword-detector 패턴** | "분석 시작", "설계", "개발", "검증" 등 단계 키워드로 자동 라우팅 → 영역별 command의 자동 트리거 |
| 3 | **모드 지속성 + 루프(ralph)** | 반복 검증 → 재진입 방식이 우리의 **"루프 기반 재검증"** 요구사항과 완벽 매칭 |
| 4 | **READ-ONLY 검증자 이원화** | 작성자와 검증자 분리로 객관성 확보 → **"꼼꼼한 검증"** 요구에 최적 |
| 5 | **`.omc/` 파일 저장소** | DB 없이 JSON/Markdown으로 설계서·PRD·계획 추적 → **"Git commit 전략으로 히스토리 추적"** 과 자연스럽게 결합 |
| 6 | **티어별 에이전트 분류** | Haiku/Sonnet/Opus 라우팅으로 비용 최적화 → 프리셋별 선택형 에이전트 설정에 활용 |
| 7 | **Skill 7 카테고리 체계** | 설정·조율·계획·실행·검증·외부연계·관리 분류 → 우리 "영역별 프리셋" 설계 기준으로 차용 |

---

## 4. 우리 방향성과 맞지 않거나 조심할 요소

- **tmux 기반 `/team` 병렬 실행**: 프로세스 기반 병렬이라 단일 Claude Code 세션 전제에서는 부담. 워커 방식 재설계 필요.
- **외부 모델 통합(Codex / Gemini)**: client가 Claude만 쓸 가능성 높음 → 모델 라우팅을 단순화.
- **40+ 훅 핸들러의 복잡도**: 유지보수 난이도 상승. 프리셋 하네스는 더 단순한 훅 구조를 유지해야 함.
- **38개 스킬의 과다함**: 오픈소스 커뮤니티 누적 결과. 우리는 핵심 스킬(분석/설계/개발/검증/테스트)에 집중하고 나머지는 선택적 추가.

---

## 5. 다음에 직접 참고할 파일 경로

| 경로 | 용도 |
|---|---|
| `C:\workspace\oh-my-claudecode\docs\harness-analysis.md` | 전체 아키텍처 요약 |
| `C:\workspace\oh-my-claudecode\docs\HOOKS.md` | 11개 라이프사이클 훅 상세 |
| `C:\workspace\oh-my-claudecode\docs\shared\mode-hierarchy.md` | 모드 상속 트리, 의사결정 플로우 |
| `C:\workspace\oh-my-claudecode\docs\ARCHITECTURE.md` | 에이전트 분류 / 위임 파이프라인 |
| `C:\workspace\oh-my-claudecode\src\features\delegation-routing\resolver.ts` | 에이전트 라우팅 로직 |
| `C:\workspace\oh-my-claudecode\src\features\model-routing\router.ts` | 모델 티어 라우팅 엔진 |
| `C:\workspace\oh-my-claudecode\src\features\state-manager\index.ts` | 모드 지속성 저장소 |
| `C:\workspace\oh-my-claudecode\src\hooks\` | 20+ 훅 핸들러 구현 |
| `C:\workspace\oh-my-claudecode\agents\*.md` | 19개 에이전트 프롬프트 |
| `C:\workspace\oh-my-claudecode\AGENTS.md` | 프로젝트용 AGENTS.md 템플릿 |
