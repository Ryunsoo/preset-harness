# 화면 인덱스

> 프로젝트의 화면 목록·상태를 한눈에 보는 인덱스.
> 신규 화면 추가 시 [`TEMPLATE.md`](./TEMPLATE.md)를 복사해 `<screen-id>.md`로 저장하고 이 인덱스를 갱신한다.

## 화면 목록

| screen_id | parent_feature | 상태 | 파일 | 주 목업 |
|---|---|---|---|---|
| (예) login | authentication | draft | `./login.md` | `../assets/screens/login.png` |
| (예) dashboard | overview | draft | `./dashboard.md` | — |

## 상태 정의

- **draft**: 작성 중 또는 client 합의 전
- **reviewing**: 검토 중 (verifier 또는 FDE 내부)
- **approved**: 합의 완료, 설계·개발 단계 입력으로 사용 가능

## 규칙

1. `screen_id`는 kebab-case 슬러그이며 파일명과 동일해야 한다.
2. 각 화면은 반드시 `parent_feature`를 [`../overview.md`](../overview.md)의 "주요 기능" 표 기능과 매핑.
3. 이미지·목업은 `../assets/screens/<screen-id>[-variant].png` 형태로 배치.
4. 화면 추가·삭제·상태 변경 시 본 인덱스 테이블을 즉시 갱신 (verifier 정량 검사 대상).
5. 화면 단위로 `docs/design/screens.md`(③ 에이전트 생성물)와 1:1 매핑.
