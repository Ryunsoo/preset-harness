-- 인덱스 추가 마이그레이션 예시.
-- 네이밍: idx_<table>_<column_list>, uq_<table>_<column_list>
-- soft-delete가 적용된 테이블은 파셜 인덱스로 deleted_at IS NULL 범위만 인덱싱.

CREATE INDEX idx_users_is_active ON users (is_active) WHERE deleted_at IS NULL;

CREATE INDEX idx_users_created_at ON users (created_at DESC);

-- email은 이미 UNIQUE 제약이 있지만 대소문자 불일치 조회를 위한 함수 기반 인덱스를 추가.
CREATE UNIQUE INDEX uq_users_email_lower ON users (lower(email));
