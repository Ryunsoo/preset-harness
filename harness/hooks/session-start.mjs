#!/usr/bin/env node
/**
 * SessionStart 훅.
 * - 킬 스위치 체크
 * - harness.config.json 로드 후 현재 단계·프로파일·프리셋 요약을 additionalContext로 주입
 * - 세션 시작 이벤트를 .preset-harness/state/session.json에 기록
 */

import { killSwitchActive, loadConfig, readState, writeState, writeHookOutput, logInfo } from './lib/common.mjs';

function main() {
  if (killSwitchActive()) return;

  const config = loadConfig();
  if (!config) return;

  const current = readState('current-stage') ?? { stage: 'not-started', loopCount: 0 };
  const profile = config.profile ?? 'standard';
  const presets = config.presets ?? {};

  const context = [
    '[Preset Harness]',
    `- Profile: ${profile}`,
    `- Presets: FE=${presets.frontend ?? '-'} | BE=${presets.backend ?? '-'} | DB=${presets.database ?? '-'} | Design=${presets.design ?? '-'}`,
    `- Current stage: ${current.stage} (loop ${current.loopCount}/${config.loop?.[profile] ?? '-'})`,
    '- Commands: /status /analyze /design /develop /verify /test /run-all /reset /history',
  ].join('\n');

  writeState('session', { startedAt: new Date().toISOString(), profile });
  logInfo('session.started', { profile, stage: current.stage });
  writeHookOutput({ additionalContext: context });
}

main();
