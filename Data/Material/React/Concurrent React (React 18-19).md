# 1. Concurrent React (React 18/19)

## 1.1 Concurrent Features Overview

```mermaid
flowchart TD
    A["Concurrent React"] --> B["Automatic Batching"]
    A --> C["Transitions"]
    A --> D["Suspense Improvements"]
    A --> E["Streaming SSR"]

    B --> B1["All updates batched\n(not just event handlers)"]
    C --> C1["useTransition\nstartTransition"]
    C --> C2["useDeferredValue"]
    D --> D1["Suspense for data fetching"]
    D --> D2["Nested Suspense boundaries"]
    E --> E1["renderToPipeableStream"]
    E --> E2["Selective hydration"]

    style A fill:#e74c3c,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#9b59b6,color:#fff
    style D fill:#e67e22,color:#fff
    style E fill:#27ae60,color:#fff
```

## 1.2 useTransition

Marks a state update as **non-urgent** — React can interrupt it to handle more urgent updates (typing, clicking).

```jsx
function SearchableList({ items }) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;

    // Urgent: update the input immediately
    setQuery(value);

    // Non-urgent: filter the list (can be interrupted)
    startTransition(() => {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending && <Spinner />}
      <ItemList items={filteredItems} />
    </>
  );
}
```

## 1.3 useDeferredValue

```jsx
function SearchResults({ query }) {
  // query updates urgently, but deferredQuery lags behind
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const results = useMemo(
    () => heavySearch(deferredQuery),
    [deferredQuery]
  );

  return (
    <div style={{ opacity: isStale ? 0.6 : 1 }}>
      <ResultsList results={results} />
    </div>
  );
}
```

## 1.4 Suspense

```jsx
import { Suspense, lazy } from 'react';

// Code splitting
const LazyDashboard = lazy(() => import('./Dashboard'));

// Data fetching (with compatible library like TanStack Query)
function App() {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <Layout>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<ContentSkeleton />}>
          <LazyDashboard />
        </Suspense>
      </Layout>
    </Suspense>
  );
}
```

### Suspense Cascading vs. Parallel

```mermaid
flowchart TD
    subgraph "❌ Waterfall (Nested Suspense in sequence)"
        A1["Suspense"] --> B1["Component A loads"]
        B1 --> C1["Suspense inside A"]
        C1 --> D1["Component B loads"]
    end

    subgraph "✅ Parallel (Sibling Suspense)"
        A2["Parent"]
        A2 --> B2["Suspense → Component A"]
        A2 --> C2["Suspense → Component B"]
        B2 -.->|"Loads in parallel"| C2
    end

    style A1 fill:#e74c3c,color:#fff
    style A2 fill:#27ae60,color:#fff
```

---
