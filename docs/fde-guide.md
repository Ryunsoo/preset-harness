# FDE 요구사항 작성 가이드

> **대상**: FDE(Forward Deployed Engineer)가 새 client 프로젝트에 프리셋 하네스를 적용할 때 `docs/requirements/*.md`를 채우기 위한 실용 지침.
>
> **선행 문서**: [`rough-requirements.md`](./rough-requirements.md), [`architecture.md`](./architecture.md), [`requirements-form-spec.md`](./requirements-form-spec.md)

---

## 0. 시작 전 체크리스트

- [ ] 본 프로젝트에서 `/init-harness`를 실행했는가?
- [ ] 프로젝트 루트에 `harness.config.json`이 생성됐는가?
- [ ] `docs/requirements/` 하위에 선택한 영역 템플릿이 복사됐는가?
- [ ] client로부터 최소한의 자료(목적·타겟·주요 기능)를 확보했는가?

위 항목이 모두 준비됐으면 이 가이드를 펼쳐 놓고 `/analyze` 실행 전·후 참고한다.

---

## 1. 전체 흐름 한눈에

```
/init-harness  →  /analyze  →  /design  →  /develop  →  /verify  →  /test
                  ↑↑↑↑↑↑↑
                  이 가이드가 다루는 범위
```

- `/analyze`는 `analyst` 에이전트가 `docs/requirements/*.md`를 생성·보강한다.
- **하지만** 에이전트는 client와 직접 대화하지 않는다. FDE가 client 인터뷰 결과를 문서의 올바른 위치에 채워 넣으면, `analyst`는 그 결과를 정리·정돈하고 `verifier`가 부족분을 지적한다.

---

## 2. 황금 원칙: 3분할을 지키기

모든 요구사항 문서의 내용은 다음 3가지 중 하나에 속한다.

| 구분 | 출처 | 예시 |
|---|---|---|
| ① **FDE 입력** | 요구사항 문서 | 프로젝트 목적, 기능, client 특이사항 |
| ② **프리셋 자동** | `harness/presets/*/` | 코딩 컨벤션, 네이밍, 상태관리 라이브러리 |
| ③ **에이전트 생성** | `docs/design/*` | ER, API 명세, 도메인 엔티티 |

**FDE가 쓰는 것은 ①만**.

- ✅ "로그인 성공 후 대시보드(`/dashboard`)로 이동"
- ❌ "POST /auth/login 엔드포인트 구현" → ③ 영역
- ❌ "snake_case 네이밍 적용" → ② 영역
- ❌ "Zustand로 전역 상태 관리" → ② 영역

경계가 헷갈리면 "이 내용이 client마다 달라지나?"를 자문한다. 달라지면 ①, 아니면 ② 또는 ③.

---

## 3. overview.md 작성 팁 (필수)

가장 중요한 문서. 다른 모든 문서·에이전트가 이 문서를 참조한다.

### 3-1. 프로젝트 개요
- 3문단 이내. "무엇·왜·누구를 위해"를 명확히.
- ✅ "B2B 고객 지원 티켓 관리 SaaS. 중소기업 IT팀의 내부 문의를 이메일 대신 구조화된 플로우로 처리."
- ❌ "혁신적이고 차세대 솔루션을 제공하는..."

### 3-2. 비즈니스 목표
- **측정 가능한 지표** 권장. "KPI 없다"면 TBD + 확정 예상 시점 기재.
- ❌ "사용자 만족도 향상" → ✅ "NPS 30 이상 / 월 활성 사용자 500명"

### 3-3. 핵심 사용자
- 주요 페르소나 1~3명. 한 명당: 이름·역할·상황·목표·페인 포인트.
- 여러 페르소나가 있으면 `### 페르소나 1: ...` / `### 페르소나 2: ...` 서브섹션으로 분리.

### 3-4. 주요 기능 표
- 우선순위: P0(MVP 필수) / P1(1차 릴리스) / P2(후속).
- **기능명은 안정된 식별자** — 다른 문서(`screens/*.md`의 `parent_feature`, `docs/design/api-spec.md`)에서 참조한다. 한번 정하면 쉽게 바꾸지 않는다.
- 표 예시:
  | 우선순위 | 기능 | 설명 |
  |---|---|---|
  | P0 | `authentication` | 이메일 로그인·비밀번호 재설정 |
  | P0 | `ticket-create` | 신규 티켓 작성·할당 |
  | P1 | `ticket-comment` | 티켓 스레드 댓글 |

### 3-5. 비기능 요구사항
- 정량 지표 권장.
- ❌ "빠르게 반응" → ✅ "모바일 LCP < 2.5s, p95 API 응답 < 300ms"
- 없으면 TBD로 두되, "client 확인 예정 2026-05-01" 같이 추적 가능하게.

