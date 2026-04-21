# Preset Harness

여러 client 프로젝트에 일관된 틀을 적용하기 위한 **프리셋 기반 Claude Code 하네스**.
요구사항 분석 → 설계 → 개발 → 검증 → 테스트의 전체 플로우를 오케스트레이터 + 13개 서브에이전트로 자동화하며, FE/BE/DB/디자인 영역별 프리셋을 선택해 적용할 수 있다.

## Quick Start

```bash
# 1. 새 client 프로젝트 루트에 clone
git clone https://github.com/Ryunsoo/preset-harness.git my-client-project
cd my-client-project

# 2. Bootstrap 설치 (1회, Node.js 22+ 필요)
node scripts/install.mjs

# 3. Claude Code 실행 → /init-harness 로 프리셋·프로파일 선택
```

설치 후 `.claude/commands/`, `.claude/agents/`, `.claude/settings.json`이 생성되어 Claude Code가 커맨드·에이전트·훅을 인식한다.

## 전체 플로우

```
/init-harness  →  /analyze  →  /design  →  /develop  →  /verify  →  /test
                                 또는 /run-all (전체 자동)
```

단계별 루프·보완 지시·phase 커밋이 자동 진행된다. 자세한 작성법·전략은 [`docs/fde-guide.md`](./docs/fde-guide.md) 참조.

## 제공하는 프리셋 (총 9종)

| 영역 | 프리셋 |
|---|---|
| Frontend | `react-ts` · `nextjs-ts` |
| Backend | `spring-boot` · `node-express` |
| Database | `postgresql` · `mysql` |
| Design | `minimal` · `corporate` · `playful` |

각 프리셋은 `spec.md` / `conventions.json` / `structure.md` / `examples/`로 구성.

## 디렉토리 구조

```
preset-harness/
├── README.md
├── .gitignore
├── scripts/
│   └── install.mjs            # Bootstrap 스크립트
├── docs/                      # 프로젝트 문서
│   ├── architecture.md        # 전체 아키텍처
│   ├── requirements-form-spec.md
│   ├── fde-guide.md           # FDE 작성 가이드
│   ├── rough-requirements.md
│   └── benchmarks/            # OMC·ECC 벤치마킹
└── harness/                   # 하네스 구현체
    ├── agents/                # 13개 에이전트 프롬프트
    ├── commands/              # 10개 slash command
    ├── hooks/                 # 4개 Node.js 훅 + lib
    ├── presets/               # 프리셋 (FE/BE/DB/Design)
    ├── templates/             # 요구사항 문서 템플릿
    └── .claude/               # settings.json 템플릿
```

## 설치 옵션

```bash
node scripts/install.mjs              # 기본 (이미 있는 파일 유지)
node scripts/install.mjs --force      # 기존 파일 덮어쓰기 (업데이트 시)
node scripts/install.mjs --dry-run    # 계획만 출력
```

## 주요 문서

- [architecture.md](./docs/architecture.md) — 전체 아키텍처 스케치, 에이전트 카탈로그, 플로우
- [requirements-form-spec.md](./docs/requirements-form-spec.md) — 요구사항 form 3분할 원칙 및 스키마
- [fde-guide.md](./docs/fde-guide.md) — FDE 작성 실전 가이드
- [benchmarks/synthesis.md](./docs/benchmarks/synthesis.md) — OMC·ECC 벤치마킹 종합 인사이트

## 킬 스위치

하네스를 일시 비활성화하려면 환경변수 사용:

```bash
DISABLE_PRESET_HARNESS=1    # 전체 비활성 (훅·커맨드 무력화)
SKIP_HOOKS=1                # 훅만 비활성 (커맨드는 사용 가능)
```

## 라이선스

- (TBD)
