const databasesData = {
  id: 'databases',
  name: 'Databases with Express.js',
  description:
    'SQL & NoSQL database patterns, ORMs, query builders, and connection management for Express.js',
  sections: [
    // ─── Section 1: SQL vs NoSQL ───────────────────────────────────────
    {
      id: 'sql-vs-nosql',
      title: 'SQL vs NoSQL: Choosing a Database',
      blocks: [
        {
          type: 'text',
          content:
            'Choosing between SQL and NoSQL depends on your data structure, query patterns, and scalability needs. SQL databases enforce schemas and excel at relational data, while NoSQL databases offer flexibility and horizontal scaling.',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'comparison-table.md',
          code: `Feature            │ SQL (PostgreSQL, MySQL)       │ NoSQL (MongoDB)
───────────────────┼──────────────────────────────┼──────────────────────────────
Data Model         │ Tables with rows & columns   │ Collections with documents
Schema             │ Fixed schema (migrations)    │ Flexible / schema-less
Relationships      │ JOINs, foreign keys          │ Embedded docs or references
Query Language     │ SQL                          │ MongoDB Query API / MQL
Transactions       │ Full ACID                    │ Multi-doc ACID (v4.0+)
Scaling            │ Vertical (read replicas)     │ Horizontal (sharding)
Best For           │ Complex relations, reporting  │ Rapid iteration, nested data`,
        },
        {
          type: 'heading',
          content: 'When to Use Each',
        },
        {
          type: 'list',
          items: [
            'SQL — E-commerce, finance, CMS, any app with complex relationships or reporting needs',
            'NoSQL — Real-time apps, IoT, content management with varied schemas, rapid prototyping',
            'Both — Many production apps use SQL for core data and NoSQL/Redis for caching or sessions',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Start with PostgreSQL if you\'re unsure — it handles JSON columns (jsonb), full-text search, and relational data equally well. You get the flexibility of NoSQL with the guarantees of SQL.',
        },
      ],
    },

    // ─── Section 2: When to Use Each Database ─────────────────────────
    {
      id: 'when-to-use',
      title: 'When to Use Each Database',
      blocks: [
        {
          type: 'text',
          content:
            'Every database has a sweet spot. This guide maps each option to real-world use cases so you can make a deliberate choice rather than defaulting to whatever you used last time.',
        },
        {
          type: 'heading',
          content: 'Decision Guide',
        },
        {
          type: 'list',
          items: [
            'Need auth + storage + realtime out of the box on a hosted PostgreSQL? → Supabase',
            'Need relational data, complex queries, or financial integrity? → PostgreSQL',
            'Building a Node.js/PHP app on a LAMP/LEMP-style stack or need high read throughput? → MySQL',
            'Prototyping, desktop app, CLI tool, or need zero-setup embedded storage? → SQLite',
            'Data is document-like, schema varies per record, or you need horizontal sharding? → MongoDB',
            'Need caching, sessions, rate limiting, pub/sub, or ephemeral real-time data? → Redis',
            'Not sure? → PostgreSQL. It handles relational, JSON, full-text, and geospatial in one engine.',
          ],
        },
        {
          type: 'heading',
          content: 'PostgreSQL',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'postgresql-use-cases.md',
          code: `Best for
────────────────────────────────────────────────────────────────────
✓ E-commerce            — orders, products, inventory, payments
✓ SaaS / multi-tenant   — row-level security, complex schemas
✓ Fintech               — ACID transactions, audit logs, reporting
✓ Analytics dashboards  — CTEs, window functions, aggregations
✓ Social platforms      — users, posts, follows, likes (relational graph)
✓ APIs with filtering   — full-text search, JSONB, GIN indexes
✓ Any "I'm not sure"    — handles SQL + JSON + geo in one engine

Avoid when
────────────────────────────────────────────────────────────────────
✗ You need horizontal auto-sharding across many nodes
✗ Data is truly schema-less and changes every week
✗ Ultra-low-latency in-memory access (use Redis alongside it)`,
        },
        {
          type: 'heading',
          content: 'MySQL',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'mysql-use-cases.md',
          code: `Best for
────────────────────────────────────────────────────────────────────
✓ LAMP/LEMP stacks      — WordPress, Drupal, legacy PHP apps
✓ Read-heavy web apps   — high-throughput SELECT with replication
✓ Shared hosting        — widely supported by budget hosts
✓ Simple CRUD apps      — blogs, portfolios, small business sites
✓ Existing MySQL infra  — team/ops already knows MySQL

Avoid when
────────────────────────────────────────────────────────────────────
✗ Complex JOIN-heavy reporting (PostgreSQL window functions are better)
✗ JSON-heavy queries (PostgreSQL's jsonb is more capable)
✗ You need partial indexes or advanced index types`,
        },
        {
          type: 'heading',
          content: 'SQLite',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'sqlite-use-cases.md',
          code: `Best for
────────────────────────────────────────────────────────────────────
✓ Local-first desktop apps   — Electron, Tauri, native apps
✓ CLI tools & scripts        — single-file DB, zero setup
✓ Embedded devices / IoT     — runs anywhere, no server
✓ Dev & test environments    — spin up a real DB in-process
✓ Read-heavy static sites    — query a bundled .db file
✓ Edge / serverless          — Cloudflare D1, Turso (libSQL)

Avoid when
────────────────────────────────────────────────────────────────────
✗ Multiple concurrent writers (file-level locking limits throughput)
✗ Multi-server deployments (each server needs its own copy)
✗ Large datasets with complex queries (no query planner optimizations)`,
        },
        {
          type: 'heading',
          content: 'MongoDB',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'mongodb-use-cases.md',
          code: `Best for
────────────────────────────────────────────────────────────────────
✓ CMS / blogging platforms   — flexible content types, nested data
✓ User-generated content     — comments, reviews (variable structure)
✓ Product catalogs           — electronics vs clothing have diff fields
✓ Event logs / activity feeds — append-only, high write volume
✓ IoT sensor data            — varied payload shapes per device type
✓ Rapid prototyping          — iterate schema without migrations
✓ Real-time chat history     — embed messages in conversation doc

Avoid when
────────────────────────────────────────────────────────────────────
✗ Multi-table JOINs (no real JOIN — embed or use $lookup instead)
✗ Financial data requiring strict ACID across multiple collections
✗ Data is heavily relational (many many-to-many relationships)`,
        },
        {
          type: 'heading',
          content: 'Supabase',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'supabase-use-cases.md',
          code: `Best for
────────────────────────────────────────────────────────────────────
✓ Next.js / SvelteKit apps   — built-in auth + DB + storage in one
✓ MVPs & startups            — no infra to manage, generous free tier
✓ Apps needing auth fast     — email, magic link, OAuth in minutes
✓ Real-time collaboration    — subscribe to row changes via WebSocket
✓ File uploads               — storage with RLS-based access control
✓ Full-stack with RLS        — enforce data access rules at DB level
✓ Replacing Firebase         — SQL power with Firebase-like DX

Avoid when
────────────────────────────────────────────────────────────────────
✗ You need to self-host with strict data residency requirements
✗ Extremely complex PostgreSQL extensions or custom configurations
✗ The project outgrows hosted infra and needs raw PostgreSQL control`,
        },
        {
          type: 'heading',
          content: 'Redis',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'redis-use-cases.md',
          code: `Best for
────────────────────────────────────────────────────────────────────
✓ API response caching       — store expensive query results in RAM
✓ Session storage            — fast read/write, TTL auto-expiry
✓ Rate limiting              — atomic INCR + TTL per IP / user
✓ Job queues                 — push/pop with BullMQ or similar
✓ Pub/sub messaging          — real-time notifications, chat rooms
✓ Leaderboards               — sorted sets with O(log n) ops
✓ Distributed locks          — SETNX for concurrency control
✓ Feature flags / config     — in-memory key-value, sub-millisecond

Avoid when
────────────────────────────────────────────────────────────────────
✗ Data must survive a full restart without persistence config (AOF/RDB)
✗ Complex relational queries or reporting
✗ Large blobs — Redis works best with small, frequently accessed values`,
        },
        {
          type: 'heading',
          content: 'Common Combination Patterns',
        },
        {
          type: 'list',
          items: [
            'PostgreSQL + Redis — Core relational data in Postgres, cache hot queries and sessions in Redis. The most common production pairing.',
            'Supabase + Redis (Upstash) — Supabase for auth/DB/storage, Upstash Redis for rate limiting and caching in Next.js Edge/serverless routes.',
            'MongoDB + Redis — Document store for flexible content, Redis for session and pub/sub. Common in MERN stacks.',
            'PostgreSQL + MongoDB — SQL for core transactional data, MongoDB for event logs or analytics where schema flexibility matters.',
            'SQLite (dev) + PostgreSQL (prod) — Use SQLite locally for zero-setup development, swap to PostgreSQL in production via an ORM (Prisma, Drizzle).',
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Most production apps combine two databases: a primary store (PostgreSQL, MongoDB, or Supabase) for persistent data plus Redis for caching and ephemeral state. Adding a second database is not complexity for its own sake — it\'s each tool doing what it does best.',
        },
      ],
    },

    // ─── Section 3: Database Packages & Tools ──────────────────────────
    {
      id: 'database-packages',
      title: 'Database Packages & Tools',
      blocks: [
        {
          type: 'text',
          content:
            'The Node.js ecosystem provides native drivers for direct database access, ORMs for abstracted data modeling, and query builders that sit in between.',
        },
        {
          type: 'heading',
          content: 'Native Drivers',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'pg',
              description:
                'PostgreSQL client for Node.js — connection pooling, parameterized queries, LISTEN/NOTIFY',
              url: 'https://node-postgres.com/',
            },
            {
              name: 'mysql2',
              description:
                'MySQL client with prepared statements, Promise API, and streaming support',
              url: 'https://github.com/sidorares/node-mysql2',
            },
            {
              name: 'better-sqlite3',
              description:
                'Fastest SQLite3 driver for Node.js — synchronous API, WAL mode, user-defined functions',
              url: 'https://github.com/WiseLibs/better-sqlite3',
            },
            {
              name: 'mongodb',
              description:
                'Official MongoDB native driver — direct access to MongoDB without an ODM layer',
              url: 'https://www.mongodb.com/docs/drivers/node/current/',
            },
          ],
        },
        {
          type: 'heading',
          content: 'ORMs & Query Builders',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'prisma',
              description:
                'Next-generation ORM — type-safe queries, declarative schema, auto-generated migrations',
              url: 'https://www.prisma.io/',
            },
            {
              name: 'sequelize',
              description:
                'Mature ORM for SQL databases — model definitions, associations, migrations, hooks',
              url: 'https://sequelize.org/',
            },
            {
              name: 'knex',
              description:
                'SQL query builder with migration system — works with pg, mysql2, better-sqlite3',
              url: 'https://knexjs.org/',
            },
            {
              name: 'drizzle-orm',
              description:
                'Lightweight TypeScript ORM — SQL-like syntax, zero dependencies, serverless-ready',
              url: 'https://orm.drizzle.team/',
            },
            {
              name: 'typeorm',
              description:
                'ORM supporting Active Record & Data Mapper patterns — decorators, migrations, relations',
              url: 'https://typeorm.io/',
            },
          ],
        },
        {
          type: 'heading',
          content: 'Database-as-a-Service',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: '@supabase/supabase-js',
              description:
                'Supabase client — PostgreSQL with auto-generated REST API, auth, real-time subscriptions',
              url: 'https://supabase.com/docs',
            },
            {
              name: 'mongoose',
              description:
                'MongoDB ODM — schemas, validation, middleware, population, and query helpers',
              url: 'https://mongoosejs.com/',
            },
          ],
        },
      ],
    },

    // ─── Section 3: PostgreSQL with pg ─────────────────────────────────
    {
      id: 'postgresql',
      title: 'PostgreSQL with node-postgres (pg)',
      blocks: [
        {
          type: 'text',
          content:
            'The pg library provides a low-level, high-performance PostgreSQL client. Always use connection pooling and parameterized queries to prevent SQL injection.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: 'npm install pg',
        },
        {
          type: 'heading',
          content: 'Connection Pool Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'db.js',
          code: `const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  max: 20,                // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.error('PostgreSQL connection error:', err));

module.exports = pool;`,
        },
        {
          type: 'heading',
          content: 'Parameterized Queries (Prevent SQL Injection)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'userController.js',
          code: `const pool = require('../db');

// GET all users with pagination
exports.getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows } = await pool.query(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    res.status(200).json({ status: 'success', data: rows });
  } catch (err) {
    next(err);
  }
};

// GET single user
exports.getUser = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ status: 'success', data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// POST create user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    res.status(201).json({ status: 'success', data: rows[0] });
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'heading',
          content: 'Transactions',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'orderController.js',
          code: `exports.createOrder = async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1) Create the order
    const { rows: [order] } = await client.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
      [req.user.id, req.body.total]
    );

    // 2) Insert order items
    for (const item of req.body.items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.productId, item.quantity, item.price]
      );
    }

    // 3) Update inventory
    for (const item of req.body.items) {
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1',
        [item.quantity, item.productId]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ status: 'success', data: order });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never interpolate user input into SQL strings. Always use parameterized queries ($1, $2, ...) to prevent SQL injection attacks.',
        },
      ],
    },

    // ─── Section 4: MySQL with mysql2 ──────────────────────────────────
    {
      id: 'mysql',
      title: 'MySQL with mysql2',
      blocks: [
        {
          type: 'text',
          content:
            'mysql2 is the recommended MySQL client for Node.js, offering prepared statements, a Promise API, and connection pooling out of the box.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: 'npm install mysql2',
        },
        {
          type: 'heading',
          content: 'Pool Setup with Promise API',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'db.js',
          code: `const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;`,
        },
        {
          type: 'heading',
          content: 'CRUD Operations',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'productController.js',
          code: `const pool = require('../db');

// GET all products
exports.getProducts = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products WHERE active = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [true, 10, 0]
    );

    res.status(200).json({ status: 'success', data: rows });
  } catch (err) {
    next(err);
  }
};

// POST create product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const [result] = await pool.query(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, price, description]
    );

    res.status(201).json({
      status: 'success',
      data: { id: result.insertId, name, price, description },
    });
  } catch (err) {
    next(err);
  }
};

// PUT update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const [result] = await pool.query(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      [name, price, description, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ status: 'success', message: 'Product updated' });
  } catch (err) {
    next(err);
  }
};

// DELETE product
exports.deleteProduct = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'heading',
          content: 'Prepared Statements',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'prepared-statements.js',
          code: `// execute() uses true prepared statements (binary protocol)
// More efficient for repeated queries with different parameters
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE email = ? AND active = ?',
  ['user@example.com', true]
);

// query() uses text protocol (auto-escaping)
// Fine for one-off queries
const [results] = await pool.query(
  'SELECT * FROM products WHERE category = ?',
  ['electronics']
);`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'mysql2 uses ? placeholders (not $1, $2 like pg). Use pool.execute() for true prepared statements or pool.query() for auto-escaped text protocol queries.',
        },
      ],
    },

    // ─── Section 5: SQLite with better-sqlite3 ────────────────────────
    {
      id: 'sqlite',
      title: 'SQLite with better-sqlite3',
      blocks: [
        {
          type: 'text',
          content:
            'SQLite is a serverless, file-based database perfect for prototyping, embedded apps, and small-to-medium projects. better-sqlite3 provides a synchronous API that is simpler and faster than async alternatives.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: 'npm install better-sqlite3',
        },
        {
          type: 'heading',
          content: 'Database Setup with WAL Mode',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'db.js',
          code: `const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../data/app.db'));

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables on first run
db.exec(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TEXT DEFAULT (datetime('now'))
  );
\`);

module.exports = db;`,
        },
        {
          type: 'heading',
          content: 'Synchronous CRUD',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'userController.js',
          code: `const db = require('../db');

// Prepare statements once, reuse many times
const findAll = db.prepare('SELECT * FROM users ORDER BY created_at DESC');
const findById = db.prepare('SELECT * FROM users WHERE id = ?');
const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
const update = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
const remove = db.prepare('DELETE FROM users WHERE id = ?');

exports.getUsers = (req, res) => {
  const users = findAll.all();
  res.json({ status: 'success', data: users });
};

exports.getUser = (req, res) => {
  const user = findById.get(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ status: 'success', data: user });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const result = insert.run(name, email);
  res.status(201).json({
    status: 'success',
    data: { id: result.lastInsertRowid, name, email },
  });
};`,
        },
        {
          type: 'heading',
          content: 'Transactions with db.transaction()',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'transaction.js',
          code: `const db = require('../db');

// db.transaction() wraps the function in BEGIN/COMMIT
// Automatically rolls back on error
const transferFunds = db.transaction((fromId, toId, amount) => {
  const withdraw = db.prepare('UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?');
  const deposit = db.prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?');

  const result = withdraw.run(amount, fromId, amount);
  if (result.changes === 0) {
    throw new Error('Insufficient funds');
  }

  deposit.run(amount, toId);
  return { fromId, toId, amount };
});

// Usage in controller
exports.transfer = (req, res, next) => {
  try {
    const result = transferFunds(req.body.fromId, req.body.toId, req.body.amount);
    res.json({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'SQLite is synchronous in Node.js (via better-sqlite3) which means it blocks the event loop. This is fine for low-to-medium traffic apps but for high-concurrency scenarios, use PostgreSQL or MySQL instead.',
        },
      ],
    },

    // ─── Section 6: Supabase ───────────────────────────────────────────
    {
      id: 'supabase',
      title: 'Supabase (PostgreSQL-as-a-Service)',
      blocks: [
        {
          type: 'text',
          content:
            'Supabase provides a hosted PostgreSQL database with an auto-generated REST API, authentication, real-time subscriptions, and storage — all accessible through a JavaScript client.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: 'npm install @supabase/supabase-js',
        },
        {
          type: 'heading',
          content: 'Client Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'supabase.js',
          code: `const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,      // https://xyz.supabase.co
  process.env.SUPABASE_ANON_KEY  // public anon key
);

module.exports = supabase;`,
        },
        {
          type: 'heading',
          content: 'CRUD with Builder Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'supabase-queries.js',
          code: `const supabase = require('../supabase');

// SELECT — fetch all with filtering
const { data: products, error } = await supabase
  .from('products')
  .select('id, name, price, category')
  .eq('active', true)
  .gte('price', 10)
  .order('created_at', { ascending: false })
  .range(0, 9);  // pagination: first 10 items

// SELECT — fetch with related data (joins)
const { data: orders } = await supabase
  .from('orders')
  .select(\`
    id, total, created_at,
    user:users (name, email),
    items:order_items (quantity, product:products (name, price))
  \`)
  .eq('user_id', userId);

// INSERT
const { data: newProduct, error: insertErr } = await supabase
  .from('products')
  .insert({ name: 'Widget', price: 29.99, category: 'gadgets' })
  .select()
  .single();

// UPDATE
const { data: updated } = await supabase
  .from('products')
  .update({ price: 24.99 })
  .eq('id', productId)
  .select()
  .single();

// DELETE
const { error: deleteErr } = await supabase
  .from('products')
  .delete()
  .eq('id', productId);`,
        },
        {
          type: 'heading',
          content: 'Express Controller Example',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'productController.js',
          code: `const supabase = require('../supabase');

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('active', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json({
      status: 'success',
      results: data.length,
      total: count,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(req.body)
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'For server-side operations that bypass Row Level Security (RLS), use the service_role key instead of the anon key. Keep the service_role key secret — never expose it to the client.',
        },
      ],
    },

    // ─── Section 7: Prisma ORM ─────────────────────────────────────────
    {
      id: 'prisma',
      title: 'Prisma ORM',
      blocks: [
        {
          type: 'text',
          content:
            'Prisma is a next-generation ORM that provides type-safe database access, a declarative schema language, and auto-generated migrations. It supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'setup',
          code: `# Install Prisma CLI and client
npm install prisma --save-dev
npm install @prisma/client

# Initialize Prisma (creates prisma/schema.prisma)
npx prisma init`,
        },
        {
          type: 'heading',
          content: 'Schema Definition',
        },
        {
          type: 'code',
          language: 'prisma',
          fileName: 'prisma/schema.prisma',
          code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // or "mysql", "sqlite"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")  // table name in DB
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  avatar String?
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId Int    @unique

  @@map("profiles")
}

model Post {
  id        Int        @id @default(autoincrement())
  title     String
  content   String?
  published Boolean    @default(false)
  author    User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  Int
  tags      Tag[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@index([authorId])
  @@map("posts")
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]

  @@map("tags")
}`,
        },
        {
          type: 'heading',
          content: 'Migrations',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'migration-commands',
          code: `# Create and apply a migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy

# Reset database (drops all data)
npx prisma migrate reset

# Generate Prisma Client after schema changes
npx prisma generate

# Open Prisma Studio (GUI for browsing data)
npx prisma studio`,
        },
        {
          type: 'heading',
          content: 'Singleton Client Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'prisma.js',
          code: `const { PrismaClient } = require('@prisma/client');

// Prevent multiple instances during hot-reloading in development
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;`,
        },
        {
          type: 'heading',
          content: 'CRUD & Nested Queries',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'prisma-queries.js',
          code: `const prisma = require('../prisma');

// CREATE with nested relation
const user = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@example.com',
    password: hashedPassword,
    profile: {
      create: { bio: 'Full-stack developer' },
    },
  },
  include: { profile: true },
});

// READ with filtering, pagination, and sorting
const posts = await prisma.post.findMany({
  where: {
    published: true,
    author: { role: 'ADMIN' },
    title: { contains: 'prisma', mode: 'insensitive' },
  },
  include: {
    author: { select: { name: true, email: true } },
    tags: true,
  },
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 10,
});

// UPDATE
const updated = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alice Smith' },
});

// DELETE
await prisma.post.delete({ where: { id: 1 } });

// AGGREGATE
const stats = await prisma.post.aggregate({
  _count: { id: true },
  _avg: { views: true },
  where: { published: true },
});

// TRANSACTION — multiple operations atomically
const [order, updatedStock] = await prisma.$transaction([
  prisma.order.create({ data: { userId: 1, total: 59.99 } }),
  prisma.product.update({
    where: { id: 42 },
    data: { stock: { decrement: 1 } },
  }),
]);`,
        },
        {
          type: 'heading',
          content: 'Full Express Controller Example',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'postController.js',
          code: `const prisma = require('../prisma');

exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        include: {
          author: { select: { id: true, name: true } },
          tags: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where: { published: true } }),
    ]);

    res.json({
      status: 'success',
      results: posts.length,
      totalPages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        author: { select: { id: true, name: true } },
        tags: true,
      },
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ status: 'success', data: post });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.id,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: { tags: true },
    });

    res.status(201).json({ status: 'success', data: post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await prisma.post.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Run "npx prisma generate" after every schema change. The generated client is what provides type-safe queries. Use "npx prisma studio" to visually browse and edit your data during development.',
        },
      ],
    },

    // ─── Section 8: Sequelize ORM ──────────────────────────────────────
    {
      id: 'sequelize',
      title: 'Sequelize ORM',
      blocks: [
        {
          type: 'text',
          content:
            'Sequelize is a mature, promise-based ORM for SQL databases. It supports model definitions, associations, migrations, hooks, and validators out of the box.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: `# Install Sequelize and your database driver
npm install sequelize pg pg-hstore   # PostgreSQL
# npm install sequelize mysql2       # MySQL
# npm install sequelize better-sqlite3  # SQLite`,
        },
        {
          type: 'heading',
          content: 'Connection Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'db.js',
          code: `const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',  // 'mysql' | 'sqlite' | 'mariadb'
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Connection failed:', err));

module.exports = sequelize;`,
        },
        {
          type: 'heading',
          content: 'Model Definition with Validation & Hooks',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'models/User.js',
          code: `const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 128],
    },
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
}, {
  tableName: 'users',
  timestamps: true,         // createdAt, updatedAt
  underscored: true,        // snake_case column names

  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
  },
});

// Instance method
User.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;`,
        },
        {
          type: 'heading',
          content: 'Associations',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'models/index.js',
          code: `const sequelize = require('../db');
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');

// One-to-Many: User has many Posts
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Many-to-Many: Posts <-> Tags through PostTags junction table
Post.belongsToMany(Tag, { through: 'PostTags', as: 'tags' });
Tag.belongsToMany(Post, { through: 'PostTags', as: 'posts' });

// Sync models (development only — use migrations in production)
// sequelize.sync({ alter: true });

module.exports = { sequelize, User, Post, Tag };`,
        },
        {
          type: 'heading',
          content: 'Querying with Associations',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'postController.js',
          code: `const { Post, User, Tag } = require('../models');
const { Op } = require('sequelize');

exports.getPosts = async (req, res, next) => {
  try {
    const { count, rows: posts } = await Post.findAndCountAll({
      where: {
        published: true,
        title: { [Op.iLike]: \`%\${req.query.search || ''}%\` },
      },
      include: [
        { model: User, as: 'author', attributes: ['id', 'name'] },
        { model: Tag, as: 'tags', attributes: ['name'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: 0,
    });

    res.json({ status: 'success', total: count, data: posts });
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never use sequelize.sync({ force: true }) in production — it drops and recreates all tables. Use Sequelize CLI migrations (npx sequelize-cli db:migrate) for schema changes.',
        },
      ],
    },

    // ─── Section 9: Knex.js Query Builder ──────────────────────────────
    {
      id: 'knex',
      title: 'Knex.js Query Builder',
      blocks: [
        {
          type: 'text',
          content:
            'Knex.js is a SQL query builder that gives you fine-grained control over your queries while providing a built-in migration and seed system. It sits between raw SQL and a full ORM.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: `# Install Knex and your database driver
npm install knex pg          # PostgreSQL
# npm install knex mysql2    # MySQL
# npm install knex better-sqlite3  # SQLite

# Initialize knexfile.js
npx knex init`,
        },
        {
          type: 'heading',
          content: 'Configuration',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'knexfile.js',
          code: `module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || 'localhost',
      port: process.env.PG_PORT || 5432,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
  },
};`,
        },
        {
          type: 'heading',
          content: 'Query Building',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'db.js',
          code: `const knex = require('knex');
