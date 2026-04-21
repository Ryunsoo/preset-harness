# corporate 디자인 프리셋 구성

```
harness/presets/design/corporate/
├── spec.md
├── conventions.json
├── structure.md
└── examples/
    ├── theme.css
    └── Button.tsx
```

## 적용 원칙

1. **토큰 단일 출처**: 모든 스타일 값은 `conventions.json` 토큰 + CSS 변수 참조.
2. **제목 serif 옵션**: 제목 강조가 필요한 페이지에만 `--font-serif`를 사용. 본문은 항상 `--font-sans`.
3. **명확한 경계**: 카드·섹션 경계를 `--color-border` + `--shadow-sm` 조합으로 드러낸다.
4. **접근성 대비**: 중요한 텍스트는 WCAG AA(4.5:1) 이상을 만족. accent 위의 작은 텍스트는 `--color-accent-text` 또는 `--color-accent-alt` 조합으로 검증.
5. **모션 품위**: 220ms 기준, 장식적 바운스·회전 지양.
