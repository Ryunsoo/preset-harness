# nextjs-ts 폴더 구조

```
<project-root>/
├── app/                          # App Router 루트
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 홈 (공개)
│   ├── (marketing)/              # 공개 라우트 그룹
│   │   └── <page>/page.tsx
│   ├── (app)/                    # 인증 보호 라우트 그룹
│   │   ├── layout.tsx            # 인증 가드·앱 셸
│   │   └── <feature>/
│   │       ├── page.tsx
│   │       ├── actions.ts        # Server Actions
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── components/       # feature 전용 컴포넌트
│   └── api/
│       └── <endpoint>/route.ts   # Route Handler
├── components/                   # 공통 UI 컴포넌트
├── lib/
│   ├── api-client.ts
│   ├── auth.ts
│   └── query-client.ts           # TanStack Query provider
├── stores/                       # 전역 Zustand store
├── styles/
│   └── globals.css
├── tests/e2e/                    # Playwright 스펙
├── middleware.ts                 # 인증·지역·리다이렉트
├── next.config.mjs
├── tailwind.config.ts
├── eslint.config.js
├── tsconfig.json
└── package.json
```

## 배치 원칙

1. **Route Group으로 인증 경계 분리**: `(marketing)` / `(app)`로 공개/보호 라우트 구분.
2. **RSC 기본, 'use client' 명시**: 상호작용·브라우저 API 필요한 컴포넌트만 클라이언트 경계로.
3. **Server Actions 우선**: 데이터 변경은 `actions.ts`로. API Route Handler는 외부 노출이 필요할 때만.
4. **공통/feature 분리**: feature 내부 컴포넌트는 `app/<feature>/components/`, 여러 곳에서 재사용 시 최상위 `components/`로 승격.
5. **경로 별칭**: `@/` = 프로젝트 루트.
