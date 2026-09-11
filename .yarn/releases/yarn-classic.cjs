#!/usr/bin/env node
'use strict';

// Yarn Berry on this machine follows yarnPath. This launcher always runs
// the committed Yarn Classic 1.22.22 binary instead of migrating the lockfile.
const { spawnSync } = require('child_process');
const path = require('path');

const classic = path.join(__dirname, 'yarn-1.22.22.js');
const result = spawnSync(process.execPath, [ classic, ...process.argv.slice(2) ], {
  stdio: 'inherit',
  env: { ...process.env, YARN_IGNORE_PATH: '1' },
});

process.exit(result.status === null ? 1 : result.status);
