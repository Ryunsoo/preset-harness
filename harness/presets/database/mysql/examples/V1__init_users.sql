-- 초기 users 테이블 생성 예시.
-- conventions.json 기준: InnoDB, utf8mb4, bigint unsigned auto_increment, created_at/updated_at 필수

CREATE TABLE users (
    id            bigint UNSIGNED NOT NULL AUTO_INCREMENT,
    email         varchar(255)    NOT NULL,
    display_name  varchar(120)    NOT NULL,
    is_active     tinyint(1)      NOT NULL DEFAULT 1,
    created_at    datetime(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at    datetime(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deleted_at    datetime(6)         NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email),
    CONSTRAINT ck_users_email_format CHECK (email LIKE '%@%')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
