# node-express 폴더 구조

```
<project-root>/
├── src/
│   ├── index.ts                    # 엔트리 (서버 부트스트랩)
│   ├── app.ts                      # Express 앱 구성 (미들웨어·에러 핸들러)
│   ├── config/
│   │   └── env.ts                  # Zod로 환경변수 검증
│   ├── common/
│   │   ├── errors/                 # AppError, 에러 코드
│   │   ├── middleware/             # 공통 미들웨어 (auth, requestLogger 등)
│   │   └── logger.ts               # pino 인스턴스
│   ├── features/                   # feature(bounded context)별 수직 분할
│   │   └── <feature>/
│   │       ├── <feature>.router.ts
│   │       ├── <feature>.controller.ts
│   │       ├── <feature>.service.ts
│   │       ├── <feature>.repository.ts
│   │       ├── <feature>.schema.ts # Zod 스키마
│   │       └── <feature>.test.ts
│   ├── db/
│   │   ├── client.ts               # Prisma Client 인스턴스
│   │   └── schema.prisma           # (prisma/ 하위 권장 시 prisma/schema.prisma로 이동)
│   └── routes.ts                   # feature router 조립
├── tests/
│   └── integration/                # supertest + testcontainers
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── eslint.config.js
├── tsconfig.json
└── package.json
```

## 배치 원칙

1. **Feature-first 수직 분할**: `features/<feature>/`에 route·controller·service·repository·schema·test 동거.
2. **의존 방향 고정**: router → controller → service → repository. 하위가 상위를 import하지 않는다.
3. **환경변수는 Zod 검증**: `config/env.ts`에서 한 번만 읽고 타입 있는 객체로 re-export.
4. **에러는 AppError로 통일**: service/repository에서 `throw new AppError(...)`, 전역 미들웨어에서 HTTP 응답으로 변환.
5. **Prisma client는 싱글톤**: 테스트·개발 중 재생성 방지 패턴 적용.
