# DevRef

A personal reference web app for quickly looking up best practices, folder structures, conventions, packages, and code patterns for web development.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS v4 (Atom One Dark–inspired color theme)
- react-router-dom (client-side routing)
- react-syntax-highlighter (code blocks with Atom One Dark theme)
- lucide-react (icons)
- Inter font (Google Fonts)

## Features

- Global search (Cmd+K) across all topics and sections
- Keyboard shortcuts modal (press `?` to view all shortcuts)
- Light / Dark / Auto theme toggle
- Keyboard navigation (j/k to move between sections)
- Reading progress bar with topic-specific colors
- Topic-specific accent tints on topic pages
- Hero gradient glow on the homepage
- Copy section permalink on hover
- Mobile slide-out sidebar
- Lazy syntax highlighting (IntersectionObserver)
- Staggered entrance animations

## Getting Started

```bash
npm install
npm run dev
```

## Topics (13)

| Topic | Sections | Description |
|-------|----------|-------------|
| MERN Stack | 17 | Full-stack MongoDB, Express, React, Node.js project patterns |
| React.js | 21 | Components, hooks, Zustand, Shadcn/ui, React Query, routing, performance |
| Next.js | 13 | App Router, server components, data fetching, full-stack React |
| Node.js | 14 | Event loop, streams, file system, runtime fundamentals |
| Express.js | 24 | Routing, middleware, auth, payments (Stripe), chat (Socket.io), streaming, webhooks |
| Databases | 17 | SQL & NoSQL, PostgreSQL, Prisma, Sequelize, MongoDB patterns |
| JavaScript & OOP | 13 | Classes, closures, async/await, modules, DOM, error handling |
| TypeScript | 14 | Types, interfaces, generics, React & Express patterns |
| Web Concepts | 15 | HTTP, CORS, security threats, cookies/JWT, caching, DNS, deployment |
| HTML Semantic | 11 | Semantic elements, accessibility, forms, SEO, structured data |
| Advanced CSS | 13 | Sass, BEM, Grid, Flexbox, animations, custom properties |
| Testing | 13 | Unit, integration, and E2E testing for MERN apps |
| Git & GitHub | 13 | Version control, branching, GitHub collaboration patterns |

## Adding a New Topic

1. Create `src/data/[topic-id].js` following the data format (see any existing file)
2. Add an entry to `src/data/topics.js`
3. Done — routes, sidebar, and search are auto-generated

### How auto-generation works

Every part of the app uses Vite's `import.meta.glob('../data/*.js', { eager: true })` to dynamically discover all data files at build time:

- **Routing** — `App.jsx` has a single `/:topicId` route. `TopicPage` reads the URL param, finds the matching topic in `topics.js`, and loads the corresponding data file from the glob result.
- **Sidebar & Mobile Nav** — `DocLayout` passes `data.sections` to `Sidebar` and `MobileNav`, which render the table of contents from the sections array.
- **Search** — `SearchModal` builds a search index by iterating over all topics and their sections from the same glob import.
- **Homepage Cards** — `HomePage` uses the glob to count sections per topic and display topic cards.

Add a new `.js` file to `src/data/` + register it in `topics.js`, and Vite's glob picks it up automatically — no new routes, components, or imports needed.

## Project Structure

```
src/
  components/
    layout/    — Navbar, Sidebar, MobileNav, DocLayout
    ui/        — CodeBlock, FolderTree, PackageList, Tip, SearchModal, KeyboardShortcuts, ReadingProgress, etc.
  data/        — Topic content as structured data objects
  pages/       — HomePage, TopicPage, NotFoundPage
  hooks/       — useActiveSection, useReadingProgress
```
