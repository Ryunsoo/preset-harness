# react-ts 폴더 구조

> 선택한 react-ts 프리셋의 권장 폴더 구조. architect/frontend-dev 에이전트가 이 구조를 기준으로 코드를 배치.

```
<project-root>/
├── public/                       # 정적 자산 (favicon, robots.txt 등)
├── src/
│   ├── main.tsx                  # 엔트리 포인트
│   ├── App.tsx                   # 루트 컴포넌트 (Provider 조립)
│   ├── routes/                   # 라우트 컴포넌트 (페이지 단위)
│   │   ├── index.ts              # 라우트 테이블
│   │   └── <feature>/
│   │       ├── <Page>.tsx
│   │       └── <Page>.test.tsx
│   ├── features/                 # 도메인 feature 단위
│   │   └── <feature>/
│   │       ├── components/       # feature 전용 컴포넌트
│   │       ├── hooks/            # feature 전용 훅
│   │       ├── api/              # feature API 호출
│   │       ├── store.ts          # feature Zustand store (필요 시)
│   │       └── types.ts
│   ├── components/               # 공통 UI 컴포넌트 (Button, Card 등)
│   ├── hooks/                    # 공통 훅
│   ├── lib/                      # 외부 라이브러리 래퍼
│   │   ├── api-client.ts         # fetch 래퍼
│   │   └── query-client.ts       # TanStack Query 설정
│   ├── stores/                   # 전역 Zustand store
│   ├── types/                    # 전역 타입
│   ├── styles/                   # 전역 스타일 (reset, tokens)
│   └── utils/                    # 순수 함수 유틸
├── tests/
│   └── e2e/                      # Playwright 스펙
├── .env.example                  # 환경변수 템플릿
├── eslint.config.js
├── prettier.config.js
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── package.json
```

## 배치 원칙

1. **Feature-first**: 도메인 경계가 뚜렷한 코드는 `features/<feature>/`에 집결. 여러 feature가 공유하는 것만 `components/`, `hooks/`, `lib/`로 올림.
2. **Co-location**: 컴포넌트와 테스트는 같은 폴더에. `<Component>.tsx` + `<Component>.test.tsx`.
3. **깊은 의존성 금지**: `features/A/`는 `features/B/`를 직접 import하지 않음. 필요하면 `components/`, `lib/`, `stores/` 공통 레이어로 추출.
4. **경로 별칭**: `@/` = `src/`. 상위 디렉토리로 올라가는 `../../..` 상대 경로 금지.
