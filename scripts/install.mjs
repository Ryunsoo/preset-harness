#!/usr/bin/env node
/**
 * Bootstrap installer — harness/ 하위 템플릿을 Claude Code가 인식하는 `.claude/` 경로로 복사.
 * git clone 후 **1회** 실행한다.
 *
 * 사용:
 *   node scripts/install.mjs            # 기본 (이미 있는 파일 유지)
 *   node scripts/install.mjs --force    # 기존 파일 덮어쓰기
 *   node scripts/install.mjs --dry-run  # 계획만 출력, 복사하지 않음
 *
 * 복사 대상:
 *   harness/commands/*            -> .claude/commands/
 *   harness/agents/*              -> .claude/agents/
 *   harness/.claude/settings.json.template -> .claude/settings.json
 *
 * hooks(`harness/hooks/*.mjs`)와 presets·templates는 복사하지 않는다 — `.claude/settings.json`의
 * 상대 경로로 원본 위치를 참조한다 (업데이트·디버깅·이중관리 회피).
 */

import { mkdirSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const args = new Set(process.argv.slice(2));
const FORCE = args.has('--force');
const DRY_RUN = args.has('--dry-run');

const TASKS = [
  { type: 'tree', from: 'harness/commands', to: '.claude/commands' },
  { type: 'tree', from: 'harness/agents', to: '.claude/agents' },
  { type: 'file', from: 'harness/.claude/settings.json.template', to: '.claude/settings.json' },
];

const log = (tag, msg) => console.log(`[${tag}] ${msg}`);

function copyFile(fromRel, toRel) {
  const src = resolve(ROOT, fromRel);
  const dest = resolve(ROOT, toRel);
  if (!existsSync(src)) {
    log('warn', `source missing: ${fromRel}`);
    return { copied: 0, skipped: 0 };
  }
  if (existsSync(dest) && !FORCE) return { copied: 0, skipped: 1 };
  mkdirSync(dirname(dest), { recursive: true });
  if (!DRY_RUN) copyFileSync(src, dest);
  return { copied: 1, skipped: 0 };
}

function copyTree(fromRel, toRel) {
  const srcRoot = resolve(ROOT, fromRel);
  if (!existsSync(srcRoot)) {
    log('warn', `source missing: ${fromRel}`);
    return { copied: 0, skipped: 0 };
  }
  let copied = 0;
  let skipped = 0;
  const stack = [{ src: srcRoot, dest: resolve(ROOT, toRel) }];
  while (stack.length) {
    const { src, dest } = stack.pop();
    if (!DRY_RUN) mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src, { withFileTypes: true })) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);
      if (entry.isDirectory()) {
        stack.push({ src: srcPath, dest: destPath });
        continue;
      }
      if (existsSync(destPath) && !FORCE) {
        skipped++;
        continue;
      }
      if (!DRY_RUN) copyFileSync(srcPath, destPath);
      copied++;
    }
  }
  return { copied, skipped };
}

function main() {
  let totalCopied = 0;
  let totalSkipped = 0;

  log('info', `root: ${ROOT}`);
  if (DRY_RUN) log('info', 'DRY-RUN 모드: 복사하지 않음');
  if (FORCE) log('info', 'FORCE 모드: 기존 파일 덮어쓰기');

  for (const task of TASKS) {
    log('info', `${task.from}  ->  ${task.to}`);
    const result = task.type === 'tree' ? copyTree(task.from, task.to) : copyFile(task.from, task.to);
    totalCopied += result.copied;
    totalSkipped += result.skipped;
  }

  const flag = DRY_RUN ? ' (dry-run)' : '';
  log('done', `copied=${totalCopied} skipped=${totalSkipped}${flag}`);

  if (totalSkipped > 0 && !FORCE) {
    log('hint', '기존 파일 유지됨. 강제 덮어쓰기: node scripts/install.mjs --force');
  }

  log('next', 'Claude Code 재시작 후 /init-harness 커맨드 사용 가능');
}

main();
