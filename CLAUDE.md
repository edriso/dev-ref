# DevRef

A personal reference web app — a "cheat sheet" site for quickly looking up best practices, folder structures, conventions, packages, and code patterns for web development.

## Tech Stack

- React 19 + Vite 7 + Tailwind CSS v4
- react-router-dom (client-side routing)
- react-syntax-highlighter (code blocks, Atom One Dark theme)
- lucide-react (icons)
- Inter font (Google Fonts)

## Architecture

**Data-driven content**: Each topic's docs live as structured data objects in `src/data/[topic].js`. Reusable UI components render any content type (code blocks, folder trees, package lists, tips).

Adding a new topic = one new data file in `src/data/` + one entry in `src/data/topics.js`.

## Project Structure

```
src/
  main.jsx                    # BrowserRouter wrapper + theme init
  App.jsx                     # Root layout: Navbar + Routes
  index.css                   # Tailwind + custom styles + theme variables

  components/
    layout/
      Navbar.jsx              # Top bar with logo + theme toggle
      Sidebar.jsx             # Left sidebar TOC with scroll spy
      DocLayout.jsx           # Sidebar + content grid wrapper
    ui/
      CodeBlock.jsx           # Syntax-highlighted code + copy button
      FolderTree.jsx          # Recursive collapsible folder tree
      PackageList.jsx         # Package cards grid
      Tip.jsx                 # Callout boxes (tip/warning/note)
      ContentBlock.jsx        # Dispatcher: renders component per block type
      SectionRenderer.jsx     # Section heading + content blocks
      CopyButton.jsx          # Clipboard copy with feedback
      ScrollToTop.jsx         # Scroll to top on route change
      KeyboardShortcuts.jsx   # Keyboard shortcuts help modal
      ReadingProgress.jsx     # Fixed reading progress bar

  data/
    topics.js                 # Registry: { id, name, description, icon, color }
    mern.js                   # MERN Stack content (17 sections)
    react.js                  # React.js content (21 sections)
    nextjs.js                 # Next.js App Router content (13 sections)
    nodejs.js                 # Node.js core content (14 sections)
    express.js                # Express.js content (24 sections)
    databases.js              # Databases with Express.js content (17 sections)
    javascript.js             # JavaScript & OOP content (13 sections)
    typescript.js             # TypeScript content (14 sections)
    html.js                   # HTML Semantic content (11 sections)
    css.js                    # Advanced CSS content (13 sections)
    testing.js                # Testing content (14 sections)
    web-concepts.js           # Web Concepts content (15 sections)
    git.js                    # Git & GitHub content (13 sections)

  pages/
    HomePage.jsx              # Landing with topic cards
    TopicPage.jsx         # Renders sections from data
    NotFoundPage.jsx          # 404

  hooks/
    useActiveSection.js       # IntersectionObserver for scroll spy
    useReadingProgress.js     # Scroll progress tracker (rAF-throttled)
```

## Routes

- `/` → HomePage
- `/:topicId` → TopicPage (e.g. `/express`, `/react`, `/git`)
- `*` → NotFoundPage

Sections use `#hash` navigation (smooth scroll), not nested routes.

## Content Data Format

Each topic data file exports:

```js
export default {
  id: 'express',
  name: 'Express.js',
  description: '...',
  sections: [
    {
      id: 'section-id',
      title: 'Section Title',
      blocks: [
        { type: 'text', content: 'Markdown or plain text' },
        { type: 'code', language: 'js', fileName: 'app.js', code: '...' },
        { type: 'folder-tree', tree: { name: 'root', children: [...] } },
        { type: 'package-list', packages: [{ name, description, url }] },
        { type: 'tip', variant: 'tip|warning|note', content: '...' },
      ]
    }
  ]
}
```

## Theming

Light/dark theme using CSS custom properties + Tailwind v4 `@theme`. Variables defined in `index.css` (`:root` for dark, `[data-theme="light"]` for light). Dark is the default.

- Toggle via `data-theme="light"` on `<html>`, persisted in `localStorage` key `theme`
- Semantic color classes: `bg-bg`, `bg-bg-alt`, `bg-bg-hover`, `text-text`, `text-text-body`, `text-text-sub`, `text-text-muted`, `border-border`, `border-border-sub`
- Accent color: `text-accent`, `bg-accent/10`, `border-accent/50` — Atom One Dark green (#98c379 dark, #4d8a34 light)
- Code blocks (`CodeBlock`, `FolderTree`, `CopyButton`) stay dark in both themes

## Performance: Lazy Syntax Highlighting

`CodeBlock.jsx` uses an `IntersectionObserver` to defer syntax highlighting until a code block is near the viewport.

**The problem:** `react-syntax-highlighter` parses and colorizes every code block when it mounts. On a page with dozens of code blocks (e.g. clicking "Expand All"), the browser has to process them all at once. This blocks the main thread and freezes the UI for a noticeable amount of time.

**The solution:** Each code block starts as a plain `<pre>` with unstyled text (cheap to render). An `IntersectionObserver` watches the element and triggers syntax highlighting only when the block is within 200px of the viewport. Once highlighted, the observer disconnects — it only runs once per block.

**Why the user doesn't notice:** The 200px `rootMargin` means highlighting happens just before the block scrolls into view, so by the time the user sees it, it's already colorized. And since users can only read one screen at a time, there's no reason to highlight off-screen code.

**Before:** Expanding all sections → browser freezes while highlighting every code block.
**After:** Expanding all sections → instant, code blocks highlight as you scroll to them.

## Conventions

- Components use named exports
- Data files use default exports
- Tailwind for all styling (no CSS modules)
- No TypeScript — plain JSX
