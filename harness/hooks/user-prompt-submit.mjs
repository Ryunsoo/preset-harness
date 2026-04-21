#!/usr/bin/env node
/**
 * UserPromptSubmit 훅.
 * - 사용자 프롬프트에서 단계 키워드를 감지해 해당 slash command를 추천
 * - 추천은 additionalContext로 전달. 자동 실행하지 않음 (투명성 유지)
 */

import { killSwitchActive, loadConfig, readHookInput, writeHookOutput, logInfo } from './lib/common.mjs';

const KEYWORD_MAP = [
  { keywords: ['분석', 'analyze', 'analysis', '요구사항'], suggest: '/analyze' },
  { keywords: ['설계', 'design', '아키텍처', 'architecture'], suggest: '/design' },
  { keywords: ['개발', 'develop', 'implement', '구현'], suggest: '/develop' },
  { keywords: ['검증', 'verify', '리뷰', 'review'], suggest: '/verify' },
  { keywords: ['테스트', 'test'], suggest: '/test' },
  { keywords: ['전체 실행', 'run all', '파이프라인'], suggest: '/run-all' },
  { keywords: ['초기화', 'init', 'setup'], suggest: '/init-harness' },
  { keywords: ['상태', 'status'], suggest: '/status' },
];

function detectSuggestion(prompt) {
  if (!prompt || typeof prompt !== 'string') return null;
  const lowered = prompt.toLowerCase();
  for (const { keywords, suggest } of KEYWORD_MAP) {
    if (keywords.some((k) => lowered.includes(k.toLowerCase()))) {
      return suggest;
    }
  }
  return null;
}

function main() {
  if (killSwitchActive()) return;

  const config = loadConfig();
  if (!config) return;

  const input = readHookInput();
  const prompt = input.prompt ?? input.user_prompt ?? '';

  // 이미 slash command면 추천하지 않음
  if (typeof prompt === 'string' && prompt.trim().startsWith('/')) return;

  const suggestion = detectSuggestion(prompt);
  if (!suggestion) return;

  logInfo('keyword.detected', { suggestion });
  writeHookOutput({
    additionalContext: `[Preset Harness 추천] 의도에 따라 \`${suggestion}\` 커맨드를 고려해 보세요.`,
  });
}

main();
