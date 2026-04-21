# mysql 마이그레이션·스키마 구조

```
<project-root>/
├── migrations/                         # Flyway의 경우
│   ├── V1__init_schema.sql
│   ├── V2__add_users.sql
│   └── V3__add_users_indexes.sql
│
│   또는
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       └── <timestamp>_<description>/migration.sql
│
└── db/
    ├── seed.sql
    └── fixtures/
        └── <feature>.sql
```

## 배치 원칙

1. **마이그레이션은 단방향 진화 기록**: 이미 적용된 파일 수정 금지.
2. **하나의 마이그레이션은 하나의 의도**.
3. **대규모 테이블 DDL은 온라인 도구 검토**: `pt-online-schema-change` 또는 `gh-ost`로 락 최소화. 마이그레이션 파일에는 수동 실행 스크립트 경로를 주석으로 남긴다.
4. **인덱스 길이 주의**: `utf8mb4`에서 `varchar` 인덱스는 접두사 길이 명시(예: `KEY idx_users_email (email(190))`). 키 길이 제한(3072 바이트) 초과 방지.
5. **환경별 seed 분리**: 프로덕션 seed는 별도 관리(민감 데이터 회피).
6. **네이밍 컨벤션 준수**: `conventions.json` 위반 시 verifier가 보완 지시.
