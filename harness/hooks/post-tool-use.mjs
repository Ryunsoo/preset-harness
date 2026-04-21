#!/usr/bin/env node
/**
 * PostToolUse 훅.
 * - Edit/Write 도구 사용 시 변경된 파일 경로를 누적(Accumulator 패턴, ECC 차용)
 * - 실제 검증·처리는 Stop 훅에서 일괄 수행
 * - 훅 자체는 가볍게 유지: 파일 I/O만
 */

import { killSwitchActive, readState, writeState, readHookInput, logInfo } from './lib/common.mjs';

const TRACK_TOOLS = new Set(['Edit', 'Write']);

function main() {
  if (killSwitchActive()) return;

  const input = readHookInput();
  const tool = input.tool_name ?? input.tool ?? '';
  if (!TRACK_TOOLS.has(tool)) return;

  const filePath =
    input.tool_input?.file_path ??
    input.tool_input?.path ??
    input.filePath ??
    null;
  if (!filePath) return;

  const buffer = readState('changes-buffer') ?? { changes: [] };
  buffer.changes.push({
    tool,
    file: filePath,
    at: new Date().toISOString(),
  });
  writeState('changes-buffer', buffer);

  logInfo('change.accumulated', { tool, file: filePath, total: buffer.changes.length });
}

main();
