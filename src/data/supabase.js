const supabaseData = {
  id: 'supabase',
  name: 'Supabase',
  description:
    'Open-source Firebase alternative — PostgreSQL database, authentication, storage, realtime, and edge functions with Next.js App Router integration',
  sections: [
    // ─── Section 1: What is Supabase ──────────────────────────────────
    {
      id: 'overview',
      title: 'What is Supabase',
      blocks: [
        {
          type: 'text',
          content:
            'Supabase is an open-source backend-as-a-service built on PostgreSQL. It gives you a full backend out of the box: a relational database, auto-generated REST and GraphQL APIs, authentication, file storage, realtime subscriptions, and edge functions — all in one hosted platform.',
        },
        {
          type: 'heading',
          content: 'Core Features',
        },
        {
          type: 'list',
          items: [
            'Database — fully managed PostgreSQL with auto-generated REST/GraphQL API and direct connection string',
            'Auth — email/password, magic links, OAuth providers (Google, GitHub, etc.), and SSO',
            'Storage — S3-compatible object storage for files and images with RLS policies',
            'Realtime — subscribe to database changes (INSERT/UPDATE/DELETE) over WebSockets',
            'Edge Functions — Deno-based serverless functions deployed close to users',
            'Row Level Security (RLS) — PostgreSQL-native per-row access control policies',
          ],
        },
        {
          type: 'heading',
          content: 'Key Packages',
        },
        {
          type: 'package-list',
          packages: [
            {
              name: '@supabase/supabase-js',
              description:
                'Core Supabase client — database queries, auth, storage, realtime. Use directly in non-Next.js projects.',
              url: 'https://supabase.com/docs/reference/javascript',
            },
            {
              name: '@supabase/ssr',
              description:
                'SSR-compatible Supabase helpers for Next.js App Router, SvelteKit, Remix — handles cookie-based session management.',
              url: 'https://supabase.com/docs/guides/auth/server-side/nextjs',
            },
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use @supabase/ssr (not @supabase/auth-helpers-nextjs) for Next.js App Router. The older auth-helpers package is deprecated. @supabase/ssr is the current standard for cookie-based session management in SSR frameworks.',
        },
      ],
    },

    // ─── Section 2: Project Setup ──────────────────────────────────────
    {
      id: 'setup',
      title: 'Project Setup',
      blocks: [
        {
          type: 'text',
          content:
            'Install the packages, set environment variables, and create three utility files for Next.js App Router: a browser client (client components), a server client (server components / actions / route handlers), and a middleware client.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: `npm install @supabase/supabase-js @supabase/ssr`,
        },
        {
          type: 'heading',
          content: 'Environment Variables',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env.local',
          code: `NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key

# Only on the server — never expose to client
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`,
        },
        {
          type: 'heading',
          content: 'Browser Client (Client Components)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/supabase/client.js',
          code: `import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}`,
        },
        {
          type: 'heading',
          content: 'Server Client (Server Components, Actions, Route Handlers)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/supabase/server.js',
          code: `import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll is called from Server Components which can't set cookies.
            // Middleware handles session refresh instead.
          }
        },
      },
    }
  )
}`,
        },
        {
          type: 'heading',
          content: 'Middleware (Session Refresh)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'middleware.js',
          code: `import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Refreshes expired auth tokens
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect unauthenticated users away from protected routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always call supabase.auth.getUser() in middleware (not getSession()). getSession() reads from cookies without verifying with the Supabase server, so it can be spoofed. getUser() validates the token server-side every time.',
        },
      ],
    },

    // ─── Section 3: Database CRUD ──────────────────────────────────────
    {
      id: 'database-crud',
      title: 'Database CRUD',
      blocks: [
        {
          type: 'text',
          content:
            'The Supabase client exposes a chainable query builder over your PostgreSQL tables. Every table gets auto-generated REST endpoints that the client calls under the hood.',
        },
        {
          type: 'heading',
          content: 'SELECT — Filtering, Sorting & Pagination',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'queries.js',
          code: `import { createClient } from '@/utils/supabase/server'

const supabase = await createClient()

// Basic select
const { data, error } = await supabase
  .from('products')
  .select('id, name, price, category')

// Filtering
const { data: filtered } = await supabase
  .from('products')
  .select('*')
  .eq('active', true)           // WHERE active = true
  .gte('price', 10)             // AND price >= 10
  .lt('price', 100)             // AND price < 100
  .ilike('name', '%shirt%')     // AND name ILIKE '%shirt%' (case-insensitive)
  .in('category', ['tops', 'bottoms'])  // AND category IN (...)
  .not('deleted_at', 'is', null)        // AND deleted_at IS NOT NULL
  .order('created_at', { ascending: false })
  .range(0, 9)                  // LIMIT 10 OFFSET 0

// Select with count
const { data: posts, count } = await supabase
  .from('posts')
  .select('*', { count: 'exact' })
  .eq('published', true)`,
        },
        {
          type: 'heading',
          content: 'SELECT — Joins (Foreign Table Syntax)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'joins.js',
          code: `// Supabase uses foreign key relationships to auto-join tables
// The join syntax is nested inside the select string

// One-to-many: post with author info
const { data: posts } = await supabase
  .from('posts')
  .select(\`
    id,
    title,
    content,
    author:profiles (id, username, avatar_url)
  \`)
  .eq('published', true)

// Many-to-many: products with their categories
const { data: products } = await supabase
  .from('products')
  .select(\`
    id,
    name,
    price,
    product_categories (
      categories (id, name)
    )
  \`)

// Filter on a related table
const { data: orders } = await supabase
  .from('orders')
  .select(\`
    id, total, status,
    user:profiles!user_id (email, full_name),
    items:order_items (quantity, product:products (name, price))
  \`)
  .eq('profiles.active', true)  // filter on joined table`,
        },
        {
          type: 'heading',
          content: 'INSERT, UPDATE, UPSERT & DELETE',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'mutations.js',
          code: `const supabase = await createClient()

// INSERT — single row
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'Hello World', content: '...', user_id: userId })
  .select()
  .single()

// INSERT — multiple rows
const { data: rows } = await supabase
  .from('tags')
  .insert([{ name: 'react' }, { name: 'nextjs' }, { name: 'typescript' }])
  .select()

// UPDATE
const { data: updated } = await supabase
  .from('posts')
  .update({ title: 'Updated Title', updated_at: new Date().toISOString() })
  .eq('id', postId)
  .select()
  .single()

// UPSERT (insert or update on conflict)
const { data } = await supabase
  .from('profiles')
  .upsert({ id: userId, username: 'alice', updated_at: new Date() })
  .select()
  .single()

// DELETE
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)`,
        },
        {
          type: 'heading',
          content: 'Error Handling Pattern',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'error-handling.js',
          code: `const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id', productId)
  .single()  // throws if zero or multiple rows

if (error) {
  if (error.code === 'PGRST116') {
    // Row not found (.single() with zero results)
    return notFound()
  }
  throw new Error(error.message)
}

// data is typed and non-null here`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Use .single() when you expect exactly one row — it throws if zero or multiple rows are returned. Use .maybeSingle() to get null instead of an error when no rows match. Without either, data is always an array.',
        },
      ],
    },

    // ─── Section 4: Row Level Security (RLS) ──────────────────────────
    {
      id: 'rls',
      title: 'Row Level Security (RLS)',
      blocks: [
        {
          type: 'text',
          content:
            'RLS is a PostgreSQL feature that lets you define per-row access policies directly in the database. When enabled on a table, every query is automatically filtered by the active policies — no matter which client or role executes it. This is Supabase\'s security model for client-side queries.',
        },
        {
          type: 'heading',
          content: 'Enable RLS & Basic Policies',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'rls-policies.sql',
          code: `-- Enable RLS on a table (blocks all access until policies are added)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published posts
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Allow users to read their own posts (published or not)
CREATE POLICY "Users can read own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own posts
CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own posts
CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own posts
CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);`,
        },
        {
          type: 'heading',
          content: 'Common Policy Patterns',
        },
        {
          type: 'code',
          language: 'sql',
          fileName: 'policy-patterns.sql',
          code: `-- Admin-only access (check a role in a profiles table)
CREATE POLICY "Admins can do anything"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- Service role bypass (for server-side ops that skip RLS)
-- No policy needed — service_role key bypasses RLS entirely

-- Org-based multi-tenancy: users see only their org's data
CREATE POLICY "Users see own org data"
  ON projects FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM org_members WHERE user_id = auth.uid()
    )
  );

-- Public profiles readable, private data only by owner
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);`,
        },
        {
          type: 'heading',
          content: 'Service Role Key — Bypass RLS',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/supabase/admin.js',
          code: `import { createClient } from '@supabase/supabase-js'

// Service role client bypasses RLS — server-only, never expose to client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Enable RLS on every table that uses the anon or authenticated key. Without RLS, any client with your anon key can read and modify all data. The service_role key bypasses RLS — keep it in server-only code and never ship it to the browser.',
        },
      ],
    },

    // ─── Section 5: Authentication ────────────────────────────────────
    {
      id: 'auth',
      title: 'Authentication',
      blocks: [
        {
          type: 'text',
          content:
            'Supabase Auth supports email/password, magic links, OTP, and 20+ OAuth providers. In Next.js App Router, authentication state is stored in cookies (managed by @supabase/ssr) so server components and middleware can read the session without extra round-trips.',
        },
        {
          type: 'heading',
          content: 'Sign Up & Sign In (Server Actions)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/auth/actions.js',
          code: `'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signUp(formData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      emailRedirectTo: \`\${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback\`,
      data: {
        full_name: formData.get('full_name'),  // stored in user_metadata
      },
    },
  })

  if (error) redirect(\`/signup?error=\${error.message}\`)
  redirect('/signup?message=Check your email to confirm your account')
}

export async function signIn(formData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (error) redirect(\`/login?error=\${error.message}\`)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}`,
        },
        {
          type: 'heading',
          content: 'OAuth Sign In (Google, GitHub, etc.)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/auth/oauth-actions.js',
          code: `'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signInWithOAuth(provider) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,  // 'google' | 'github' | 'discord' | etc.
    options: {
      redirectTo: \`\${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback\`,
    },
  })

  if (error) redirect('/login?error=OAuth failed')
  if (data.url) redirect(data.url)  // redirect to provider
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/auth/callback/route.js',
          code: `import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Handles the OAuth redirect and magic link confirmation
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(\`\${origin}\${next}\`)
    }
  }

  return NextResponse.redirect(\`\${origin}/auth/error\`)
}`,
        },
        {
          type: 'heading',
          content: 'Get Current User',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/dashboard/page.jsx',
          code: `import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Always use getUser() on the server — it validates with Supabase servers
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/login')

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>User ID: {user.id}</p>
    </div>
  )
}`,
        },
        {
          type: 'heading',
          content: 'Client Component Auth State',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'components/AuthButton.jsx',
          code: `'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AuthButton() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => setUser(session?.user ?? null)
    )

    return () => subscription.unsubscribe()
  }, [])

  return user ? (
    <form action={signOut}>
      <button type="submit">Sign out ({user.email})</button>
    </form>
  ) : (
    <a href="/login">Sign in</a>
  )
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Protect routes in middleware.js rather than individual page components — it runs before any page renders, so unauthenticated users are redirected at the edge without loading the page bundle at all.',
        },
      ],
    },

    // ─── Section 6: Server Components & Server Actions ─────────────────
    {
      id: 'server-integration',
      title: 'Next.js Server Components & Server Actions',
      blocks: [
        {
          type: 'text',
          content:
            'Next.js App Router server components run on the server, so they can access Supabase with full session context without any client-side state. Server Actions let you write database mutations inline with your UI and call them directly from forms.',
        },
        {
          type: 'heading',
          content: 'Data Fetching in Server Components',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/posts/page.jsx',
          code: `import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function PostsPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('posts')
    .select(\`
      id, title, created_at,
      author:profiles (username, avatar_url)
    \`)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <span>by {post.author.username}</span>
        </li>
      ))}
    </ul>
  )
}`,
        },
        {
          type: 'heading',
          content: 'Server Actions — Inline Mutations',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/posts/new/page.jsx',
          code: `import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

async function createPost(formData) {
  'use server'

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { error } = await supabase
    .from('posts')
    .insert({
      title: formData.get('title'),
      content: formData.get('content'),
      user_id: user.id,
    })

  if (error) throw error

  revalidatePath('/posts')
  redirect('/posts')
}

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Publish</button>
    </form>
  )
}`,
        },
        {
          type: 'heading',
          content: 'Route Handlers (API Routes)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/api/posts/route.js',
          code: `import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 10
  const from = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, count, page })
}

export async function POST(request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  const { data, error } = await supabase
    .from('posts')
    .insert({ ...body, user_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json(data, { status: 201 })
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Prefer Server Actions over Route Handlers for form mutations in App Router — they colocate the mutation logic with the UI, support progressive enhancement, and avoid a full API round-trip. Use Route Handlers for external webhooks, third-party integrations, or streaming responses.',
        },
      ],
    },

    // ─── Section 7: Storage ───────────────────────────────────────────
    {
      id: 'storage',
      title: 'Storage',
      blocks: [
        {
          type: 'text',
          content:
            'Supabase Storage is S3-compatible object storage organized into buckets. Each bucket can be public (direct URL access) or private (access via signed URLs or RLS). Storage has its own RLS-style policies.',
        },
        {
          type: 'heading',
          content: 'Upload a File',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/upload/actions.js',
          code: `'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadAvatar(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const file = formData.get('avatar')
  const fileExt = file.name.split('.').pop()
  const filePath = \`\${user.id}/avatar.\${fileExt}\`

  const { error: uploadError } = await supabase.storage
    .from('avatars')             // bucket name
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,              // overwrite if exists
    })

  if (uploadError) throw uploadError

  // Get public URL (for public buckets)
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  // Save URL to profile
  await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id)

  revalidatePath('/profile')
}`,
        },
        {
          type: 'heading',
          content: 'Signed URLs (Private Buckets)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/files/[id]/route.js',
          code: `import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const supabase = await createClient()

  // Get signed URL valid for 60 seconds
  const { data, error } = await supabase.storage
    .from('private-documents')
    .createSignedUrl(\`documents/\${params.id}.pdf\`, 60)

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  return NextResponse.redirect(data.signedUrl)
}`,
        },
        {
          type: 'heading',
          content: 'List & Delete Files',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'storage-ops.js',
          code: `const supabase = await createClient()

// List files in a folder
const { data: files } = await supabase.storage
  .from('avatars')
  .list('user-123/', {
    limit: 20,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })

// Delete a file
const { error } = await supabase.storage
  .from('avatars')
  .remove(['user-123/avatar.png'])

// Move/rename a file
await supabase.storage
  .from('documents')
  .move('old-path/file.pdf', 'new-path/file.pdf')`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Store only the file path (not the full URL) in your database. The public URL base can change if you move buckets or switch regions. Reconstruct the full URL at query time using getPublicUrl(path) or createSignedUrl(path, seconds).',
        },
      ],
    },

    // ─── Section 8: Realtime ──────────────────────────────────────────
    {
      id: 'realtime',
      title: 'Realtime Subscriptions',
      blocks: [
        {
          type: 'text',
          content:
            'Supabase Realtime lets you subscribe to database changes (INSERT, UPDATE, DELETE) and broadcast custom events over WebSockets. Subscriptions are client-side only — use them in client components.',
        },
        {
          type: 'heading',
          content: 'Subscribe to Database Changes',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'components/LiveMessages.jsx',
          code: `'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LiveMessages({ channelId }) {
  const [messages, setMessages] = useState([])
  const supabase = createClient()

  useEffect(() => {
    // Initial load
    supabase
      .from('messages')
      .select('*, sender:profiles(username)')
      .eq('channel_id', channelId)
      .order('created_at')
      .then(({ data }) => setMessages(data ?? []))

    // Subscribe to new messages in this channel
    const channel = supabase
      .channel(\`messages-\${channelId}\`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: \`channel_id=eq.\${channelId}\`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [channelId])

  return (
    <ul>
      {messages.map((msg) => (
        <li key={msg.id}>{msg.content}</li>
      ))}
    </ul>
  )
}`,
        },
        {
          type: 'heading',
          content: 'Subscribe to Multiple Events',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'hooks/useRealtimeTable.js',
          code: `'use client'

import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useRealtimeTable(table, onInsert, onUpdate, onDelete) {
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(\`realtime-\${table}\`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table }, (p) => onInsert?.(p.new))
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table }, (p) => onUpdate?.(p.new, p.old))
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table }, (p) => onDelete?.(p.old))
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [table])
}`,
        },
        {
          type: 'heading',
          content: 'Presence (Online Users)',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'components/OnlineUsers.jsx',
          code: `'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function OnlineUsers({ roomId, currentUser }) {
  const [onlineUsers, setOnlineUsers] = useState({})
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase.channel(\`room:\${roomId}\`)

    channel
      .on('presence', { event: 'sync' }, () => {
        setOnlineUsers(channel.presenceState())
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: currentUser.id,
            username: currentUser.username,
            online_at: new Date().toISOString(),
          })
        }
      })

    return () => supabase.removeChannel(channel)
  }, [roomId])

  return (
    <div>
      <span>{Object.keys(onlineUsers).length} online</span>
    </div>
  )
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Realtime requires enabling "Replication" on each table in the Supabase dashboard (Table Editor → Replication). Without this, postgres_changes subscriptions will not fire. You can also enable it via SQL: ALTER PUBLICATION supabase_realtime ADD TABLE messages;',
        },
      ],
    },

    // ─── Section 9: Prisma + Supabase ─────────────────────────────────
    {
      id: 'prisma-supabase',
      title: 'Prisma ORM with Supabase',
      blocks: [
        {
          type: 'text',
          content:
            'You can use Prisma as a type-safe ORM on top of Supabase\'s PostgreSQL. This gives you Prisma\'s schema-first development and auto-migrations while keeping Supabase for auth, storage, and realtime. The only gotcha is connection pooling — Supabase uses pgBouncer which needs transaction mode.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: `npm install prisma @prisma/client --save-dev
npx prisma init`,
        },
        {
          type: 'heading',
          content: 'Connection Strings',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: '.env',
          code: `# Direct connection — use for Prisma migrations (bypasses pgBouncer)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# Pooled connection — use for Prisma Client at runtime (pgBouncer transaction mode)
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"`,
        },
        {
          type: 'heading',
          content: 'Schema Configuration',
        },
        {
          type: 'code',
          language: 'prisma',
          fileName: 'prisma/schema.prisma',
          code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")  // Used for migrations only
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  userId    String   @map("user_id")  // references auth.users
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("posts")
}`,
        },
        {
          type: 'heading',
          content: 'Singleton Prisma Client for Next.js',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/prisma.js',
          code: `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}`,
        },
        {
          type: 'heading',
          content: 'Using Prisma + Supabase Auth Together',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/posts/actions.js',
          code: `'use server'

import { prisma } from '@/utils/prisma'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData) {
  // Get current user from Supabase Auth
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Use Prisma for the database write
  await prisma.post.create({
    data: {
      title: formData.get('title'),
      content: formData.get('content'),
      userId: user.id,
    },
  })

  revalidatePath('/posts')
  redirect('/posts')
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'When using Prisma with Supabase, run migrations via "npx prisma migrate dev" (which uses directUrl, bypassing pgBouncer). The runtime client uses the pooled DATABASE_URL. Without directUrl, migrations may fail with "prepared statements" errors from pgBouncer.',
        },
      ],
    },

    // ─── Section 10: Drizzle + Supabase ───────────────────────────────
    {
      id: 'drizzle-supabase',
      title: 'Drizzle ORM with Supabase',
      blocks: [
        {
          type: 'text',
          content:
            'Drizzle is a lightweight TypeScript-first ORM that connects directly to Supabase\'s PostgreSQL. It offers SQL-like syntax, zero overhead, and works great in serverless environments like Next.js. Use it as an alternative to Prisma for a thinner, more explicit ORM layer.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'install',
          code: `npm install drizzle-orm postgres
npm install drizzle-kit --save-dev`,
        },
        {
          type: 'heading',
          content: 'Database Connection',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/db.js',
          code: `import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Use connection pooling URL for runtime queries
const client = postgres(process.env.DATABASE_URL)

export const db = drizzle(client, { schema })`,
        },
        {
          type: 'heading',
          content: 'Schema Definition',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'utils/schema.js',
          code: `import { pgTable, text, boolean, timestamp, uuid } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content'),
  published: boolean('published').default(false).notNull(),
  userId: text('user_id').notNull(),  // references auth.users
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),  // matches auth.users.id
  username: text('username').unique().notNull(),
  avatarUrl: text('avatar_url'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})`,
        },
        {
          type: 'heading',
          content: 'Drizzle Config & Migrations',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'drizzle.config.js',
          code: `import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './utils/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DIRECT_URL,  // direct connection for migrations
  },
})`,
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'migration-commands',
          code: `# Generate migration SQL from schema changes
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Open Drizzle Studio (GUI)
npx drizzle-kit studio`,
        },
        {
          type: 'heading',
          content: 'Querying with Drizzle',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/posts/page.jsx',
          code: `import { db } from '@/utils/db'
import { posts, profiles } from '@/utils/schema'
import { eq, desc, and } from 'drizzle-orm'

export default async function PostsPage() {
  // SELECT with join
  const allPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      createdAt: posts.createdAt,
      author: profiles.username,
    })
    .from(posts)
    .leftJoin(profiles, eq(posts.userId, profiles.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(20)

  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title} — {post.author}</li>
      ))}
    </ul>
  )
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'app/posts/actions.js',
          code: `'use server'

import { db } from '@/utils/db'
import { posts } from '@/utils/schema'
import { createClient } from '@/utils/supabase/server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await db.insert(posts).values({
    title: formData.get('title'),
    content: formData.get('content'),
    userId: user.id,
  })

  revalidatePath('/posts')
  redirect('/posts')
}

export async function deletePost(postId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await db.delete(posts).where(
    and(eq(posts.id, postId), eq(posts.userId, user.id))
  )

  revalidatePath('/posts')
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Drizzle vs Prisma with Supabase: Drizzle is lighter and closer to SQL — great if you want full control and minimal abstraction. Prisma has a better DX for teams (Prisma Studio, richer relation APIs). Both work equally well with Supabase PostgreSQL.',
        },
      ],
    },
  ],
}

export default supabaseData
