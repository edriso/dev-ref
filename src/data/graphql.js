const graphqlData = {
  id: 'graphql',
  name: 'GraphQL',
  description:
    'Query language for your API — flexible, strongly-typed, and self-documenting. One endpoint, client-specified data.',
  sections: [
    {
      id: 'graphql-vs-rest',
      title: 'GraphQL vs REST',
      blocks: [
        {
          type: 'text',
          content:
            'GraphQL is a query language for APIs invented by Facebook (2015). Instead of multiple fixed endpoints that return predetermined data shapes, you expose one endpoint where clients ask for exactly the fields they need — no more, no less.',
        },
        {
          type: 'heading',
          content: 'The Problem GraphQL Solves',
        },
        {
          type: 'list',
          items: [
            'Over-fetching — GET /users returns all 30 fields even if you only need name and email',
            'Under-fetching — You get user IDs, then need another GET /users/:id/posts per user (N+1 requests)',
            'Multiple round trips — Mobile apps on slow networks make 5-6 API calls to render one screen',
            'No contract — You need separate documentation to know what fields each endpoint returns',
          ],
        },
        {
          type: 'code',
          language: 'graphql',
          fileName: 'example.graphql',
          code: `# REST requires 3 requests to show a user's posts with comment counts:
# GET /users/1
# GET /users/1/posts
# GET /posts/:id/comments  (once per post)

# GraphQL: ONE request, ask for exactly what you need
query GetUserWithPosts {
  user(id: "1") {
    name
    email
    posts {
      title
      createdAt
      commentCount
    }
  }
}`,
        },
        {
          type: 'heading',
          content: 'REST vs GraphQL — Quick Comparison',
        },
        {
          type: 'list',
          items: [
            'Endpoints — REST has many (GET /users, POST /posts). GraphQL has one (POST /graphql)',
            'Data shape — REST: server decides. GraphQL: client decides what fields to include',
            'Caching — REST is easy to cache via HTTP (CDN, browser). GraphQL is harder (everything is POST)',
            'Schema — REST needs Swagger/Postman docs. GraphQL is self-documenting with types',
            'Learning curve — REST is familiar to everyone. GraphQL needs upfront learning but pays off on complex apps',
          ],
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            "GraphQL is not a replacement for REST — it's a tool for different problems. REST is great for simple CRUD and public APIs. GraphQL shines when you have deeply nested data, multiple clients (web + mobile) with different data needs, or rapidly changing frontends. Most startups do fine with REST.",
        },
      ],
    },
    {
      id: 'schema-types',
      title: 'Schema & Types (SDL)',
      blocks: [
        {
          type: 'text',
          content:
            'The Schema Definition Language (SDL) is how you describe the shape of your data and what operations are available. Think of it as a contract between your frontend and backend.',
        },
        {
          type: 'code',
          language: 'graphql',
          fileName: 'schema.graphql',
          code: `# Scalar types: String, Int, Float, Boolean, ID
# ! means non-nullable (required)

type User {
  id: ID!           # unique identifier
  name: String!     # required string
  email: String!
  age: Int          # optional (can be null)
  role: Role!
  posts: [Post!]!   # non-null array of non-null Posts
  createdAt: String!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!     # nested type — resolvers handle fetching this
}

# Input types are used for mutation arguments
input CreateUserInput {
  name: String!
  email: String!
  password: String!
}

input UpdateUserInput {
  name: String
  email: String     # optional fields for partial update
}

# Enums restrict a field to specific values
enum Role {
  USER
  ADMIN
  MODERATOR
}

# Query — all read operations
type Query {
  me: User
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  posts(published: Boolean): [Post!]!
}

# Mutation — all write operations
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Always define Input types for mutations instead of passing individual arguments. It keeps the schema clean and makes it easy to add optional fields later without breaking existing queries.',
        },
      ],
    },
    {
      id: 'apollo-server',
      title: 'Apollo Server Setup',
      blocks: [
        {
          type: 'text',
          content:
            'Apollo Server is the most popular way to build a GraphQL API in Node.js. You can run it standalone or integrate it with your existing Express app.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'terminal',
          code: `npm install @apollo/server graphql`,
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'server.js',
          code: `import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import User from './models/User.js';

// 1. Define your schema
const typeDefs = \`#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
\`;

// 2. Define resolvers (the functions that return data)
const resolvers = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id),
  },
  Mutation: {
    createUser: (_, { input }) => User.create(input),
  },
};

// 3. Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

// 4. Mount on Express
const app = express();
app.use(cors());
app.use(express.json());

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => ({
      user: req.user, // attach auth user from JWT middleware
    }),
  })
);

app.listen(5000, () => console.log('GraphQL: http://localhost:5000/graphql'));`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'Apollo Server includes Apollo Sandbox — a built-in GraphQL IDE at /graphql in development. You can explore your schema, run queries, and see docs without any extra setup.',
        },
      ],
    },
    {
      id: 'resolvers-context',
      title: 'Resolvers & Context',
      blocks: [
        {
          type: 'text',
          content:
            'Resolvers are functions that return data for each field in your schema. Every resolver receives four arguments: parent (result from parent resolver), args (query arguments), context (shared data like auth user and DB), and info (AST info, rarely needed).',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'resolvers.js',
          code: `import { GraphQLError } from 'graphql';
import User from './models/User.js';
import Post from './models/Post.js';

export const resolvers = {
  // Root resolvers
  Query: {
    // (parent, args, context, info)
    me: (_, __, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
      return User.findById(user.id);
    },

    users: async (_, { limit = 10, offset = 0 }) => {
      return User.find().limit(limit).skip(offset).lean();
    },

    user: async (_, { id }) => {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' },
      });
      return user;
    },
  },

  Mutation: {
    createUser: async (_, { input }, { user }) => {
      if (!user || user.role !== 'ADMIN') {
        throw new GraphQLError('Forbidden', {
          extensions: { code: 'FORBIDDEN' },
        });
      }
      return User.create(input);
    },

    updateUser: async (_, { id, input }, { user }) => {
      if (!user || user.id !== id) throw new GraphQLError('Forbidden');
      return User.findByIdAndUpdate(id, input, { new: true });
    },
  },

  // Field-level resolvers — run when a query requests this type's fields
  User: {
    // Called for each user — returns that user's posts
    // WARNING: This causes N+1 queries! See DataLoader section.
    posts: (parent) => Post.find({ author: parent._id }),

    // Computed field — not stored in DB
    displayName: (parent) => parent.name.split(' ')[0],
  },

  Post: {
    // Populate the author when requested
    author: (parent) => User.findById(parent.author),
  },
};`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Put database models, auth user, and DataLoader instances in context — not in global scope. Context is recreated per request, which keeps things isolated and avoids sharing state between users.',
        },
      ],
    },
    {
      id: 'apollo-client',
      title: 'Apollo Client (React)',
      blocks: [
        {
          type: 'text',
          content:
            'Apollo Client is the frontend counterpart to Apollo Server. It manages fetching, caching, and updating GraphQL data in your React app. Think of it as React Query but for GraphQL.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'terminal',
          code: `npm install @apollo/client graphql`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'main.jsx',
          code: `import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link pointing to your GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

// Add auth token to every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? \`Bearer \${token}\` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);`,
        },
      ],
    },
    {
      id: 'queries-mutations-react',
      title: 'useQuery & useMutation',
      blocks: [
        {
          type: 'text',
          content:
            'Apollo Client provides hooks to run queries and mutations in React components. useQuery runs automatically on mount. useMutation returns a function you call manually (e.g., on form submit).',
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'UsersList.jsx',
          code: `import { gql, useQuery, useMutation } from '@apollo/client';

const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`;

const CREATE_USER = gql\`
  mutation CreateUser(\$input: CreateUserInput!) {
    createUser(input: \$input) {
      id
      name
      email
    }
  }
\`;

// Query — runs on mount, re-runs when variables change
function UsersList() {
  const { data, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {data.users.map((user) => (
        <div key={user.id}>{user.name} — {user.email}</div>
      ))}
    </div>
  );
}

// Mutation — call manually on user action
function CreateUserForm() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    // Automatically refetch the users list after mutation
    refetchQueries: [{ query: GET_USERS }],
    // OR update cache directly (faster, no extra request):
    // update(cache, { data: { createUser } }) {
    //   const existing = cache.readQuery({ query: GET_USERS });
    //   cache.writeQuery({
    //     query: GET_USERS,
    //     data: { users: [...existing.users, createUser] },
    //   });
    // },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await createUser({
      variables: {
        input: { name: fd.get('name'), email: fd.get('email') },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}`,
        },
        {
          type: 'tip',
          variant: 'tip',
          content:
            'Apollo Client caches query results by default. If two components request the same data, only one network request is made. The cache is normalized by ID — updating a user in one mutation automatically updates all components showing that user.',
        },
      ],
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      blocks: [
        {
          type: 'text',
          content:
            'GraphQL always returns HTTP 200 — even for errors. Errors are returned in an errors array alongside whatever partial data was returned. This is different from REST where errors use 4xx/5xx status codes.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'errorResponse.json',
          code: `// GraphQL error response structure
{
  "data": {
    "user": null
  },
  "errors": [
    {
      "message": "User not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["user"],
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}`,
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'resolvers.js',
          code: `import { GraphQLError } from 'graphql';

// Standard error codes used by Apollo
const resolvers = {
  Query: {
    user: async (_, { id }, { user }) => {
      // 401 — user is not logged in
      if (!user) throw new GraphQLError('Not authenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      });

      const found = await User.findById(id);

      // 404 — resource doesn't exist
      if (!found) throw new GraphQLError('User not found', {
        extensions: { code: 'NOT_FOUND' },
      });

      // 403 — user exists but doesn't have permission
      if (found.id !== user.id && user.role !== 'ADMIN') {
        throw new GraphQLError('Access denied', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      return found;
    },

    createUser: async (_, { input }) => {
      // 400 — invalid input
      const existing = await User.findOne({ email: input.email });
      if (existing) throw new GraphQLError('Email already in use', {
        extensions: { code: 'BAD_USER_INPUT', field: 'email' },
      });

      return User.create(input);
    },
  },
};`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Component.jsx',
          code: `import { gql, useQuery } from '@apollo/client';

function UserProfile({ id }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
  });

  if (loading) return <Spinner />;

  // Apollo splits errors into graphQLErrors and networkError
  if (error) {
    const isNotFound = error.graphQLErrors.some(
      (e) => e.extensions?.code === 'NOT_FOUND'
    );
    if (isNotFound) return <p>User not found.</p>;
    return <p>Something went wrong: {error.message}</p>;
  }

  return <div>{data.user.name}</div>;
}`,
        },
      ],
    },
    {
      id: 'n-plus-one',
      title: 'N+1 Problem & DataLoader',
      blocks: [
        {
          type: 'text',
          content:
            'The N+1 problem is the most common GraphQL performance pitfall. When a field resolver runs once per item in a list, fetching a list of 50 users + their posts = 1 + 50 = 51 database queries. DataLoader batches these into a single query.',
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'problem.js',
          code: `// THE PROBLEM: This resolver runs once per user in the list
const resolvers = {
  User: {
    posts: (parent) => Post.find({ author: parent._id }),
    // 50 users = 50 individual Post.find() calls!
  },
};

// THE FIX: DataLoader batches all those calls into one
// npm install dataloader`,
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'dataloader.js',
          code: `import DataLoader from 'dataloader';
import Post from './models/Post.js';

// Batch function receives an array of all requested userIds
// and returns results in the same order
const createPostsLoader = () =>
  new DataLoader(async (userIds) => {
    const posts = await Post.find({ author: { $in: userIds } });

    // Group posts by userId and return in same order as userIds
    return userIds.map((id) =>
      posts.filter((p) => p.author.toString() === id.toString())
    );
  });

// Add loaders to context — create a new instance per request!
// server.js
expressMiddleware(server, {
  context: async ({ req }) => ({
    user: req.user,
    loaders: {
      postsByUser: createPostsLoader(),
    },
  }),
});

// Now the resolver uses the loader
const resolvers = {
  User: {
    // DataLoader batches all 50 calls into ONE Post.find()
    posts: (parent, _, { loaders }) =>
      loaders.postsByUser.load(parent._id.toString()),
  },
};
// Result: 50 users = 2 queries (1 for users, 1 for all their posts)`,
        },
        {
          type: 'tip',
          variant: 'warning',
          content:
            'Always create a new DataLoader instance per request (inside context), not once at server start. DataLoader caches within a single request, and you do not want to share that cache across different users\' requests.',
        },
      ],
    },
    {
      id: 'subscriptions',
      title: 'Real-time Subscriptions',
      blocks: [
        {
          type: 'text',
          content:
            'GraphQL Subscriptions let clients listen for real-time events over WebSocket. When a mutation happens (like a new message), all subscribed clients receive an update automatically.',
        },
        {
          type: 'code',
          language: 'bash',
          fileName: 'terminal',
          code: `npm install graphql-ws ws`,
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'server.js',
          code: `import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const typeDefs = \`#graphql
  type Message {
    id: ID!
    text: String!
    sender: String!
  }

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    sendMessage(text: String!, sender: String!): Message!
  }

  type Subscription {
    messageSent: Message!
  }
\`;

const resolvers = {
  Mutation: {
    sendMessage: async (_, { text, sender }) => {
      const message = await Message.create({ text, sender });
      // Publish event — all subscribers will receive this
      pubsub.publish('MESSAGE_SENT', { messageSent: message });
      return message;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_SENT']),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });
await server.start();

// WebSocket server for subscriptions
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
useServer({ schema }, wsServer);`,
        },
        {
          type: 'code',
          language: 'jsx',
          fileName: 'Chat.jsx',
          code: `import { gql, useSubscription } from '@apollo/client';

const MESSAGE_SENT = gql\`
  subscription OnMessageSent {
    messageSent {
      id
      text
      sender
    }
  }
\`;

function ChatFeed() {
  const { data, loading } = useSubscription(MESSAGE_SENT);

  // data updates automatically when new messages arrive
  return <div>{data?.messageSent.text}</div>;
}`,
        },
        {
          type: 'tip',
          variant: 'note',
          content:
            'For production use, replace PubSub (in-memory, single server) with graphql-redis-subscriptions so events work across multiple server instances.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      blocks: [
        {
          type: 'heading',
          content: 'When to Use GraphQL',
        },
        {
          type: 'list',
          items: [
            'Multiple client types (web, mobile, TV) that need different data shapes from the same backend',
            'Complex nested data with many relationships — avoids waterfall REST requests',
            'Rapidly evolving frontend — add new fields to queries without changing backend endpoints',
            'You want a self-documenting, typed API contract enforced at the schema level',
          ],
        },
        {
          type: 'heading',
          content: 'When to Stick with REST',
        },
        {
          type: 'list',
          items: [
            'Simple CRUD app with straightforward data — REST is simpler and well understood',
            'Public API for third-party developers — REST is more universally accessible',
            'File uploads — easier with REST multipart/form-data',
            'Team is small and GraphQL overhead (schema, resolvers, DataLoader) slows you down',
          ],
        },
        {
          type: 'heading',
          content: 'Code Organization Tips',
        },
        {
          type: 'list',
          items: [
            'Split typeDefs and resolvers into feature modules (user, post, comment) and merge them',
            'Use @graphql-codegen to auto-generate TypeScript types from your schema',
            'Never expose internal error details in production — use extensions.code for client handling',
            'Limit query depth and complexity to prevent malicious queries from crashing your server',
            'Use persisted queries in production for better performance and security',
          ],
        },
        {
          type: 'code',
          language: 'js',
          fileName: 'depthLimit.js',
          code: `// Prevent deeply nested queries that are expensive to resolve
import depthLimit from 'graphql-depth-limit';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5)], // max 5 levels of nesting
});

// npm install graphql-depth-limit`,
        },
        {
          type: 'package-list',
          packages: [
            {
              name: '@apollo/server',
              description: 'GraphQL server for Node.js and Express — schema, resolvers, and sandbox UI',
              url: 'https://www.apollographql.com/docs/apollo-server',
            },
            {
              name: '@apollo/client',
              description: 'React GraphQL client with caching, useQuery, useMutation, and DevTools',
              url: 'https://www.apollographql.com/docs/react',
            },
            {
              name: 'dataloader',
              description: 'Batch and cache database calls to solve the N+1 query problem',
              url: 'https://github.com/graphql/dataloader',
            },
            {
              name: '@graphql-codegen/cli',
              description: 'Generate TypeScript types automatically from your GraphQL schema',
              url: 'https://the-guild.dev/graphql/codegen',
            },
            {
              name: 'graphql-depth-limit',
              description: 'Prevent malicious deeply-nested queries from overloading your server',
              url: 'https://github.com/stems/graphql-depth-limit',
            },
            {
              name: 'graphql-subscriptions',
              description: 'PubSub for GraphQL subscriptions — use redis variant in production',
              url: 'https://github.com/apollographql/graphql-subscriptions',
            },
          ],
        },
      ],
    },
  ],
}

export default graphqlData
