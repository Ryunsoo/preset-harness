# 요구사항 form 스펙 (C단계)

> **성격**: C단계 산출물. 요구사항 문서의 원칙·스키마·검증 전략을 확정.
>
> **기준일**: 2026-04-21
> **선행 문서**: [`architecture.md`](./architecture.md), [`rough-requirements.md`](./rough-requirements.md)
> **관련 템플릿**: [`../harness/templates/requirements/`](../harness/templates/requirements/)
> **다음 단계**: D — 프리셋·에이전트·훅 구현 착수

---

## 1. 목적

client의 다양한 요구사항에 대응하면서도 다음 세 가지를 동시에 달성하기 위한 요구사항 문서 체계.

- **FDE 작성 부담 최소화** — 꼭 써야만 하는 내용만 문서로
- **프리셋 재사용** — 기술 컨벤션·구조는 프리셋에 흡수
- **에이전트 자동화** — 기능에서 도출 가능한 설계 산출은 에이전트가 생성

---

## 2. 3분할 원칙

모든 요구사항 문서의 내용은 다음 세 가지 출처 중 하나로 분류된다.

| 구분 | 출처 | 예시 |
|---|---|---|
| ① **FDE 작성 (입력)** | 요구사항 문서에 직접 기재 | 프로젝트 목적, 핵심 기능, 프리셋 선택, client 특이사항 |
| ② **프리셋 자동 주입** | `harness/presets/*/` 사전 정의 | 코딩 컨벤션, 린트, 상태관리 라이브러리, 네이밍 규칙, 폴더 구조 |
| ③ **에이전트 생성** | 설계/개발 단계 산출물 | ER, API 명세, 도메인 엔티티, 화면 라우팅 세부 |

**규칙**: 요구사항 form(`docs/requirements/*.md`)에는 **①만** 담는다. ②는 프리셋 문서, ③은 단계 산출물 문서에 분리.

---

## 3. 문서 구성

| 문서 | 필수/선택 | 생성 조건 |
|---|---|---|
| `overview.md` | **필수** | 모든 프로젝트 |
| `design.md` | 선택 | 디자인 요구가 있거나 프리셋 제안 필요 시 |
| `frontend.md` | 선택 | FE 범위가 있는 프로젝트 |
| `backend.md` | 선택 | BE 범위가 있는 프로젝트 |
| `database.md` | 선택 | DB가 필요한 프로젝트 |
| `screens/<id>.md` | 선택 | 화면별 상세 기획이 필요한 경우 (FE 프로젝트 대부분) |
| `assets/screens/*` | 선택 | 목업·와이어프레임 이미지 보관 (화면 문서와 짝) |

`/init-harness` 인터뷰에서 프로젝트 성격에 맞는 문서만 생성한다.

---

## 4. 공통 YAML frontmatter 스키마

모든 요구사항 문서 공통.

```yaml
---
doc_type: <overview|design|frontend|backend|database>
version: <semver>
status: <draft|reviewing|approved>
client: "<client 이름>"
author: "<FDE 이름>"
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
required_sections: [<섹션 이름>, ...]   # verifier 정량 검사 기준
approval:
  by: ""
  at: ""
---
```

문서별로 고유한 frontmatter 필드가 있을 수 있음 (예: `design.md`의 `preset_suggestion_requested`).

---

## 5. 본문 스타일

- **헤더 기반 구조화 템플릿** — `## 섹션 헤더` + 자유 서술/표/리스트
- 각 섹션 상단에 `> 가이드` 인용구로 작성 의도 명시
- 문서 하단에 **Change Log 표** 필수 (Git 커밋 + 문서 내 요약)

---

## 6. 영역별 템플릿 요약

### overview.md (8섹션, 필수)
프로젝트 개요 / 비즈니스 목표 / 핵심 사용자 / 주요 기능 / 비기능 요구사항 / 기술 스택 개요 / 제약사항·우선순위 / 범위 외

### design.md (7섹션)
디자인 컨셉 / 브랜드 아이덴티티 / 정보 구조·내비게이션 / 레이아웃·반응형 / 컴포넌트·디자인 시스템 / 접근성·UX 원칙 / 제안용 프리셋

### frontend.md (4섹션, 경량)
플랫폼·선택 프리셋 / 지원 브라우저·기기 / 특수 요구 / 인증 UX 요구

