#!/usr/bin/env node
/**
 * Stop 훅.
 * - 누적된 변경사항(changes-buffer) 집계
 * - 현재 단계에 해당하는 파일 변경이 있으면 검증·phase 커밋 제안 컨텍스트 주입
 * - 버퍼는 항상 비운다 (다음 세션을 위해)
 */

import { killSwitchActive, loadConfig, readState, writeState, writeHookOutput, logInfo } from './lib/common.mjs';

const STAGE_DIR_HINT = {
  analysis: ['docs/requirements/'],
  design: ['docs/design/'],
  dev: ['src/', 'app/', 'migrations/', 'prisma/', 'docs/dev/'],
  test: ['tests/', 'docs/test/'],
};

function stageOfFile(file, stage) {
  const hints = STAGE_DIR_HINT[stage] ?? [];
  return hints.some((h) => file.replace(/\\/g, '/').includes(h));
}

function main() {
  if (killSwitchActive()) return;

  const config = loadConfig();
  if (!config) return;

  const current = readState('current-stage') ?? { stage: 'not-started', loopCount: 0 };
  const buffer = readState('changes-buffer') ?? { changes: [] };

  if (buffer.changes.length === 0) return;

  const relevant = buffer.changes.filter((c) => stageOfFile(c.file, current.stage));
  writeState('changes-buffer', { changes: [] });
  logInfo('stop.processed', { total: buffer.changes.length, relevant: relevant.length, stage: current.stage });

  if (relevant.length === 0) return;

  const filesSummary = relevant.slice(0, 8).map((c) => `  - ${c.tool}: ${c.file}`).join('\n');
  const more = relevant.length > 8 ? `\n  ... (+${relevant.length - 8} more)` : '';

  writeHookOutput({
    additionalContext: [
      `[Preset Harness] 현재 단계(${current.stage})에 관련된 파일 변경 ${relevant.length}건 감지.`,
      filesSummary + more,
      `검증 필요 시 \`/verify ${current.stage}\`, phase 커밋은 git-master에게 요청하세요.`,
    ].join('\n'),
  });
}

main();
