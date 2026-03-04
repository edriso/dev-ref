const nextjsData = {
  id: 'nextjs',
  name: 'Next.js',
  description:
    'Best practices, patterns, and conventions for Next.js App Router applications',
  sections: [
    // ─── Section 1: Project Setup & Configuration ─────────────────────
    {
      id: 'project-setup',
      title: 'Project Setup & Configuration',
      blocks: [
        {
          type: 'text',
          content:
            'Next.js 14/15 uses the App Router by default. Create a new project with create-next-app and configure it for your MERN workflow. The App Router introduces Server Components, nested layouts, and a new file-convention-based routing system.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Create a new project',
          code: `# Create new Next.js project (interactive prompts)
npx create-next-app@latest my-app

# Recommended selections:
#   TypeScript: Yes (or No for JS)
#   ESLint: Yes
#   Tailwind CSS: Yes
#   src/ directory: Yes
#   App Router: Yes
#   import alias: @/*

cd my-app
npm run dev`,
        },
        {
          type: 'heading',
          content: 'next.config.js',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'next.config.mjs',
          code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for catching bugs early
  reactStrictMode: true,

  // Image optimization: whitelist external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/your-cloud/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  // Redirect old routes
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true, // 308 status code
      },
    ];
  },

  // Custom headers (security, caching)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default nextConfig;`,
        },
        {
          type: 'heading',
          content: 'Recommended Packages',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: 'next',
              description:
                'The React framework for production — server rendering, routing, and optimization built-in',
              url: 'https://nextjs.org',
            },
            {
              name: 'next-auth (Auth.js)',
              description:
                'Authentication for Next.js with OAuth, credentials, and session management',
              url: 'https://authjs.dev',
            },
            {
              name: 'prisma',
              description:
                'Type-safe ORM for Node.js with auto-generated queries and migrations',
              url: 'https://www.prisma.io',
            },
            {
              name: 'zod',
              description:
                'TypeScript-first schema validation — essential for validating Server Action inputs',
              url: 'https://zod.dev',
            },
            {
              name: 'next-themes',
              description:
                'Abstraction for light/dark theme switching with zero flash',
              url: 'https://github.com/pacocoursey/next-themes',
            },
            {
              name: 'uploadthing',
              description:
                'File uploads built for Next.js with type-safe routes and built-in UI components',
              url: 'https://uploadthing.com',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Install commands',
          code: `# Core
npm i next react react-dom

# Auth
npm i next-auth@beta

# Database
npm i prisma @prisma/client

# Validation
npm i zod

# UI & Styling
npm i tailwindcss @tailwindcss/postcss postcss next-themes

# Dev dependencies
npm i -D eslint eslint-config-next prettier @types/node`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always use the latest create-next-app — it scaffolds the App Router, Tailwind CSS, and ESLint config for you. Avoid mixing Pages Router and App Router patterns in the same project unless migrating incrementally.',
        },
      ],
    },

    // ─── Section 2: App Router Fundamentals ───────────────────────────
    {
      id: 'app-router-fundamentals',
      title: 'App Router Fundamentals',
      blocks: [
        {
          type: 'text',
          content:
            'The App Router uses file-system conventions inside the app/ directory. Special files like page.js, layout.js, loading.js, and error.js define routes and UI states. Every component inside app/ is a Server Component by default.',
        },
        {
          type: 'heading',
          content: 'File Conventions',
        },
        {
          type: 'list',
          items: [
            'page.js — The unique UI for a route, makes the route publicly accessible',
            'layout.js — Shared UI that wraps page and child layouts (preserved across navigation)',
            'loading.js — Instant loading UI using React Suspense (shown while page loads)',
            'error.js — Error boundary that catches errors in the route segment ("use client" required)',
            'not-found.js — UI for when notFound() is called or a route is not matched',
            'route.js — API endpoint (Route Handler) — cannot coexist with page.js in the same folder',
            'template.js — Like layout.js but re-mounts on every navigation (resets state)',
            'default.js — Fallback UI for parallel routes when no match is found',
          ],
        },
        {
          type: 'heading',
          content: 'Basic Routing Structure',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'app',
            children: [
              { name: 'layout.js', comment: 'Root layout (required)' },
              { name: 'page.js', comment: 'Home page → /' },
              { name: 'loading.js', comment: 'Global loading state' },
              { name: 'not-found.js', comment: 'Global 404 page' },
              { name: 'error.js', comment: 'Global error boundary' },
              {
                name: 'about',
                children: [
                  { name: 'page.js', comment: '→ /about' },
                ],
              },
              {
                name: 'blog',
                children: [
                  { name: 'page.js', comment: '→ /blog' },
                  {
                    name: '[slug]',
                    comment: 'Dynamic segment',
                    children: [
                      { name: 'page.js', comment: '→ /blog/:slug' },
                    ],
                  },
                ],
              },
              {
                name: 'dashboard',
                children: [
                  { name: 'layout.js', comment: 'Dashboard-specific layout' },
                  { name: 'page.js', comment: '→ /dashboard' },
                  {
                    name: 'settings',
                    children: [
                      { name: 'page.js', comment: '→ /dashboard/settings' },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'heading',
          content: 'Root Layout (Required)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/layout.js',
          code: `import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'Built with Next.js App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Dynamic Routes & Params',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/blog/[slug]/page.js',
          code: `// Dynamic route — params are passed as a prop
export default async function BlogPost({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound(); // Triggers not-found.js
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Generate static pages at build time for known slugs
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post?.title ?? 'Post Not Found',
    description: post?.excerpt,
  };
}`,
        },
        {
          type: 'heading',
          content: 'Loading & Error States',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/dashboard/loading.js',
          code: `// Shown automatically while page.js is loading (uses React Suspense)
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/dashboard/error.js',
          code: `'use client'; // Error boundaries must be Client Components

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Layouts persist across navigation and do not re-render. If you need fresh state on every navigation, use template.js instead of layout.js. This is useful for entrance/exit animations or per-page analytics logging.',
        },
      ],
    },

    // ─── Section 3: Server Components vs Client Components ────────────
    {
      id: 'server-vs-client-components',
      title: 'Server Components vs Client Components',
      blocks: [
        {
          type: 'text',
          content:
            'In the App Router, every component is a Server Component by default. Server Components run only on the server — they can directly access databases, read files, and fetch data without exposing secrets to the client. Use "use client" only when you need interactivity, browser APIs, or React hooks.',
        },
        {
          type: 'heading',
          content: 'When to Use Each',
        },
        {
          type: 'list',
          items: [
            'Server Components: data fetching, database access, accessing backend resources, keeping sensitive info on server, reducing client JS bundle',
            'Client Components: onClick/onChange handlers, useState/useEffect/useRef, browser APIs (localStorage, window, navigator), third-party client-side libraries, custom hooks with state',
          ],
        },
        {
          type: 'heading',
          content: 'Server Component (Default)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/users/page.js',
          code: `// Server Component — NO "use client" directive
// Can directly fetch data, access DB, read env vars
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  // This runs on the server — no API route needed!
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <div>
      <h1>Users</h1>
      {/* Pass data down to a Client Component for interactivity */}
      <UserSearch />
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} — {user.email}</li>
        ))}
      </ul>
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Client Component',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'components/UserSearch.jsx',
          code: `'use client'; // Required for interactivity

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    router.push(\`/users?search=\${query}\`);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="border rounded px-3 py-2"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
        Search
      </button>
    </form>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Composition Pattern: Server Parent, Client Child',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/dashboard/page.js',
          code: `// Server Component fetches data, passes it to Client Component
import { getStats } from '@/lib/data';
import DashboardChart from '@/components/DashboardChart'; // Client Component

export default async function DashboardPage() {
  const stats = await getStats(); // Runs on server

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Server-fetched data passed as props to Client Component */}
      <DashboardChart data={stats} />
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Passing Server Components as Children',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Slot pattern',
          code: `// Client Component wrapper
'use client';
import { useState } from 'react';

export function Tabs({ tabs, children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex gap-2">
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}>{tab}</button>
        ))}
      </div>
      {/* children can be Server Components — they're already rendered on the server */}
      {children[activeTab]}
    </div>
  );
}

// Usage in a Server Component (page.js)
// <Tabs tabs={['Overview', 'Analytics']}>
//   <ServerRenderedOverview />    {/* Server Component */}
//   <ServerRenderedAnalytics />   {/* Server Component */}
// </Tabs>`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Do NOT import a Server Component into a Client Component — it will be converted to a Client Component. Instead, pass Server Components as children or props (the slot pattern). The "use client" boundary cascades: everything imported by a Client Component becomes client code.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Push "use client" as far down the tree as possible. Only the interactive leaf components need to be Client Components. The more Server Components you have, the less JavaScript ships to the browser.',
        },
      ],
    },

    // ─── Section 4: Data Fetching Patterns ────────────────────────────
    {
      id: 'data-fetching',
      title: 'Data Fetching Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Next.js App Router uses async Server Components for data fetching — no useEffect, no loading states to manage manually. Data is fetched on the server, close to your database, and the result is streamed to the client as HTML.',
        },
        {
          type: 'heading',
          content: 'Fetching in Server Components',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/products/page.js',
          code: `// Direct fetch in a Server Component
export default async function ProductsPage() {
  // fetch() is extended by Next.js with caching options
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }, // Revalidate every hour (ISR)
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  const products = await res.json();

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} — \${p.price}</li>
      ))}
    </ul>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Caching & Revalidation Options',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Fetch caching options',
          code: `// Default: cached indefinitely (static)
fetch('https://api.example.com/data');

// Revalidate every 60 seconds (ISR — Incremental Static Regeneration)
fetch('https://api.example.com/data', {
  next: { revalidate: 60 },
});

// No caching — always fresh (dynamic)
fetch('https://api.example.com/data', {
  cache: 'no-store',
});

// Revalidate by tag (on-demand revalidation)
fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] },
});

