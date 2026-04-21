-- 인덱스 추가 마이그레이션 예시.
-- 네이밍: idx_<table>_<column_list>, uq_<table>_<column_list>
-- varchar 인덱스는 접두사 길이를 명시하여 3072 바이트 키 길이 제한을 회피.

CREATE INDEX idx_users_is_active_created_at
    ON users (is_active, created_at DESC);

CREATE INDEX idx_users_display_name_prefix
    ON users (display_name(64));

-- deleted_at을 조건에 포함한 보조 인덱스 (MySQL은 파셜 인덱스 미지원 → 컬럼 포함 인덱스로 대체)
CREATE INDEX idx_users_deleted_at
    ON users (deleted_at);
