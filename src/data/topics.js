import { Server, Atom, Layers, Braces, Paintbrush, FileCode, Database, Shield, FlaskConical, GitBranch, Cpu, Globe, Network, Share2 } from 'lucide-react'

const topics = [
  // ─── Full Stack ─────────────────────────────────────────────────
  {
    id: 'mern',
    name: 'MERN Stack',
    description: 'Full-stack MongoDB, Express, React, Node.js project patterns',
    icon: Layers,
    color: 'violet',
    related: ['react', 'express', 'nodejs', 'databases'],
  },
  // ─── Frontend ───────────────────────────────────────────────────
  {
    id: 'react',
    name: 'React.js',
    description: 'A JavaScript library for building user interfaces with components',
    icon: Atom,
    color: 'cyan',
    related: ['nextjs', 'typescript', 'mern', 'css', 'testing'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'App Router, server components, data fetching, and full-stack React patterns',
    icon: Globe,
    color: 'indigo',
    related: ['react', 'typescript', 'mern', 'nodejs'],
  },
  // ─── Backend ────────────────────────────────────────────────────
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Core Node.js concepts, event loop, streams, file system, and runtime fundamentals',
    icon: Cpu,
    color: 'lime',
    related: ['express', 'mern', 'javascript', 'typescript'],
  },
  {
    id: 'express',
    name: 'Express.js',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    icon: Server,
    color: 'emerald',
    related: ['nodejs', 'databases', 'mern', 'typescript'],
  },
  {
    id: 'databases',
    name: 'Databases with Express.js',
    description: 'SQL & NoSQL database patterns, ORMs, query builders, and connection management',
    icon: Database,
    color: 'teal',
    related: ['express', 'mern', 'nodejs'],
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    description: 'Query language for your API — flexible, typed schema, one endpoint, client-specified data',
    icon: Share2,
    color: 'fuchsia',
    related: ['express', 'react', 'nodejs', 'typescript'],
  },
  // ─── Languages ──────────────────────────────────────────────────
  {
    id: 'javascript',
    name: 'JavaScript & OOP',
    description: 'Core JavaScript patterns, OOP, async programming, and modern syntax',
    icon: Braces,
    color: 'yellow',
    related: ['typescript', 'nodejs', 'react'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Type safety, interfaces, generics, and TypeScript patterns for React and Express',
    icon: Shield,
    color: 'blue',
    related: ['javascript', 'react', 'express', 'testing'],
  },
  // ─── Web Fundamentals ──────────────────────────────────────────
  {
    id: 'web-concepts',
    name: 'Web Concepts',
    description: 'HTTP, security, DNS, caching, authentication, and how the internet works',
    icon: Network,
    color: 'slate',
    related: ['express', 'nodejs', 'mern', 'html'],
  },
  {
    id: 'html',
    name: 'HTML Semantic',
    description: 'Semantic elements, accessibility, forms, meta tags, and structured markup',
    icon: FileCode,
    color: 'orange',
    related: ['css', 'react', 'javascript'],
  },
  {
    id: 'css',
    name: 'Advanced CSS',
    description: 'Sass architecture, BEM, responsive design, Grid, Flexbox, and animations',
    icon: Paintbrush,
    color: 'pink',
    related: ['html', 'react'],
  },
  // ─── Tooling ────────────────────────────────────────────────────
  {
    id: 'testing',
    name: 'Testing',
    description: 'Unit testing, integration testing, and E2E testing patterns for MERN applications',
    icon: FlaskConical,
    color: 'rose',
    related: ['react', 'express', 'typescript', 'git'],
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    description: 'Version control workflows, branching strategies, and GitHub collaboration patterns',
    icon: GitBranch,
    color: 'red',
    related: ['testing', 'mern'],
  },
]

export default topics