### 3-6. 기술 스택 개요
- `/init-harness` 선택 결과가 자동 기입됨. 변경하려면 `/init-harness`를 다시 돌리거나 `harness.config.json`을 수정.
- 근거만 한 줄씩 보강하면 충분.

### 3-7. 제약사항·우선순위
- **일정·예산·규정·의존 시스템**을 분리해서 명시.
- 예: "2026-09-01 GA 필수 / 분기 예산 1 FTE / GDPR 대응 필수 / 기존 SSO(Okta) 연동"

### 3-8. 범위 외 (Out of Scope)
- client와 **명시적으로 합의한** "이번 마일스톤에서는 안 함"을 남긴다. 후일 분쟁·scope creep 방지.
- 예: "모바일 네이티브 앱 / 실시간 알림 / 관리자 분석 대시보드"

---

## 4. design.md 작성 팁 (디자인 범위가 있을 때)

### 4-1. 상황별 시나리오
- **A. client가 브랜드 가이드 보유**: 가이드에 맞춰 섹션을 채우고 `preset_suggestion_requested: false`
- **B. 요구가 막연함**: `preset_suggestion_requested: true` + 컨셉 키워드(예: "신뢰감, 중립 톤")만 적고 나머지는 `designer` 에이전트에 위임
- **C. 내부 디자이너 동반**: 브랜드·IA 채움, "제안용 프리셋" 섹션은 공란

### 4-2. design.md에 넣지 말 것
- 화면별 상세 기획 → `screens/<id>.md`로 이동
- 구체 컴포넌트 코드·토큰 값 → 프리셋·에이전트 영역
- API 목록·응답 포맷 → architect가 생성하는 `docs/design/api-spec.md`

### 4-3. 접근성·다국어
- WCAG AA는 기본값. 더 높이 잡을 이유가 있으면 근거와 함께 명시.
- 다국어는 "필요함/없음/미정"만이라도 남길 것. 뒤늦게 추가되면 구조 재작업.

---

## 5. frontend.md / backend.md / database.md (경량 문서)

세 문서는 "① FDE 입력만" 원칙으로 이미 경량화되어 있다. 꼭 채울 핵심만:

### frontend.md
- 플랫폼·선택 프리셋 근거 (`react-ts` vs `nextjs-ts`를 왜 골랐는지)
- 지원 브라우저·기기 범위 (IE 같은 요구는 반드시 여기 명시)
- 특수 요구 체크리스트 (PWA / 오프라인 / 실시간 / 다국어 등) — 해당 없으면 공란 OK
- 인증 UX (로그인 후 어디로, 세션 만료 시 행동 등)

### backend.md
- 플랫폼 선택 근거
- 인증 정책 (방식·권한 모델·토큰 저장)
- 외부 시스템 연동 표 (제3자·사내)
- SLA·성능 목표 (없으면 TBD)
- 규제 대응 (GDPR·개인정보보호법 등)

### database.md
- DB 타입·선택 근거
- 데이터 보존 요구 (보관기간·삭제·감사로그)
- 예상 규모 (초기·1년 후)
- 멀티 리전·DR 요구

**주의**: 이 세 문서에 레이어 구조, API 명세, 테이블 정의, 코딩 컨벤션을 적지 않는다. 프리셋 또는 에이전트가 해야 할 일이다.

---

## 6. screens/ 작성 팁

### 6-1. 언제 쓰나?
- 화면이 2개 이상이고 각각 기획이 필요한 FE 프로젝트
- client가 Figma·이미지 목업·화면 리스트를 제공했을 때
- UI 없는 순수 백엔드 프로젝트면 생략

### 6-2. 자산 형태별 작성법

#### 이미지 목업만 있음
1. 이미지 파일을 `docs/requirements/assets/screens/<screen-id>.png`로 저장 (`screen-id`는 kebab-case)
2. `harness/templates/requirements/screens/TEMPLATE.md`를 복사 → `docs/requirements/screens/<screen-id>.md`
3. frontmatter `references`에 이미지 path 기록
4. **이미지에서 읽히는 UI 요소를 FDE가 직접 표로 옮김**. 에이전트는 이미지를 자동 해석하지 않는다
5. 상태 variation·전환이 이미지로 불분명하면 TBD로 두고 client 확인

#### Figma·Sketch URL만 있음
1. frontmatter `references`에 `type: figma` + URL 추가 (이미지 복제하지 않음)
2. FDE가 Figma를 보면서 UI 요소·상태·전환을 텍스트로 옮김
3. Figma URL은 외부에서 편집·이동될 수 있으므로 **변경 이력**에 접근 날짜를 남겨 두면 좋음

#### 텍스트 설명만 있음
1. 목업이 없어도 괜찮음. client 설명을 구조화해 표·체크리스트로 정리
2. frontmatter `references`에 `type: note` + 메모 파일 경로를 두어 원본 보존
3. 시각화는 이후 `designer`·`frontend-dev`가 채움

