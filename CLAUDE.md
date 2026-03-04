# Best Practice Code

A personal reference web app — a "cheat sheet" site for quickly looking up best practices, folder structures, conventions, packages, and code patterns for web frameworks.

## Tech Stack

- React 19 + Vite 7 + Tailwind CSS v4
- react-router-dom (client-side routing)
- react-syntax-highlighter (code blocks, Atom One Dark theme)
- lucide-react (icons)
- Inter font (Google Fonts)

## Architecture

**Data-driven content**: Each framework's docs live as structured data objects in `src/data/[framework].js`. Reusable UI components render any content type (code blocks, folder trees, package lists, tips).

Adding a new framework = one new data file in `src/data/` + one entry in `src/data/frameworks.js`.

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

  data/
    frameworks.js             # Registry: { id, name, description, icon, color }
    express.js                # Express.js content (13 sections)
    react.js                  # React.js content (13 sections)
    mern.js                   # MERN Stack content (10 sections)
    javascript.js             # JavaScript & OOP content (12 sections)
    css.js                    # Advanced CSS content (12 sections)
    html.js                   # HTML Semantic content (10 sections)
    databases.js              # Databases with Express.js content (12 sections)

  pages/
    HomePage.jsx              # Landing with framework cards
    FrameworkPage.jsx         # Renders sections from data
    NotFoundPage.jsx          # 404

  hooks/
    useActiveSection.js       # IntersectionObserver for scroll spy
```

## Routes

- `/` → HomePage
- `/:frameworkId` → FrameworkPage (e.g. `/express`)
- `*` → NotFoundPage

Sections use `#hash` navigation (smooth scroll), not nested routes.

## Content Data Format

Each framework data file exports:

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
- Code blocks (`CodeBlock`, `FolderTree`, `CopyButton`) stay dark in both themes

## Conventions

- Components use named exports
- Data files use default exports
- Tailwind for all styling (no CSS modules)
- No TypeScript — plain JSX
