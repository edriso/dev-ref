# Best Practice Code

A personal reference web app — a "cheat sheet" site for quickly looking up best practices, folder structures, conventions, packages, and code patterns for web frameworks.

## Tech Stack

- React 19 + Vite 7 + Tailwind CSS v4
- react-router-dom (client-side routing)
- react-syntax-highlighter (code blocks)
- lucide-react (icons)

## Architecture

**Data-driven content**: Each framework's docs live as structured data objects in `src/data/[framework].js`. Reusable UI components render any content type (code blocks, folder trees, package lists, tips).

Adding a new framework = one new data file in `src/data/` + one entry in `src/data/frameworks.js`.

## Project Structure

```
src/
  main.jsx                    # BrowserRouter wrapper
  App.jsx                     # Root layout: Navbar + Routes
  index.css                   # Tailwind + custom styles

  components/
    layout/
      Navbar.jsx              # Top bar with framework tabs
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
    frameworks.js             # Registry: { id, name, path, icon }
    express.js                # Express.js content (13 sections)

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

## Conventions

- Components use named exports
- Data files use default exports
- Tailwind for all styling (no CSS modules)
- No TypeScript — plain JSX
