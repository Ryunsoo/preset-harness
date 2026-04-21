---
doc_type: backend
version: 0.1.0
status: draft
client: "<client 이름>"
author: "<FDE 이름>"
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
required_sections:
  - 플랫폼·선택 프리셋
  - 인증 정책 요구
  - 외부 시스템 연동
  - SLA·성능 목표
  - 규제 대응
approval:
  by: ""
  at: ""
---

> **FDE 입력 영역**
>
> 본 문서는 FDE/client가 합의할 **입력**만 기재합니다.
> 레이어 구조·로깅·에러 컨벤션·테스트 도구·배포 기본값은 선택한 프리셋
> (`harness/presets/backend/<preset>/`)에 사전 정의되며,
> 도메인 엔티티·API 명세는 설계 단계에서 overview.md의 기능 기반으로 에이전트가 자동 생성합니다.

# 플랫폼·선택 프리셋

- 프리셋: `<spring-boot | node-express | ...>`
- 근거:

## 인증 정책 요구

> client가 명시한 인증 방식·정책. 없으면 프리셋 기본을 적용.

- 인증 방식: `<JWT | 세션 | OAuth | 기업 SSO | ...>`
- 권한 모델:
- 토큰 저장 위치·만료:
- 특수 요구:

## 외부 시스템 연동

> 연동 대상 3rd party·기존 사내 시스템.

| 대상 | 유형 (REST / gRPC / MQ / ...) | 인증 방식 | 비고 |
|---|---|---|---|

## SLA·성능 목표

> 가용성, 응답시간 목표, 처리량, 동시 접속.

## 규제 대응

> GDPR·개인정보보호법·금융규제·의료규제 등 요구.
> (가이드) 규제가 있으면 database.md의 "데이터 보존 요구"와 연계.

---

## 변경 이력 (Change Log)

| 날짜 | 버전 | 변경 내용 | 작성자 |
|---|---|---|---|
