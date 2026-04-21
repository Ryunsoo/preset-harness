---
description: 대화형 인터뷰로 프리셋을 선택하고 하네스 초기 설정을 생성합니다.
allowed-tools:
  - AskUserQuestion
  - Read
  - Write
  - Edit
  - Bash
---

# /init-harness

현재 프로젝트에 프리셋 하네스를 초기화합니다. 대화형 인터뷰로 프리셋을 고르고 `harness.config.json`과 요구사항 문서 뼈대를 만듭니다.

## 수행 절차

1. **기존 설정 확인**
   - `harness.config.json`이 이미 있으면 사용자에게 덮어쓸지 확인. 거절 시 종료.

2. **대화형 인터뷰** (AskUserQuestion으로 순차 질문)
   - 프로젝트명, client 이름, FDE 이름
   - 프로파일 선택: `minimal` / `standard` / `strict`
   - 작업 영역 선택(복수): `frontend` / `backend` / `database` / `design`
   - 각 영역별 프리셋 선택:
     - frontend → `react-ts` / `nextjs-ts`
     - backend → `spring-boot` / `node-express`
     - database → `postgresql` / `mysql`
     - design → `minimal` / `corporate` / `playful` 또는 `preset_suggestion_requested`(도우미에게 맡김)

3. **`harness.config.json` 생성** (JSON, 들여쓰기 2)
   ```json
   {
     "$schema": "./harness/config.schema.json",
     "version": "0.1.0",
     "project": { "name": "...", "client": "...", "author": "..." },
     "profile": "standard",
     "presets": {
       "frontend": "react-ts",
       "backend": "node-express",
       "database": "postgresql",
       "design": "minimal"
     },
     "loop": { "standard": 3, "strict": 5 },
     "createdAt": "YYYY-MM-DD"
   }
   ```

4. **요구사항 문서 뼈대 생성**
   - `harness/templates/requirements/overview.md` → `docs/requirements/overview.md` 복사
   - 선택한 영역에 맞는 템플릿만 추가 복사 (design/frontend/backend/database)
   - 각 문서의 frontmatter `client` / `author` / `created_at` / `updated_at` 자동 기입

5. **`.gitignore` 확인**
   - `.preset-harness/` 항목이 없으면 자동 추가
   - 없으면 새로 생성

6. **요약 출력**
   - 선택 요약표 (프로파일, 프리셋 조합)
   - 생성된 파일 목록
   - 다음 단계 안내: `/analyze`

## 제약

- 기존 `harness.config.json` 덮어쓰기는 사용자 명시 승인 후에만
- 프리셋 조합 경고 (예: FE=nextjs-ts인데 BE=spring-boot → 컨벤션 경계 명확히 하라고 안내. 차단은 아님)
- 인터뷰 답을 임의 추정 금지. 불확실하면 추가 질문
