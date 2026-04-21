-- 초기 users 테이블 생성 예시.
-- conventions.json 기준:
--   * snake_case, 복수형 테이블명, id = bigint identity, created_at/updated_at 필수

CREATE TABLE users (
    id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email        text        NOT NULL,
    display_name text        NOT NULL,
    is_active    boolean     NOT NULL DEFAULT TRUE,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now(),
    deleted_at   timestamptz NULL,
    CONSTRAINT uq_users_email UNIQUE (email),
    CONSTRAINT ck_users_email_format CHECK (email LIKE '%@%')
);

-- updated_at 자동 갱신 트리거 (프리셋 표준)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