// Then in a Server Action or Route Handler:
import { revalidateTag, revalidatePath } from 'next/cache';

revalidateTag('posts');           // Revalidate all fetches tagged 'posts'
revalidatePath('/blog');          // Revalidate a specific path
revalidatePath('/', 'layout');    // Revalidate everything`,
        },
        {
          type: 'heading',
          content: 'Direct Database Access (No API Needed)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/posts/page.js',
          code: `import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

// Cache the database query with a tag for on-demand revalidation
const getPosts = unstable_cache(
  async () => {
    return prisma.post.findMany({
      include: { author: { select: { name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  },
  ['posts-list'],         // Cache key
  {
    tags: ['posts'],      // Revalidation tag
    revalidate: 300,      // Revalidate every 5 minutes
  }
);

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>By {post.author.name}</p>
        </article>
      ))}
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Parallel Data Fetching',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/dashboard/page.js',
          code: `// Fetch multiple resources in parallel — don't waterfall!
export default async function DashboardPage() {
  // Start all fetches simultaneously
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics(),
  ]);

  return (
    <div>
      <UserProfile user={user} />
      <RecentPosts posts={posts} />
      <AnalyticsChart data={analytics} />
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Streaming with Suspense',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/dashboard/page.js',
          code: `import { Suspense } from 'react';

// Stream slow components independently — don't block the whole page
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Fast — renders immediately */}
      <Suspense fallback={<UserSkeleton />}>
        <UserProfile />
      </Suspense>

      {/* Slow — streams in when ready, doesn't block above */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <SlowAnalytics />
      </Suspense>
    </div>
  );
}

// Each component fetches its own data
async function SlowAnalytics() {
  const data = await getAnalytics(); // Might take 2-3 seconds
  return <AnalyticsChart data={data} />;
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use Suspense boundaries to stream slow parts of your page independently. The user sees the shell immediately while data-heavy sections load in parallel. This is much better UX than a full-page loading spinner.',
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Avoid fetching data in Client Components with useEffect. Fetch in Server Components or use Server Actions. If you must fetch on the client (search autocomplete, infinite scroll), use a library like SWR or TanStack Query.',
        },
      ],
    },

    // ─── Section 5: API Routes & Route Handlers ───────────────────────
    {
      id: 'api-routes',
      title: 'API Routes & Route Handlers',
      blocks: [
        {
          type: 'text',
          content:
            'Route Handlers replace the Pages Router\'s API Routes. They live in app/api/ and use the Web Request/Response APIs. Use them for webhooks, third-party API proxies, and endpoints consumed by external clients. For your own app, prefer Server Actions over Route Handlers.',
        },
        {
          type: 'heading',
          content: 'Basic Route Handler',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/api/posts/route.js',
          code: `import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/posts
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
    }),
    prisma.post.count(),
  ]);

  return NextResponse.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

