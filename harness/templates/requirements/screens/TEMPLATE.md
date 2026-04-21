---
doc_type: screen
screen_id: <slug>                # 파일명과 동일 (kebab-case, 예: login, user-settings)
parent_feature: <feature-id>     # overview.md "주요 기능" 표의 기능과 매핑
version: 0.1.0
status: draft                    # draft | reviewing | approved
author: "<FDE 이름>"
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
required_sections:
  - 목적
  - 유스케이스
  - 주요 UI 요소
  - 상태 variation
  - 전환·네비게이션
references:                      # 자산·외부 링크 목록 (선택)
  - type: mockup                 # mockup | figma | sketch | url | note
    path: ../assets/screens/<screen-id>.png
  # - type: figma
  #   url: https://www.figma.com/file/...
---

# <화면 이름>

> **가이드**
>
> 본 문서는 client/FDE가 합의한 **화면 기획(①)** 만 담는다.
> 구현 세부(라우팅·상태 구조·코드)는 설계 단계에서 에이전트가 `docs/design/screens.md`로 생성한다(③).
>
> **이미지 목업만 있는 경우에도** FDE가 이미지에서 UI 요소·상태·전환을 텍스트로 추출해 표·체크리스트에 기입한다. 에이전트는 이미지를 자동 해석하지 않는다.

## 목적

> 이 화면이 해결하는 사용자 문제 또는 업무 목표.

## 유스케이스

> 화면을 사용하는 주요 시나리오.

- 유스케이스 1:
- 유스케이스 2:

## 주요 UI 요소

> 화면에 배치되는 요소와 핵심 규칙. 토큰·컴포넌트 선택은 프리셋(②) 영역이므로 여기선 "무엇이 있고 무슨 제약이 붙는지"만 기재.

| 요소 | 유형 | 검증·제약 | 접근성 | 비고 |
|---|---|---|---|---|
| 예: 이메일 필드 | input[type=email] | required / 형식 검증 | aria-label="이메일" | |
| 예: 로그인 버튼 | button | 검증 통과 시 활성 | | submit |

## 상태 variation

> 화면이 가질 수 있는 주요 상태. 해당하는 것에 체크.

- [ ] 초기 (진입 직후)
- [ ] 입력 중
- [ ] 검증 실패 (client-side)
- [ ] 제출 중 (로딩)
- [ ] 성공 (전환)
- [ ] 서버 에러
- [ ] 빈 데이터(empty)
- [ ] 권한 없음
- [ ] 기타:

## 전환·네비게이션

> 이 화면의 진입·이탈 경로와 주요 분기.

- **진입 경로**:
- **성공 후**:
- **실패 후**:
- **서브 링크·모달**:

## 레퍼런스·첨부

> frontmatter `references`의 항목을 사람 눈으로 보기 쉬운 형태로 서술.

- 데스크톱 목업:
- 모바일 목업:
- Figma·Sketch 링크:
- 내부 와이어프레임:

## 관련 API

> architect의 `docs/design/api-spec.md`와 매핑될 엔드포인트(알면 기재, 없으면 TBD).

- `<METHOD> <path>` — 설명
- 인증 정책은 `../backend.md` 참조

## 변경 이력 (Change Log)

| 날짜 | 버전 | 변경 | 작성자 |
|---|---|---|---|
| YYYY-MM-DD | 0.1.0 | 초안 작성 | |
