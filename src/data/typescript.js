const typescriptData = {
  id: 'typescript',
  name: 'TypeScript',
  description:
    'Type safety, interfaces, generics, and TypeScript patterns for React and Express apps',
  sections: [
    // ─── Section 1: Setup & Configuration ─────────────────────────────
    {
      id: 'setup-configuration',
      title: 'Setup & Configuration',
      blocks: [
        {
          type: 'text',
          content:
            'TypeScript adds static type checking to JavaScript. Set up differs slightly between frontend (Vite + React) and backend (Node.js + Express) projects, but both use tsconfig.json as the central configuration file.',
        },
        {
          type: 'heading',
          content: 'Installing TypeScript',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Installation',
          code: `# For a new Vite + React + TypeScript project
npm create vite@latest my-app -- --template react-ts

# Add TypeScript to an existing project
npm install -D typescript @types/node

# For Express/Node.js projects
npm install -D typescript @types/node @types/express ts-node

# Generate a tsconfig.json
npx tsc --init`,
        },
        {
          type: 'heading',
          content: 'tsconfig.json for React (Vite)',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'tsconfig.json',
          code: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}`,
        },
        {
          type: 'heading',
          content: 'tsconfig.json for Node.js / Express',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'tsconfig.json',
          code: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",

    /* Strict type-checking */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,

    /* Interop */
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,
        },
        {
          type: 'heading',
          content: 'Key Strict Mode Options',
        },
        {
          type: 'list',
          items: [
            'strict: true — enables all strict checks (strictNullChecks, noImplicitAny, strictFunctionTypes, etc.)',
            'noUncheckedIndexedAccess — array/object index access returns T | undefined instead of T',
            'noImplicitOverride — require "override" keyword when overriding a base class method',
            'noFallthroughCasesInSwitch — error on switch case fall-through without break',
            'noUnusedLocals / noUnusedParameters — error on unused variables and parameters',
          ],
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always start new projects with "strict": true. It catches far more bugs at compile time. Retroactively enabling strict mode on a large codebase is painful.',
        },
        {
          type: 'heading',
          content: 'Project Folder Structure',
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
                    name: 'types',
                    comment: 'Shared type definitions',
                    children: [
                      { name: 'index.ts', comment: 'Re-export all types' },
                      { name: 'user.ts' },
                      { name: 'api.ts' },
                    ],
                  },
                  {
                    name: 'utils',
                    children: [{ name: 'helpers.ts' }],
                  },
                  { name: 'app.ts' },
                  { name: 'server.ts' },
                ],
              },
              { name: 'tsconfig.json' },
              { name: 'package.json' },
            ],
          },
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Put shared types in a src/types/ folder. For types tightly coupled to a single module, keep them in the same file or a co-located .types.ts file.',
        },
      ],
    },

    // ─── Section 2: Basic Types ───────────────────────────────────────
    {
      id: 'basic-types',
      title: 'Basic Types',
      blocks: [
        {
          type: 'text',
          content:
            'TypeScript provides type annotations for all JavaScript primitives plus additional types like tuples, enums, and special types (any, unknown, never). Type annotations go after the variable name with a colon.',
        },
        {
          type: 'heading',
          content: 'Primitive Types',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Primitives',
          code: `// String, number, boolean
let name: string = 'Alice';
let age: number = 30;
let isActive: boolean = true;

// Type inference — TypeScript infers these automatically
let city = 'London';       // inferred as string
let score = 100;           // inferred as number
let isDone = false;        // inferred as boolean

// null and undefined
let nothing: null = null;
let notDefined: undefined = undefined;

// Union with null (nullable types)
let username: string | null = null;
username = 'alice';

// bigint and symbol
let big: bigint = 100n;
let id: symbol = Symbol('id');`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Let TypeScript infer types when the value is assigned immediately. Only add explicit annotations when the type is not obvious, when declaring variables without an initial value, or for function parameters and return types.',
        },
        {
          type: 'heading',
          content: 'Arrays & Tuples',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Arrays & Tuples',
          code: `// Arrays — two equivalent syntaxes
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['Alice', 'Bob'];

// Array of objects
let users: { id: number; name: string }[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// Readonly array — cannot push, pop, or modify
let frozen: readonly number[] = [1, 2, 3];

// Tuples — fixed-length arrays with known types at each position
let point: [number, number] = [10, 20];
let entry: [string, number] = ['age', 30];

// Named tuple elements (documentation only, no runtime effect)
let user: [id: number, name: string, isAdmin: boolean] = [1, 'Alice', true];

// Readonly tuple
let pair: readonly [string, number] = ['key', 42];`,
        },
        {
          type: 'heading',
          content: 'Enums',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Enums',
          code: `// Numeric enum (auto-increments from 0)
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}

// String enum (preferred — explicit, no reverse mapping issues)
enum Status {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Archived = 'ARCHIVED',
}

// Usage
const dir: Direction = Direction.Up;
const status: Status = Status.Active;

// Const enum — inlined at compile time, no runtime object
const enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// Alternative: union of string literals (often preferred over enums)
type Role = 'admin' | 'editor' | 'viewer';
const role: Role = 'admin';`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Many teams prefer string literal unions over enums because they are simpler, have no runtime cost, and work better with type narrowing. Use enums when you need a runtime object to iterate over values.',
        },
        {
          type: 'heading',
          content: 'any, unknown, never',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Special types',
          code: `// any — disables type checking (avoid!)
let anything: any = 42;
anything = 'string';
anything.nonExistentMethod(); // No error — dangerous!

// unknown — type-safe alternative to any
let value: unknown = 42;
value = 'hello';

// Must narrow before using
if (typeof value === 'string') {
  console.log(value.toUpperCase()); // OK — narrowed to string
}

// never — represents values that never occur
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// never is useful for exhaustive checks
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle':
      return Math.PI * 10 ** 2;
    case 'square':
      return 10 * 10;
    case 'triangle':
      return (10 * 10) / 2;
    default:
      // If a new shape is added but not handled, this errors at compile time
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never use "any" unless you are migrating legacy code and have no other option. Use "unknown" instead — it forces you to narrow the type before using the value, which prevents runtime errors.',
        },
        {
          type: 'heading',
          content: 'Type Assertions & Literal Types',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Assertions & Literals',
          code: `// Type assertion — tell the compiler you know more than it does
const input = document.getElementById('name') as HTMLInputElement;
input.value = 'Alice';

// Alternative syntax (not usable in JSX/TSX files)
const input2 = <HTMLInputElement>document.getElementById('name');

// Non-null assertion — assert value is not null/undefined
const el = document.querySelector('.header')!;

// Literal types — exact values
let direction: 'up' | 'down' | 'left' | 'right' = 'up';
let httpPort: 80 | 443 = 80;

// const assertion — narrows to the most specific type
const config = {
  url: 'https://api.example.com',
  method: 'GET',
} as const;
// typeof config = { readonly url: "https://api.example.com"; readonly method: "GET" }

// Without "as const", method would be string, not "GET"
// This is especially useful for arrays:
const roles = ['admin', 'editor', 'viewer'] as const;
// typeof roles = readonly ["admin", "editor", "viewer"]
type Role = (typeof roles)[number]; // "admin" | "editor" | "viewer"`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Use non-null assertions (!) sparingly. They tell the compiler to trust you, but if you are wrong, you get a runtime error. Prefer optional chaining (?.) or explicit null checks.',
        },
      ],
    },

    // ─── Section 3: Interfaces & Type Aliases ─────────────────────────
    {
      id: 'interfaces-type-aliases',
      title: 'Interfaces & Type Aliases',
      blocks: [
        {
          type: 'text',
          content:
            'Interfaces and type aliases are both ways to name object shapes. Interfaces are extendable and best for object shapes and class contracts. Type aliases are more flexible — they can represent unions, intersections, primitives, tuples, and mapped types.',
        },
        {
          type: 'heading',
          content: 'Interface Basics',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Interfaces',
          code: `interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;              // Optional property
  readonly createdAt: Date;     // Cannot be reassigned after creation
}

// Usage
const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date(),
};

// Extending interfaces
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

// Multiple inheritance
interface TimestampedEntity {
  createdAt: Date;
  updatedAt: Date;
}

interface AuditableUser extends User, TimestampedEntity {
  lastLoginAt: Date;
}`,
        },
        {
          type: 'heading',
          content: 'Type Aliases',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Type aliases',
          code: `// Object type alias (works like interface for objects)
type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
};

// Union types — only possible with type aliases
type Category = 'electronics' | 'clothing' | 'food' | 'books';
type ID = string | number;
type Result<T> = { success: true; data: T } | { success: false; error: string };

// Intersection types — combine multiple types
type WithTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type TimestampedProduct = Product & WithTimestamps;

// Tuple type
type Coordinate = [x: number, y: number, z?: number];

// Function type
type Formatter = (value: string) => string;
type AsyncFetcher<T> = (url: string) => Promise<T>;`,
        },
        {
          type: 'heading',
          content: 'Index Signatures & Record',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Index signatures',
          code: `// Index signature — dynamic keys
interface StringMap {
  [key: string]: string;
}

const headers: StringMap = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer token123',
};

// Index signature with known + dynamic keys
interface Config {
  apiUrl: string;
  timeout: number;
  [key: string]: string | number; // Must be compatible with known props
}

// Record utility type — cleaner alternative
type StatusMap = Record<string, boolean>;
type UserRoles = Record<string, 'admin' | 'editor' | 'viewer'>;

// Record with union keys
type HttpStatusMessage = Record<200 | 404 | 500, string>;
const messages: HttpStatusMessage = {
  200: 'OK',
  404: 'Not Found',
  500: 'Internal Server Error',
};`,
        },
        {
          type: 'heading',
          content: 'When to Use Interface vs Type',
        },
        {
          type: 'list',
          items: [
            'Use interface for object shapes, especially when they will be extended or implemented by classes',
            'Use type for unions, intersections, tuples, mapped types, and conditional types',
            'Use type for function signatures (type Fn = (x: number) => string)',
            'Use interface when you need declaration merging (extending third-party types)',
            'For simple object shapes, either works — pick one convention and be consistent',
            'In React, props are commonly typed with either — both work equally well',
          ],
        },
        {
          type: 'heading',
          content: 'Declaration Merging',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Declaration merging',
          code: `// Interfaces with the same name automatically merge
interface Window {
  myCustomProperty: string;
}

// Now window.myCustomProperty is typed
// This is how you extend third-party types

// Type aliases CANNOT be merged — this is an error:
// type User = { name: string };
// type User = { age: number }; // Error: Duplicate identifier

// Extending third-party interfaces (e.g., Express Request)
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Declaration merging is one of the few objective differences between interface and type. If you need to augment a third-party library type (like Express Request), you must use an interface.',
        },
      ],
    },

    // ─── Section 4: Generics ──────────────────────────────────────────
    {
      id: 'generics',
      title: 'Generics',
      blocks: [
        {
          type: 'text',
          content:
            'Generics let you write reusable, type-safe code that works with multiple types. Instead of using "any", generics preserve type information through function calls, class instances, and data structures.',
        },
        {
          type: 'heading',
          content: 'Generic Functions',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Generic functions',
          code: `// Basic generic function
function identity<T>(value: T): T {
  return value;
}

const str = identity('hello');   // type: string
const num = identity(42);        // type: number

// Multiple type parameters
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const entry = pair('name', 'Alice'); // type: [string, string]
const mixed = pair(1, true);         // type: [number, boolean]

// Generic arrow function (note the trailing comma in TSX files)
const wrapInArray = <T,>(value: T): T[] => [value];

// Generic function with default type
function createList<T = string>(): T[] {
  return [];
}

const strings = createList();          // string[]
const numbers = createList<number>();  // number[]`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'In .tsx files, <T> alone looks like JSX. Use <T,> (trailing comma) or <T extends unknown> to disambiguate.',
        },
        {
          type: 'heading',
          content: 'Generic Constraints',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Constraints',
          code: `// Constrain T to objects with a "length" property
function logLength<T extends { length: number }>(item: T): T {
  console.log(item.length);
  return item;
}

logLength('hello');     // OK — string has length
logLength([1, 2, 3]);  // OK — array has length
// logLength(42);       // Error — number has no length

// Constrain to specific object shape
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30, email: 'alice@test.com' };
const name = getProperty(user, 'name');  // type: string
const age = getProperty(user, 'age');    // type: number
// getProperty(user, 'phone');           // Error — 'phone' not in keyof User

// Constraint with multiple bounds
interface Serializable {
  serialize(): string;
}

interface Loggable {
  log(): void;
}

function process<T extends Serializable & Loggable>(item: T): string {
  item.log();
  return item.serialize();
}`,
        },
        {
          type: 'heading',
          content: 'Generic Interfaces & Types',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Generic interfaces',
          code: `// Generic API response wrapper
interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  timestamp: Date;
}

// Usage with specific types
type UserResponse = ApiResponse<{ id: string; name: string; email: string }>;
type ProductListResponse = ApiResponse<{ id: string; name: string; price: number }[]>;

// Generic with defaults
interface PaginatedResponse<T, M = { total: number; page: number }> {
  data: T[];
  meta: M;
}

// Generic repository pattern
interface Repository<T extends { id: string }> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

// Implement for a specific entity
interface User {
  id: string;
  name: string;
  email: string;
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    return null;
  }
  async findAll(): Promise<User[]> {
    return [];
  }
  async create(data: Omit<User, 'id'>): Promise<User> {
    return { id: crypto.randomUUID(), ...data };
  }
  async update(id: string, data: Partial<User>): Promise<User> {
    return { id, name: '', email: '', ...data };
  }
  async delete(id: string): Promise<void> {}
}`,
        },
        {
          type: 'heading',
          content: 'Common Generic Patterns',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Practical patterns',
          code: `// Type-safe event emitter
type EventMap = {
  login: { userId: string; timestamp: Date };
  logout: { userId: string };
  error: { code: number; message: string };
};

function on<K extends keyof EventMap>(event: K, handler: (payload: EventMap[K]) => void): void {
  // Register handler
}

on('login', (payload) => {
  // payload is typed as { userId: string; timestamp: Date }
  console.log(payload.userId);
});

// Type-safe fetch wrapper
async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }
  return response.json() as Promise<T>;
}

interface User {
  id: string;
  name: string;
}

const user = await fetchJson<User>('/api/users/1');
// user is typed as User

// Type-safe local storage wrapper
function getStoredValue<T>(key: string, fallback: T): T {
  const stored = localStorage.getItem(key);
  if (stored === null) return fallback;
  return JSON.parse(stored) as T;
}

const theme = getStoredValue<'light' | 'dark'>('theme', 'dark');`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'A good rule of thumb: if a type parameter appears only once in a function signature, you probably do not need a generic. Generics are useful when they link two or more positions (input to output, or one parameter to another).',
        },
      ],
    },

    // ─── Section 5: Utility Types ─────────────────────────────────────
    {
      id: 'utility-types',
      title: 'Utility Types',
      blocks: [
        {
          type: 'text',
          content:
            'TypeScript provides built-in utility types that transform existing types. These are essential for avoiding type duplication — derive new types from existing ones instead of redefining them.',
        },
        {
          type: 'heading',
          content: 'Partial, Required, Readonly',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Partial / Required / Readonly',
          code: `interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Partial<T> — all properties become optional
type UpdateUserDto = Partial<User>;
// { id?: string; name?: string; email?: string; avatar?: string }

function updateUser(id: string, updates: Partial<User>): void {
  // Can pass any subset of User fields
}
updateUser('1', { name: 'New Name' }); // OK

// Required<T> — all properties become required
type CompleteUser = Required<User>;
// { id: string; name: string; email: string; avatar: string }

// Readonly<T> — all properties become readonly
type FrozenUser = Readonly<User>;
const user: FrozenUser = { id: '1', name: 'Alice', email: 'a@b.com' };
// user.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property`,
        },
        {
          type: 'heading',
          content: 'Pick, Omit',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Pick / Omit',
          code: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pick<T, K> — select specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>;
// { id: string; name: string; email: string }

// Omit<T, K> — exclude specific properties
type SafeUser = Omit<User, 'password'>;
// { id: string; name: string; email: string; createdAt: Date; updatedAt: Date }

// Combine them for DTOs
type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// { name: string; email: string; password: string }

type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Practical: API response transformations
function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}`,
        },
        {
          type: 'heading',
          content: 'Record',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Record',
          code: `// Record<K, V> — construct an object type with keys K and values V

// String keys
type FeatureFlags = Record<string, boolean>;
const features: FeatureFlags = {
  darkMode: true,
  notifications: false,
  betaFeatures: true,
};

// Union keys — ensures all keys are present
type Status = 'pending' | 'active' | 'inactive';
type StatusConfig = Record<Status, { label: string; color: string }>;

const statusConfig: StatusConfig = {
  pending: { label: 'Pending', color: 'yellow' },
  active: { label: 'Active', color: 'green' },
  inactive: { label: 'Inactive', color: 'gray' },
};

// Grouped data
type GroupedUsers = Record<string, User[]>;
function groupByRole(users: User[]): Record<string, User[]> {
  return users.reduce<Record<string, User[]>>((acc, user) => {
    const role = 'default';
    acc[role] = acc[role] ?? [];
    acc[role].push(user);
    return acc;
  }, {});
}`,
        },
        {
          type: 'heading',
          content: 'Exclude, Extract, NonNullable',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Union manipulation',
          code: `type AllStatus = 'pending' | 'active' | 'inactive' | 'archived';

// Exclude<T, U> — remove types from a union
type ActiveStatuses = Exclude<AllStatus, 'archived' | 'inactive'>;
// 'pending' | 'active'

// Extract<T, U> — keep only types assignable to U
type InactiveStatuses = Extract<AllStatus, 'inactive' | 'archived'>;
// 'inactive' | 'archived'

// NonNullable<T> — remove null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

// Practical: filter event types
type AppEvent =
  | { type: 'click'; x: number; y: number }
  | { type: 'keypress'; key: string }
  | { type: 'scroll'; offset: number };

type MouseEvent = Extract<AppEvent, { type: 'click' }>;
// { type: 'click'; x: number; y: number }

type NonMouseEvents = Exclude<AppEvent, { type: 'click' }>;
// { type: 'keypress'; key: string } | { type: 'scroll'; offset: number }`,
        },
        {
          type: 'heading',
          content: 'ReturnType, Parameters, Awaited',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Function utility types',
          code: `function createUser(name: string, email: string, age: number) {
  return { id: crypto.randomUUID(), name, email, age, createdAt: new Date() };
}

// ReturnType<T> — extract the return type of a function
type NewUser = ReturnType<typeof createUser>;
// { id: string; name: string; email: string; age: number; createdAt: Date }

// Parameters<T> — extract parameter types as a tuple
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, email: string, age: number]

// ConstructorParameters<T> — for class constructors
class UserService {
  constructor(
    private apiUrl: string,
    private timeout: number
  ) {}
}
type ServiceArgs = ConstructorParameters<typeof UserService>;
// [apiUrl: string, timeout: number]

// Awaited<T> — unwrap Promise types
type UserPromise = Promise<{ id: string; name: string }>;
type ResolvedUser = Awaited<UserPromise>;
// { id: string; name: string }

// Works with nested promises too
type NestedPromise = Promise<Promise<string>>;
type Resolved = Awaited<NestedPromise>;
// string

// Practical: extract resolved type from an async function
async function fetchUsers(): Promise<User[]> {
  return [];
}
type FetchResult = Awaited<ReturnType<typeof fetchUsers>>;
// User[]`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'ReturnType and Parameters are invaluable when you do not control the function definition (e.g., third-party libraries). Use them to derive types from existing code instead of duplicating type definitions.',
        },
      ],
    },

    // ─── Section 6: Type Guards & Narrowing ───────────────────────────
    {
      id: 'type-guards-narrowing',
      title: 'Type Guards & Narrowing',
      blocks: [
        {
          type: 'text',
          content:
            'Type narrowing is how TypeScript refines a broad type into a more specific one within a code block. Type guards are expressions that perform runtime checks and tell TypeScript which type a value is.',
        },
        {
          type: 'heading',
          content: 'Built-in Type Guards',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'typeof / instanceof / in',
          code: `// typeof — works for primitives
function padValue(value: string | number): string {
  if (typeof value === 'string') {
    return value.padStart(10, ' ');  // TypeScript knows it's string here
  }
  return value.toFixed(2);          // TypeScript knows it's number here
}

// instanceof — works for classes
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

function handleError(error: Error | ApiError) {
  if (error instanceof ApiError) {
    console.log(error.statusCode);  // TypeScript knows it's ApiError
  } else {
    console.log(error.message);     // Regular Error
  }
}

// in — check if property exists on object
interface Cat {
  meow(): void;
  purr(): void;
}

interface Dog {
  bark(): void;
  fetch(): void;
}

function interact(pet: Cat | Dog) {
  if ('meow' in pet) {
    pet.purr();   // TypeScript knows it's Cat
  } else {
    pet.bark();   // TypeScript knows it's Dog
  }
}`,
        },
        {
          type: 'heading',
          content: 'Discriminated Unions',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Discriminated unions',
          code: `// Each type in the union has a common "discriminant" property
type ApiResult<T> =
  | { status: 'success'; data: T; timestamp: Date }
  | { status: 'error'; error: string; code: number }
  | { status: 'loading' };

function handleResult(result: ApiResult<User[]>) {
  switch (result.status) {
    case 'success':
      // TypeScript knows: { status: 'success'; data: User[]; timestamp: Date }
      console.log(\`Got \${result.data.length} users at \${result.timestamp}\`);
      break;
    case 'error':
      // TypeScript knows: { status: 'error'; error: string; code: number }
      console.error(\`Error \${result.code}: \${result.error}\`);
      break;
    case 'loading':
      // TypeScript knows: { status: 'loading' }
      console.log('Loading...');
      break;
  }
}

// Redux-style actions
type Action =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'DELETE_TODO'; payload: { id: number } }
  | { type: 'CLEAR_COMPLETED' };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload.text, done: false }];
    case 'TOGGLE_TODO':
      return state.map((t) => (t.id === action.payload.id ? { ...t, done: !t.done } : t));
    case 'DELETE_TODO':
      return state.filter((t) => t.id !== action.payload.id);
    case 'CLEAR_COMPLETED':
      return state.filter((t) => !t.done);
  }
}

interface Todo {
  id: number;
  text: string;
  done: boolean;
}`,
        },
        {
          type: 'heading',
          content: 'Custom Type Guards (is keyword)',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Custom type guards',
          code: `// The "is" keyword in the return type creates a type predicate
interface User {
  type: 'user';
  name: string;
  email: string;
}

interface Admin {
  type: 'admin';
  name: string;
  email: string;
  permissions: string[];
}

// Type predicate — narrows the type when the function returns true
function isAdmin(person: User | Admin): person is Admin {
  return person.type === 'admin';
}

function greet(person: User | Admin) {
  if (isAdmin(person)) {
    console.log(\`Admin \${person.name} has \${person.permissions.length} permissions\`);
  } else {
    console.log(\`User \${person.name}\`);
  }
}

// Filtering arrays with type guards
const people: (User | Admin)[] = [
  { type: 'user', name: 'Alice', email: 'alice@test.com' },
  { type: 'admin', name: 'Bob', email: 'bob@test.com', permissions: ['read', 'write'] },
];

const admins: Admin[] = people.filter(isAdmin);
// Without the type predicate, this would be (User | Admin)[]

// Validating unknown data (e.g., from an API)
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    (data as User).type === 'user' &&
    'name' in data &&
    typeof (data as User).name === 'string' &&
    'email' in data &&
    typeof (data as User).email === 'string'
  );
}`,
        },
        {
          type: 'heading',
          content: 'Exhaustive Checking with never',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Exhaustive checks',
          code: `// Ensure all cases in a union are handled
type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer' | 'crypto';

function assertNever(value: never): never {
  throw new Error(\`Unhandled value: \${value}\`);
}

function processPayment(method: PaymentMethod): string {
  switch (method) {
    case 'credit_card':
      return 'Processing credit card...';
    case 'paypal':
      return 'Redirecting to PayPal...';
    case 'bank_transfer':
      return 'Initiating bank transfer...';
    case 'crypto':
      return 'Generating wallet address...';
    default:
      // If someone adds a new PaymentMethod but forgets to handle it here,
      // TypeScript will error because the new value is not assignable to never
      return assertNever(method);
  }
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Discriminated unions + exhaustive switch statements are one of the most powerful patterns in TypeScript. They guarantee at compile time that every case is handled, making refactoring safe.',
        },
      ],
    },

    // ─── Section 7: TypeScript with React ─────────────────────────────
    {
      id: 'typescript-react',
      title: 'TypeScript with React',
      blocks: [
        {
          type: 'text',
          content:
            'React and TypeScript work together to catch prop errors, enforce hook types, and provide autocompletion throughout your component tree. Use .tsx files for components and .ts for non-JSX modules.',
        },
        {
          type: 'heading',
          content: 'Typing Component Props',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Component props',
          code: `// Basic props with interface
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick: () => void;
}

function Button({ label, variant = 'primary', disabled = false, onClick }: ButtonProps) {
  return (
    <button className={\`btn btn-\${variant}\`} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

// Props with children
interface CardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

function Card({ title, className, children }: CardProps) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Props extending HTML attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, ...rest }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...rest} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
// Now Input accepts all native input attributes + label + error`,
        },
        {
          type: 'heading',
          content: 'Typing Hooks',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Typed hooks',
          code: `import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// useState — inferred from initial value
const [count, setCount] = useState(0);           // number
const [name, setName] = useState('');             // string

// useState — explicit type when initial value doesn't tell the full story
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Product[]>([]);
const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

// useRef — DOM element refs
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);

function focusInput() {
  inputRef.current?.focus();
}

// useRef — mutable value ref (does NOT trigger re-render)
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

useEffect(() => {
  intervalRef.current = setInterval(() => {
    console.log('tick');
  }, 1000);
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);

// useCallback with typed parameters
const handleSubmit = useCallback((values: FormValues) => {
  console.log(values);
}, []);

// useMemo with explicit return type
const sortedUsers = useMemo((): User[] => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
}, [users]);`,
        },
        {
          type: 'heading',
          content: 'Typing Events',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Event handlers',
          code: `// Inline handlers — TypeScript infers the event type
<input onChange={(e) => setName(e.target.value)} />

// Extracted handlers — must type the event
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  setName(e.target.value);
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  // Process form
}

function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  console.log(e.clientX, e.clientY);
}

function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Enter') {
    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  }
}

// Common event types:
// React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
// React.FormEvent<HTMLFormElement>
// React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
// React.KeyboardEvent<HTMLInputElement>
// React.FocusEvent<HTMLInputElement>
// React.DragEvent<HTMLDivElement>`,
        },
        {
          type: 'heading',
          content: 'Typing Context',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Typed context',
          code: `import { createContext, useContext, useState, type ReactNode } from 'react';

// Define the context shape
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook with type guard
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data: User = await response.json();
    setUser(data);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage in a component
function ProfilePage() {
  const { user, logout } = useAuth();
  // user is User | null, fully typed
  return user ? <div>{user.name}</div> : null;
}`,
        },
        {
          type: 'heading',
          content: 'Generic Components',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Generic components',
          code: `// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage }: ListProps<T>) {
  if (items.length === 0) {
    return <p>{emptyMessage ?? 'No items'}</p>;
  }
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage — TypeScript infers T from the items prop
<List
  items={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => <span>{user.name}</span>}
/>

// Generic select component
interface SelectProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

function Select<T extends string>({ options, value, onChange, label }: SelectProps<T>) {
  return (
    <label>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

const statuses = ['pending', 'active', 'inactive'] as const;
<Select options={statuses} value="pending" onChange={(val) => console.log(val)} label="Status" />`,
        },
        {
          type: 'heading',
          content: 'Typing Custom Hooks',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Custom hooks',
          code: `// Typed custom hook with generic
function useFetch<T>(url: string): {
  data: T | null;
  error: string | null;
  isLoading: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json() as Promise<T>;
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, error, isLoading };
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { data: user, error, isLoading } = useFetch<User>(\`/api/users/\${userId}\`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return <h1>{user.name}</h1>;
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'For component props that extend HTML elements, use React.ComponentPropsWithRef<"button"> (if you need ref forwarding) or React.ComponentPropsWithoutRef<"div">. These give you all native props automatically.',
        },
      ],
    },

    // ─── Section 8: TypeScript with Express ───────────────────────────
    {
      id: 'typescript-express',
      title: 'TypeScript with Express',
      blocks: [
        {
          type: 'text',
          content:
            'TypeScript makes Express applications safer by typing request bodies, route parameters, query strings, and response payloads. Install @types/express for the type definitions.',
        },
        {
          type: 'heading',
          content: 'Basic Express Setup',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'src/app.ts',
          code: `import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router as userRouter } from './routes/userRoutes';
import { globalErrorHandler } from './middleware/errorHandler';
import { AppError } from './utils/AppError';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/v1/users', userRouter);

// 404 handler
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(\`Cannot find \${req.originalUrl} on this server\`, 404));
});

// Global error handler
app.use(globalErrorHandler);

export default app;`,
        },
        {
          type: 'heading',
          content: 'Typed Route Handlers',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'src/controllers/userController.ts',
          code: `import { type Request, type Response, type NextFunction } from 'express';
import { type User } from '../types';

// Type the request generics: <Params, ResBody, ReqBody, Query>
type CreateUserRequest = Request<
  {},                                          // Params
  { user: User },                              // Response body
  { name: string; email: string; password: string },  // Request body
  {}                                           // Query
>;

export const createUser = async (
  req: CreateUserRequest,
  res: Response<{ user: User }>,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    // req.body is typed as { name: string; email: string; password: string }

    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      createdAt: new Date(),
    };

    res.status(201).json({ user });
    // res.json payload is typed as { user: User }
  } catch (error) {
    next(error);
  }
};

// Typed params
type GetUserRequest = Request<{ id: string }>;

export const getUser = async (
  req: GetUserRequest,
  res: Response<{ user: User }>,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // typed as { id: string }
    // Fetch user by id...
    const user: User = { id, name: 'Alice', email: 'alice@test.com', createdAt: new Date() };
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Typed query parameters
type ListUsersRequest = Request<
  {},
  { users: User[]; total: number },
  {},
  { page?: string; limit?: string; sort?: string }
>;

export const listUsers = async (
  req: ListUsersRequest,
  res: Response<{ users: User[]; total: number }>,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page ?? '1', 10);
    const limit = parseInt(req.query.limit ?? '10', 10);
    const sort = req.query.sort ?? 'createdAt';
    // Query is typed: { page?: string; limit?: string; sort?: string }

    const users: User[] = [];
    res.status(200).json({ users, total: 0 });
  } catch (error) {
    next(error);
  }
};`,
        },
        {
          type: 'heading',
          content: 'Extending the Request Interface',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'src/types/express.d.ts',
          code: `// Augment the Express Request with custom properties
// This file must be included in your tsconfig "include" array

import { type User } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      requestTime?: string;
    }
  }
}

// Now you can use req.user anywhere without casting
// Example middleware that sets req.user:

// src/middleware/auth.ts
import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // req.user is typed because we augmented the Request interface
    req.user = {
      id: decoded.userId,
      name: '',
      email: '',
      createdAt: new Date(),
    };

    next();
  } catch (error) {
    next(error);
  }
};`,
        },
        {
          type: 'heading',
          content: 'Typed Error Handling',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'src/utils/AppError.ts',
          code: `export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: 'fail' | 'error';
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Async error wrapper — eliminates try/catch in every handler
type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Usage: wrap handlers with catchAsync
import { catchAsync } from '../utils/AppError';

export const getUser = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({ user });
});`,
        },
        {
          type: 'heading',
          content: 'Typed Environment Variables',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'src/config/env.ts',
          code: `// Validate and type environment variables at startup

interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN: string;
}

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(\`Missing required environment variable: \${key}\`);
  }
  return value;
}

export const env: EnvConfig = {
  NODE_ENV: getEnvVar('NODE_ENV') as EnvConfig['NODE_ENV'],
  PORT: parseInt(getEnvVar('PORT'), 10),
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  JWT_EXPIRES_IN: getEnvVar('JWT_EXPIRES_IN'),
  CORS_ORIGIN: getEnvVar('CORS_ORIGIN'),
};

// Usage throughout the app:
import { env } from './config/env';

const server = app.listen(env.PORT, () => {
  console.log(\`Server running in \${env.NODE_ENV} on port \${env.PORT}\`);
});`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Never use process.env.VARIABLE directly throughout your app — it is always string | undefined. Validate and parse environment variables once at startup and export a typed config object.',
        },
      ],
    },

    // ─── Section 9: Advanced Patterns ─────────────────────────────────
    {
      id: 'advanced-patterns',
      title: 'Advanced Patterns',
      blocks: [
        {
          type: 'text',
          content:
            'Advanced TypeScript features let you create sophisticated type transformations. These patterns are commonly used in libraries and complex application code to enforce constraints at the type level.',
        },
        {
          type: 'heading',
          content: 'Mapped Types',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Mapped types',
          code: `// Create a new type by transforming each property of an existing type
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

// Practical: make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  id: string;
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;
// { id: string | null; name: string | null; email: string | null }

// Key remapping with "as"
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getId: () => string; getName: () => string; getEmail: () => string }

// Filter properties by type
type StringKeysOnly<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Mixed {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

type OnlyStrings = StringKeysOnly<Mixed>;
// { name: string; email: string }`,
        },
        {
          type: 'heading',
          content: 'Conditional Types',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Conditional types',
          code: `// T extends U ? TrueType : FalseType
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Practical: extract array element type
type ElementOf<T> = T extends (infer E)[] ? E : never;

type Item = ElementOf<string[]>;   // string
type Num = ElementOf<number[]>;    // number

// Practical: unwrap promises
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;

type Resolved = UnwrapPromise<Promise<User>>;  // User
type NotPromise = UnwrapPromise<string>;        // string

// Distributive conditional types — applied to each union member
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]   (NOT (string | number)[])

// Prevent distribution with tuple wrapper
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;

type Result2 = ToArrayNonDist<string | number>;
// (string | number)[]

// Practical: extract function arguments by position
type FirstArg<T> = T extends (first: infer F, ...rest: unknown[]) => unknown ? F : never;

type Arg = FirstArg<(name: string, age: number) => void>;
// string`,
        },
        {
          type: 'heading',
          content: 'Template Literal Types',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Template literal types',
          code: `// Build string literal types from other types
type EventName = 'click' | 'focus' | 'blur';
type HandlerName = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"

// CSS unit types
type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'vh' | 'vw';
type CSSValue = \`\${number}\${CSSUnit}\`;

const width: CSSValue = '100px';
const height: CSSValue = '50vh';
// const bad: CSSValue = 'abc';  // Error

// Build a typed event system
type Model = 'user' | 'post' | 'comment';
type CrudAction = 'created' | 'updated' | 'deleted';
type CrudEvent = \`\${Model}:\${CrudAction}\`;
// "user:created" | "user:updated" | "user:deleted" | "post:created" | ...

// Typed dot-notation path accessor
type NestedPaths<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? \`\${Prefix}\${K}\` | NestedPaths<T[K], \`\${Prefix}\${K}.\`>
        : \`\${Prefix}\${K}\`;
    }[keyof T & string]
  : never;

interface Settings {
  theme: {
    mode: 'light' | 'dark';
    primary: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
  };
}

type SettingsPath = NestedPaths<Settings>;
// "theme" | "theme.mode" | "theme.primary" | "notifications" | "notifications.email" | "notifications.push"`,
        },
        {
          type: 'heading',
          content: 'Branded Types',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Branded types',
          code: `// Branded types prevent accidentally mixing up values of the same primitive type

// Define branded types using intersection with a unique symbol
declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;
type Email = Brand<string, 'Email'>;

// Constructor functions that validate and brand
function createUserId(id: string): UserId {
  if (!id.match(/^usr_[a-z0-9]+$/)) {
    throw new Error(\`Invalid user ID format: \${id}\`);
  }
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes('@')) {
    throw new Error(\`Invalid email: \${email}\`);
  }
  return email as Email;
}

// Now TypeScript prevents mixing up IDs
function getUser(id: UserId): void {}
function getPost(id: PostId): void {}

const userId = createUserId('usr_abc123');
const postId = 'post_xyz' as PostId;

getUser(userId);    // OK
// getUser(postId); // Error: PostId is not assignable to UserId
// getUser('raw');  // Error: string is not assignable to UserId`,
        },
        {
          type: 'heading',
          content: 'Readonly Arrays & Tuples',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Readonly collections',
          code: `// Readonly array — prevents mutation
function processItems(items: readonly string[]): void {
  // items.push('new');    // Error: Property 'push' does not exist on readonly string[]
  // items[0] = 'changed'; // Error: Index signature only permits reading
  const copy = [...items, 'new']; // OK — create a new array
  console.log(copy);
}

// ReadonlyArray<T> — equivalent to readonly T[]
function sum(numbers: ReadonlyArray<number>): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// Readonly tuple
function getRange(): readonly [number, number] {
  return [0, 100];
}

const range = getRange();
// range[0] = 5; // Error: Cannot assign to '0' because it is a read-only property

// Deep readonly with Readonly + as const
const CONFIG = {
  api: {
    baseUrl: 'https://api.example.com',
    version: 'v1',
    endpoints: {
      users: '/users',
      posts: '/posts',
    },
  },
  cache: {
    ttl: 3600,
    maxSize: 100,
  },
} as const;

// typeof CONFIG.api.baseUrl = "https://api.example.com" (literal, not string)
// All properties are deeply readonly`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Use "readonly" on function parameters that should not be mutated. This communicates intent and prevents accidental side effects. Combine with "as const" for deeply frozen configuration objects.',
        },
      ],
    },

    // ─── Section 10: Module System & Declaration Files ────────────────
    {
      id: 'modules-declarations',
      title: 'Module System & Declaration Files',
      blocks: [
        {
          type: 'text',
          content:
            'Declaration files (.d.ts) describe the shape of JavaScript code without providing implementations. They are essential for typing third-party libraries, ambient declarations, and module augmentation.',
        },
        {
          type: 'heading',
          content: 'Declaration Files (.d.ts)',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'src/types/global.d.ts',
          code: `// Declare types for modules without type definitions

// Type a CSS module
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

// Type image imports
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Type a JS library that has no @types package
declare module 'untyped-library' {
  export function doSomething(input: string): number;
  export function transform<T>(data: T): T;
  export default function init(config: { apiKey: string }): void;
}

// Type environment variables (Vite-specific)
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_ANALYTICS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}`,
        },
        {
          type: 'heading',
          content: 'Module Augmentation',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Module augmentation',
          code: `// Add properties to existing third-party types

// Augment Express Request (in a .d.ts or .ts file)
import { type User } from './models/User';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    sessionId?: string;
  }
}

// Augment a library's types
declare module 'axios' {
  export interface AxiosRequestConfig {
    retry?: boolean;
    retryCount?: number;
  }
}

// Augment global Window
declare global {
  interface Window {
    __APP_CONFIG__: {
      apiUrl: string;
      version: string;
    };
    gtag: (...args: unknown[]) => void;
  }
}

// This file must be a module (have at least one import/export)
export {};`,
        },
        {
          type: 'heading',
          content: 'Type-Only Imports and Exports',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Type-only imports',
          code: `// type-only imports — erased at compile time, no runtime cost
import type { User, Product, Order } from './types';
import { type FC, useState, useEffect } from 'react';

// type-only exports
export type { User, Product };

// type-only re-exports
export type { RequestHandler } from 'express';

// Why use type-only imports?
// 1. Makes intent clear — this import is only for type checking
// 2. Prevents accidental runtime usage of type-only constructs
// 3. Helps bundlers with tree-shaking
// 4. Required when isolatedModules is true and re-exporting types

// With verbatimModuleSyntax (recommended in new projects):
// TypeScript enforces that type-only imports use the "type" keyword
// This makes the output predictable regardless of the build tool`,
        },
        {
          type: 'heading',
          content: 'Barrel Exports',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'src/types/index.ts',
          code: `// Barrel file — re-export all types from a single entry point

// Re-export types
export type { User, CreateUserDto, UpdateUserDto } from './user';
export type { Product, ProductCategory } from './product';
export type { Order, OrderStatus, OrderItem } from './order';
export type { ApiResponse, PaginatedResponse, ApiError } from './api';

// Re-export enums and constants (runtime values)
export { OrderStatus } from './order';
export { UserRole } from './user';

// Usage elsewhere in the app:
import type { User, Product, ApiResponse } from '@/types';
import { OrderStatus, UserRole } from '@/types';`,
        },
        {
          type: 'heading',
          content: 'Ambient Declarations',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Ambient declarations',
          code: `// "declare" tells TypeScript something exists at runtime
// without providing an implementation

// Declare a global variable (e.g., injected by a script tag)
declare const API_BASE_URL: string;
declare const __DEV__: boolean;

// Declare a global function
declare function ga(command: string, ...args: unknown[]): void;

// Declare a namespace (for older-style libraries)
declare namespace MyLib {
  function init(config: { debug: boolean }): void;
  function getVersion(): string;

  interface Options {
    timeout: number;
    retries: number;
  }
}

// Usage:
MyLib.init({ debug: true });
const version: string = MyLib.getVersion();`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Declaration files (.d.ts) should never contain implementations — only type information. If a .d.ts file has import or export statements, it is treated as a module. Without them, it is treated as an ambient/global declaration.',
        },
      ],
    },

    // ─── Section 11: Common Patterns & Best Practices ─────────────────
    {
      id: 'common-patterns',
      title: 'Common Patterns & Best Practices',
      blocks: [
        {
          type: 'text',
          content:
            'These patterns and practices help you write cleaner, safer TypeScript code. They represent lessons learned from real-world projects and common pitfalls to avoid.',
        },
        {
          type: 'heading',
          content: 'The satisfies Operator',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'satisfies operator',
          code: `// "satisfies" validates a value against a type WITHOUT widening it
// Added in TypeScript 4.9

type Theme = Record<string, string>;

// With type annotation — loses literal type info
const themeAnnotated: Theme = {
  primary: '#007bff',
  danger: '#dc3545',
};
// themeAnnotated.primary is string

// With satisfies — keeps literal types while validating
const theme = {
  primary: '#007bff',
  danger: '#dc3545',
} satisfies Theme;
// theme.primary is "#007bff" (literal type)
// AND TypeScript validates all values are strings

// Practical: typed configuration with autocomplete
type RouteConfig = Record<string, { path: string; auth: boolean }>;

const routes = {
  home: { path: '/', auth: false },
  dashboard: { path: '/dashboard', auth: true },
  profile: { path: '/profile', auth: true },
  login: { path: '/login', auth: false },
} satisfies RouteConfig;

// routes.home.path is "/" (literal), not string
// routes.dashboard.auth is true (literal), not boolean
// AND you get autocomplete on routes.home, routes.dashboard, etc.

// Compare: "as const" makes everything readonly, "satisfies" does not
// Use satisfies when you want validation + narrow types but still need mutability`,
        },
        {
          type: 'heading',
          content: 'Avoiding any',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Avoiding any',
          code: `// WRONG: using any
function parseData(data: any) {
  return data.users.map((u: any) => u.name); // No safety at all
}

// RIGHT: use unknown + narrowing
function parseData(data: unknown): string[] {
  if (
    typeof data === 'object' &&
    data !== null &&
    'users' in data &&
    Array.isArray((data as { users: unknown }).users)
  ) {
    const users = (data as { users: Array<{ name: string }> }).users;
    return users.map((u) => u.name);
  }
  throw new Error('Invalid data format');
}

// RIGHT: use a type guard for cleaner code
interface ApiData {
  users: Array<{ name: string }>;
}

function isApiData(data: unknown): data is ApiData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'users' in data &&
    Array.isArray((data as ApiData).users)
  );
}

function parseData(data: unknown): string[] {
  if (isApiData(data)) {
    return data.users.map((u) => u.name);
  }
  throw new Error('Invalid data format');
}

// RIGHT: use a validation library (Zod) for API responses
import { z } from 'zod';

const ApiDataSchema = z.object({
  users: z.array(z.object({ name: z.string() })),
});

function parseData(data: unknown): string[] {
  const parsed = ApiDataSchema.parse(data); // Throws on invalid data
  return parsed.users.map((u) => u.name);   // Fully typed
}`,
        },
        {
          type: 'heading',
          content: 'Const Assertions',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'as const patterns',
          code: `// "as const" creates the narrowest possible type

// Array to union type
const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = (typeof ROLES)[number]; // "admin" | "editor" | "viewer"

// Check if a string is a valid role
function isValidRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

// Object to union of values
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

type StatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
// 200 | 201 | 400 | 404 | 500

// Enum-like pattern without actual enums
const Color = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE',
} as const;

type Color = (typeof Color)[keyof typeof Color];
// "RED" | "GREEN" | "BLUE"

function paint(color: Color): void {
  console.log(color);
}

paint(Color.Red);   // OK
// paint('YELLOW'); // Error: '"YELLOW"' is not assignable to type 'Color'`,
        },
        {
          type: 'heading',
          content: 'Type vs Interface Decision Guide',
        },
        {
          type: 'list',
          items: [
            'Interface: object shapes that may be extended (interface User { ... })',
            'Interface: class contracts (class UserService implements IUserService)',
            'Interface: when you need declaration merging (augmenting Express, Window, etc.)',
            'Type: unions and intersections (type Result = Success | Error)',
            'Type: tuples (type Point = [number, number])',
            'Type: mapped and conditional types (type Getters<T> = ...)',
            'Type: function signatures (type Handler = (req: Request) => Response)',
            'Type: when deriving from other types with utility types (type DTO = Omit<User, "id">)',
            'Either: simple object shapes — just be consistent within your team',
          ],
        },
        {
          type: 'heading',
          content: 'Discriminated Union for State Management',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'State pattern',
          code: `// Model async state as a discriminated union — never have impossible states

// WRONG: independent booleans allow impossible states
// { isLoading: true, isError: true, data: someData }
interface BadState {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  data: User[] | null;
}

// RIGHT: discriminated union — each state is explicit and complete
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function UserList() {
  const [state, setState] = useState<AsyncState<User[]>>({ status: 'idle' });

  switch (state.status) {
    case 'idle':
      return <p>Click to load users</p>;
    case 'loading':
      return <p>Loading...</p>;
    case 'success':
      return <ul>{state.data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
    case 'error':
      return <p>Error: {state.error}</p>;
  }
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Model your state as discriminated unions instead of independent boolean flags. This makes impossible states unrepresentable and forces you to handle every case explicitly.',
        },
      ],
    },

    // ─── Section 12: Migration Guide ──────────────────────────────────
    {
      id: 'migration-guide',
      title: 'Migration Guide',
      blocks: [
        {
          type: 'text',
          content:
            'Migrating a JavaScript project to TypeScript does not have to be all-or-nothing. TypeScript supports incremental adoption — you can convert files one at a time while keeping the rest as JavaScript.',
        },
        {
          type: 'heading',
          content: 'Step 1: Install and Configure',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'Initial setup',
          code: `# Install TypeScript and type definitions for your stack
npm install -D typescript @types/node @types/express @types/react @types/react-dom

# Generate tsconfig.json
npx tsc --init`,
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'tsconfig.json (migration-friendly)',
          code: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": false,
    "allowJs": true,
    "checkJs": false,
    "noEmit": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Start with strict: false and allowJs: true. This lets you mix .js and .ts files freely. You can enable strict mode later once all files are converted.',
        },
        {
          type: 'heading',
          content: 'Step 2: Rename Files Incrementally',
        },
        {
          type: 'list',
          items: [
            'Rename .js/.jsx files to .ts/.tsx one at a time, starting with leaf files (utilities, types, helpers)',
            'Fix type errors in each file before moving to the next one',
            'Start with the simplest files — pure functions, constants, configuration',
            'Convert shared types and interfaces first, so other files can import them',
            'Leave complex files (components with many dependencies) for last',
          ],
        },
        {
          type: 'heading',
          content: 'Step 3: Use JSDoc for Quick Type Coverage',
        },
        {
          type: 'code',
          language: 'javascript',
          fileName: 'JSDoc annotations (in .js files)',
          code: `// Enable checkJs in tsconfig to get type checking in JS files
// without renaming them to .ts

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {Date} createdAt
 */

/**
 * @param {string} id
 * @returns {Promise<User | null>}
 */
async function getUserById(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) return null;
  return response.json();
}

/**
 * @template T
 * @param {T[]} items
 * @param {(item: T) => string} keyFn
 * @returns {Record<string, T[]>}
 */
function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] ?? [];
    acc[key].push(item);
    return acc;
  }, /** @type {Record<string, T[]>} */ ({}));
}