// POST /api/posts
export async function POST(request) {
  try {
    const body = await request.json();

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: body.authorId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}`,
        },
        {
          type: 'heading',
          content: 'Dynamic Route Handler',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/api/posts/[id]/route.js',
          code: `import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/posts/:id
export async function GET(request, { params }) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true, comments: true },
  });

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

// PATCH /api/posts/:id
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const post = await prisma.post.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(post);
}

// DELETE /api/posts/:id
export async function DELETE(request, { params }) {
  const { id } = await params;

  await prisma.post.delete({ where: { id } });

  return NextResponse.json({ message: 'Deleted' });
}`,
        },
        {
          type: 'heading',
          content: 'Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'middleware.js (project root)',
          code: `import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({ req: request });

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access
    if (pathname.startsWith('/dashboard/admin') && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

// Only run middleware on matched routes
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};`,
        },
        {
          type: 'heading',
          content: 'Webhook Example',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/api/webhooks/stripe/route.js',
          code: `import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    return new Response(\`Webhook Error: \${err.message}\`, { status: 400 });
  }
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Route Handlers support GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. A GET handler with no dynamic input is cached like a static page by default. Add "export const dynamic = \'force-dynamic\'" to opt out.',
        },
      ],
    },

    // ─── Section 6: Server Actions ────────────────────────────────────
    {
      id: 'server-actions',
      title: 'Server Actions',
      blocks: [
        {
          type: 'text',
          content:
            'Server Actions are async functions that run on the server, invoked directly from Client or Server Components. They replace the need for API routes for mutations (create, update, delete). Mark them with "use server" and use them in forms for progressive enhancement.',
        },
        {
          type: 'heading',
          content: 'Basic Server Action',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/actions/posts.js',
          code: `'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

export async function createPost(prevState, formData) {
  // 1. Validate input
  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  // 2. Perform mutation
  try {
    await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        authorId: 'current-user-id', // Get from session
      },
    });
  } catch (error) {
    return { message: 'Database error: failed to create post.' };
  }

  // 3. Revalidate and redirect
  revalidatePath('/posts');
  redirect('/posts');
}`,
        },
        {
          type: 'heading',
          content: 'Using with useActionState',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'components/CreatePostForm.jsx',
          code: `'use client';

