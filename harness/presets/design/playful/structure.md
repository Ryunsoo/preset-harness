# playful 디자인 프리셋 구성

```
harness/presets/design/playful/
├── spec.md
├── conventions.json
├── structure.md
└── examples/
    ├── theme.css
    └── Button.tsx
```

## 적용 원칙

1. **토큰 단일 출처**: 색·라운드·그림자 모두 `conventions.json` 토큰 + CSS 변수.
2. **큰 라운드 기본**: Button은 `--radius-full`, Card는 `--radius-lg` 이상을 기본값으로.
3. **그림자로 깊이 표현**: 보더 대신 부드러운 그림자(`--shadow-md`/`--shadow-lg`)로 카드·모달 경계 형성.
4. **모션은 spring 느낌**: 표준 이징 `cubic-bezier(0.34, 1.56, 0.64, 1)`, 버튼 hover에 미세 스케일(1.02~1.04) 허용.
5. **접근성 유의**: 비비드 컬러 위 텍스트는 대비를 꼭 검증 — 밝은 노란색 배경엔 검정 텍스트, 핑크 accent엔 흰색.
