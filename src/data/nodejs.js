const nodejsData = {
  id: 'nodejs',
  name: 'Node.js',
  description:
    'Core Node.js concepts, event loop, streams, file system, and runtime fundamentals',
  sections: [
    // ─── Section 1: Setup & Environment ──────────────────────────────
    {
      id: 'setup-environment',
      title: 'Setup & Environment',
      blocks: [
        {
          type: 'text',
          content:
            'Use nvm (Node Version Manager) to manage multiple Node.js versions. Lock your Node version per project with .nvmrc, and use engine locking in package.json to prevent version mismatches across teams.',
        },
        {
          type: 'heading',
          content: 'nvm Setup & Usage',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'nvm commands',
          code: `# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# List available versions
nvm ls-remote --lts

# Install a specific version
nvm install 20        # Latest Node 20.x LTS
nvm install 22        # Latest Node 22.x

# Switch versions
nvm use 20
nvm use 22

# Set default version for new terminals
nvm alias default 20

# Use .nvmrc (auto-switch when you cd into the project)
echo "20" > .nvmrc
nvm use                # Reads .nvmrc automatically`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Add this to your ~/.bashrc or ~/.zshrc to auto-switch Node version when entering a directory with .nvmrc:\n\nautoload -U add-zsh-hook\nload-nvmrc() { [[ -f .nvmrc ]] && nvm use; }\nadd-zsh-hook chpwd load-nvmrc\nload-nvmrc',
        },
        {
          type: 'heading',
          content: 'package.json Scripts & Engine Locking',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'package.json',
          code: `{
  "name": "my-app",
  "version": "1.0.0",
  "type": "module",
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js",
    "dev:debug": "node --watch --inspect src/server.js",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "test": "node --test src/**/*.test.js",
    "test:watch": "node --test --watch src/**/*.test.js"
  }
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Node 18+ has a built-in --watch flag (replaces nodemon for simple cases). Node 20+ has a built-in test runner with --test. Use these to reduce dev dependencies.',
        },
        {
          type: 'heading',
          content: 'npm vs yarn vs pnpm',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Package manager comparison',
          code: `# npm (ships with Node)
npm install express           # Add dependency
npm install -D nodemon        # Add dev dependency
npm ci                        # Clean install from lockfile (CI/CD)
npm audit                     # Check for vulnerabilities
npm outdated                  # List outdated packages

# pnpm (fast, disk-efficient, strict)
npm install -g pnpm           # Install pnpm globally
pnpm install                  # Install all dependencies
pnpm add express              # Add dependency
pnpm add -D nodemon           # Add dev dependency
pnpm dlx create-vite my-app   # Like npx but for pnpm

# npx — run packages without installing
npx create-express-api my-app
npx eslint --init
npx -p node@20 node -v        # Run with a specific Node version`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'pnpm uses a content-addressable store and hard links, so multiple projects share the same package files on disk. It also enforces strict dependency resolution, preventing phantom dependencies (packages you use but did not declare).',
        },
        {
          type: 'heading',
          content: 'Create .npmrc for Consistency',
        },
        {
          type: 'code',
          language: 'ini',
          fileName: '.npmrc',
          code: `# Enforce exact versions on install
save-exact=true

# Enforce engine requirements
engine-strict=true

# Auto-install peer dependencies
legacy-peer-deps=false`,
        },
      ],
    },

    // ─── Section 2: Module System ────────────────────────────────────
    {
      id: 'module-system',
      title: 'Module System',
      blocks: [
        {
          type: 'text',
          content:
            'Node.js supports two module systems: CommonJS (the original require/module.exports) and ES Modules (import/export). New projects should use ESM. Set "type": "module" in package.json to enable it.',
        },
        {
          type: 'heading',
          content: 'CommonJS (CJS)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'CommonJS — require / module.exports',
          code: `// ── Exporting ──
// Named exports
module.exports.createUser = (name) => ({ name, id: Date.now() });
module.exports.deleteUser = (id) => { /* ... */ };

// Or export an object at once
module.exports = {
  createUser: (name) => ({ name, id: Date.now() }),
  deleteUser: (id) => { /* ... */ },
};

// Export a single function/class
module.exports = class Database {
  constructor(url) { this.url = url; }
  connect() { /* ... */ }
};

// ── Importing ──
const { createUser, deleteUser } = require('./userService');
const Database = require('./database');
const express = require('express');

// __dirname and __filename are available globally in CJS
console.log(__dirname);   // /home/user/project/src
console.log(__filename);  // /home/user/project/src/app.js`,
        },
        {
          type: 'heading',
          content: 'ES Modules (ESM)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'ES Modules — import / export',
          code: `// ── package.json must have: "type": "module" ──

// ── Exporting ──
// Named exports
export const createUser = (name) => ({ name, id: Date.now() });
export const deleteUser = (id) => { /* ... */ };

// Default export
export default class Database {
  constructor(url) { this.url = url; }
  connect() { /* ... */ }
}

// ── Importing ──
import { createUser, deleteUser } from './userService.js';  // .js extension required!
import Database from './database.js';
import express from 'express';

// Re-export (barrel files)
export { createUser } from './userService.js';
export { default as Database } from './database.js';

// Import all as namespace
import * as userService from './userService.js';
userService.createUser('Alice');`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'In ESM, file extensions (.js) are REQUIRED in import paths. Node will not resolve "./userService" — you must write "./userService.js". This is the #1 gotcha when switching from CJS to ESM.',
        },
        {
          type: 'heading',
          content: '__dirname and __filename in ESM',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'ESM path helpers',
          code: `import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// __filename equivalent
const __filename = fileURLToPath(import.meta.url);

// __dirname equivalent
const __dirname = dirname(__filename);

// Now use them normally
const configPath = join(__dirname, '..', 'config', 'default.json');

// Node 21.2+: import.meta.dirname and import.meta.filename
// These are built-in, no polyfill needed
console.log(import.meta.dirname);   // /home/user/project/src
console.log(import.meta.filename);  // /home/user/project/src/app.js`,
        },
        {
          type: 'heading',
          content: 'Dynamic Imports',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Dynamic import()',
          code: `// Dynamic imports work in both CJS and ESM
// They always return a Promise

// Conditional loading
const db = process.env.DB_TYPE === 'mongo'
  ? await import('./db/mongo.js')
  : await import('./db/postgres.js');

// Lazy loading heavy modules
async function generateReport() {
  const { default: PDFDocument } = await import('pdfkit');
  const doc = new PDFDocument();
  // ...
}

// Loading JSON in ESM (import assertions)
import config from './config.json' with { type: 'json' };

// Or use createRequire for JSON in ESM
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Module resolution order: 1) Core modules (node:fs) 2) node_modules packages 3) Relative/absolute file paths. Always prefix core modules with "node:" in ESM (e.g., import fs from "node:fs") for clarity and to avoid conflicts with npm packages of the same name.',
        },
      ],
    },

    // ─── Section 3: Event Loop & Async ───────────────────────────────
    {
      id: 'event-loop-async',
      title: 'Event Loop & Async',
      blocks: [
        {
          type: 'text',
          content:
            'The event loop is the heart of Node.js. It allows non-blocking I/O by offloading operations to the system kernel or thread pool, then executing callbacks when results are ready. Understanding its phases is key to writing performant code.',
        },
        {
          type: 'heading',
          content: 'Event Loop Phases',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Event loop phases (in order)',
          code: `/*
  ┌───────────────────────────┐
  │         timers            │  ← setTimeout, setInterval callbacks
  ├───────────────────────────┤
  │    pending callbacks      │  ← I/O callbacks deferred to next loop
  ├───────────────────────────┤
  │      idle, prepare        │  ← internal use only
  ├───────────────────────────┤
  │         poll              │  ← retrieve new I/O events, execute I/O callbacks
  ├───────────────────────────┤
  │         check             │  ← setImmediate callbacks
  ├───────────────────────────┤
  │    close callbacks        │  ← socket.on('close'), etc.
  └───────────────────────────┘

  Between EVERY phase, Node drains the microtask queue:
    1. process.nextTick callbacks (highest priority)
    2. Promise .then/.catch/.finally callbacks
*/

// Execution order demo
console.log('1 - synchronous');

setTimeout(() => console.log('2 - setTimeout (timers phase)'), 0);

setImmediate(() => console.log('3 - setImmediate (check phase)'));

Promise.resolve().then(() => console.log('4 - Promise microtask'));

process.nextTick(() => console.log('5 - nextTick microtask'));

// Output:
// 1 - synchronous
// 5 - nextTick microtask     (microtasks drain first)
// 4 - Promise microtask      (nextTick before Promise)
// 2 - setTimeout             (timers phase — order with setImmediate varies)
// 3 - setImmediate           (check phase)`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'process.nextTick starves the event loop if called recursively — it runs before ANY I/O. Prefer setImmediate for deferring work to the next loop iteration. Use process.nextTick only when you need to run something before any I/O (e.g., emitting events after construction).',
        },
        {
          type: 'heading',
          content: 'Async/Await Patterns',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Practical async patterns',
          code: `// ── Sequential execution ──
async function processOrders(orderIds) {
  const results = [];
  for (const id of orderIds) {
    const order = await fetchOrder(id);  // One at a time
    results.push(order);
  }
  return results;
}

// ── Parallel execution (much faster!) ──
async function processOrdersParallel(orderIds) {
  const promises = orderIds.map((id) => fetchOrder(id));
  const results = await Promise.all(promises);
  return results;
}

// ── Promise.allSettled — don't fail on one rejection ──
async function fetchAllUsers(userIds) {
  const results = await Promise.allSettled(
    userIds.map((id) => fetchUser(id))
  );

  const succeeded = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value);

  const failed = results
    .filter((r) => r.status === 'rejected')
    .map((r) => r.reason);

  console.log(\`\${succeeded.length} succeeded, \${failed.length} failed\`);
  return succeeded;
}

// ── Promise.race — first to resolve/reject wins ──
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();

  const result = await Promise.race([
    fetch(url, { signal: controller.signal }),
    new Promise((_, reject) =>
      setTimeout(() => {
        controller.abort();
        reject(new Error(\`Request timed out after \${ms}ms\`));
      }, ms)
    ),
  ]);

  return result;
}

// ── Promise.any — first to SUCCEED wins ──
async function fetchFromFastestMirror(mirrors) {
  try {
    const response = await Promise.any(
      mirrors.map((url) => fetch(url))
    );
    return response;
  } catch (err) {
    // AggregateError — all promises rejected
    console.error('All mirrors failed:', err.errors);
  }
}`,
        },
        {
          type: 'heading',
          content: 'Avoiding Event Loop Blocking',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Event loop blocking pitfalls',
          code: `// BAD: Blocks the event loop — no other requests can be served
app.get('/hash', (req, res) => {
  const hash = crypto.pbkdf2Sync('password', 'salt', 1000000, 64, 'sha512');
  res.json({ hash: hash.toString('hex') });
});

// GOOD: Use the async version — runs in libuv thread pool
app.get('/hash', async (req, res) => {
  const hash = await new Promise((resolve, reject) => {
    crypto.pbkdf2('password', 'salt', 1000000, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
  res.json({ hash: hash.toString('hex') });
});

// GOOD: Use promisified crypto
import { pbkdf2 } from 'node:crypto';
import { promisify } from 'node:util';
const pbkdf2Async = promisify(pbkdf2);

app.get('/hash', async (req, res) => {
  const hash = await pbkdf2Async('password', 'salt', 1000000, 64, 'sha512');
  res.json({ hash: hash.toString('hex') });
});

// BAD: Large synchronous JSON parse
const hugeData = JSON.parse(fs.readFileSync('huge-file.json', 'utf-8'));

// GOOD: Stream parse or use worker_threads for CPU-heavy work
import { Worker } from 'node:worker_threads';

function parseInWorker(filePath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./json-parser-worker.js', {
      workerData: { filePath },
    });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Rule of thumb: any operation that takes >10ms of CPU time should be offloaded to a Worker thread or broken into chunks with setImmediate. I/O operations (file reads, network calls, database queries) are already non-blocking.',
        },
      ],
    },

    // ─── Section 4: File System (fs) ─────────────────────────────────
    {
      id: 'file-system',
      title: 'File System (fs)',
      blocks: [
        {
          type: 'text',
          content:
            'The fs module provides three API styles: callback-based (original), synchronous (blocking), and promise-based (recommended). Always use fs/promises in async code. Use the path module to build cross-platform file paths.',
        },
        {
          type: 'heading',
          content: 'Reading & Writing Files',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'fs/promises API (recommended)',
          code: `import { readFile, writeFile, appendFile, copyFile, rename, rm } from 'node:fs/promises';
import { join } from 'node:path';

// Read a file
const data = await readFile(join(import.meta.dirname, 'config.json'), 'utf-8');
const config = JSON.parse(data);

// Write a file (creates or overwrites)
await writeFile('output.txt', 'Hello, Node.js!', 'utf-8');

// Append to a file
await appendFile('logs.txt', \`[\${new Date().toISOString()}] Server started\\n\`);

// Copy a file
await copyFile('source.txt', 'backup.txt');

// Rename / move a file
await rename('old-name.txt', 'new-name.txt');

// Delete a file
await rm('temp-file.txt');

// Read and write JSON
async function updateConfig(key, value) {
  const filePath = join(import.meta.dirname, 'config.json');
  const raw = await readFile(filePath, 'utf-8');
  const config = JSON.parse(raw);
  config[key] = value;
  await writeFile(filePath, JSON.stringify(config, null, 2), 'utf-8');
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never use fs.readFileSync or fs.writeFileSync in server code (e.g., inside route handlers). They block the event loop — no other requests are processed until the I/O completes. Sync methods are fine in CLI scripts, config loading at startup, or one-off utilities.',
        },
        {
          type: 'heading',
          content: 'Directories',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Working with directories',
          code: `import { mkdir, readdir, rm, stat, access, constants } from 'node:fs/promises';
import { join } from 'node:path';

// Create directory (recursive = create parent dirs too)
await mkdir('uploads/images/thumbnails', { recursive: true });

// List directory contents
const files = await readdir('./src');
console.log(files); // ['app.js', 'utils', 'routes']

// List with file types
const entries = await readdir('./src', { withFileTypes: true });
for (const entry of entries) {
  console.log(\`\${entry.name} — \${entry.isDirectory() ? 'dir' : 'file'}\`);
}

// Recursive directory listing (Node 18+)
const allFiles = await readdir('./src', { recursive: true });

// Get file info
const info = await stat('package.json');
console.log({
  size: info.size,               // bytes
  isFile: info.isFile(),
  isDir: info.isDirectory(),
  created: info.birthtime,
  modified: info.mtime,
});

// Check if file exists (don't use fs.exists — it's deprecated)
async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// Remove directory recursively
await rm('temp-dir', { recursive: true, force: true });`,
        },
        {
          type: 'heading',
          content: 'Watching Files',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'File watching with fs.watch',
          code: `import { watch } from 'node:fs/promises';

// Watch a directory for changes (Node 18+ async iterator)
async function watchDir(dir) {
  const watcher = watch(dir, { recursive: true });

  for await (const event of watcher) {
    console.log(\`\${event.eventType}: \${event.filename}\`);
    // eventType: 'rename' (created/deleted) or 'change' (modified)
  }
}

watchDir('./src').catch(console.error);`,
        },
        {
          type: 'heading',
          content: 'Path Module Essentials',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'path module',
          code: `import path from 'node:path';

// Join paths (handles OS separators)
path.join('/users', 'alice', 'docs', 'file.txt');
// → '/users/alice/docs/file.txt'

// Resolve to absolute path
path.resolve('src', 'utils', 'helpers.js');
// → '/home/user/project/src/utils/helpers.js'

// Get parts of a path
path.basename('/home/user/file.txt');          // 'file.txt'
path.basename('/home/user/file.txt', '.txt');  // 'file'
path.dirname('/home/user/file.txt');           // '/home/user'
path.extname('photo.jpg');                     // '.jpg'

// Parse a full path
path.parse('/home/user/docs/report.pdf');
// { root: '/', dir: '/home/user/docs', base: 'report.pdf',
//   ext: '.pdf', name: 'report' }

// Normalize messy paths
path.normalize('/users/alice/../bob/./docs');
// → '/users/bob/docs'`,
        },
      ],
    },

    // ─── Section 5: Streams & Buffers ────────────────────────────────
    {
      id: 'streams-buffers',
      title: 'Streams & Buffers',
      blocks: [
        {
          type: 'text',
          content:
            'Streams process data piece-by-piece without loading everything into memory. This is essential for large files, HTTP responses, and real-time data. There are four stream types: Readable, Writable, Duplex (both), and Transform (modify data in transit).',
        },
        {
          type: 'heading',
          content: 'Reading Files with Streams',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Readable streams',
          code: `import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

// Read a large file without loading it all into memory
const stream = createReadStream('large-file.csv', {
  encoding: 'utf-8',
  highWaterMark: 64 * 1024,  // 64KB chunks (default: 64KB)
});

// Event-based consumption
stream.on('data', (chunk) => {
  console.log(\`Received \${chunk.length} bytes\`);
});
stream.on('end', () => console.log('Done reading'));
stream.on('error', (err) => console.error('Read error:', err));

// Async iterator (cleaner, modern approach)
import { createReadStream } from 'node:fs';

async function processFile(filePath) {
  const stream = createReadStream(filePath, 'utf-8');
  let lineCount = 0;

  for await (const chunk of stream) {
    lineCount += chunk.split('\\n').length - 1;
  }

  console.log(\`Total lines: \${lineCount}\`);
}`,
        },
        {
          type: 'heading',
          content: 'Writing with Streams',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Writable streams',
          code: `import { createWriteStream } from 'node:fs';

const writer = createWriteStream('output.log', { flags: 'a' }); // 'a' = append

// Write data
writer.write('Log entry 1\\n');
writer.write('Log entry 2\\n');

// Respect backpressure
function writeLotsOfData(writer, data) {
  let i = 0;

  function write() {
    let ok = true;
    while (i < data.length && ok) {
      ok = writer.write(data[i] + '\\n');
      i++;
    }
    if (i < data.length) {
      // Backpressure! Wait for drain before continuing
      writer.once('drain', write);
    } else {
      writer.end();
    }
  }

  write();
}`,
        },
        {
          type: 'heading',
          content: 'Piping & pipeline()',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Stream piping',
          code: `import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip, createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

// Compress a file using pipeline (handles errors + backpressure)
await pipeline(
  createReadStream('access.log'),
  createGzip(),
  createWriteStream('access.log.gz')
);

// Custom transform stream — uppercase all text
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

await pipeline(
  createReadStream('input.txt'),
  upperCase,
  createWriteStream('output.txt')
);

// Streaming HTTP response (e.g., large file download)
import http from 'node:http';

const server = http.createServer(async (req, res) => {
  if (req.url === '/download') {
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="data.csv"',
    });

    await pipeline(createReadStream('data.csv'), res);
  }
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always use pipeline() instead of .pipe(). The .pipe() method does NOT forward errors or clean up streams on failure. pipeline() handles error propagation, backpressure, and stream cleanup automatically.',
        },
        {
          type: 'heading',
          content: 'Buffer Basics',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Working with Buffers',
          code: `// Buffers represent raw binary data (fixed-size memory allocation)

// Create buffers
const buf1 = Buffer.from('Hello, Node.js');           // From string
const buf2 = Buffer.alloc(256);                        // Pre-allocated, zero-filled
const buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c]);   // From byte array

// Convert to string
console.log(buf1.toString());         // 'Hello, Node.js'
console.log(buf1.toString('base64')); // Base64 encoding

// Buffer operations
console.log(buf1.length);             // 14 (bytes, not characters)
console.log(buf1.includes('Node'));    // true
const slice = buf1.subarray(0, 5);    // 'Hello' (shared memory!)

// Concatenate buffers
const combined = Buffer.concat([buf1, Buffer.from(' - v20')]);

// Compare buffers
Buffer.compare(buf1, buf2);  // -1, 0, or 1
buf1.equals(buf3);            // false

// Common use: base64 encode/decode
const base64 = Buffer.from('secret:password').toString('base64');
const decoded = Buffer.from(base64, 'base64').toString('utf-8');`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Buffers in Node.js are backed by ArrayBuffer (V8 heap memory). They are NOT resizable — you must create a new buffer for a different size. For strings, always specify the encoding to avoid surprises with multi-byte characters (UTF-8 is default).',
        },
      ],
    },

    // ─── Section 6: Child Processes ──────────────────────────────────
    {
      id: 'child-processes',
      title: 'Child Processes',
      blocks: [
        {
          type: 'text',
          content:
            'Node.js can spawn child processes to run shell commands, execute scripts, or offload CPU-heavy work. The child_process module provides four methods: exec (buffered), execFile (no shell), spawn (streamed), and fork (Node.js IPC).',
        },
        {
          type: 'heading',
          content: 'exec — Run Shell Commands (Buffered)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'exec',
          code: `import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// Simple command
const { stdout, stderr } = await execAsync('ls -la');
console.log(stdout);

// With options
const { stdout: gitLog } = await execAsync('git log --oneline -5', {
  cwd: '/path/to/repo',          // Working directory
  timeout: 10000,                 // Kill after 10s
  maxBuffer: 1024 * 1024 * 10,   // 10MB output buffer
  env: { ...process.env, NODE_ENV: 'production' },
});

// Get disk usage
const { stdout: diskInfo } = await execAsync('df -h /');
console.log(diskInfo);`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'exec runs commands through a shell (/bin/sh), so it is vulnerable to shell injection. NEVER pass user input to exec. Use execFile or spawn for untrusted input.',
        },
        {
          type: 'heading',
          content: 'spawn — Streamed Output',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'spawn',
          code: `import { spawn } from 'node:child_process';

// spawn gives you streams — great for long-running or large-output commands
const child = spawn('find', ['.', '-name', '*.js', '-type', 'f'], {
  cwd: '/home/user/project',
});

child.stdout.on('data', (data) => {
  console.log(\`stdout: \${data}\`);
});

child.stderr.on('data', (data) => {
  console.error(\`stderr: \${data}\`);
});

child.on('close', (code) => {
  console.log(\`Process exited with code \${code}\`);
});

// Pipe spawn output to a file
import { createWriteStream } from 'node:fs';
const logFile = createWriteStream('npm-install.log');
const install = spawn('npm', ['install'], { cwd: './my-project' });
install.stdout.pipe(logFile);
install.stderr.pipe(logFile);

// Inherit stdio — pass through to parent terminal
const tests = spawn('npm', ['test'], {
  stdio: 'inherit',   // Child uses parent's stdin/stdout/stderr
  cwd: './my-project',
});`,
        },
        {
          type: 'heading',
          content: 'fork — Node.js IPC',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'fork — parent/child communication',
          code: `// ── parent.js ──
import { fork } from 'node:child_process';

const child = fork('./worker.js');

// Send message to child
child.send({ task: 'processData', payload: [1, 2, 3, 4, 5] });

// Receive message from child
child.on('message', (result) => {
  console.log('Result from worker:', result);
  child.kill();  // Clean up when done
});

child.on('exit', (code) => {
  console.log(\`Worker exited with code \${code}\`);
});

// ── worker.js ──
process.on('message', (msg) => {
  if (msg.task === 'processData') {
    // CPU-intensive work here
    const result = msg.payload.map((n) => n * n);
    process.send({ status: 'done', data: result });
  }
});`,
        },
        {
          type: 'heading',
          content: 'Worker Threads (for CPU-bound work)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'worker_threads',
          code: `// ── main.js ──
import { Worker } from 'node:worker_threads';

function runHashWorker(password) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./hash-worker.js', {
      workerData: { password },
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(\`Worker stopped with code \${code}\`));
    });
  });
}

const hash = await runHashWorker('myPassword123');
console.log('Hash:', hash);

// ── hash-worker.js ──
import { parentPort, workerData } from 'node:worker_threads';
import { scryptSync } from 'node:crypto';

const { password } = workerData;
const salt = 'random-salt';
const hash = scryptSync(password, salt, 64).toString('hex');

parentPort.postMessage(hash);`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use fork() when you need to run another Node.js script with built-in IPC. Use worker_threads when you need shared memory (SharedArrayBuffer) and true multi-threading for CPU-intensive tasks within the same process. Use spawn() for non-Node commands or when you need streamed output.',
        },
      ],
    },

    // ─── Section 7: Clustering & Performance ─────────────────────────
    {
      id: 'clustering-performance',
      title: 'Clustering & Performance',
      blocks: [
        {
          type: 'text',
          content:
            'Node.js runs on a single thread by default. To utilize multiple CPU cores, use the cluster module to fork worker processes, or use PM2 for production process management with zero-downtime reloads.',
        },
        {
          type: 'heading',
          content: 'Cluster Module',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'cluster.js',
          code: `import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import http from 'node:http';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);
  console.log(\`Forking \${numCPUs} workers...\`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart crashed workers
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died (code: \${code}). Restarting...\`);
    cluster.fork();
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('Primary received SIGTERM. Shutting down workers...');
    for (const id in cluster.workers) {
      cluster.workers[id].kill('SIGTERM');
    }
  });
} else {
  // Workers share the same port
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(\`Hello from worker \${process.pid}\\n\`);
    })
    .listen(3000);

  console.log(\`Worker \${process.pid} started\`);
}`,
        },
        {
          type: 'heading',
          content: 'PM2 Process Manager',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'PM2 commands',
          code: `# Install PM2 globally
npm install -g pm2

# Start with cluster mode (auto-detect CPU count)
pm2 start server.js -i max --name my-api

# Or use an ecosystem file
pm2 start ecosystem.config.cjs

# Monitoring
pm2 monit          # Real-time dashboard
pm2 status         # Process list
pm2 logs           # Tail logs
pm2 logs --lines 100

# Zero-downtime reload
pm2 reload my-api

# Startup script (auto-start on boot)
pm2 startup
pm2 save`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'ecosystem.config.cjs',
          code: `module.exports = {
  apps: [
    {
      name: 'my-api',
      script: 'src/server.js',
      instances: 'max',          // Use all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
      max_memory_restart: '500M',  // Restart if memory exceeds 500MB
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};`,
        },
        {
          type: 'heading',
          content: 'Memory Monitoring & Profiling',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Performance monitoring',
          code: `// Memory usage
const used = process.memoryUsage();
console.log({
  rss: \`\${Math.round(used.rss / 1024 / 1024)} MB\`,        // Total allocated
  heapTotal: \`\${Math.round(used.heapTotal / 1024 / 1024)} MB\`, // V8 heap allocated
  heapUsed: \`\${Math.round(used.heapUsed / 1024 / 1024)} MB\`,  // V8 heap used
  external: \`\${Math.round(used.external / 1024 / 1024)} MB\`,   // C++ objects
});

// Performance timing
import { performance, PerformanceObserver } from 'node:perf_hooks';

// Mark-based timing
performance.mark('db-start');
await database.query('SELECT * FROM users');
performance.mark('db-end');
performance.measure('Database query', 'db-start', 'db-end');

// Observer to collect measurements
const obs = new PerformanceObserver((items) => {
  for (const entry of items.getEntries()) {
    console.log(\`\${entry.name}: \${entry.duration.toFixed(2)}ms\`);
  }
});
obs.observe({ entryTypes: ['measure'] });

// Simple timing helper
function timeAsync(label, fn) {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    console.log(\`\${label}: \${(performance.now() - start).toFixed(2)}ms\`);
    return result;
  };
}

const timedQuery = timeAsync('DB Query', fetchUsers);
await timedQuery();`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Start the inspector with "node --inspect src/server.js", then open chrome://inspect in Chrome. You can profile CPU usage, take heap snapshots, and debug memory leaks. For production, use "node --inspect=0.0.0.0:9229" with proper firewall rules.',
        },
      ],
    },

    // ─── Section 8: Events & EventEmitter ────────────────────────────
    {
      id: 'events-eventemitter',
      title: 'Events & EventEmitter',
      blocks: [
        {
          type: 'text',
          content:
            'EventEmitter is the backbone of Node.js event-driven architecture. Streams, HTTP servers, and most core modules extend EventEmitter. You can create custom event-driven classes for decoupled, reactive designs.',
        },
        {
          type: 'heading',
          content: 'Basic EventEmitter Usage',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'EventEmitter basics',
          code: `import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

// Register a listener
emitter.on('order:created', (order) => {
  console.log(\`New order: \${order.id} — $\${order.total}\`);
});

// Register a one-time listener
emitter.once('server:ready', (port) => {
  console.log(\`Server started on port \${port}\`);
});

// Emit events
emitter.emit('order:created', { id: 'ORD-001', total: 59.99 });
emitter.emit('server:ready', 3000);
emitter.emit('server:ready', 3000);  // Won't fire — once already consumed

// Remove a specific listener
function onData(data) { console.log(data); }
emitter.on('data', onData);
emitter.off('data', onData);    // or emitter.removeListener('data', onData)

// Remove all listeners for an event
emitter.removeAllListeners('data');

// Get listener count
console.log(emitter.listenerCount('order:created')); // 1`,
        },
        {
          type: 'heading',
          content: 'Custom Event-Driven Classes',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Extending EventEmitter',
          code: `import { EventEmitter } from 'node:events';

class OrderService extends EventEmitter {
  #orders = new Map();

  async createOrder(userId, items) {
    const order = {
      id: \`ORD-\${Date.now()}\`,
      userId,
      items,
      total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
      status: 'pending',
      createdAt: new Date(),
    };

    this.#orders.set(order.id, order);

    // Emit event for other parts of the system to react to
    this.emit('order:created', order);

    return order;
  }

  async cancelOrder(orderId) {
    const order = this.#orders.get(orderId);
    if (!order) throw new Error('Order not found');

    order.status = 'cancelled';
    this.emit('order:cancelled', order);

    return order;
  }
}

// Usage — loosely coupled listeners
const orderService = new OrderService();

// Email service listens for orders
orderService.on('order:created', (order) => {
  console.log(\`Sending confirmation email for order \${order.id}\`);
  // sendEmail(order.userId, 'Order Confirmation', ...);
});

// Analytics service listens for orders
orderService.on('order:created', (order) => {
  console.log(\`Tracking order \${order.id}: $\${order.total}\`);
  // analytics.track('order_created', { total: order.total });
});

// Inventory service listens for cancellations
orderService.on('order:cancelled', (order) => {
  console.log(\`Restocking items for order \${order.id}\`);
  // inventory.restock(order.items);
});

await orderService.createOrder('user-123', [
  { name: 'Keyboard', price: 79.99, qty: 1 },
  { name: 'Mouse', price: 29.99, qty: 2 },
]);`,
        },
        {
          type: 'heading',
          content: 'Error Events & Best Practices',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Error handling in EventEmitter',
          code: `import { EventEmitter } from 'node:events';

const emitter = new EventEmitter();

// IMPORTANT: If an 'error' event is emitted with no listener,
// Node.js throws the error and crashes the process!
// Always add an error listener:
emitter.on('error', (err) => {
  console.error('Emitter error:', err.message);
});

// Set max listeners (default is 10, warns about memory leaks)
emitter.setMaxListeners(20);

// Async event handling with once()
import { once } from 'node:events';

async function waitForReady(server) {
  // Returns a Promise that resolves when the event fires
  const [port] = await once(server, 'listening');
  console.log(\`Server ready on port \${port}\`);
}

// AbortController to cancel waiting
const ac = new AbortController();
setTimeout(() => ac.abort(), 5000);

try {
  await once(emitter, 'data', { signal: ac.signal });
} catch (err) {
  if (err.code === 'ABORT_ERR') {
    console.log('Timed out waiting for data event');
  }
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always handle the "error" event on EventEmitters. An unhandled "error" event will crash the Node.js process. This applies to streams, servers, sockets, and any custom EventEmitter.',
        },
      ],
    },

    // ─── Section 9: Error Handling ───────────────────────────────────
    {
      id: 'error-handling',
      title: 'Error Handling',
      blocks: [
        {
          type: 'text',
          content:
            'Robust error handling is the difference between a toy project and a production service. Distinguish between operational errors (expected failures like invalid input, network issues) and programmer errors (bugs like undefined references, type errors). Handle each differently.',
        },
        {
          type: 'heading',
          content: 'Global Error Handlers',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Process-level error handling',
          code: `// ── Catch unhandled promise rejections ──
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(reason);

  // Give the server time to finish existing requests, then exit
  server.close(() => {
    process.exit(1);
  });
});

// ── Catch uncaught exceptions ──
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);

  // Must exit — the process is in an undefined state
  process.exit(1);
});

// ── Handle termination signals ──
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received (Ctrl+C). Shutting down...');
  server.close(() => {
    process.exit(0);
  });
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'After an uncaughtException, the process MUST exit. The application state is undefined — continuing can cause data corruption, memory leaks, or security vulnerabilities. Log the error, close connections, and exit. Use a process manager (PM2) to auto-restart.',
        },
        {
          type: 'heading',
          content: 'Custom Error Classes',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'AppError class',
          code: `class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;  // Distinguishes from programmer errors

    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(\`\${resource} not found\`, 404);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Not authenticated') {
    super(message, 401);
  }
}

// Usage
throw new NotFoundError('User');
// → { message: 'User not found', statusCode: 404, status: 'fail', isOperational: true }`,
        },
        {
          type: 'heading',
          content: 'Graceful Shutdown Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Graceful shutdown',
          code: `import http from 'node:http';

const server = http.createServer(app);
const connections = new Set();

// Track open connections
server.on('connection', (conn) => {
  connections.add(conn);
  conn.on('close', () => connections.delete(conn));
});

function gracefulShutdown(signal) {
  console.log(\`\${signal} received. Starting graceful shutdown...\`);

  // 1. Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed');

    try {
      // 2. Close database connections
      await mongoose.connection.close();
      console.log('Database connection closed');

      // 3. Close Redis connections
      await redisClient.quit();
      console.log('Redis connection closed');

      // 4. Exit cleanly
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });

  // Force-close connections that aren't ending
  setTimeout(() => {
    console.error('Forcing shutdown — destroying remaining connections');
    for (const conn of connections) {
      conn.destroy();
    }
    process.exit(1);
  }, 10000); // 10 second timeout
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));`,
        },
        {
          type: 'heading',
          content: 'Error-First Callbacks',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Error-first callback pattern',
          code: `import { readFile } from 'node:fs';
import { promisify } from 'node:util';

// Traditional error-first callback (Node convention)
readFile('config.json', 'utf-8', (err, data) => {
  if (err) {
    console.error('Failed to read config:', err.message);
    return;  // Always return after handling error!
  }
  console.log(JSON.parse(data));
});

// Convert callback-based functions to promises
const readFileAsync = promisify(readFile);
const data = await readFileAsync('config.json', 'utf-8');

// Wrap callback APIs for async/await
function connectToDb(url) {
  return new Promise((resolve, reject) => {
    db.connect(url, (err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });
  });
}

try {
  const conn = await connectToDb('mongodb://localhost:27017/mydb');
} catch (err) {
  console.error('DB connection failed:', err.message);
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Process exit codes: 0 = success, 1 = general error (uncaught exception), 2 = shell misuse, 12 = invalid debug argument, 13 = unfinished top-level await. Always exit with code 1 for errors so process managers know to restart.',
        },
      ],
    },

    // ─── Section 10: Environment Variables ───────────────────────────
    {
      id: 'environment-variables',
      title: 'Environment Variables',
      blocks: [
        {
          type: 'text',
          content:
            'Environment variables keep secrets out of source code and allow different configurations per environment (development, staging, production). Node 20.6+ has built-in .env file loading — no third-party package needed.',
        },
        {
          type: 'heading',
          content: '.env File Pattern',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env',
          code: `# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/mydb
DATABASE_PASSWORD=super_secret_password

# JWT
JWT_SECRET=my-ultra-secure-jwt-secret-key-change-in-prod
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Server
NODE_ENV=development
PORT=3000

# Email (Mailtrap for dev, SendGrid for prod)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_USERNAME=your_mailtrap_user
EMAIL_PASSWORD=your_mailtrap_pass

# Third-party APIs
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_URL=cloudinary://...`,
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.gitignore',
          code: `# ALWAYS ignore .env files!
.env
.env.local
.env.production
.env.*.local

# Keep the template
!.env.example`,
        },
        {
          type: 'heading',
          content: 'Loading Environment Variables',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Loading .env',
          code: `// ── Option 1: Node 20.6+ built-in .env loading ──
// No package needed! Just start with:
// node --env-file=.env src/server.js
// node --env-file=.env --env-file=.env.local src/server.js

// ── Option 2: dotenv package (for older Node versions) ──
// npm install dotenv
import 'dotenv/config';  // Load at the very top of entry file

// ── Accessing variables ──
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

// ── Config module pattern (recommended) ──
// config.js
import 'dotenv/config';

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(\`Missing required environment variable: \${key}\`);
  }
  return value;
}

export const config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    url: requireEnv('DATABASE_URL'),
    password: requireEnv('DATABASE_PASSWORD'),
  },
  jwt: {
    secret: requireEnv('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};`,
        },
        {
          type: 'heading',
          content: 'Environment-Specific Configs',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Environment-specific configuration',
          code: `// config/index.js
import 'dotenv/config';

const baseConfig = {
  port: parseInt(process.env.PORT, 10) || 3000,
  apiVersion: 'v1',
};

const envConfig = {
  development: {
    db: { url: 'mongodb://localhost:27017/myapp-dev' },
    logging: { level: 'debug' },
    cors: { origin: 'http://localhost:5173' },
  },
  test: {
    db: { url: 'mongodb://localhost:27017/myapp-test' },
    logging: { level: 'warn' },
    cors: { origin: '*' },
  },
  production: {
    db: { url: process.env.DATABASE_URL },
    logging: { level: 'error' },
    cors: { origin: process.env.CLIENT_URL },
  },
};

const env = process.env.NODE_ENV || 'development';

export const config = {
  ...baseConfig,
  ...envConfig[env],
  env,
};`,
        },
        {
          type: 'heading',
          content: '.env.example Template',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env.example (commit this to git)',
          code: `# Copy this file to .env and fill in the values
# cp .env.example .env

DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname
DATABASE_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=90d

NODE_ENV=development
PORT=3000

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USERNAME=
EMAIL_PASSWORD=`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'NEVER commit .env files to git. NEVER log process.env (it may contain secrets). NEVER embed secrets in Dockerfiles or docker-compose.yml. Use your hosting platform\'s environment variable settings (Render, Railway, Vercel, AWS Secrets Manager) for production secrets.',
        },
      ],
    },

    // ─── Section 11: HTTP & Networking ───────────────────────────────
    {
      id: 'http-networking',
      title: 'HTTP & Networking',
      blocks: [
        {
          type: 'text',
          content:
            'The http/https modules are the foundation of Node.js networking. While you will typically use Express or Fastify, understanding the raw HTTP module is valuable for debugging, custom servers, and making outbound requests.',
        },
        {
          type: 'heading',
          content: 'Creating a Basic HTTP Server',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Basic HTTP server',
          code: `import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;

  // Routing
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Node.js!');
  } else if (method === 'GET' && url === '/api/users') {
    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (method === 'POST' && url === '/api/users') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      const user = JSON.parse(body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ id: 3, ...user }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
        },
        {
          type: 'heading',
          content: 'Making HTTP Requests (Native fetch)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Native fetch (Node 18+)',
          code: `// Node 18+ has global fetch — no packages needed!

// GET request
const response = await fetch('https://jsonplaceholder.typicode.com/users');
const users = await response.json();

// POST request
const newUser = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});

if (!newUser.ok) {
  throw new Error(\`HTTP \${newUser.status}: \${newUser.statusText}\`);
}

const created = await newUser.json();

// With timeout using AbortController
async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(\`Request to \${url} timed out after \${timeoutMs}ms\`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Retry with exponential backoff
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status >= 500 && attempt < retries) {
        await new Promise((r) => setTimeout(r, 2 ** attempt * 1000));
        continue;
      }
      throw new Error(\`HTTP \${response.status}\`);
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 2 ** attempt * 1000));
    }
  }
}`,
        },
        {
          type: 'heading',
          content: 'URL and URLSearchParams',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'URL parsing',
          code: `// Parse URLs (WHATWG URL API — same as browsers)
const url = new URL('https://example.com:8080/api/users?page=2&limit=10#section');

console.log(url.hostname);     // 'example.com'
console.log(url.port);         // '8080'
console.log(url.pathname);     // '/api/users'
console.log(url.search);       // '?page=2&limit=10'
console.log(url.hash);         // '#section'
console.log(url.origin);       // 'https://example.com:8080'

// Query string manipulation
const params = new URLSearchParams({ page: 1, limit: 20, sort: 'name' });
params.append('filter', 'active');
params.set('page', 2);
params.delete('sort');

console.log(params.toString());   // 'page=2&limit=20&filter=active'
console.log(params.get('page'));  // '2'
console.log(params.has('sort'));  // false

// Iterate params
for (const [key, value] of params) {
  console.log(\`\${key} = \${value}\`);
}

// Build API URL
function buildApiUrl(base, path, queryParams) {
  const url = new URL(path, base);
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, value);
  });
  return url.toString();
}

const apiUrl = buildApiUrl('https://api.example.com', '/v1/users', {
  page: 1,
  limit: 20,
  role: 'admin',
});
// → 'https://api.example.com/v1/users?page=1&limit=20&role=admin'`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Node 18+ includes a stable global fetch (based on undici). For older Node versions, use the "undici" package or "node-fetch". Avoid the legacy http.request/https.request for outbound calls — fetch is simpler and more consistent with browser APIs.',
        },
      ],
    },

    // ─── Section 12: Security & Best Practices ──────────────────────
    {
      id: 'security-best-practices',
      title: 'Security & Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'Node.js security goes beyond framework-level middleware. These are runtime-level and dependency-level practices every Node.js developer should follow.',
        },
        {
          type: 'heading',
          content: 'Dependency Security',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Dependency audit commands',
          code: `# Audit dependencies for known vulnerabilities
npm audit

# Auto-fix vulnerabilities where possible
npm audit fix

# Force fix (may include breaking changes)
npm audit fix --force

# Check for outdated packages
npm outdated

# Update all packages to latest within semver range
npm update

# Interactive upgrade tool
npx npm-check-updates -i

# Lock down dependencies with exact versions
npm config set save-exact true

# Use lockfiles — always commit package-lock.json
# In CI/CD, use npm ci instead of npm install`,
        },
        {
          type: 'heading',
          content: 'Input Validation & Sanitization',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Input validation patterns',
          code: `// NEVER trust user input — validate and sanitize everything

// ── Avoid eval and dynamic code execution ──
// BAD: Remote code execution vulnerability!
eval(userInput);
new Function(userInput)();
setTimeout(userInput, 0);        // When passed a string
setInterval(userInput, 1000);    // When passed a string
child_process.exec(userInput);   // Shell injection

// GOOD: Use safe alternatives
JSON.parse(userInput);           // Instead of eval for JSON
// Use spawn with argument array instead of exec
spawn('git', ['log', '--oneline'], { shell: false });

// ── Prevent prototype pollution ──
// BAD: Merging user input into objects
function merge(target, source) {
  for (const key in source) {
    target[key] = source[key]; // User can set __proto__, constructor
  }
}

// GOOD: Validate object keys
function safeMerge(target, source, allowedKeys) {
  for (const key of allowedKeys) {
    if (key in source) {
      target[key] = source[key];
    }
  }
  return target;
}

// GOOD: Use Object.create(null) for dictionaries
const safeDict = Object.create(null);  // No prototype chain

// ── Validate with a schema library ──
// Using Joi (npm install joi)
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(120),
  role: Joi.string().valid('user', 'admin').default('user'),
});

function validateUser(data) {
  const { error, value } = userSchema.validate(data, {
    abortEarly: false,     // Return all errors, not just the first
    stripUnknown: true,    // Remove fields not in schema
  });

  if (error) {
    const messages = error.details.map((d) => d.message);
    throw new ValidationError(\`Invalid input: \${messages.join(', ')}\`);
  }

  return value;  // Sanitized and validated data
}`,
        },
        {
          type: 'heading',
          content: 'Security Headers & Rate Limiting',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Security headers (raw Node.js)',
          code: `import http from 'node:http';

const server = http.createServer((req, res) => {
  // Security headers (what helmet does under the hood)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0');  // Disabled — use CSP instead
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Remove server fingerprint
  res.removeHeader('X-Powered-By');

  // ... handle request
});

// ── Simple in-memory rate limiter ──
const rateLimitMap = new Map();

function rateLimit(req, res, { windowMs = 60000, max = 100 } = {}) {
  const ip = req.socket.remoteAddress;
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const entry = rateLimitMap.get(ip);

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + windowMs;
    return true;
  }

  entry.count++;

  if (entry.count > max) {
    res.writeHead(429, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Too many requests. Try again later.' }));
    return false;
  }

  return true;
}`,
        },
        {
          type: 'heading',
          content: 'Process Security',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Process-level security',
          code: `// ── Run with least privilege ──
// Don't run Node.js as root in production!
if (process.getuid && process.getuid() === 0) {
  console.error('Do NOT run this server as root!');
  process.exit(1);
}

// ── Limit event loop lag monitoring ──
let lastCheck = Date.now();

setInterval(() => {
  const now = Date.now();
  const lag = now - lastCheck - 1000;  // Expected interval: 1000ms
  if (lag > 100) {
    console.warn(\`Event loop lag: \${lag}ms — possible blocking operation\`);
  }
  lastCheck = now;
}, 1000);

// ── Prevent large payload attacks ──
import http from 'node:http';

const server = http.createServer((req, res) => {
  let body = '';
  let bodySize = 0;
  const MAX_BODY_SIZE = 1024 * 100; // 100KB

  req.on('data', (chunk) => {
    bodySize += chunk.length;
    if (bodySize > MAX_BODY_SIZE) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Payload too large' }));
      req.destroy();
      return;
    }
    body += chunk;
  });

  req.on('end', () => {
    // Process body safely
  });
});

// ── Set timeouts ──
server.timeout = 30000;           // 30s request timeout
server.headersTimeout = 60000;    // 60s to receive headers
server.keepAliveTimeout = 72000;  // 72s keep-alive
server.requestTimeout = 30000;    // 30s total request time (Node 18+)`,
        },
        {
          type: 'heading',
          content: 'Security Checklist',
        },
        {
          type: 'list',
          items: [
            'Keep Node.js and dependencies up to date (npm audit, npm outdated)',
            'Never run as root in production — use a non-root user in Docker',
            'Validate and sanitize ALL user input (body, query, params, headers)',
            'Use parameterized queries for databases (no string concatenation)',
            'Set request size limits and timeouts on HTTP servers',
            'Never use eval(), new Function(), or pass strings to setTimeout/setInterval',
            'Use environment variables for secrets — never hardcode or commit them',
            'Enable HTTPS in production (TLS termination at load balancer is fine)',
            'Set security HTTP headers (use helmet in Express, manual in raw Node)',
            'Implement rate limiting for public APIs',
            'Use npm ci (not npm install) in CI/CD for deterministic builds',
            'Run npm audit in your CI pipeline and fail on critical vulnerabilities',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For Express apps, the security stack is: helmet (headers) + express-rate-limit (rate limiting) + express-mongo-sanitize (NoSQL injection) + hpp (parameter pollution) + cors (cross-origin). For raw Node.js, implement equivalent protections manually as shown above.',
        },
      ],
    },
  ],
};

export default nodejsData;