/**
 * @param {import('./types').Config} config
 * @returns {void}
 */
function initialize(config) {
  console.log(config.apiUrl);
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'JSDoc annotations are a great bridge strategy. Enable checkJs: true in tsconfig to get type checking in .js files without renaming them. This is useful when you cannot convert everything at once.',
        },
        {
          type: 'heading',
          content: 'Step 4: Gradually Enable Strict Options',
        },
        {
          type: 'code',
          language: 'json',
          fileName: 'Progressive strictness',
          code: `{
  "compilerOptions": {
    // Phase 1: Start here
    "strict": false,
    "allowJs": true,
    "checkJs": true,

    // Phase 2: Enable one at a time, fix errors after each
    "noImplicitAny": true,
    "strictNullChecks": true,

    // Phase 3: More strictness
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,

    // Phase 4: Full strict mode (equivalent to all of the above)
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    // Phase 5: Remove JS allowances
    "allowJs": false,
    "checkJs": false
  }
}`,
        },
        {
          type: 'heading',
          content: 'Common Migration Pitfalls',
        },
        {
          type: 'code',
          language: 'typescript',
          fileName: 'Common pitfalls',
          code: `// PITFALL 1: Adding "any" everywhere to silence errors
// WRONG
const data: any = fetchData();
const result: any = processResult(data);

// RIGHT: Use unknown and narrow, or use temporary type assertions with TODO comments
const data = fetchData() as unknown;
// TODO: Type this properly when migrating fetchData
const result = processResult(data as ExpectedType);

// PITFALL 2: Forgetting that object property access can return undefined
interface Config {
  [key: string]: string;
}
const config: Config = { api: 'https://api.example.com' };

// With noUncheckedIndexedAccess: true
const url = config['api']; // string | undefined, not string
const safeUrl = config['api'] ?? 'http://localhost:3000'; // string

// PITFALL 3: Not typing third-party library callbacks
import express from 'express';
const app = express();

// WRONG: implicit any parameters
// app.get('/api', (req, res) => { ... });

// RIGHT: types come from @types/express automatically
// but if they don't, be explicit:
import { type Request, type Response } from 'express';
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'typed' });
});

// PITFALL 4: Using "as" to cast incompatible types
interface Dog { bark(): void; }
interface Cat { meow(): void; }

// WRONG: double assertion to force incompatible cast
// const cat = dog as unknown as Cat;

// RIGHT: use a type guard or redesign the types
function isCat(animal: Dog | Cat): animal is Cat {
  return 'meow' in animal;
}

// PITFALL 5: Forgetting to type async function return values
// WRONG: return type is Promise<any> because json() returns any
async function getUser() {
  const res = await fetch('/api/user');
  return res.json();
}

// RIGHT: explicitly type the return
async function getUser(): Promise<User> {
  const res = await fetch('/api/user');
  return res.json() as Promise<User>;
}`,
        },
        {
          type: 'heading',
          content: 'Migration Checklist',
        },
        {
          type: 'list',
          items: [
            'Install typescript and relevant @types/* packages',
            'Create tsconfig.json with allowJs: true and strict: false',
            'Rename leaf files (.js to .ts, .jsx to .tsx) first — utilities, constants, types',
            'Create a src/types/ folder for shared interfaces and type aliases',
            'Use JSDoc + checkJs for files you cannot convert yet',
            'Convert components and pages last (they have the most dependencies)',
            'Enable strict options one at a time: noImplicitAny first, then strictNullChecks',
            'Replace all "any" with proper types or "unknown"',
            'Add return types to all public functions and exported APIs',
            'Enable strict: true once all files are converted and errors are resolved',
            'Set allowJs: false to prevent new .js files from being added',
          ],
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Do not try to convert an entire codebase in one pull request. Migrate in small, reviewable chunks — one module or feature at a time. This keeps PRs manageable and avoids merge conflicts.',
        },
      ],
    },
  ],
};

export default typescriptData;
