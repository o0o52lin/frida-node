import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const pkgRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const myRoot = path.dirname(path.dirname(pkgRoot));
const findpath = path.join(myRoot, 'frida_binding.node');
const binding = path.join(pkgRoot, 'build', 'frida_binding.node');
if (fs.existsSync(findpath)) {
  fs.copyFileSync(findpath, binding)
  process.exit(0);
}

try {
  execSync('prebuild-install --verbose', { stdio: 'inherit' });
  process.exit(0);
} catch (e) {
}

try {
  execSync('make', { stdio: 'inherit' });
  process.exit(0);
} catch (e) {
}

process.exit(1);
