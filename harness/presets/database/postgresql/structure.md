# postgresql 마이그레이션·스키마 구조

```
<project-root>/
├── migrations/                         # Flyway의 경우
│   ├── V1__init_schema.sql
│   ├── V2__add_users.sql
│   ├── V3__add_users_indexes.sql
│   └── U3__rollback_users_indexes.sql  # 되돌리기용 (옵션)
│
│   또는
│
├── prisma/                             # Prisma Migrate의 경우
│   ├── schema.prisma
│   └── migrations/
│       └── <timestamp>_<description>/migration.sql
│
└── db/
    ├── seed.sql                        # 초기 데이터 (환경별 분리)
    └── fixtures/                       # 테스트용 고정 데이터
        └── <feature>.sql
```

## 배치 원칙

1. **마이그레이션은 단방향 진화 기록**: 이미 적용된 마이그레이션은 수정 금지. 수정이 필요하면 새 마이그레이션 생성.
2. **하나의 마이그레이션은 하나의 의도**: `V5__add_order_table_and_fix_users.sql` 처럼 묶지 말 것. `V5__add_order_table.sql` + `V6__fix_users_email_index.sql`로 분리.
3. **롤백 가능성 고려**: 데이터 손실이 없는 DDL은 대응되는 `U*__rollback.sql` 페어 작성(옵션). 데이터 손실 있는 마이그레이션은 설계·승인 필수.
4. **환경별 seed 분리**: `seed-dev.sql` / `seed-test.sql`. 프로덕션 seed는 별도 관리(민감 데이터 회피).
5. **네이밍 컨벤션 준수**: `conventions.json`의 네이밍 규칙 위반 시 verifier가 보완 지시.