const config = require('../knexfile');

const db = knex(config[process.env.NODE_ENV || 'development']);

module.exports = db;`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'userController.js',
          code: `const db = require('../db');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await db('users')
      .select('id', 'name', 'email', 'created_at')
      .where('active', true)
      .orderBy('created_at', 'desc')
      .limit(10)
      .offset(0);

    res.json({ status: 'success', data: users });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const [user] = await db('users')
      .insert({
        name: req.body.name,
        email: req.body.email,
      })
      .returning('*');

    res.status(201).json({ status: 'success', data: user });
  } catch (err) {
    next(err);
  }
};

// Joins
exports.getUserPosts = async (req, res, next) => {
  try {
    const posts = await db('posts')
      .join('users', 'posts.author_id', 'users.id')
      .select('posts.*', 'users.name as author_name')
      .where('posts.author_id', req.params.id)
      .orderBy('posts.created_at', 'desc');

    res.json({ status: 'success', data: posts });
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'heading',
          content: 'Migrations',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'migration-commands',
          code: `# Create a new migration file
npx knex migrate:make create_users_table

# Run all pending migrations
npx knex migrate:latest

# Rollback last batch of migrations
npx knex migrate:rollback

# Create a seed file
npx knex seed:make seed_users

# Run all seed files
npx knex seed:run`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'migrations/20240101_create_users_table.js',
          code: `exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.enum('role', ['user', 'admin']).defaultTo('user');
    table.boolean('active').defaultTo(true);
    table.timestamps(true, true);  // created_at, updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};`,
        },
        {
          type: 'heading',
          content: 'Seeds',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'seeds/seed_users.js',
          code: `exports.seed = async function (knex) {
  // Delete existing entries
  await knex('users').del();

  // Insert seed data
  await knex('users').insert([
    { name: 'Alice', email: 'alice@example.com', password: 'hashed_pw_1', role: 'admin' },
    { name: 'Bob', email: 'bob@example.com', password: 'hashed_pw_2', role: 'user' },
    { name: 'Charlie', email: 'charlie@example.com', password: 'hashed_pw_3', role: 'user' },
  ]);
};`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Knex is not a full ORM — it does not provide model definitions, validation, or lifecycle hooks. Use it when you want SQL-level control with a cleaner JavaScript API, or pair it with Objection.js for full ORM features.',
        },
      ],
    },

    // ─── Section 10: ORM & Query Builder Comparison ────────────────────
    {
      id: 'orm-comparison',
      title: 'ORM & Query Builder Comparison',
      blocks: [
        {
          type: 'text',
          content:
            'Each tool makes different trade-offs between abstraction level, query power, and learning curve. Here is how they compare and how the same query looks in each.',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'comparison-table.md',
          code: `Feature            │ Prisma          │ Sequelize       │ Knex            │ Raw pg/mysql2
───────────────────┼─────────────────┼─────────────────┼─────────────────┼──────────────
Abstraction Level  │ High            │ High            │ Medium          │ Low
Schema Definition  │ schema.prisma   │ JS model defs   │ Migrations only │ Raw SQL / DDL
Migrations         │ Auto-generated  │ CLI + manual    │ CLI + manual    │ Manual
Relations          │ Declarative     │ Association API │ Manual JOINs    │ Manual JOINs
Type Safety        │ Auto-generated  │ Manual types    │ Manual types    │ None
Query Syntax       │ Object API      │ Object API      │ Chained builder │ Raw SQL
Raw SQL Access     │ $queryRaw       │ sequelize.query │ knex.raw()      │ Native
Learning Curve     │ Medium          │ Medium-High     │ Low-Medium      │ Low
Best For           │ New projects    │ Legacy / complex│ SQL control     │ Max performance`,
        },
        {
          type: 'heading',
          content: 'Same Query — Four Ways',
        },
        {
          type: 'text',
          content:
            'Fetch published posts by a specific author, ordered by date, with the author\'s name included.',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'prisma-query.js',
          code: `// Prisma
const posts = await prisma.post.findMany({
  where: { published: true, authorId: userId },
  include: { author: { select: { name: true } } },
  orderBy: { createdAt: 'desc' },
  take: 10,
});`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'sequelize-query.js',
          code: `// Sequelize
const posts = await Post.findAll({
  where: { published: true, authorId: userId },
  include: [{ model: User, as: 'author', attributes: ['name'] }],
  order: [['createdAt', 'DESC']],
  limit: 10,
});`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'knex-query.js',
          code: `// Knex
const posts = await db('posts')
  .join('users', 'posts.author_id', 'users.id')
  .select('posts.*', 'users.name as author_name')
  .where({ 'posts.published': true, 'posts.author_id': userId })
  .orderBy('posts.created_at', 'desc')
  .limit(10);`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'raw-pg-query.js',
          code: `// Raw pg
const { rows: posts } = await pool.query(
  \`SELECT p.*, u.name AS author_name
   FROM posts p
   JOIN users u ON p.author_id = u.id
   WHERE p.published = true AND p.author_id = $1
   ORDER BY p.created_at DESC
   LIMIT 10\`,
  [userId]
);`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Start with Prisma for new projects — its auto-generated client and migration system provide the best developer experience. Use raw SQL or Knex when you need complex queries that ORMs struggle with (CTEs, window functions, complex aggregations).',
        },
      ],
    },

    // ─── Section 11: Common SQL Patterns ───────────────────────────────
    {
      id: 'sql-patterns',
      title: 'Common SQL Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'These SQL patterns apply across all SQL databases and ORMs. Understanding them helps you write efficient queries regardless of your abstraction layer.',
        },
        {
          type: 'heading',
          content: 'JOIN Types',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'joins.sql',
          code: `-- INNER JOIN — only matching rows from both tables
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN — all users, even those with no orders
SELECT u.name, COALESCE(COUNT(o.id), 0) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- JOIN with multiple tables
SELECT o.id, u.name, p.title, oi.quantity
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.created_at > NOW() - INTERVAL '30 days';`,
        },
        {
          type: 'heading',
          content: 'Indexes',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'indexes.sql',
          code: `-- Single column index (speeds up WHERE and JOIN lookups)
CREATE INDEX idx_users_email ON users(email);

-- Composite index (column order matters — leftmost prefix rule)
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at DESC);

-- Partial index (only index rows matching a condition)
CREATE INDEX idx_active_users ON users(email) WHERE active = true;

-- Unique index (enforces uniqueness + speeds up lookups)
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- GIN index for full-text search (PostgreSQL)
CREATE INDEX idx_posts_search ON posts USING GIN(to_tsvector('english', title || ' ' || content));`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Add indexes for columns used in WHERE, JOIN, and ORDER BY clauses. But don\'t over-index — each index slows down INSERT/UPDATE operations. Use EXPLAIN ANALYZE to check if your queries use indexes.',
        },
        {
          type: 'heading',
          content: 'Pagination: OFFSET vs Cursor-Based',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'pagination.sql',
          code: `-- OFFSET pagination (simple but slow on large datasets)
-- Problem: database must scan and discard all rows before the offset
SELECT * FROM posts
ORDER BY created_at DESC
LIMIT 20 OFFSET 1000;  -- skips 1000 rows every time

-- Cursor-based pagination (efficient for large datasets)
-- Uses the last seen value as a cursor — no rows are skipped
SELECT * FROM posts
WHERE created_at < '2024-06-15T10:30:00Z'  -- cursor from previous page
ORDER BY created_at DESC
LIMIT 20;`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'cursor-pagination.js',
          code: `// Express controller with cursor-based pagination
exports.getPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const cursor = req.query.cursor;  // ISO date string from previous response

    let query = 'SELECT * FROM posts WHERE published = true';
    const params = [];

    if (cursor) {
      query += ' AND created_at < $1';
      params.push(cursor);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1);
    params.push(limit + 1);  // fetch one extra to check if there's a next page

    const { rows } = await pool.query(query, params);

    const hasNext = rows.length > limit;
    const posts = hasNext ? rows.slice(0, limit) : rows;
    const nextCursor = hasNext ? posts[posts.length - 1].created_at : null;

    res.json({
      status: 'success',
      data: posts,
      pagination: { nextCursor, hasNext },
    });
  } catch (err) {
    next(err);
  }
};`,
        },
        {
          type: 'heading',
          content: 'Migration Best Practices',
        },
        {
          type: 'list',
          items: [
            'Never edit a migration that has already been applied — create a new one instead',
            'Make migrations reversible (always implement both up and down)',
            'Add indexes in a separate migration from the table creation for clarity',
            'Use transactions in migrations so a failure rolls back cleanly',
            'Name migrations descriptively: 20240101_create_users_table, 20240102_add_role_to_users',
            'Test migrations locally before running in production (migrate up, then rollback, then up again)',
          ],
        },
      ],
    },

    // ─── Section 12: MongoDB Connection Patterns ───────────────────────
    {
      id: 'mongodb-connection',
      title: 'MongoDB Connection Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'This section covers MongoDB connection setup and lifecycle management. For schemas, data modeling, and Mongoose CRUD patterns, see the Express.js "Models & Mongoose" section and the MERN Stack "Database Design" section.',
        },
        {
          type: 'heading',
          content: 'Mongoose Connection with Events & Graceful Shutdown',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'server.js',
          code: `const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('MongoDB connected'));

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown — close connection when app terminates
const gracefulShutdown = async (signal) => {
  console.log(\`\\n\${signal} received. Closing MongoDB connection...\`);
  await mongoose.connection.close();
  console.log('MongoDB connection closed. Shutting down.');
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));`,
        },
        {
          type: 'heading',
          content: 'Connection String Formats',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env',
          code: `# Local MongoDB
DATABASE=mongodb://localhost:27017/myapp

# MongoDB Atlas (cloud)
DATABASE=mongodb+srv://<username>:<PASSWORD>@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority

# With authentication (local)
DATABASE=mongodb://myuser:<PASSWORD>@localhost:27017/myapp?authSource=admin`,
        },
        {
          type: 'heading',
          content: 'Connection Options',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'mongoose-options.js',
          code: `// Mongoose 7+ uses these defaults, but you can customize:
mongoose.connect(DB, {
  maxPoolSize: 10,          // max concurrent connections
  minPoolSize: 2,           // min connections to maintain
  serverSelectionTimeoutMS: 5000,  // timeout for initial connection
  socketTimeoutMS: 45000,   // timeout for operations
  family: 4,                // use IPv4
});`,
        },
        {
          type: 'heading',
          content: 'Native Driver Alternative',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'mongodb-native.js',
          code: `const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI, {
  maxPoolSize: 10,
});

let db;

async function connectDB() {
  await client.connect();
  db = client.db('myapp');
  console.log('MongoDB native driver connected');
}

function getDB() {
  if (!db) throw new Error('Database not initialized — call connectDB() first');
  return db;
}

// Usage in a controller
async function getUsers(req, res) {
  const users = await getDB()
    .collection('users')
    .find({ active: true })
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  res.json({ status: 'success', data: users });
}

module.exports = { connectDB, getDB };`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For Mongoose schemas, validation, middleware, population, and CRUD patterns, see the Express.js page (Models & Mongoose section) and the MERN Stack page (Database Design section).',
        },
      ],
    },

    // ─── Section 13: Redis ────────────────────────────────────────────
    {
      id: 'redis',
      title: 'Redis',
      blocks: [
        {
          type: 'text',
          content:
            'Redis is an in-memory key-value store used for caching, session storage, rate limiting, and real-time features. It\'s extremely fast because all data lives in RAM.',
        },
        {
          type: 'heading',
          content: 'Setup & Connection',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/redis.js',
          code: `const { createClient } = require('redis');

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) return new Error('Redis: max retries reached');
      return Math.min(retries * 100, 3000); // Exponential backoff
    },
  },
});

redis.on('error', (err) => console.error('Redis error:', err));
redis.on('connect', () => console.log('Redis connected'));
redis.on('reconnecting', () => console.log('Redis reconnecting...'));

redis.connect();

module.exports = redis;`,
        },
        {
          type: 'heading',
          content: 'Common Data Types & Operations',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const redis = require('./utils/redis');

// ─── Strings (most common for caching) ────────────────
await redis.set('user:123', JSON.stringify(user));
await redis.setEx('user:123', 3600, JSON.stringify(user)); // 1 hour TTL
const user = JSON.parse(await redis.get('user:123'));
await redis.del('user:123');

// ─── Hashes (object-like, partial updates) ────────────
await redis.hSet('session:abc', { userId: '123', role: 'admin', ip: '1.2.3.4' });
const role = await redis.hGet('session:abc', 'role');
const session = await redis.hGetAll('session:abc');

// ─── Lists (ordered, for queues) ──────────────────────
await redis.lPush('queue:emails', JSON.stringify(emailJob));
const job = await redis.rPop('queue:emails'); // FIFO

// ─── Sets (unique values) ─────────────────────────────
await redis.sAdd('online-users', 'user:123');
await redis.sRem('online-users', 'user:123');
const onlineUsers = await redis.sMembers('online-users');
const isOnline = await redis.sIsMember('online-users', 'user:123');

// ─── Sorted Sets (leaderboards, rankings) ─────────────
await redis.zAdd('leaderboard', { score: 100, value: 'user:123' });
const top10 = await redis.zRangeWithScores('leaderboard', 0, 9, { REV: true });`,
        },
        {
          type: 'heading',
          content: 'Session Storage with Redis',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app.js',
          code: `const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('./utils/redis');

app.use(
  session({
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);`,
        },
        {
          type: 'heading',
          content: 'When to Use Redis vs MongoDB',
        },
        {
          type: 'list',
          items: [
            'Redis: Caching API responses, session storage, rate limit counters, real-time data (online users, typing indicators), job queues, pub/sub messaging',
            'MongoDB: Persistent data (users, orders, content), complex queries with filtering/sorting, data that must survive a full restart, large documents',
            'Rule of thumb: if you can afford to lose the data on restart, Redis is likely a good fit',
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Redis data lives in RAM and is lost on restart by default. Enable AOF (Append Only File) or RDB snapshots for persistence. For managed Redis, use services like Redis Cloud, Upstash, or AWS ElastiCache.',
        },
      ],
    },

    // ─── Section 14: Indexing Strategies ──────────────────────────────
    {
      id: 'indexing',
      title: 'Indexing Strategies',
      blocks: [
        {
          type: 'text',
          content:
            'Indexes dramatically speed up queries by letting the database find data without scanning every row/document. Without indexes, a query on 1 million records scans all 1 million. With an index, it jumps directly to the matching records.',
        },
        {
          type: 'heading',
          content: 'MongoDB Indexes (Mongoose)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'models/tourModel.js',
          code: `const tourSchema = new mongoose.Schema({
  name: { type: String, unique: true }, // unique automatically creates an index
  price: Number,
  ratingsAverage: { type: Number, default: 4.5 },
  startLocation: {
    type: { type: String, default: 'Point', enum: ['Point'] },
    coordinates: [Number],
  },
});

// Single field index
tourSchema.index({ price: 1 }); // 1 = ascending, -1 = descending

// Compound index (covers queries filtering on BOTH fields)
tourSchema.index({ price: 1, ratingsAverage: -1 });

// Unique compound index (one review per user per tour)
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// Text index (for search)
tourSchema.index({ name: 'text', description: 'text' });

// Geospatial index (for location queries)
tourSchema.index({ startLocation: '2dsphere' });

// Partial index (only index documents matching a condition)
tourSchema.index(
  { price: 1 },
  { partialFilterExpression: { price: { $gt: 0 } } }
);

// TTL index (auto-delete documents after time)
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });`,
        },
        {
          type: 'heading',
          content: 'PostgreSQL Indexes (SQL)',
        },
        {
          type: 'code',
          language: 'sql',
          code: `-- B-tree index (default, most common)
CREATE INDEX idx_users_email ON users (email);

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users (email);

-- Compound index
CREATE INDEX idx_tours_price_rating ON tours (price, ratings_average DESC);

-- Partial index (only index active users)
CREATE INDEX idx_active_users ON users (email) WHERE active = true;

-- GIN index (for full-text search / JSONB)
CREATE INDEX idx_tours_search ON tours USING GIN (to_tsvector('english', name || ' ' || description));

-- GiST index (for geometric/geographic data)
CREATE INDEX idx_tours_location ON tours USING GIST (location);`,
        },
        {
          type: 'heading',
          content: 'Index Best Practices',
        },
        {
          type: 'list',
          items: [
            'Index fields you frequently filter, sort, or join on',
            'Compound indexes should follow the ESR rule: Equality fields first, Sort fields second, Range fields last',
            'Don\'t over-index — each index slows down writes (INSERT/UPDATE) because the index must be updated too',
            'Use explain() (MongoDB) or EXPLAIN ANALYZE (PostgreSQL) to verify your queries use indexes',
            'Unique indexes enforce data integrity and are fast for lookups (email, username)',
            'TTL indexes are perfect for sessions, OTPs, and temporary data — auto-deletes expired docs',
          ],
        },
        {
          type: 'heading',
          content: 'Checking Index Usage',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'MongoDB — explain query',
          code: `// Check if a query uses an index
const explained = await Tour.find({ price: { $lt: 500 } })
  .sort('-ratingsAverage')
  .explain('executionStats');

console.log(explained.executionStats.executionStages.stage);
// "IXSCAN" = using index (good)
// "COLLSCAN" = full collection scan (needs index)

console.log(explained.executionStats.nReturned);     // docs returned
console.log(explained.executionStats.totalDocsExamined); // docs scanned`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'A compound index on { price: 1, ratingsAverage: -1 } supports queries on price alone OR price + ratingsAverage, but NOT ratingsAverage alone. The order of fields in compound indexes matters — put the most selective (most restrictive) field first.',
        },
      ],
    },

    // ─── Section 15: Transactions ────────────────────────────────────
    {
      id: 'transactions',
      title: 'Transactions',
      blocks: [
        {
          type: 'text',
          content:
            'Transactions ensure that a group of database operations either all succeed or all fail (atomicity). Use them when modifying multiple documents/rows that must stay consistent — like transferring money between accounts or creating an order with inventory deduction.',
        },
        {
          type: 'heading',
          content: 'MongoDB Transactions (Mongoose)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/bookingController.js',
          code: `const mongoose = require('mongoose');

exports.createBooking = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create the booking
    const [booking] = await Booking.create(
      [{ tour: req.body.tourId, user: req.user.id, price: req.body.price }],
      { session }
    );

    // 2. Decrease available spots on the tour
    const tour = await Tour.findByIdAndUpdate(
      req.body.tourId,
      { $inc: { availableSpots: -1 } },
      { session, new: true }
    );

    if (tour.availableSpots < 0) {
      throw new Error('No spots available');
    }

    // 3. Commit if everything succeeded
    await session.commitTransaction();

    res.status(201).json({ status: 'success', data: { booking } });
  } catch (err) {
    // Rollback all changes on failure
    await session.abortTransaction();
    return next(new AppError(err.message, 400));
  } finally {
    session.endSession();
  }
});`,
        },
        {
          type: 'heading',
          content: 'PostgreSQL Transactions (Knex)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'controllers/transferController.js',
          code: `const db = require('../db');

exports.transferFunds = catchAsync(async (req, res, next) => {
  const { fromAccountId, toAccountId, amount } = req.body;

  await db.transaction(async (trx) => {
    // 1. Deduct from sender
    const [sender] = await trx('accounts')
      .where({ id: fromAccountId })
      .decrement('balance', amount)
      .returning('*');

    if (sender.balance < 0) {
      throw new Error('Insufficient funds');
    }

    // 2. Add to receiver
    await trx('accounts')
      .where({ id: toAccountId })
      .increment('balance', amount);

    // 3. Record the transaction
    await trx('transfers').insert({
      from_account: fromAccountId,
      to_account: toAccountId,
      amount,
    });
  });
  // Auto-commits if no error, auto-rollbacks on throw

  res.status(200).json({ status: 'success', message: 'Transfer complete' });
});`,
        },
        {
          type: 'heading',
          content: 'PostgreSQL Transactions (Prisma)',
        },
        {
          type: 'code',
          language: 'javascript',
          code: `const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createOrder(userId, items) {
  return prisma.$transaction(async (tx) => {
    // 1. Create the order
    const order = await tx.order.create({
      data: { userId, status: 'pending' },
    });

    // 2. Create order items and update stock
    for (const item of items) {
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });

      const product = await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });

      if (product.stock < 0) {
        throw new Error(\`\${product.name} is out of stock\`);
      }
    }

    return order;
  });
}`,
        },
        {
          type: 'heading',
          content: 'When to Use Transactions',
        },
        {
          type: 'list',
          items: [
            'Money transfers — deduct from one, add to another',
            'Order creation — create order + deduct inventory + charge payment',
            'User registration — create user + create profile + send welcome email record',
            'Any operation where partial completion leaves data in an invalid state',
            'NOT needed for single document/row updates — those are already atomic',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'MongoDB transactions require a replica set (or MongoDB Atlas). They don\'t work with a standalone local MongoDB instance. For local development, use "mongod --replSet rs0" or use Atlas free tier.',
        },
      ],
    },

    // ─── Section 16: Database Migrations ─────────────────────────────
    {
      id: 'migrations',
      title: 'Database Migrations',
      blocks: [
        {
          type: 'text',
          content:
            'Migrations are version-controlled changes to your database schema. They ensure every environment (dev, staging, production) has the same database structure. Essential for SQL databases; useful for MongoDB data transformations.',
        },
        {
          type: 'heading',
          content: 'Prisma Migrations',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Create a migration from schema changes
npx prisma migrate dev --name add_user_role

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# View migration status
npx prisma migrate status`,
        },
        {
          type: 'code',
          language: 'prisma',
          fileName: 'prisma/schema.prisma',
          code: `model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  role      String   @default("user")  // New field added via migration
  createdAt DateTime @default(now())
  posts     Post[]
}`,
        },
        {
          type: 'heading',
          content: 'Knex Migrations',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Create a new migration file
npx knex migrate:make create_users_table

# Run pending migrations
npx knex migrate:latest

# Rollback last batch
npx knex migrate:rollback

# Rollback all
npx knex migrate:rollback --all`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'migrations/20240101_create_users_table.js',
          code: `exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.string('password_hash').notNullable();
    table.enum('role', ['user', 'admin']).defaultTo('user');
    table.boolean('active').defaultTo(true);
    table.timestamps(true, true); // created_at, updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'migrations/20240102_add_avatar_to_users.js',
          code: `exports.up = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('avatar_url').after('name');
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('avatar_url');
  });
};`,
        },
        {
          type: 'heading',
          content: 'Sequelize Migrations',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Generate a migration
npx sequelize-cli migration:generate --name add-role-to-users

# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo`,
        },
        {
          type: 'heading',
          content: 'Migration Best Practices',
        },
        {
          type: 'list',
          items: [
            'Always write both up (apply) and down (rollback) functions',
            'Name migrations with timestamps: 20240101_create_users, 20240102_add_role',
            'Never modify an existing migration that\'s been deployed — create a new one',
            'Test migrations locally: migrate up, verify, rollback, migrate up again',
            'Commit migration files to git — they\'re version-controlled schema changes',
            'For MongoDB, use scripts for data transformations (rename fields, restructure docs)',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Prisma generates migrations automatically from schema.prisma changes — the easiest workflow. Knex gives you full SQL control. Both are solid choices for production Express apps.',
        },
      ],
    },
  ],
}

export default databasesData
