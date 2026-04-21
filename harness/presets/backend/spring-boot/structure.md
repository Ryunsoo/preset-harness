# spring-boot 폴더 구조

```
<project-root>/
├── build.gradle.kts
├── settings.gradle.kts
├── gradle/
│   └── libs.versions.toml       # 의존성 버전 카탈로그
├── src/
│   ├── main/
│   │   ├── java/com/<company>/<project>/
│   │   │   ├── Application.java              # @SpringBootApplication
│   │   │   ├── config/                       # @Configuration 빈 정의
│   │   │   ├── common/
│   │   │   │   ├── error/                    # RestControllerAdvice, ErrorCode
│   │   │   │   ├── logging/                  # MDC, request logging
│   │   │   │   └── security/
│   │   │   └── <feature>/                    # bounded context 단위
│   │   │       ├── api/                      # @RestController (controller layer)
│   │   │       ├── application/              # service layer
│   │   │       ├── domain/                   # JPA entity + 도메인 로직
│   │   │       ├── infra/                    # repository, 외부 연동
│   │   │       └── dto/                      # request/response 전용 DTO
│   │   └── resources/
│   │       ├── application.yml               # profile별 분리 (dev/stage/prod)
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── logback-spring.xml
│   └── test/
│       ├── java/com/<company>/<project>/
│       │   └── <feature>/                    # 단위·통합 테스트 혼재 허용 (네이밍으로 구분)
│       └── resources/
│           └── application-test.yml
└── gradle.properties
```

## 배치 원칙

1. **Feature(bounded context)별 수직 분할**: 기능 단위로 `api`/`application`/`domain`/`infra`/`dto` 하위 레이어를 둔다. 수평 분할(모든 controller를 한 패키지에)은 금지.
2. **의존 방향**: `api → application → domain ← infra`. domain은 외부를 몰라야 함.
3. **DTO 경계**: `api ↔ application`은 DTO로 통신. entity를 controller에 노출하지 않는다.
4. **Common은 최소화**: 여러 feature가 실제로 쓰는 것만 `common/`에 추출. 과도한 공통화 금지.
5. **설정은 profile별 YAML**: 환경값은 `application-<env>.yml`, 시크릿은 환경변수 또는 외부 비밀 저장소.
