# minimal 디자인 프리셋 구성

```
harness/presets/design/minimal/
├── spec.md
├── conventions.json          # 디자인 토큰 (color / typography / spacing / radius / shadow / motion)
├── structure.md
└── examples/
    ├── theme.css             # CSS 커스텀 프로퍼티로 토큰 구현
    └── Button.tsx            # 프리셋이 적용된 Button 컴포넌트
```

## 적용 원칙

1. **토큰 단일 출처**: 색·타이포·간격·라운드·그림자는 `conventions.json`을 유일한 원천으로 삼는다. 컴포넌트는 CSS 변수(예: `var(--color-text)`)로 토큰을 참조.
2. **하드코딩 금지**: 컴포넌트 코드에 `#ffffff`, `16px` 같은 값을 직접 쓰지 않는다. 모든 값을 토큰으로.
3. **플랫 일관**: 그림자·그라디언트·두꺼운 보더는 지양. 강조가 필요하면 surface 대비로 해결.
4. **타이포 스케일 고정**: 제목에도 별도 폰트 패밀리를 추가하지 않는다. size·weight로만 위계 구축.
5. **모션 절제**: 전환 180ms 내외. 장식적 애니메이션 지양.