import { useActionState } from 'react';
import { createPost } from '@/app/actions/posts';
import { SubmitButton } from './SubmitButton';

const initialState = { message: '', errors: {} };

export function CreatePostForm() {
  const [state, formAction] = useActionState(createPost, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full border rounded px-3 py-2"
        />
        {state.errors?.title && (
          <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={5}
          className="w-full border rounded px-3 py-2"
        />
        {state.errors?.content && (
          <p className="text-red-500 text-sm mt-1">{state.errors.content[0]}</p>
        )}
      </div>

      {state.message && (
        <p className="text-red-500">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Submit Button with Pending State',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'components/SubmitButton.jsx',
          code: `'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {pending ? 'Saving...' : 'Save Post'}
    </button>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Delete Action with Bind',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Delete pattern',
          code: `// Server Action
'use server';

export async function deletePost(id) {
  await prisma.post.delete({ where: { id } });
  revalidatePath('/posts');
}

// Client Component usage — bind the ID
'use client';

import { deletePost } from '@/app/actions/posts';

export function DeleteButton({ postId }) {
  const deleteWithId = deletePost.bind(null, postId);

  return (
    <form action={deleteWithId}>
      <button
        type="submit"
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </form>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Optimistic Updates with useOptimistic',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'components/LikeButton.jsx',
          code: `'use client';

import { useOptimistic } from 'react';
import { toggleLike } from '@/app/actions/likes';

export function LikeButton({ postId, likes, hasLiked }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    { count: likes, hasLiked },
    (state) => ({
      count: state.hasLiked ? state.count - 1 : state.count + 1,
      hasLiked: !state.hasLiked,
    })
  );

  async function handleLike() {
    addOptimisticLike({}); // Instantly update UI
    await toggleLike(postId); // Server mutation
  }

  return (
    <form action={handleLike}>
      <button type="submit">
        {optimisticLikes.hasLiked ? '\u2764\uFE0F' : '\uD83E\uDD0D'} {optimisticLikes.count}
      </button>
    </form>
  );
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always validate Server Action inputs with Zod. Never trust form data — treat Server Actions like public API endpoints. Anyone can call them with arbitrary data using browser devtools.',
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Server Actions work without JavaScript enabled (progressive enhancement). The form submits as a standard POST request, and Next.js handles the rest. This is great for accessibility and resilience.',
        },
      ],
    },

    // ─── Section 7: Authentication Patterns ───────────────────────────
    {
      id: 'authentication',
      title: 'Authentication Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Auth.js (NextAuth.js v5) is the standard authentication library for Next.js. It supports OAuth providers (Google, GitHub), credentials-based auth, and session management with JWTs or database sessions. Middleware handles route protection.',
        },
        {
          type: 'heading',
          content: 'Auth.js Setup',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'auth.js (project root)',
          code: `import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        return isValid ? user : null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
});`,
        },
        {
          type: 'heading',
          content: 'API Route Handler for Auth',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/api/auth/[...nextauth]/route.js',
          code: `import { handlers } from '@/auth';

export const { GET, POST } = handlers;`,
        },
        {
          type: 'heading',
          content: 'Protecting Routes with Middleware',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'middleware.js',
          code: `import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
  const isOnLogin = req.nextUrl.pathname === '/login';

  // Redirect unauthenticated users to login
  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect authenticated users away from login
  if (isOnLogin && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }
});

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};`,
        },
        {
          type: 'heading',
          content: 'Using Session in Server Components',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/dashboard/page.js',
          code: `import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect('/login');

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Role: {session.user.role}</p>
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Sign In / Sign Out Actions',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'components/AuthButtons.jsx',
          code: `import { signIn, signOut, auth } from '@/auth';

export async function SignInButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}

export async function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}

export async function AuthStatus() {
  const session = await auth();

  return session ? (
    <div className="flex items-center gap-4">
      <span>Hi, {session.user.name}</span>
      <SignOutButton />
    </div>
  ) : (
    <SignInButton />
  );
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never check authentication only in the UI. Always verify the session on the server in Server Components, Server Actions, and Route Handlers. A malicious user can bypass client-side checks easily.',
        },
      ],
    },

    // ─── Section 8: Database Integration ──────────────────────────────
    {
      id: 'database-integration',
      title: 'Database Integration',
      blocks: [
        {
          type: 'text',
          content:
            'Prisma is the recommended ORM for Next.js. It provides type-safe database access, automatic migrations, and works with PostgreSQL, MySQL, SQLite, and MongoDB. In Next.js, you need a singleton pattern to avoid exhausting database connections during development hot reloads.',
        },
        {
          type: 'heading',
          content: 'Prisma Client Singleton',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'lib/prisma.js',
          code: `import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In development, store the client on globalThis to prevent
// multiple instances during hot module replacement
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}`,
        },
        {
          type: 'heading',
          content: 'Prisma Schema Example',
        },
        {
          type: 'code',
          language: 'prisma',
          fileName: 'prisma/schema.prisma',
          code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String?
  image     String?
  role      Role     @default(USER)
  posts     Post[]
  accounts  Account[]
  sessions  Session[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  posts Post[]
}

enum Role {
  USER
  ADMIN
}`,
        },
        {
          type: 'heading',
          content: 'Data Access Layer Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'lib/data/posts.js',
          code: `import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

// Encapsulate all database queries in a data access layer
// This keeps your Server Components clean and queries reusable

export const getPostById = unstable_cache(
  async (id) => {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, image: true } },
        tags: true,
      },
    });
  },
  ['post-by-id'],
  { tags: ['posts'], revalidate: 60 }
);

export async function getPublishedPosts(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  return { posts, total, pages: Math.ceil(total / limit) };
}

export async function createPost(data) {
  return prisma.post.create({ data });
}

export async function updatePost(id, data) {
  return prisma.post.update({ where: { id }, data });
}

export async function deletePost(id) {
  return prisma.post.delete({ where: { id } });
}`,
        },
        {
          type: 'heading',
          content: 'Prisma CLI Commands',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Common Prisma commands',
          code: `# Initialize Prisma in your project
npx prisma init

# Create and apply a migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy

# Generate Prisma Client after schema changes
npx prisma generate

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Seed the database
npx prisma db seed

# Reset the database (dangerous!)
npx prisma migrate reset`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'The Prisma singleton pattern is critical. Without it, Next.js dev server hot reloads create a new PrismaClient on every change, eventually hitting the database connection limit and crashing your app.',
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'If using MongoDB with Prisma, use "mongodb" as the datasource provider. Prisma supports MongoDB but with some limitations (no migrations — use prisma db push instead). For a pure MERN stack, Mongoose may be more familiar, but Prisma offers better type safety.',
        },
      ],
    },

    // ─── Section 9: Styling & UI ──────────────────────────────────────
    {
      id: 'styling-ui',
      title: 'Styling & UI',
      blocks: [
        {
          type: 'text',
          content:
            'Next.js supports multiple styling approaches: Tailwind CSS, CSS Modules, CSS-in-JS, and global CSS. Tailwind CSS is the most popular choice for Next.js apps. Use next/font for optimized font loading with zero layout shift.',
        },
        {
          type: 'heading',
          content: 'Tailwind CSS Setup',
        },
        {
          type: 'code',
          language: 'css',
          fileName: 'app/globals.css',
          code: `@import 'tailwindcss';

/* Custom base styles */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --muted: 210 40% 96.1%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --muted: 217.2 32.6% 17.5%;
  }

  body {
    @apply bg-[hsl(var(--background))] text-[hsl(var(--foreground))];
  }
}`,
        },
        {
          type: 'heading',
          content: 'CSS Modules (Component-Scoped)',
        },
        {
          type: 'code',
          language: 'css',
          fileName: 'components/Button.module.css',
          code: `.button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.primary {
  background-color: var(--primary);
  color: white;
}

.primary:hover {
  opacity: 0.9;
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'components/Button.jsx',
          code: `import styles from './Button.module.css';

export function Button({ variant = 'primary', children, ...props }) {
  return (
    <button
      className={\`\${styles.button} \${styles[variant]}\`}
      {...props}
    >
      {children}
    </button>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Optimized Fonts with next/font',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/layout.js',
          code: `import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// Google Font — automatically self-hosted, no external requests
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Monospace font for code blocks
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// Local font file
const myFont = localFont({
  src: './fonts/MyFont.woff2',
  variable: '--font-custom',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${jetbrains.variable}\`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

// In Tailwind config, reference the CSS variables:
// fontFamily: {
//   sans: ['var(--font-inter)'],
//   mono: ['var(--font-mono)'],
// }`,
        },
        {
          type: 'heading',
          content: 'Server Component Styling Tips',
        },
        {
          type: 'list',
          items: [
            'Tailwind CSS and CSS Modules work in both Server and Client Components',
            'CSS-in-JS libraries (styled-components, Emotion) require "use client" — they need the React context',
            'next/font fonts are loaded at build time — zero layout shift, no external network requests',
            'Use the cn() utility (clsx + tailwind-merge) to conditionally combine Tailwind classes',
            'Global CSS should only be imported in the root layout',
          ],
        },
        {
          type: 'heading',
          content: 'Class Merge Utility',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'lib/utils.js',
          code: `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines clsx (conditional classes) with tailwind-merge (deduplicates)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Usage:
// cn('px-4 py-2', isActive && 'bg-blue-600', className)
// cn('text-red-500', 'text-blue-500') → 'text-blue-500' (resolved conflict)`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use next/font for all fonts. It downloads and self-hosts Google Fonts at build time, so your users never make requests to Google. This improves privacy, performance, and eliminates layout shift from font loading.',
        },
      ],
    },

    // ─── Section 10: Performance & Optimization ───────────────────────
    {
      id: 'performance-optimization',
      title: 'Performance & Optimization',
      blocks: [
        {
          type: 'text',
          content:
            'Next.js includes built-in performance optimizations: automatic code splitting, image optimization, link prefetching, and streaming. Use the built-in components (Image, Link, Script) instead of raw HTML tags for best performance.',
        },
        {
          type: 'heading',
          content: 'Image Optimization',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Optimized images',
          code: `import Image from 'next/image';

// Local image — automatically optimized at build time
import heroImage from '@/public/hero.jpg';

export function Hero() {
  return (
    <Image
      src={heroImage}
      alt="Hero banner"
      priority           // Load immediately (above the fold)
      placeholder="blur"  // Show blur preview while loading
      className="w-full h-[400px] object-cover"
    />
  );
}

// Remote image — optimized on-demand
export function Avatar({ user }) {
  return (
    <Image
      src={user.image}
      alt={user.name}
      width={48}
      height={48}
      className="rounded-full"
    />
  );
}

// Responsive image with sizes
export function ProductImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill                // Fill parent container
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
    />
  );
}`,
        },
        {
          type: 'heading',
          content: 'Link Prefetching',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Navigation links',
          code: `import Link from 'next/link';

export function Navigation() {
  return (
    <nav>
      {/* Prefetched by default when visible in viewport */}
      <Link href="/about">About</Link>

      {/* Disable prefetching for rarely visited pages */}
      <Link href="/terms" prefetch={false}>Terms</Link>

      {/* Dynamic route */}
      <Link href={\`/blog/\${post.slug}\`}>
        {post.title}
      </Link>

      {/* Replace history instead of push */}
      <Link href="/dashboard" replace>Dashboard</Link>
    </nav>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Script Optimization',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Third-party scripts',
          code: `import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Load after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"
          strategy="afterInteractive"
        />

        {/* Load when browser is idle */}
        <Script
          src="https://cdn.example.com/analytics.js"
          strategy="lazyOnload"
        />

        {/* Inline script */}
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'My App',
          })}
        </Script>
      </body>
    </html>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Dynamic Imports (Code Splitting)',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Lazy loading components',
          code: `import dynamic from 'next/dynamic';

// Lazy-load a heavy component (not needed on initial render)
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" />,
  ssr: false, // Skip server-side rendering (client-only component)
});

// Lazy-load only when needed (e.g., modal content)
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  loading: () => <p>Loading editor...</p>,
});

export function PostEditor() {
  return (
    <div>
      <HeavyChart />
      <RichTextEditor />
    </div>
  );
}`,
        },
        {
          type: 'heading',
          content: 'Metadata & SEO',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'app/layout.js',
          code: `// Static metadata
export const metadata = {
  title: {
    template: '%s | My App',
    default: 'My App — Build Better',
  },
  description: 'A modern web application built with Next.js',
  metadataBase: new URL('https://myapp.com'),
  openGraph: {
    title: 'My App',
    description: 'A modern web application',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    description: 'A modern web application',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Dynamic metadata in a page
// export async function generateMetadata({ params }) {
//   const post = await getPost(params.slug);
//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: { images: [post.coverImage] },
//   };
// }`,
        },
        {
          type: 'heading',
          content: 'Rendering Strategies',
        },
        {
          type: 'list',
          items: [
            'Static (SSG): Default for pages with no dynamic data — built at compile time, cached on CDN',
            'Incremental Static Regeneration (ISR): Static pages that revalidate after a set time — use "revalidate" option',
            'Dynamic (SSR): Opt in with "cache: no-store", cookies(), headers(), or searchParams — rendered on every request',
            'Streaming (PPR): Partial Prerendering — static shell rendered instantly, dynamic parts streamed in with Suspense',
          ],
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'Route segment config',
          code: `// Force a page to be dynamic (SSR on every request)
export const dynamic = 'force-dynamic';

// Force a page to be static (error if dynamic features used)
// export const dynamic = 'force-static';

// Set ISR revalidation at the page level
export const revalidate = 3600; // Revalidate every hour

// Choose the runtime
export const runtime = 'nodejs'; // default
// export const runtime = 'edge'; // for Edge Runtime`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use the Next.js Bundle Analyzer (npm i @next/bundle-analyzer) to find and eliminate large dependencies bloating your client bundle. Many components that seem small import heavy libraries.',
        },
      ],
    },

    // ─── Section 11: Deployment & Environment ─────────────────────────
    {
      id: 'deployment-environment',
      title: 'Deployment & Environment',
      blocks: [
        {
          type: 'text',
          content:
            'Next.js can be deployed to Vercel (zero-config), self-hosted with Node.js, or containerized with Docker. Environment variables follow a strict convention: NEXT_PUBLIC_ prefix for client-side access, no prefix for server-only.',
        },
        {
          type: 'heading',
          content: 'Environment Variables',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env.local',
          code: `# Server-only (NEVER exposed to the browser)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
NEXTAUTH_SECRET="super-secret-key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."

# Client-accessible (NEXT_PUBLIC_ prefix required)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
NEXT_PUBLIC_CLOUDINARY_CLOUD="my-cloud"`,
        },
        {
          type: 'list',
          items: [
            '.env.local — Local overrides (gitignored by default)',
            '.env — Default for all environments (committed to repo)',
            '.env.development — Only loaded in dev (npm run dev)',
            '.env.production — Only loaded in production (npm run build)',
            'Priority: .env.local > .env.development/.env.production > .env',
          ],
        },
        {
          type: 'heading',
          content: 'Vercel Deployment',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Deploy to Vercel',
          code: `# Install Vercel CLI
npm i -g vercel

# Deploy (interactive setup)
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET

# Pull env vars for local development
vercel env pull .env.local`,
        },
        {
          type: 'heading',
          content: 'Docker Self-Hosting',
        },
        {
          type: 'code',
          language: 'dockerfile',
          fileName: 'Dockerfile',
          code: `FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000 HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'next.config.mjs (for Docker)',
          code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output a standalone folder for Docker deployment
  output: 'standalone',
};

export default nextConfig;`,
        },
        {
          type: 'heading',
          content: 'Build & Run Commands',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'package.json scripts',
          code: `# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build optimized production bundle
npm run start        # Start production server

# Database
npx prisma migrate dev    # Run migrations (development)
npx prisma migrate deploy # Run migrations (production)
npx prisma studio         # Open visual DB browser

# Docker
docker build -t my-app .
docker run -p 3000:3000 --env-file .env.production my-app`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never commit .env.local or any file containing secrets. Add it to .gitignore. Use your hosting platform\'s environment variable UI (Vercel dashboard, Docker secrets, etc.) for production secrets.',
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For standalone Docker builds, set "output: \'standalone\'" in next.config.mjs. This bundles only the necessary files into .next/standalone, creating a minimal production image without node_modules.',
        },
      ],
    },

    // ─── Section 12: Folder Structure & Conventions ───────────────────
    {
      id: 'folder-structure',
      title: 'Folder Structure & Conventions',
      blocks: [
        {
          type: 'text',
          content:
            'The App Router introduces powerful file conventions for organizing your project. Use route groups, colocation, and the src/ directory to keep large projects maintainable. Here is a production-ready structure for a full-stack Next.js application.',
        },
        {
          type: 'heading',
          content: 'Production App Router Structure',
        },
        {
          type: 'folder-tree',
          tree: {
            name: 'project-root',
            children: [
              {
                name: 'src',
                children: [
                  {
                    name: 'app',
                    comment: 'App Router (routes & layouts)',
                    children: [
                      { name: 'layout.js', comment: 'Root layout' },
                      { name: 'page.js', comment: 'Home page' },
                      { name: 'globals.css', comment: 'Global styles' },
                      { name: 'loading.js' },
                      { name: 'not-found.js' },
                      {
                        name: '(marketing)',
                        comment: 'Route group — no URL impact',
                        children: [
                          { name: 'layout.js', comment: 'Marketing layout' },
                          {
                            name: 'about',
                            children: [{ name: 'page.js' }],
                          },
                          {
                            name: 'pricing',
                            children: [{ name: 'page.js' }],
                          },
                        ],
                      },
                      {
                        name: '(dashboard)',
                        comment: 'Route group — dashboard layout',
                        children: [
                          {
                            name: 'layout.js',
                            comment: 'Dashboard layout with sidebar',
                          },
                          {
                            name: 'dashboard',
                            children: [
                              { name: 'page.js' },
                              { name: 'loading.js' },
                            ],
                          },
                          {
                            name: 'dashboard/settings',
                            children: [{ name: 'page.js' }],
                          },
                          {
                            name: 'dashboard/posts',
                            children: [
                              { name: 'page.js' },
                              {
                                name: '[id]',
                                children: [
                                  { name: 'page.js' },
                                  {
                                    name: 'edit',
                                    children: [{ name: 'page.js' }],
                                  },
                                ],
                              },
                              {
                                name: 'new',
                                children: [{ name: 'page.js' }],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        name: 'api',
                        comment: 'Route Handlers',
                        children: [
                          {
                            name: 'auth/[...nextauth]',
                            children: [{ name: 'route.js' }],
                          },
                          {
                            name: 'webhooks/stripe',
                            children: [{ name: 'route.js' }],
                          },
                          {
                            name: 'uploadthing',
                            children: [{ name: 'route.js' }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: 'components',
                    comment: 'Reusable UI components',
                    children: [
                      {
                        name: 'ui',
                        comment: 'Primitives (Button, Input, Modal)',
                        children: [
                          { name: 'Button.jsx' },
                          { name: 'Input.jsx' },
                          { name: 'Modal.jsx' },
                          { name: 'Card.jsx' },
                        ],
                      },
                      {
                        name: 'layout',
                        comment: 'Layout components',
                        children: [
                          { name: 'Header.jsx' },
                          { name: 'Sidebar.jsx' },
                          { name: 'Footer.jsx' },
                        ],
                      },
                      {
                        name: 'forms',
                        comment: 'Form components',
                        children: [
                          { name: 'PostForm.jsx' },
                          { name: 'LoginForm.jsx' },
                          { name: 'SubmitButton.jsx' },
                        ],
                      },
                    ],
                  },
                  {
                    name: 'lib',
                    comment: 'Shared utilities & config',
                    children: [
                      { name: 'prisma.js', comment: 'Prisma client singleton' },
                      {
                        name: 'utils.js',
                        comment: 'Helper functions (cn, etc.)',
                      },
                      { name: 'validations.js', comment: 'Zod schemas' },
                    ],
                  },
                  {
                    name: 'lib/data',
                    comment: 'Data access layer',
                    children: [{ name: 'posts.js' }, { name: 'users.js' }],
                  },
                  {
                    name: 'hooks',
                    comment: 'Custom React hooks',
                    children: [
                      { name: 'useDebounce.js' },
                      { name: 'useMediaQuery.js' },
                    ],
                  },
                ],
              },
              {
                name: 'prisma',
                comment: 'Database schema & migrations',
                children: [
                  { name: 'schema.prisma' },
                  { name: 'seed.js' },
                  {
                    name: 'migrations',
                    children: [{ name: '...' }],
                  },
                ],
              },
              {
                name: 'public',
                comment: 'Static assets',
                children: [
                  { name: 'favicon.ico' },
                  { name: 'og-image.png' },
                  { name: 'robots.txt' },
                ],
              },
              { name: 'auth.js', comment: 'Auth.js config' },
              { name: 'middleware.js', comment: 'Next.js middleware' },
              { name: 'next.config.mjs' },
              {
                name: '.env.local',
                comment: 'Environment variables (gitignored)',
              },
            ],
          },
        },
        {
          type: 'heading',
          content: 'Route Groups',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'Route group conventions',
          code: `# Route groups use (parentheses) — they do NOT affect the URL

app/
  (marketing)/         # Group: marketing pages
    layout.js          # Shared marketing layout (header + footer)
    about/page.js      # URL: /about
    pricing/page.js    # URL: /pricing

  (dashboard)/         # Group: dashboard pages
    layout.js          # Shared dashboard layout (sidebar + nav)
    dashboard/page.js  # URL: /dashboard
    settings/page.js   # URL: /settings

# Both groups share the root layout.js but have their own sub-layouts
# This lets you have completely different layouts for marketing vs app pages`,
        },
        {
          type: 'heading',
          content: 'Colocation: Keeping Related Files Together',
        },
        {
          type: 'list',
          items: [
            'Only page.js and route.js make a route public — other files in app/ are safely colocated',
            'You can put components, tests, and styles next to pages in the app/ directory',
            'Private folders with underscore prefix (_components) are excluded from routing',
            'Use src/components/ for shared components used across multiple routes',
            'Use the app/ folder for route-specific components that are only used in one place',
          ],
        },
        {
          type: 'heading',
          content: 'Naming Conventions',
        },
        {
          type: 'list',
          items: [
            'Pages & Layouts: lowercase (page.js, layout.js, loading.js, error.js)',
            'Components: PascalCase (Button.jsx, PostForm.jsx, DashboardChart.jsx)',
            'Utilities & Hooks: camelCase (utils.js, useDebounce.js, prisma.js)',
            'Server Actions: camelCase functions in "use server" files (createPost, deleteUser)',
            'Route Handlers: route.js with exported HTTP method functions (GET, POST, PATCH, DELETE)',
            'Dynamic segments: [param] for single, [...slug] for catch-all, [[...slug]] for optional catch-all',
          ],
        },
        {
          type: 'heading',
          content: 'Private Folders & Colocation',
        },
        {
          type: 'code',
          language: 'text',
          fileName: 'Colocation example',
          code: `app/
  dashboard/
    page.js                # The route
    _components/           # Private folder (underscore prefix)
      DashboardChart.jsx   # Only used by this page
      StatsCard.jsx        # Only used by this page
    _lib/
      dashboard-utils.js   # Helper functions for this route

# The _components and _lib folders are:
# 1. Not treated as routes (underscore prefix)
# 2. Colocated with the page that uses them
# 3. Easy to find — right next to the page they belong to`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use route groups to apply different layouts without changing URLs. Common pattern: (marketing) group with a header/footer layout for public pages, and (dashboard) group with a sidebar layout for authenticated pages.',
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Coming from MERN? The biggest mindset shift is that you no longer need separate API routes for your own app. Server Components fetch data directly, Server Actions handle mutations, and Route Handlers are only needed for external consumers (webhooks, mobile apps, third-party integrations).',
        },
      ],
    },
  ],
}

export default nextjsData
