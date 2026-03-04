# Best Practice Code

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

## Topics (12)

| Topic | Sections | Description |
|-------|----------|-------------|
| MERN Stack | 17 | Full-stack MongoDB, Express, React, Node.js project patterns |
| React.js | 18 | Component patterns, hooks, state management, routing, performance |
| Next.js | 13 | App Router, server components, data fetching, full-stack React |
| Node.js | 14 | Event loop, streams, file system, runtime fundamentals |
| Express.js | 18 | MVC setup, routing, middleware, auth, security, deployment |
| Databases | 17 | SQL & NoSQL, PostgreSQL, Prisma, Sequelize, MongoDB patterns |
| JavaScript & OOP | 13 | Classes, closures, async/await, modules, DOM, error handling |
| TypeScript | 14 | Types, interfaces, generics, React & Express patterns |
| HTML Semantic | 11 | Semantic elements, accessibility, forms, SEO, structured data |
| Advanced CSS | 13 | Sass, BEM, Grid, Flexbox, animations, custom properties |
| Testing | 13 | Unit, integration, and E2E testing for MERN apps |
| Git & GitHub | 13 | Version control, branching, GitHub collaboration patterns |

## Adding a New Topic

1. Create `src/data/[topic-id].js` following the data format (see any existing file)
2. Add an entry to `src/data/topics.js`
3. Done — routes, sidebar, and search are auto-generated

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
