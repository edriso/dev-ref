const webConceptsData = {
  id: 'web-concepts',
  name: 'Web Concepts',
  description:
    'Essential web concepts every developer should know — HTTP, security, networking, and how the internet works',
  sections: [
    // ─── Section 1: How the Web Works ────────────────────────────────
    {
      id: 'how-the-web-works',
      title: 'How the Web Works',
      blocks: [
        {
          type: 'text',
          content:
            'When you type a URL and press Enter, a lot happens behind the scenes. Understanding this flow makes debugging easier and helps you write better apps.',
        },
        {
          type: 'heading',
          content: 'What Happens When You Visit a Website',
        },
        {
          type: 'list',
          items: [
            '1. DNS Lookup — Your browser asks a DNS server: "What IP address is google.com?" and gets back something like 142.250.80.46',
            '2. TCP Connection — Your browser opens a connection to that IP address (a "handshake" to agree on communication rules)',
            '3. TLS/SSL Handshake — If HTTPS, they exchange encryption keys so nobody can eavesdrop',
            '4. HTTP Request — Your browser sends a request: "GET / HTTP/1.1" (give me the homepage)',
            '5. Server Processing — The server receives the request, runs your Express/Next.js code, queries the database, etc.',
            '6. HTTP Response — The server sends back HTML, CSS, JS files with a status code (200 OK, 404 Not Found, etc.)',
            '7. Browser Rendering — The browser parses HTML → builds DOM → applies CSS → runs JavaScript → paints pixels on screen',
          ],
        },
        {
          type: 'heading',
          content: 'DNS — The Internet\'s Phone Book',
        },
        {
          type: 'text',
          content:
            'DNS (Domain Name System) translates human-readable domain names to IP addresses. You don\'t memorize phone numbers — DNS is the same idea for websites.',
        },
        {
          type: 'list',
          items: [
            'Browser cache — checks if it recently looked up this domain',
            'OS cache — checks your operating system\'s DNS cache',
            'Router cache — your home router may have it cached',
            'ISP DNS server — your internet provider\'s DNS resolver',
            'Root → TLD → Authoritative — the full DNS hierarchy lookup (rare, usually cached)',
          ],
        },
        {
          type: 'heading',
          content: 'Client vs Server',
        },
        {
          type: 'list',
          items: [
            'Client (Frontend) — the browser. Runs HTML, CSS, JavaScript. The user interacts with this',
            'Server (Backend) — a computer running your Node.js/Express code. Handles business logic, database queries, authentication',
            'API — the contract between client and server. The client sends requests, the server sends responses',
            'Database — where data lives permanently. The server talks to the database, never the client directly',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Think of it like a restaurant: the client is the customer, the API is the waiter (takes orders, brings food), the server is the kitchen (prepares food), and the database is the pantry (stores ingredients).',
        },
      ],
    },

    // ─── Section 2: HTTP & HTTPS ─────────────────────────────────────
    {
      id: 'http-https',
      title: 'HTTP & HTTPS',
      blocks: [
        {
          type: 'text',
          content:
            'HTTP (HyperText Transfer Protocol) is the language browsers and servers use to communicate. HTTPS is the secure version — all data is encrypted so nobody can read it in transit.',
        },
        {
          type: 'heading',
          content: 'HTTP Methods (Verbs)',
        },
        {
          type: 'list',
          items: [
            'GET — Read data (fetch a user, list products). Should never change data on the server',
            'POST — Create new data (register a user, submit a form, upload a file)',
            'PUT — Replace an entire resource (update all fields of a user profile)',
            'PATCH — Partially update a resource (change just the user\'s email)',
            'DELETE — Remove a resource (delete a user, remove an item from cart)',
          ],
        },
        {
          type: 'heading',
          content: 'HTTP Status Codes (The Important Ones)',
        },
        {
          type: 'list',
          items: [
            '200 OK — Request succeeded, here\'s the data',
            '201 Created — New resource was successfully created',
            '204 No Content — Success, but nothing to send back (common for DELETE)',
            '301 Moved Permanently — The URL changed, use the new one forever',
            '304 Not Modified — The cached version is still good, no need to re-download',
            '400 Bad Request — The client sent invalid data (missing required fields, wrong format)',
            '401 Unauthorized — You need to log in first (no valid token/session)',
            '403 Forbidden — You\'re logged in, but you don\'t have permission for this',
            '404 Not Found — The resource doesn\'t exist',
            '409 Conflict — The request conflicts with existing data (e.g., duplicate email)',
            '422 Unprocessable Entity — Data format is valid but content is wrong (e.g., email format invalid)',
            '429 Too Many Requests — Rate limited, slow down',
            '500 Internal Server Error — Something broke on the server (a bug in your code)',
            '502 Bad Gateway — The server behind a proxy/load balancer is down',
            '503 Service Unavailable — Server is overloaded or under maintenance',
          ],
        },
        {
          type: 'heading',
          content: 'HTTP Headers',
        },
        {
          type: 'text',
          content:
            'Headers are metadata sent with requests and responses. They carry information about the content, authentication, caching, and more.',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'Common request headers',
          code: `Content-Type: application/json          → I'm sending JSON data
Authorization: Bearer eyJhbGciO...       → Here's my auth token
Accept: application/json                 → I want JSON back
Cookie: session_id=abc123                → Here are my cookies
Origin: https://myapp.com                → Where this request came from (for CORS)
User-Agent: Mozilla/5.0...               → What browser/client is making the request`,
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'Common response headers',
          code: `Content-Type: application/json           → I'm sending JSON data
Set-Cookie: session_id=abc123; HttpOnly  → Store this cookie
Cache-Control: max-age=3600              → Cache this for 1 hour
Access-Control-Allow-Origin: *           → Any origin can access this (CORS)
X-RateLimit-Remaining: 95               → You have 95 requests left`,
        },
        {
          type: 'heading',
          content: 'HTTPS — Why It Matters',
        },
        {
          type: 'list',
          items: [
            'Encryption — Nobody between you and the server can read the data (not your ISP, not a hacker on public WiFi)',
            'Authentication — Proves the server is who it claims to be (not an impersonator)',
            'Integrity — Data can\'t be modified in transit without detection',
            'Required — Modern browsers mark HTTP sites as "Not Secure". Many APIs refuse non-HTTPS requests',
            'Free — Use Let\'s Encrypt for free SSL/TLS certificates. Most hosting platforms (Vercel, Netlify, Railway) provide HTTPS automatically',
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'SSL (Secure Sockets Layer) is the old name. TLS (Transport Layer Security) is the modern version. People still say "SSL certificate" but it\'s actually TLS. Same concept, newer and more secure protocol.',
        },
      ],
    },

    // ─── Section 3: REST API Design ──────────────────────────────────
    {
      id: 'rest-api-design',
      title: 'REST API Design',
      blocks: [
        {
          type: 'text',
          content:
            'REST (Representational State Transfer) is a set of conventions for designing web APIs. It uses HTTP methods and URLs to represent resources. Most modern web APIs follow REST conventions.',
        },
        {
          type: 'heading',
          content: 'REST Conventions',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'RESTful URL patterns',
          code: `GET    /api/users          → List all users
GET    /api/users/123      → Get user with ID 123
POST   /api/users          → Create a new user
PUT    /api/users/123      → Replace user 123 entirely
PATCH  /api/users/123      → Update parts of user 123
DELETE /api/users/123      → Delete user 123

GET    /api/users/123/posts     → Get all posts by user 123
POST   /api/users/123/posts     → Create a post for user 123

GET    /api/posts?page=2&limit=10&sort=-createdAt  → Pagination, sorting, filtering`,
        },
        {
          type: 'heading',
          content: 'REST Best Practices',
        },
        {
          type: 'list',
          items: [
            'Use nouns for URLs, not verbs — /api/users, NOT /api/getUsers or /api/createUser',
            'Use plural nouns — /api/users, NOT /api/user',
            'Use HTTP methods to express the action — GET reads, POST creates, PATCH updates, DELETE removes',
            'Nest related resources — /api/users/123/orders (orders belonging to user 123)',
            'Use query params for filtering/sorting/pagination — /api/products?category=electronics&sort=price',
            'Return proper status codes — 201 for created, 204 for deleted, 404 for not found',
            'Version your API if it\'s public — /api/v1/users (so you can make breaking changes in v2 without breaking v1 clients)',
          ],
        },
        {
          type: 'heading',
          content: 'REST vs GraphQL',
        },
        {
          type: 'list',
          items: [
            'REST — Multiple endpoints (/users, /posts, /comments). Simple, widely understood, great for most apps',
            'GraphQL — Single endpoint (/graphql). Client specifies exactly what fields it needs. Great for complex, nested data with many relationships',
            'REST overfetching — GET /users returns all fields even if you only need the name. GraphQL solves this',
            'REST underfetching — Need user + posts + comments? That\'s 3 REST calls, but 1 GraphQL query',
            'For most MERN apps, REST is simpler and sufficient. Consider GraphQL when your data model is deeply nested or you have many different client types (web, mobile, etc.)',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'A well-designed REST API should be predictable. If you know the pattern for one resource (/api/users), you can guess how every other resource works (/api/products, /api/orders).',
        },
      ],
    },

    // ─── Section 4: CORS Explained ───────────────────────────────────
    {
      id: 'cors-explained',
      title: 'CORS Explained',
      blocks: [
        {
          type: 'text',
          content:
            'CORS (Cross-Origin Resource Sharing) is the #1 error that confuses new developers. It\'s a security feature built into browsers that blocks your frontend from making requests to a different domain/port than where it was served from.',
        },
        {
          type: 'heading',
          content: 'The Problem',
        },
        {
          type: 'text',
          content:
            'Your React app runs on http://localhost:5173. Your Express API runs on http://localhost:3000. These are different origins (different ports). The browser blocks the request and you see: "Access to fetch at \'http://localhost:3000/api/users\' from origin \'http://localhost:5173\' has been blocked by CORS policy."',
        },
        {
          type: 'heading',
          content: 'Why CORS Exists',
        },
        {
          type: 'text',
          content:
            'Without CORS, a malicious website (evil.com) could make requests to your bank\'s API using your cookies. CORS ensures that only origins you explicitly allow can access your API from a browser.',
        },
        {
          type: 'heading',
          content: 'The Fix',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Express CORS setup',
          code: `import cors from 'cors';

// Allow specific origin (recommended for production)
app.use(cors({
  origin: 'https://yourfrontend.com',
  credentials: true, // allow cookies/auth headers
}));

// Allow multiple origins
app.use(cors({
  origin: ['https://yourfrontend.com', 'https://admin.yourapp.com'],
  credentials: true,
}));

// Development: allow all origins (NOT for production!)
app.use(cors());`,
        },
        {
          type: 'heading',
          content: 'What is an "Origin"?',
        },
        {
          type: 'list',
          items: [
            'An origin = protocol + domain + port. Example: https://myapp.com:443',
            'http://localhost:3000 and http://localhost:5173 are DIFFERENT origins (different port)',
            'http://myapp.com and https://myapp.com are DIFFERENT origins (different protocol)',
            'https://api.myapp.com and https://myapp.com are DIFFERENT origins (different subdomain)',
          ],
        },
        {
          type: 'heading',
          content: 'Preflight Requests',
        },
        {
          type: 'text',
          content:
            'For "complex" requests (PUT, DELETE, or requests with custom headers like Authorization), the browser automatically sends a preflight OPTIONS request first to check if the server allows it. The cors middleware handles this automatically.',
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'CORS is a browser-only restriction. Postman, curl, and server-to-server requests don\'t have CORS. If it works in Postman but not in the browser, it\'s a CORS issue.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'In development with Vite, you can use the built-in proxy to avoid CORS entirely: add proxy: { "/api": "http://localhost:3000" } to vite.config.js. Requests to /api will be forwarded to your backend.',
        },
      ],
    },

    // ─── Section 5: Cookies, Sessions & Tokens ───────────────────────
    {
      id: 'cookies-sessions-tokens',
      title: 'Cookies, Sessions & Tokens',
      blocks: [
        {
          type: 'text',
          content:
            'HTTP is stateless — the server forgets you after every request. Cookies, sessions, and tokens solve this by maintaining state between requests. Understanding the difference is crucial for implementing authentication.',
        },
        {
          type: 'heading',
          content: 'Cookies',
        },
        {
          type: 'text',
          content:
            'Small pieces of data (max ~4KB) stored in the browser and automatically sent with every request to the same domain. The server sets them, the browser stores and sends them.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Setting cookies in Express',
          code: `// Set a cookie
res.cookie('session_id', 'abc123', {
  httpOnly: true,     // JavaScript can't access it (prevents XSS theft)
  secure: true,       // Only sent over HTTPS
  sameSite: 'strict', // Not sent with cross-site requests (prevents CSRF)
  maxAge: 24 * 60 * 60 * 1000, // Expires in 24 hours
});

// Read a cookie
const sessionId = req.cookies.session_id;

// Delete a cookie
res.clearCookie('session_id');`,
        },
        {
          type: 'heading',
          content: 'Sessions (Server-Side)',
        },
        {
          type: 'text',
          content:
            'A session stores user data on the server. The client only gets a session ID (in a cookie). On each request, the server looks up the session ID to find the user\'s data.',
        },
        {
          type: 'list',
          items: [
            'Pros — Server controls the data. Easy to invalidate (just delete the session). More secure since sensitive data stays server-side',
            'Cons — Requires server-side storage (memory, Redis, database). Harder to scale across multiple servers',
            'Best for — Traditional web apps, apps that need instant session invalidation (logout everywhere)',
          ],
        },
        {
          type: 'heading',
          content: 'JWTs (JSON Web Tokens)',
        },
        {
          type: 'text',
          content:
            'A JWT is a self-contained token that carries user data inside it (encoded, not encrypted). The server signs it with a secret key, and can verify it later without looking anything up in a database.',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'JWT structure',
          code: `Header.Payload.Signature

Header:    { "alg": "HS256", "typ": "JWT" }            → algorithm used
Payload:   { "id": "123", "role": "admin", "iat": ... } → user data (claims)
Signature: HMAC-SHA256(header + payload, secret)         → proves it wasn't tampered with`,
        },
        {
          type: 'list',
          items: [
            'Pros — Stateless (no server storage needed). Scales easily across multiple servers. Works great for APIs and SPAs',
            'Cons — Can\'t be invalidated before expiry (unless you add a blacklist, which defeats the purpose). Token size grows with more data',
            'Best for — SPAs (React apps), mobile apps, microservices, APIs',
          ],
        },
        {
          type: 'heading',
          content: 'Which Should You Use?',
        },
        {
          type: 'list',
          items: [
            'MERN SPA → JWT in httpOnly cookie (most common). Best of both worlds: stateless + secure storage',
            'Traditional web app → Session-based auth with cookie',
            'Mobile app → JWT stored securely on the device',
            'Microservices → JWT (no shared session storage needed between services)',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never store JWTs in localStorage! It\'s accessible to any JavaScript on the page (XSS vulnerability). Use httpOnly cookies instead — JavaScript can\'t read them, but the browser sends them automatically.',
        },
      ],
    },

    // ─── Section 6: Web Storage ──────────────────────────────────────
    {
      id: 'web-storage',
      title: 'Web Storage',
      blocks: [
        {
          type: 'text',
          content:
            'Browsers provide several ways to store data on the client side. Each has different use cases, limits, and security implications.',
        },
        {
          type: 'heading',
          content: 'localStorage',
        },
        {
          type: 'list',
          items: [
            'Stores key-value pairs as strings (use JSON.stringify/parse for objects)',
            'Persists forever until manually cleared (survives browser restarts)',
            '~5-10 MB storage limit per origin',
            'Synchronous API (blocks the main thread, but fast for small data)',
            'Accessible to any JavaScript on the page — NEVER store sensitive data (tokens, passwords)',
            'Use for — Theme preference, UI state, form drafts, feature flags',
          ],
        },
        {
          type: 'heading',
          content: 'sessionStorage',
        },
        {
          type: 'list',
          items: [
            'Same API as localStorage, but data is cleared when the tab/window is closed',
            'Each tab gets its own sessionStorage (not shared between tabs)',
            'Use for — Temporary form data, one-time wizard progress, per-tab state',
          ],
        },
        {
          type: 'heading',
          content: 'Cookies vs localStorage vs sessionStorage',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'Comparison',
          code: `Feature          | Cookie           | localStorage    | sessionStorage
─────────────────|──────────────────|─────────────────|────────────────
Size limit       | ~4 KB            | ~5-10 MB        | ~5-10 MB
Sent to server   | Yes (automatic)  | No              | No
Expires          | Configurable     | Never           | Tab close
Accessible to JS | If not httpOnly  | Yes             | Yes
Scope            | Per domain+path  | Per origin      | Per origin+tab`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For large amounts of structured data (offline-first apps, caching), use IndexedDB. It supports much larger storage (~50MB+), async operations, and complex queries.',
        },
      ],
    },

    // ─── Section 7: Security Threats Every Dev Should Know ───────────
    {
      id: 'security-threats',
      title: 'Security Threats Every Dev Should Know',
      blocks: [
        {
          type: 'text',
          content:
            'You don\'t need to be a security expert, but every developer must understand common attacks and how to prevent them. These are the OWASP Top 10 attacks you\'ll encounter most often.',
        },
        {
          type: 'heading',
          content: 'XSS (Cross-Site Scripting)',
        },
        {
          type: 'text',
          content:
            'An attacker injects malicious JavaScript into your page. When other users visit, the script runs in their browser and can steal cookies, tokens, or personal data.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'XSS example and prevention',
          code: `// BAD: Directly inserting user input into HTML
element.innerHTML = userInput; // If userInput = <script>steal(cookies)</script>

// GOOD: React prevents XSS by default — it escapes all values in JSX
// This renders as literal text, NOT as HTML:
return <div>{userInput}</div>; // Safe!

// DANGEROUS in React: dangerouslySetInnerHTML bypasses this protection
// Only use it with sanitized/trusted content
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />`,
        },
        {
          type: 'list',
          items: [
            'Prevention — Never use innerHTML with user input. React\'s JSX escapes by default. Use a sanitizer (DOMPurify) if you must render raw HTML. Set httpOnly cookies so scripts can\'t steal them',
          ],
        },
        {
          type: 'heading',
          content: 'CSRF (Cross-Site Request Forgery)',
        },
        {
          type: 'text',
          content:
            'An attacker tricks a logged-in user into making an unwanted request. Example: you\'re logged into your bank, visit a malicious page, and it secretly submits a form that transfers money from your account.',
        },
        {
          type: 'list',
          items: [
            'Prevention — Use SameSite cookies (strict or lax). Use CSRF tokens for form submissions. Don\'t use GET requests for state-changing operations',
          ],
        },
        {
          type: 'heading',
          content: 'SQL / NoSQL Injection',
        },
        {
          type: 'text',
          content:
            'An attacker manipulates database queries through user input to access, modify, or delete data they shouldn\'t have access to.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Injection example and prevention',
          code: `// BAD: String concatenation in queries
const query = \`SELECT * FROM users WHERE email = '\${req.body.email}'\`;
// Attacker sends: email = "' OR '1'='1" → returns ALL users

// GOOD: Use parameterized queries (built into all ORMs)
const user = await User.findOne({ email: req.body.email }); // Mongoose (safe)
const user = await prisma.user.findUnique({ where: { email } }); // Prisma (safe)

// NoSQL Injection — MongoDB is vulnerable too
// BAD: passing raw user input to queries
const user = await User.findOne({ email: req.body.email });
// Attacker sends: { "email": { "$gt": "" } } → matches ALL users

// GOOD: Validate and sanitize input, use express-mongo-sanitize
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize()); // Strips $ operators from user input`,
        },
        {
          type: 'heading',
          content: 'DoS & DDoS Attacks',
        },
        {
          type: 'text',
          content:
            'DoS (Denial of Service) means flooding your server with so many requests that it can\'t respond to real users. DDoS (Distributed DoS) uses thousands of compromised machines to do the same thing at massive scale.',
        },
        {
          type: 'list',
          items: [
            'Rate limiting — Limit requests per IP (e.g., 100 requests per 15 minutes). Use express-rate-limit',
            'Request size limits — Set body parser limits (express.json({ limit: "10kb" })) to prevent huge payloads',
            'Timeouts — Set request timeouts so a single slow request doesn\'t block your server forever',
            'CDN/WAF — Use Cloudflare, AWS CloudFront, or similar to absorb traffic before it hits your server',
            'Load balancing — Distribute traffic across multiple server instances',
            'Helmet.js — Sets security headers that prevent common attacks (app.use(helmet()))',
          ],
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Basic DoS protection in Express',
          code: `import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';

// Security headers
app.use(helmet());

// Rate limiting — max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests, please try again later.',
});
app.use('/api', limiter);

// Limit body size to prevent large payload attacks
app.use(express.json({ limit: '10kb' }));

// Prevent HTTP Parameter Pollution
app.use(hpp());`,
        },
        {
          type: 'heading',
          content: 'Brute Force Attacks',
        },
        {
          type: 'text',
          content:
            'An attacker tries thousands of password combinations to guess a user\'s login credentials. Protect login endpoints specifically.',
        },
        {
          type: 'list',
          items: [
            'Rate limit login attempts per IP and per account (e.g., 5 failed attempts → lock for 15 minutes)',
            'Use bcrypt with a high salt rounds (12+) to make password hashing slow',
            'Require strong passwords (min 8 chars, mix of letters/numbers/symbols)',
            'Add CAPTCHA after repeated failures',
            'Never tell the user whether the email or password was wrong — say "Invalid credentials"',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never store passwords in plain text. Always hash with bcrypt. Never log passwords, tokens, or sensitive data. Never expose stack traces to users in production (set NODE_ENV=production).',
        },
      ],
    },

    // ─── Section 8: Authentication Methods ───────────────────────────
    {
      id: 'authentication-methods',
      title: 'Authentication Methods',
      blocks: [
        {
          type: 'text',
          content:
            'Authentication = proving who you are. Authorization = proving what you\'re allowed to do. Here are the common ways to implement authentication in web apps.',
        },
        {
          type: 'heading',
          content: 'Session-Based Auth',
        },
        {
          type: 'list',
          items: [
            'User logs in → server creates a session (stored in memory/Redis/DB) → sends session ID as a cookie',
            'On every request, the server looks up the session ID to identify the user',
            'Logging out = delete the session on the server',
            'Simple and secure, but requires server-side storage',
          ],
        },
        {
          type: 'heading',
          content: 'JWT (Token-Based) Auth',
        },
        {
          type: 'list',
          items: [
            'User logs in → server creates a JWT (signed with a secret) → sends it to the client',
            'Client stores the JWT and sends it with every request in the Authorization header or cookie',
            'Server verifies the JWT signature — no database lookup needed',
            'Stateless and scalable, but can\'t be invalidated before expiry without extra work',
          ],
        },
        {
          type: 'heading',
          content: 'OAuth 2.0 (Sign in with Google/GitHub)',
        },
        {
          type: 'text',
          content:
            'OAuth lets users log in with their existing accounts (Google, GitHub, Facebook) instead of creating a new password. Your app never sees their password.',
        },
        {
          type: 'list',
          items: [
            '1. User clicks "Sign in with Google"',
            '2. User is redirected to Google\'s login page',
            '3. User approves your app\'s access request',
            '4. Google redirects back to your app with an authorization code',
            '5. Your server exchanges the code for an access token',
            '6. Your server uses the token to get the user\'s profile from Google',
            '7. You create/find the user in your database and start a session or issue a JWT',
          ],
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'passport',
              description: 'Authentication middleware for Node.js with 500+ strategies (Google, GitHub, JWT, etc.)',
              url: 'https://www.npmjs.com/package/passport',
            },
            {
              name: 'next-auth',
              description: 'Authentication for Next.js — supports OAuth, email/password, and more with minimal config',
              url: 'https://www.npmjs.com/package/next-auth',
            },
          ],
        },
        {
          type: 'heading',
          content: 'API Keys',
        },
        {
          type: 'list',
          items: [
            'A unique string that identifies your app (not a user). Like a password for your application',
            'Used for server-to-server communication (Stripe API, SendGrid, OpenAI)',
            'Sent in headers: x-api-key: your_key_here or Authorization: Bearer your_key_here',
            'NEVER expose API keys in frontend code. Keep them in environment variables on the server',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For most MERN apps: use JWT stored in httpOnly cookies for your own auth, and OAuth (via Passport.js) for social login. For Next.js apps, NextAuth makes it incredibly easy.',
        },
      ],
    },

    // ─── Section 9: WebSockets vs HTTP vs SSE ────────────────────────
    {
      id: 'websockets-vs-http',
      title: 'WebSockets vs HTTP vs SSE',
      blocks: [
        {
          type: 'text',
          content:
            'Understanding when to use each communication protocol is key to building the right kind of real-time feature.',
        },
        {
          type: 'heading',
          content: 'Regular HTTP (Request/Response)',
        },
        {
          type: 'list',
          items: [
            'Client sends a request → server sends a response → connection closes',
            'Like sending a letter — you ask, wait, and get a reply',
            'Perfect for — CRUD operations, form submissions, page loads, API calls',
            'Limitation — Server can\'t push updates. Client must ask for new data (polling)',
          ],
        },
        {
          type: 'heading',
          content: 'WebSockets (Full Duplex)',
        },
        {
          type: 'list',
          items: [
            'Persistent connection — client and server can send messages to each other anytime',
            'Like a phone call — both sides can talk whenever they want',
            'Perfect for — Chat, multiplayer games, collaborative editing, live trading',
            'Uses a different protocol (ws:// or wss://) after an initial HTTP upgrade handshake',
          ],
        },
        {
          type: 'heading',
          content: 'Server-Sent Events (One Way)',
        },
        {
          type: 'list',
          items: [
            'Server pushes updates to the client over a long-lived HTTP connection',
            'Like a radio broadcast — the server talks, the client listens',
            'Perfect for — Live feeds, notifications, stock tickers, progress updates',
            'Simpler than WebSockets, auto-reconnects, works through proxies',
            'Client can\'t send data back (use a regular POST request if needed)',
          ],
        },
        {
          type: 'heading',
          content: 'Polling & Long Polling',
        },
        {
          type: 'list',
          items: [
            'Polling — Client asks "any updates?" every X seconds. Simple but wasteful (many empty responses)',
            'Long polling — Client asks, server holds the connection open until there\'s data, then responds. More efficient than polling but still creates many connections',
            'Use polling only if SSE and WebSockets aren\'t available (legacy systems)',
          ],
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'When to use what',
          code: `Use Case                    | Protocol
────────────────────────────|──────────────────
CRUD API calls              | HTTP (REST)
Chat / messaging            | WebSocket
Live notifications          | SSE
Multiplayer game            | WebSocket
Stock price feed            | SSE or WebSocket
File upload progress        | SSE
Collaborative editing       | WebSocket
Dashboard with live data    | SSE
AI text streaming           | SSE`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Start with SSE if you only need server → client updates. It\'s simpler to set up, works over standard HTTP, and auto-reconnects. Only use WebSockets when you truly need two-way communication.',
        },
      ],
    },

    // ─── Section 10: Caching ─────────────────────────────────────────
    {
      id: 'caching',
      title: 'Caching',
      blocks: [
        {
          type: 'text',
          content:
            'Caching stores copies of data in a faster location so you don\'t have to fetch/compute it every time. It\'s the most effective way to make your app faster.',
        },
        {
          type: 'heading',
          content: 'Levels of Caching',
        },
        {
          type: 'list',
          items: [
            'Browser cache — The browser stores CSS, JS, images locally. Controlled by Cache-Control headers. Fastest cache (no network request needed)',
            'CDN cache — Cloudflare/Vercel Edge stores your static assets on servers worldwide, close to users',
            'Application cache — Your server stores frequently-accessed data in memory (Redis) to avoid hitting the database',
            'Database cache — The database caches query results internally. Proper indexing helps the DB find data faster',
          ],
        },
        {
          type: 'heading',
          content: 'Browser Caching (Cache-Control)',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'Common Cache-Control values',
          code: `Cache-Control: no-store                → Never cache (sensitive data)
Cache-Control: no-cache                → Cache, but revalidate every time
Cache-Control: max-age=3600            → Cache for 1 hour, don't revalidate
Cache-Control: max-age=31536000        → Cache for 1 year (static assets with hash filenames)
Cache-Control: private, max-age=600    → Only browser can cache, not CDN (user-specific data)
Cache-Control: public, max-age=86400   → Both browser and CDN can cache for 24h`,
        },
        {
          type: 'heading',
          content: 'Server-Side Caching with Redis',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Simple Redis caching pattern',
          code: `import { createClient } from 'redis';

const redis = createClient();
await redis.connect();

async function getUser(id) {
  // 1. Check cache first
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss — fetch from database
  const user = await User.findById(id);

  // 3. Store in cache (expire after 1 hour)
  await redis.setEx(\`user:\${id}\`, 3600, JSON.stringify(user));

  return user;
}

// Invalidate cache when data changes
async function updateUser(id, data) {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  await redis.del(\`user:\${id}\`); // Delete stale cache
  return user;
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Cache invalidation is one of the hardest problems in programming. A common strategy: cache on read, invalidate on write. Set short expiration times (TTL) as a safety net so stale data eventually refreshes.',
        },
      ],
    },

    // ─── Section 11: Browser Rendering ───────────────────────────────
    {
      id: 'browser-rendering',
      title: 'How Browsers Render Pages',
      blocks: [
        {
          type: 'text',
          content:
            'Understanding the rendering pipeline helps you write faster websites and debug layout/performance issues. Here\'s what happens after the browser receives HTML from the server.',
        },
        {
          type: 'heading',
          content: 'The Rendering Pipeline',
        },
        {
          type: 'list',
          items: [
            '1. Parse HTML → Build the DOM tree (Document Object Model)',
            '2. Parse CSS → Build the CSSOM tree (CSS Object Model)',
            '3. Combine DOM + CSSOM → Render Tree (only visible elements)',
            '4. Layout — Calculate the size and position of every element',
            '5. Paint — Fill in pixels (colors, images, text, borders)',
            '6. Composite — Layer and display the final result on screen',
          ],
        },
        {
          type: 'heading',
          content: 'Render-Blocking Resources',
        },
        {
          type: 'list',
          items: [
            'CSS is render-blocking — the browser won\'t paint anything until all CSS is loaded and parsed. Keep CSS small and critical',
            'JavaScript is parser-blocking — the browser pauses HTML parsing when it hits a <script> tag. Use defer or async attributes',
            '<script defer> — Download in parallel, execute after HTML is fully parsed (best for most scripts)',
            '<script async> — Download in parallel, execute immediately when ready (for independent scripts like analytics)',
          ],
        },
        {
          type: 'heading',
          content: 'Performance Terms You Should Know',
        },
        {
          type: 'list',
          items: [
            'FCP (First Contentful Paint) — When the first text/image appears. Target: < 1.8s',
            'LCP (Largest Contentful Paint) — When the main content is visible. Target: < 2.5s',
            'CLS (Cumulative Layout Shift) — How much the page jumps around as it loads. Target: < 0.1',
            'INP (Interaction to Next Paint) — How fast the page responds to clicks/taps. Target: < 200ms',
            'TTFB (Time to First Byte) — How long until the server sends the first byte. Target: < 800ms',
            'These are Core Web Vitals — Google uses them for search ranking',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Measure performance with Lighthouse (built into Chrome DevTools), WebPageTest, or PageSpeed Insights. Focus on LCP, CLS, and INP — they have the biggest impact on user experience and SEO.',
        },
      ],
    },

    // ─── Section 12: Environment Variables & Secrets ─────────────────
    {
      id: 'env-variables',
      title: 'Environment Variables & Secrets',
      blocks: [
        {
          type: 'text',
          content:
            'Environment variables store configuration that changes between environments (development, staging, production). They keep secrets like API keys and database passwords OUT of your code.',
        },
        {
          type: 'heading',
          content: 'The Rules',
        },
        {
          type: 'list',
          items: [
            'NEVER commit .env files to Git. Add .env to .gitignore immediately',
            'NEVER hardcode secrets in source code (API keys, passwords, tokens)',
            'NEVER expose server-side secrets to the frontend. In Vite, only VITE_ prefixed variables are exposed to the client',
            'Use different .env files per environment: .env.development, .env.production',
            'Use a .env.example file (committed to Git) showing required variables without actual values',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env.example',
          code: `# Database
DATABASE_URL=
MONGODB_URI=

# Authentication
JWT_SECRET=
JWT_EXPIRES_IN=

# Email
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USERNAME=
EMAIL_PASSWORD=

# Third-party APIs
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173`,
        },
        {
          type: 'heading',
          content: 'Accessing Environment Variables',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Node.js / Express',
          code: `// Node.js (backend) — all env vars are accessible
const dbUrl = process.env.DATABASE_URL;
const secret = process.env.JWT_SECRET;

// Vite (frontend) — only VITE_ prefixed vars are accessible
// In .env: VITE_API_URL=http://localhost:3000
const apiUrl = import.meta.env.VITE_API_URL;

// Next.js — NEXT_PUBLIC_ prefix for client-side vars
const apiUrl = process.env.NEXT_PUBLIC_API_URL;`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'If a secret (API key, database password) accidentally gets committed to Git, it\'s compromised even if you delete it in the next commit — anyone can see Git history. Rotate the secret immediately and use tools like git-secrets or GitGuardian to prevent this.',
        },
      ],
    },

    // ─── Section 13: Deployment & DevOps Basics ──────────────────────
    {
      id: 'deployment-basics',
      title: 'Deployment & DevOps Basics',
      blocks: [
        {
          type: 'text',
          content:
            'Deploying means making your app available on the internet. Here\'s a beginner-friendly overview of where and how to deploy MERN applications.',
        },
        {
          type: 'heading',
          content: 'Where to Deploy',
        },
        {
          type: 'list',
          items: [
            'Frontend (React/Next.js) — Vercel (best for Next.js), Netlify, Cloudflare Pages, GitHub Pages. All free for personal projects',
            'Backend (Express/Node.js) — Railway, Render, Fly.io, DigitalOcean. Most have free tiers',
            'Database — MongoDB Atlas (free tier), Supabase (PostgreSQL, free tier), PlanetScale (MySQL)',
            'Full stack — Railway or Render can host both backend + database together',
          ],
        },
        {
          type: 'heading',
          content: 'Deployment Checklist',
        },
        {
          type: 'list',
          items: [
            'Set NODE_ENV=production (enables optimizations, hides error details)',
            'Set all environment variables on the hosting platform',
            'Enable HTTPS (most platforms do this automatically)',
            'Set up proper CORS origins (not * in production)',
            'Add rate limiting and security headers (helmet)',
            'Configure a health check endpoint (GET /api/health → 200 OK)',
            'Set up logging (don\'t use console.log in production — use a logger like winston or pino)',
            'Enable gzip/brotli compression (compression middleware or hosting platform)',
          ],
        },
        {
          type: 'heading',
          content: 'CI/CD (Continuous Integration / Continuous Deployment)',
        },
        {
          type: 'text',
          content:
            'CI/CD automates testing and deployment. When you push to main, your code is automatically tested and deployed — no manual steps.',
        },
        {
          type: 'list',
          items: [
            'CI (Continuous Integration) — Automatically run tests, linting, and type checks on every pull request',
            'CD (Continuous Deployment) — Automatically deploy to production when code is merged to main',
            'Tools — GitHub Actions (free), GitLab CI, CircleCI, Jenkins',
            'Most hosting platforms (Vercel, Netlify, Railway) have built-in CD — just connect your GitHub repo',
          ],
        },
        {
          type: 'heading',
          content: 'Docker (Containerization)',
        },
        {
          type: 'text',
          content:
            'Docker packages your app and all its dependencies into a container that runs the same everywhere — your laptop, CI server, and production. "It works on my machine" → "It works everywhere."',
        },
        {
          type: 'code',
          language: 'dockerfile',
          fileName: 'Dockerfile',
          code: `FROM node:20-alpine

WORKDIR /app

# Install dependencies first (cached if package.json hasn't changed)
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Start simple: deploy frontend on Vercel, backend on Railway, database on MongoDB Atlas. This costs $0 for personal projects and handles most use cases. Move to Docker/Kubernetes only when you outgrow PaaS platforms.',
        },
      ],
    },

    // ─── Section 14: API Design Patterns ─────────────────────────────
    {
      id: 'api-design-patterns',
      title: 'API Design Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Beyond basic REST, here are patterns that make your APIs more robust, consistent, and easier to consume.',
        },
        {
          type: 'heading',
          content: 'Consistent Response Format',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'Standard API response shape',
          code: `// Success response
{
  "status": "success",
  "data": {
    "user": { "id": "123", "name": "John", "email": "john@example.com" }
  }
}

// Error response
{
  "status": "fail",       // client error (4xx)
  "message": "Email is required"
}

{
  "status": "error",      // server error (5xx)
  "message": "Something went wrong"
}

// List with pagination
{
  "status": "success",
  "results": 25,
  "data": {
    "users": [...]
  },
  "pagination": {
    "page": 2,
    "limit": 10,
    "totalPages": 5,
    "totalResults": 50
  }
}`,
        },
        {
          type: 'heading',
          content: 'Pagination Strategies',
        },
        {
          type: 'list',
          items: [
            'Offset pagination — ?page=2&limit=10 → Skip 10, take 10. Simple but slow on large datasets (DB must count through skipped rows)',
            'Cursor pagination — ?cursor=abc123&limit=10 → Start after this item. Fast on large datasets. Used by Twitter, Facebook, Slack APIs',
            'For most apps, offset pagination is fine. Switch to cursor pagination if you have 100K+ rows or need real-time feeds',
          ],
        },
        {
          type: 'heading',
          content: 'Idempotency',
        },
        {
          type: 'text',
          content:
            'An idempotent request can be safely retried without side effects. GET, PUT, DELETE are idempotent by nature. POST is NOT — clicking "Submit Order" twice could create two orders.',
        },
        {
          type: 'list',
          items: [
            'Use idempotency keys for payment and order endpoints — the client sends a unique key, the server checks if it\'s already been processed',
            'GET and DELETE should always be safe to retry',
            'Make PUT fully replace the resource (not partially update) so retries are safe',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Pick a response format on day one and stick with it across your entire API. Inconsistency (sometimes { data: ... }, sometimes { result: ... }) frustrates frontend developers.',
        },
      ],
    },

    // ─── Section 15: Performance Optimization ────────────────────────
    {
      id: 'web-performance',
      title: 'Web Performance Optimization',
      blocks: [
        {
          type: 'text',
          content:
            'Every 100ms of load time can cost 1% in sales (Amazon). Performance isn\'t optional — it directly affects user experience, SEO, and conversion rates.',
        },
        {
          type: 'heading',
          content: 'Frontend Performance',
        },
        {
          type: 'list',
          items: [
            'Code splitting — Import pages/components lazily with React.lazy() so users only download what they need',
            'Image optimization — Use WebP/AVIF, set width/height attributes, use loading="lazy" for below-the-fold images',
            'Bundle analysis — Use vite-bundle-visualizer to find what\'s making your bundle large',
            'Tree shaking — Import only what you need: import { Button } from "lib" not import lib from "lib"',
            'Minimize re-renders — Use React.memo, useMemo, useCallback where it actually matters (measure first)',
            'Virtualization — For long lists (1000+ items), use @tanstack/react-virtual instead of rendering everything',
          ],
        },
        {
          type: 'heading',
          content: 'Backend Performance',
        },
        {
          type: 'list',
          items: [
            'Database indexing — Add indexes on fields you query/sort by. A missing index can make queries 100x slower',
            'N+1 queries — Fetching a list, then querying for each item. Use populate() (Mongoose) or include (Prisma) to fetch in one query',
            'Caching — Cache expensive queries in Redis. Cache static API responses with proper Cache-Control headers',
            'Compression — Use compression middleware to gzip/brotli API responses',
            'Connection pooling — Reuse database connections instead of opening a new one per request',
            'Pagination — Never return all records. Always paginate list endpoints',
          ],
        },
        {
          type: 'heading',
          content: 'Network Performance',
        },
        {
          type: 'list',
          items: [
            'CDN — Serve static assets from a CDN (Cloudflare, Vercel Edge). Users download from the closest server',
            'HTTP/2 — Multiplexes requests over a single connection. Most hosts support it automatically',
            'Preload critical resources — <link rel="preload"> for fonts, critical CSS, hero images',
            'Preconnect — <link rel="preconnect" href="https://api.example.com"> to start the connection early',
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Don\'t optimize prematurely. Measure first (Lighthouse, Chrome DevTools Performance tab, React DevTools Profiler), identify the bottleneck, then optimize that specific thing.',
        },
      ],
    },
    {
      id: 'microservices-vs-monolith',
      title: 'Microservices vs Monolith',
      blocks: [
        {
          type: 'text',
          content:
            'When building a backend, you decide how to structure your services. A monolith is one big application. Microservices splits it into many small, independent services. As a junior developer you will almost always start with a monolith — and that is the right call.',
        },
        {
          type: 'heading',
          content: 'Monolith — One Big App',
        },
        {
          type: 'list',
          items: [
            'Everything lives in one codebase and one deployable unit (your Express app)',
            'Simpler to develop, test, debug, and deploy — one git repo, one server, one database',
            'No network overhead between features — function calls are instant',
            'Easy to refactor — rename a function and update all callers in the same project',
            'When it gets slow, you vertically scale (bigger server) or add caching',
          ],
        },
        {
          type: 'heading',
          content: 'Microservices — Many Small Apps',
        },
        {
          type: 'list',
          items: [
            'Split by business domain: auth-service, payment-service, notification-service, product-service',
            'Each service has its own codebase, database, and deployment pipeline',
            'Services communicate via HTTP (REST/GraphQL), gRPC, or message queues (RabbitMQ, Kafka)',
            'Scales independently — if payments are slow, scale only the payment service',
            'Different services can use different tech stacks (Node.js + Python + Go)',
          ],
        },
        {
          type: 'heading',
          content: 'The Hidden Cost of Microservices',
        },
        {
          type: 'list',
          items: [
            'Distributed systems are hard — network calls fail, services go down, you need retries and timeouts',
            'You need Docker, Kubernetes, service discovery, API gateways, distributed tracing, and centralized logging',
            'A bug might span 3 services — debugging is much harder than a monolith',
            'Local development gets complex — you need all services running simultaneously',
            'Data consistency is harder — no single transaction across multiple databases',
          ],
        },
        {
          type: 'heading',
          content: 'Communication Between Services',
        },
        {
          type: 'list',
          items: [
            'Synchronous (REST/gRPC) — Service A calls Service B and waits for a response. Simple but fragile if B is slow/down',
            'Asynchronous (Message Queue) — Service A publishes an event, Service B processes it when ready. More resilient',
            'Message Queue tools — RabbitMQ (simple), Apache Kafka (high-throughput, event streaming)',
            'API Gateway — single entry point that routes requests to the right service (Kong, AWS API Gateway)',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Most startups and small teams should not use microservices. Start with a well-structured monolith. Netflix, Uber, and Amazon switched to microservices after their monoliths became unmanageable at massive scale — not at day one. "Monolith first" is the pragmatic default.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'A "modular monolith" is a great middle ground — one deployable app but with strict internal module boundaries (auth module, payment module, notifications module). Each module has its own folder, models, and routes. Easy to split into microservices later if needed.',
        },
      ],
    },
    {
      id: 'monitoring-error-tracking',
      title: 'Monitoring & Error Tracking',
      blocks: [
        {
          type: 'text',
          content:
            'In production, bugs happen silently — no one is watching the terminal. Monitoring tools alert you when something breaks, track errors automatically, and show you performance data so you can fix issues before users complain.',
        },
        {
          type: 'heading',
          content: 'Error Tracking with Sentry',
        },
        {
          type: 'text',
          content:
            'Sentry captures unhandled errors in your app, sends you alerts, and shows you the full stack trace, browser info, and user context. It\'s the industry standard for error monitoring.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'terminal',
          code: `npm install @sentry/node           # Express/Node.js
npm install @sentry/react          # React frontend`,
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'server.js',
          code: `import * as Sentry from '@sentry/node';

// Initialize BEFORE your routes (at the very top of server.js)
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV, // 'production', 'staging', etc.
  tracesSampleRate: 0.1,             // capture 10% of requests for performance
});

// Add request context to all errors
app.use(Sentry.Handlers.requestHandler());

// Your routes here...
app.get('/users', userController.getAll);

// Error handler MUST come after all routes
app.use(Sentry.Handlers.errorHandler());

// Sentry automatically captures any unhandled errors and sends alerts
// You can also capture manually:
try {
  riskyOperation();
} catch (err) {
  Sentry.captureException(err);
  res.status(500).json({ message: 'Internal server error' });
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'main.jsx',
          code: `import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
  // Wrap your router for navigation tracking
  integrations: [Sentry.reactRouterV6BrowserTracingIntegration()],
});

// Wrap your app in Sentry's ErrorBoundary for React errors
ReactDOM.createRoot(document.getElementById('root')).render(
  <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
    <App />
  </Sentry.ErrorBoundary>
);`,
        },
        {
          type: 'heading',
          content: 'Health Check Endpoints',
        },
        {
          type: 'text',
          content:
            'A health check endpoint lets your hosting platform (Railway, Render, Kubernetes) know your server is alive and ready to accept traffic. If it fails, the platform restarts your service automatically.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'healthRoutes.js',
          code: `import mongoose from 'mongoose';

// Simple liveness check — is the server running?
router.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Readiness check — is the server ready to serve traffic?
router.get('/health/ready', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting

  if (dbState !== 1) {
    return res.status(503).json({ status: 'error', db: 'disconnected' });
  }

  res.json({
    status: 'ok',
    db: 'connected',
    memory: process.memoryUsage(),
    uptime: process.uptime(),
  });
});`,
        },
        {
          type: 'heading',
          content: 'What to Monitor',
        },
        {
          type: 'list',
          items: [
            'Error rate — percentage of requests returning 5xx errors (alert if > 1%)',
            'Response time — P95 latency (95th percentile). Alert if > 2 seconds',
            'Uptime — is your server reachable? UptimeRobot is free and pings every 5 minutes',
            'Memory usage — Node.js memory leaks cause gradual slowdowns before crashing',
            'Database query times — slow queries are usually the bottleneck in MERN apps',
            'Error logs — centralize logs with Winston + a log aggregator (Logtail, Papertrail)',
          ],
        },
        {
          type: 'package-list',
          packages: [
            {
              name: '@sentry/node',
              description: 'Error tracking for Node.js/Express — captures exceptions, sends alerts, shows full context',
              url: 'https://docs.sentry.io/platforms/javascript/guides/express',
            },
            {
              name: '@sentry/react',
              description: 'Error boundary + performance monitoring for React — free tier handles most projects',
              url: 'https://docs.sentry.io/platforms/javascript/guides/react',
            },
            {
              name: 'pino',
              description: 'Very fast JSON logger for Node.js — better than Winston for structured logging',
              url: 'https://getpino.io',
            },
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Set up Sentry on day one, not after your first production incident. The free tier supports 5,000 errors/month which is plenty for personal projects and small startups. It takes 10 minutes to add and will save hours of debugging.',
        },
      ],
    },
  ],
}

export default webConceptsData
