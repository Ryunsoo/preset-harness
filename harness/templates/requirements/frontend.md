---
doc_type: frontend
version: 0.1.0
status: draft
client: "<client 이름>"
author: "<FDE 이름>"
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
required_sections:
  - 플랫폼·선택 프리셋
  - 지원 브라우저·기기
  - 특수 요구
  - 인증 UX 요구
approval:
  by: ""
  at: ""
---

> **FDE 입력 영역**
>
> 본 문서는 FDE/client가 합의할 **입력**만 기재합니다.
> 코딩 컨벤션·린트·상태관리·폴더 구조·테스트 도구 등은 선택한 프리셋
> (`harness/presets/frontend/<preset>/`)에 사전 정의되어 있으며,
> 화면 라우팅·상태 구조 세부는 설계 단계에서 에이전트가 자동 생성합니다.

# 플랫폼·선택 프리셋

- 프리셋: `<react-ts | nextjs-ts | ...>`
- 근거:

## 지원 브라우저·기기

> 필수 지원 브라우저·버전, 모바일 / 태블릿 / 데스크톱 범위, 최소 해상도.

## 특수 요구

> 프리셋 기본에 없는 client 고유 요구.

- [ ] PWA
- [ ] 오프라인 지원
- [ ] 실시간 (WebSocket / SSE)
- [ ] 다국어 (i18n)
- [ ] 화이트 라벨 / 테마 전환
- [ ] 기타:

## 인증 UX 요구

> 로그인·회원가입·세션 유지·에러 화면 등의 UX 요구.
> (가이드) 인증 "기술 방식"은 backend.md, 여기서는 UX 관점만 명시.

---

## 변경 이력 (Change Log)

| 날짜 | 버전 | 변경 내용 | 작성자 |
|---|---|---|---|
