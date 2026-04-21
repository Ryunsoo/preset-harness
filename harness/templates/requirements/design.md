---
doc_type: design
version: 0.1.0
status: draft
client: "<client 이름>"
author: "<FDE 이름>"
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
required_sections:
  - 디자인 컨셉
  - 브랜드 아이덴티티
  - 정보 구조·내비게이션
  - 레이아웃·반응형
  - 컴포넌트·디자인 시스템
  - 접근성·UX 원칙
  - 제안용 프리셋
approval:
  by: ""
  at: ""
preset_suggestion_requested: false    # true면 designer 에이전트가 프리셋 제안을 채움
---

# 디자인 컨셉

> 무드, 지향점(신뢰감 / 친근함 / 전문성 등), 레퍼런스.
>
> client 디자인 요구가 부족하면 frontmatter의 `preset_suggestion_requested: true`로 지정 →
> designer 에이전트가 `harness/presets/design/` 기반으로 2~3개 프리셋 중 채택안을 제안.

## 브랜드 아이덴티티

> 로고, 컬러 팔레트, 타이포그래피, 보이스&톤.
> (가이드) 기존 브랜드 가이드가 있으면 링크. 없으면 designer 제안 요청.

## 정보 구조·내비게이션

> 사이트맵과 주요 유저 플로우 수준만 서술. (가이드) overview.md의 주요 기능과 매핑.
> **화면별 상세 기획은 [`screens/`](./screens/) 하위 개별 파일로 관리** ([`screens/TEMPLATE.md`](./screens/TEMPLATE.md) 참조). 이 섹션에는 화면 리스트는 두되 개별 화면 상세는 넣지 않는다.

## 레이아웃·반응형

> 그리드, breakpoint, 기기 대응(모바일 / 태블릿 / 데스크톱).

## 컴포넌트·디자인 시스템

> 참조 라이브러리(shadcn / MUI / Ant Design 등) 또는 커스텀 가이드.
> (프리셋 자동) 선택한 디자인 프리셋의 컴포넌트 예시 코드가
> `harness/presets/design/<preset>/examples/`에 포함됨.

## 접근성·UX 원칙

> WCAG 레벨, 다크모드, 다국어, 모션 선호도(reduce-motion) 등.

## 제안용 프리셋

> client 요구가 부족할 때 designer 에이전트가 채택한 프리셋.

- 채택 프리셋: `<minimal | corporate | playful>`
- 근거:

---

## 변경 이력 (Change Log)

| 날짜 | 버전 | 변경 내용 | 작성자 |
|---|---|---|---|
