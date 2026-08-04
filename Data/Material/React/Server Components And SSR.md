# 1. Server Components & SSR

## 1.1 Rendering Strategies

```mermaid
flowchart LR
    subgraph "CSR (Client-Side Rendering)"
        A1["Empty HTML"] --> B1["Download JS"] --> C1["Render in browser"]
    end

    subgraph "SSR (Server-Side Rendering)"
        A2["Render HTML on server"] --> B2["Send complete HTML"] --> C2["Hydrate (attach JS)"]
    end

    subgraph "SSG (Static Site Generation)"
        A3["Render at build time"] --> B3["Serve static HTML"] --> C3["Hydrate"]
    end

    subgraph "RSC (React Server Components)"
        A4["Server Components\n(zero JS)"] --> B4["Client Components\n(interactive)"] --> C4["Streamed to client"]
    end

    style A1 fill:#e74c3c,color:#fff
    style A2 fill:#3498db,color:#fff
    style A3 fill:#27ae60,color:#fff
    style A4 fill:#9b59b6,color:#fff
```

## 1.2 React Server Components (RSC)

```mermaid
flowchart TD
    subgraph "Server (Zero JS Bundle)"
        SC1["ServerComponent.jsx\n• Direct DB access\n• File system access\n• API keys safe\n• No useState/useEffect\n• async/await supported"]
    end

    subgraph "Client (Ships JS)"
        CC1["'use client'\nClientComponent.jsx\n• useState, useEffect\n• Event handlers\n• Browser APIs\n• Interactivity"]
    end

    SC1 -->|"Renders to\nRSC Payload"| WIRE["Wire Format\n(Not HTML, serializable tree)"]
    WIRE --> CC1
    CC1 -->|"Hydrated in browser"| DOM["Interactive DOM"]

    style SC1 fill:#27ae60,color:#fff
    style CC1 fill:#3498db,color:#fff
    style WIRE fill:#e67e22,color:#fff
```

```jsx
// Server Component (default in Next.js App Router)
// No 'use client' directive needed
async function UserProfile({ userId }) {
  // Direct database access — no API route needed
  const user = await db.user.findUnique({ where: { id: userId } });
  const posts = await db.post.findMany({ where: { authorId: userId } });

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      {/* Client component for interactivity */}
      <LikeButton initialCount={user.likes} userId={userId} />
      {/* Server-rendered list */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

// Client Component
'use client';

import { useState } from 'react';

function LikeButton({ initialCount, userId }) {
  const [count, setCount] = useState(initialCount);
  const [isPending, setIsPending] = useState(false);

  async function handleLike() {
    setIsPending(true);
    setCount(c => c + 1); // Optimistic
    await fetch(`/api/users/${userId}/like`, { method: 'POST' });
    setIsPending(false);
  }

  return (
    <button onClick={handleLike} disabled={isPending}>
      ❤️ {count}
    </button>
  );
}
```

### RSC Rules

```mermaid
flowchart TD
    A{"Component Type"} -->|Server| B["✅ async/await\n✅ DB/filesystem\n✅ Import Server Components\n✅ Import Client Components\n❌ useState/useEffect\n❌ onClick handlers\n❌ Browser APIs"]
    A -->|Client| C["❌ async component\n❌ Direct DB access\n✅ Import Client Components\n✅ useState/useEffect\n✅ onClick handlers\n✅ Browser APIs"]

    D["Key Rule: Server Components\ncan import Client Components\nbut NOT vice versa"]
    E["Exception: Client Components\ncan RENDER Server Components\nvia children prop"]

    style B fill:#27ae60,color:#fff
    style C fill:#3498db,color:#fff
    style D fill:#e67e22,color:#fff
    style E fill:#9b59b6,color:#fff
```

---
