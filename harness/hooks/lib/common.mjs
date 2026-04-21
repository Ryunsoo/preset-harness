/**
 * 프리셋 하네스 훅 공통 유틸.
 * - 킬 스위치 체크
 * - harness.config.json 로드
 * - .preset-harness/state/ 읽기·쓰기
 * - 구조화 로거
 *
 * 모든 훅은 본 모듈을 import하여 중복 코드 없이 사용한다.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const PROJECT_ROOT = process.cwd();
const CONFIG_PATH = resolve(PROJECT_ROOT, 'harness.config.json');
const STATE_DIR = resolve(PROJECT_ROOT, '.preset-harness', 'state');

/** 킬 스위치 상태. true면 훅은 즉시 종료해야 함. */
export function killSwitchActive() {
  return process.env.DISABLE_PRESET_HARNESS === '1' || process.env.SKIP_HOOKS === '1';
}

/** harness.config.json 로드. 없으면 null. */
export function loadConfig() {
  if (!existsSync(CONFIG_PATH)) return null;
  try {
    return JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
  } catch (err) {
    logError('config.parse_failed', { error: String(err) });
    return null;
  }
}

/** .preset-harness/state/<name>.json 로드. 없으면 null. */
export function readState(name) {
  const p = resolve(STATE_DIR, `${name}.json`);
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

/** .preset-harness/state/<name>.json 저장. 디렉토리 자동 생성. */
export function writeState(name, data) {
  mkdirSync(STATE_DIR, { recursive: true });
  const p = resolve(STATE_DIR, `${name}.json`);
  writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

/** stdin에서 훅 입력 JSON을 읽는다. 입력이 없으면 빈 객체. */
export function readHookInput() {
  try {
    const raw = readFileSync(0, 'utf8');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** 훅 출력(JSON → stdout). */
export function writeHookOutput(data) {
  process.stdout.write(JSON.stringify(data));
}

/** 구조화 로그 (stderr). 훅 내부 디버깅용. */
export function logInfo(event, payload = {}) {
  process.stderr.write(JSON.stringify({ level: 'info', hook: hookName(), event, ...payload }) + '\n');
}
export function logError(event, payload = {}) {
  process.stderr.write(JSON.stringify({ level: 'error', hook: hookName(), event, ...payload }) + '\n');
}

function hookName() {
  const arg = process.argv[1] ?? '';
  return arg.split(/[\\/]/).pop()?.replace(/\.mjs$/, '') ?? 'unknown';
}

export { PROJECT_ROOT, CONFIG_PATH, STATE_DIR };