### 6-3. 화면 목록 인덱스는 항상 최신으로
- `screens/README.md`의 표는 화면 추가·삭제·상태 전환 시 **즉시 갱신**
- verifier 정량 검사 대상이라 불일치하면 재진입 루프에 걸린다

### 6-4. `parent_feature` 매핑
- 각 화면은 `overview.md`의 "주요 기능" 표에 정의한 기능 id와 매핑
- 매핑 없는 화면은 "이 화면이 왜 필요한지"의 근거가 없다는 신호 → verifier가 지적

---

## 7. verifier 보완 지시 읽는 법

`/verify` 또는 각 `/analyze`·`/design`·`/develop` 실행 뒤 verifier가 실패 판정을 내리면 다음 형식의 지시가 온다:

```json
{
  "severity": "warning",
  "location": "docs/requirements/overview.md#비기능 요구사항",
  "message": "섹션이 존재하지만 정량 지표가 없다.",
  "suggestion": "LCP·동시접속 등 측정 가능 지표로 전환 권장."
}
```

- **severity=error**: 반드시 수정. standard/strict에서 자동 재진입 발생.
- **severity=warning**: 가능하면 수정. strict에서 재진입 요건.
- **severity=info**: 참고 수준.

**불합리한 지시**라고 판단되면 orchestrator 경유로 재질문 — 에이전트도 완벽하지 않으므로 FDE의 도메인 판단이 우선이다.

---

## 8. 승인 게이트 (strict 프로파일)

`strict`에서는 각 단계 완료 시 **사용자 승인 게이트**가 뜬다. 선택지:

- `proceed`: 다음 단계로
- `reenter`: 같은 단계 다시 (보완 지시 적용)
- `abort`: 중단 (외부 client 확인이 필요한 경우 등)

client 최종 확인이 필요한 단계(특히 분석·설계)에서는 abort 후 외부 절차를 밟고 `/analyze`·`/design`를 다시 실행.

---

## 9. 자주 묻는 질문

**Q. `/init-harness` 당시 고르지 않은 영역(예: database)을 나중에 추가할 수 있나?**
A. 가능. `harness/templates/requirements/database.md`를 `docs/requirements/database.md`로 복사 → frontmatter 채움 → `harness.config.json`의 `presets`에 추가. 다음 `/verify`부터 검증 대상 포함.

**Q. 요구사항에 실수로 API 명세를 적었다.**
A. verifier가 3분할 위반으로 지적한다. 해당 내용을 지우고 architect가 `docs/design/api-spec.md`를 생성하도록 맡긴다.

**Q. `TBD`는 언제까지 허용되나?**
A. `/verify` 통과 전에는 "후속 단계의 입력으로 쓸 수 있는 수준"까지만 허용. 예: 비즈니스 목표의 구체 KPI는 설계에 영향이 크지 않으니 TBD로 둬도 통과할 수 있지만, `parent_feature` 매핑은 TBD 금지.

**Q. client 자료가 비공개·기밀이다.**
A. 요구사항 문서에 평문으로 남기지 않는다. 별도 암호화 저장소·사내 위키 링크만 참조로 남기고, 문서에는 공개 가능한 요약만.

**Q. 여러 client 프로젝트에서 공통으로 쓰는 내용이 있다.**
A. 하네스 자체(프리셋·에이전트 프롬프트)에 반영해 기여. 요구사항 문서는 **해당 client 고유 내용**만 담는다.

**Q. `harness.config.json`의 프로파일을 중간에 바꿔도 되나?**
A. 가능. 보통 초기엔 `standard`, 릴리스 임박 시 `strict`로 상향. 하향은 검증 약화라 피하는 편이 좋음.

---

## 10. 속도가 느릴 때의 전략

### 10-1. 단계별 완성보다 "폭으로" 작성
- overview 80% → 다른 영역 50% → screens 3~5개 → 다시 overview 100%
- 한 문서 완성 강박 버리고, client 확인이 들어오는 순서대로 조정

### 10-2. TBD를 자유롭게 쓰기
- 막힌 필드 붙들지 말고 `TBD(<근거/시점>)`로 넘긴다
- 예: `응답 시간: TBD(client 측 법무 검토 후 결정, 2026-05-15 예상)`

### 10-3. screens는 한 번에 모두 쓰지 않는다
- P0 기능에 해당하는 화면부터 2~3개 완성 → `/analyze` → `/design` → screens P1 추가 → 다시 루프
- 프리셋 하네스의 루프 구조는 이런 점진적 확장을 전제로 설계됐다

---

## 변경 이력

| 날짜 | 변경 | 작성자 |
|---|---|---|
| 2026-04-21 | 초안 작성 | |