### backend.md (5섹션, 경량)
플랫폼·선택 프리셋 / 인증 정책 요구 / 외부 시스템 연동 / SLA·성능 목표 / 규제 대응

### database.md (4섹션, 경량)
DB 타입·선택 프리셋 / 데이터 보존 요구 / 예상 규모 / 멀티 리전·가용성

### screens/ — 화면별 기획 문서

화면 기획은 ① 범주(FDE 입력)이지만 분량·이미지 때문에 별도 폴더로 관리한다.

**구성**:
```
docs/requirements/
├── design.md                    # 전체 컨셉·IA·브랜드 수준만
├── screens/
│   ├── README.md                # 화면 인덱스·상태 표
│   ├── TEMPLATE.md              # 신규 화면 추가 시 복사
│   ├── login.md
│   ├── dashboard.md
│   └── ...
└── assets/
    └── screens/
        ├── login.png
        ├── dashboard-desktop.png
        └── dashboard-mobile.png
```

**화면 파일 frontmatter 확장 필드**:
- `screen_id` — 파일명과 일치하는 kebab-case 슬러그
- `parent_feature` — `overview.md` "주요 기능" 표 기능과 매핑 (필수)
- `references[]` — 목업·Figma 링크 배열 (`type`: mockup / figma / sketch / url / note)

**필수 섹션**: 목적 / 유스케이스 / 주요 UI 요소 / 상태 variation / 전환·네비게이션

**자산 저장 규칙**:
- 이미지는 `docs/requirements/assets/screens/<screen-id>[-variant].png`
- 변형(모바일·다크모드 등)은 `<screen-id>-<variant>` 형태
- Figma 링크는 frontmatter에만 두고 이미지 복제 지양 (외부 편집 이력 보존)

**검증 전략 연동**:
- verifier 정량 검사: `screens/README.md`의 화면 목록과 실제 파일 1:1 일치, `parent_feature`가 `overview.md`의 기능 식별자와 매핑되는지 확인
- verifier 정성 검사: `주요 UI 요소` 표의 검증 규칙·접근성 기입 여부

> 실제 템플릿 파일: [`../harness/templates/requirements/`](../harness/templates/requirements/) (화면은 [`screens/TEMPLATE.md`](../harness/templates/requirements/screens/TEMPLATE.md))

---

## 7. 프리셋 문서화 위치 (②의 저장소)

각 프리셋 폴더에 다음 파일을 배치한다.

```
harness/presets/<area>/<preset-name>/
├── spec.md            # 사람용 설명 (프리셋이 제공하는 것, 전제, 제약)
├── conventions.json   # 린트·포맷·네이밍 규칙 (기계 읽기)
├── structure.md       # 권장 폴더 구조 가이드
└── examples/          # 대표 컴포넌트·모듈 예시 코드
```

`<area>`: `frontend` / `backend` / `database` / `design`

---

## 8. 검증 전략 — 보완형 verifier

verifier 에이전트는 **통과/실패 이분법**이 아닌 **보완 지시 생성** 방식으로 동작한다.

### 동작 절차
1. **정량 검사** — `required_sections`에 명시된 섹션이 문서에 존재하는가?
2. **정성 검사** — LLM 기반 내용 검증. 각 섹션이 후속 단계(설계)의 입력으로 쓰일 수 있는 수준인가?
3. **보완 지시 생성** — 부족한 경우 "무엇이 부족한지 + 어떻게 보강해야 하는지"를 분석 단계로 전달
4. **루프 재진입** — analyst가 보완 지시를 받아 문서 업데이트 → 다시 검증 (단계별 최대 반복 횟수 내)

### 프로파일별 엄격도
| 프로파일 | 정량 검사 | 정성 검사 | 자동 재진입 | 승인 게이트 |
|---|---|---|---|---|
| minimal | 수행 (경고만) | 생략 | 비활성 | 없음 |
| standard | 수행 | 수행 | 최대 3회 | 선택 |
| strict | 수행 | 수행 (엄격) | 최대 5회 | **필수** |

---

## 9. 변경 이력 (Change Log)

| 날짜 | 변경 | 근거 |
|---|---|---|
| 2026-04-21 | 초안 작성 | C단계 결정사항 반영 (3분할 원칙, frontmatter 스키마, 영역별 템플릿, 보완형 검증) |
