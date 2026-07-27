
# Cache Eviction Algorithms: LRU & LFU

---

## Table of Contents

1. [LRU — Least Recently Used](#lru--least-recently-used)
2. [LFU — Least Frequently Used](#lfu--least-frequently-used)
3. [LRU vs LFU Comparison](#lru-vs-lfu-comparison)
4. [Related Algorithms](#related-algorithms)

---

## LRU — Least Recently Used

### Overview

The **Least Recently Used (LRU)** cache algorithm evicts the item that has **not been accessed for the longest period of time** when the cache reaches capacity.

Based on the principle of **temporal locality** — if data was recently used, it's likely to be used again soon.

### How It Works

1. **Cache Hit:** Item is moved to the **most recently used** position.
2. **Cache Miss (cache not full):** New item is added to the most recently used position.
3. **Cache Miss (cache full):** The **least recently used** item is **evicted**, and the new item is inserted.

### Example

Cache with **capacity = 3**:

```
Access: A → Cache: [A]
Access: B → Cache: [A, B]
Access: C → Cache: [A, B, C]       (cache is now full)
Access: A → Cache: [B, C, A]       (A moved to most recent)
Access: D → Cache: [C, A, D]       (B evicted — least recently used)
Access: C → Cache: [A, D, C]       (C moved to most recent)
Access: E → Cache: [D, C, E]       (A evicted — least recently used)
```

### Data Structure

Uses **two components**:

| Component            | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| **Doubly Linked List** | Maintains access order (head = LRU, tail = MRU)        |
| **Hash Map**           | key → pointer to node in DLL for O(1) lookup           |

```
  HashMap                    Doubly Linked List
 ┌─────┬─────┐
 │  A  │  ●──────────┐      LRU                              MRU
 ├─────┼─────┤        │
 │  B  │  ●───────┐   │      HEAD ⇄ [C] ⇄ [B] ⇄ [A] ⇄ TAIL
 ├─────┼─────┤    │   │               ▲      ▲      ▲
 │  C  │  ●────┐  │   │               │      │      │
 └─────┴─────┘ │  │   │               │      │      │
                └──│───│───────────────┘      │      │
                   └───│──────────────────────┘      │
                       └─────────────────────────────┘
```

### Operations Complexity

| Operation    | Time Complexity |
| ------------ | --------------- |
| **Get**      | O(1)            |
| **Put**      | O(1)            |
| **Eviction** | O(1)            |

### Pseudocode

```
class LRUCache:
    initialize(capacity):
        maxCapacity = capacity
        hashMap = {}
        doublyLinkedList = new DoublyLinkedList()

    get(key):
        if key in hashMap:
            node = hashMap[key]
            move node to tail (most recent)
            return node.value
        else:
            return -1

    put(key, value):
        if key in hashMap:
            update node value
            move node to tail
        else:
            if size == maxCapacity:
                evict head node (least recent)
                remove from hashMap
            create new node
            add to tail
            add to hashMap
```

### Advantages

- Simple and intuitive concept
- O(1) time for all operations
- Good performance for workloads with temporal locality
- Widely used in practice

### Disadvantages

- Extra memory overhead (linked list pointers + hash map)
- Not optimal for all access patterns (e.g., sequential scans flush the cache)
- Doesn't consider **frequency** of access

### Real-World Applications

- **Operating Systems** — Page replacement in virtual memory
- **Databases** — Buffer pool management
- **Web Browsers** — Caching web pages and resources
- **CDNs** — Content delivery networks
- **CPU Architecture** — Hardware cache management
- **Software Libraries** — `functools.lru_cache` in Python, `LinkedHashMap` in Java

---

## LFU — Least Frequently Used

### Overview

The **Least Frequently Used (LFU)** cache algorithm evicts the item that has been **accessed the fewest number of times** when the cache reaches capacity.

Based on the principle of **frequency locality** — items accessed more often are more likely to be needed again.

> **Tie-breaking rule:** When multiple items share the same lowest frequency, the **least recently used** among them is evicted.

### How It Works

1. **Cache Hit:** The item's **frequency counter is incremented** and recency is updated.
2. **Cache Miss (cache not full):** New item is added with **frequency = 1**.
3. **Cache Miss (cache full):** The item with the **lowest frequency** is evicted (LRU among ties). New item is inserted with frequency = 1.

### Example

Cache with **capacity = 3**:

```
Access: A → Cache: {A(1)}
Access: B → Cache: {A(1), B(1)}
Access: A → Cache: {A(2), B(1)}                  (A freq incremented)
Access: C → Cache: {A(2), B(1), C(1)}             (cache full)
Access: A → Cache: {A(3), B(1), C(1)}             (A freq incremented)
Access: D → Cache: {A(3), C(1), D(1)}             (B evicted — freq 1, older than C)
Access: C → Cache: {A(3), C(2), D(1)}             (C freq incremented)
Access: E → Cache: {A(3), C(2), E(1)}             (D evicted — lowest freq = 1)
```

### Data Structure

Uses **three components**:

| Component                                  | Purpose                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| **keyMap** (key → node pointer)            | O(1) direct access to the node so you can unlink it from its DLL            |
| **freqMap** (freq → Doubly Linked List)    | Groups nodes by frequency; each DLL maintains LRU order within that group   |
| **minFreq** (integer)                      | Tracks the current minimum frequency for O(1) eviction                      |

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                                                                 │
 │  1.  minFreq = 1                                                │
 │                                                                 │
 │  2.  freqMap:  freq → Doubly Linked List                        │
 │      ┌───────┬──────────────────────────────┐                   │
 │      │   1   │  DLL: HEAD ⇄ [D] ⇄ TAIL     │                   │
 │      │   2   │  DLL: HEAD ⇄ [B] ⇄ [C] ⇄ TAIL                  │
 │      │   3   │  DLL: HEAD ⇄ [A] ⇄ TAIL     │                   │
 │      └───────┴──────────────────────────────┘                   │
 │                                                                 │
 │  3.  keyMap:  key → pointer to the ACTUAL NODE in the DLL       │
 │      ┌─────┬────────────────────┐                               │
 │      │  A  │  ● ──── points to [A] node in freqMap[3]          │
 │      │  B  │  ● ──── points to [B] node in freqMap[2]          │
 │      │  C  │  ● ──── points to [C] node in freqMap[2]          │
 │      │  D  │  ● ──── points to [D] node in freqMap[1]          │
 │      └─────┴────────────────────┘                               │
 │                                                                 │
 └─────────────────────────────────────────────────────────────────┘
```

### Node Structure

```
  ┌────────────────┐
  │  key:    A     │
  │  value:  valA  │
  │  freq:   3     │
  │  prev:   ● ───── → previous node in DLL
  │  next:   ● ───── → next node in DLL
  └────────────────┘
```

> **Key Insight:** The `keyMap` stores a direct pointer to the node object itself. Since the node has `prev`/`next` pointers, you can unlink it from its DLL in O(1) **without searching**. This is why no per-bucket hashmap is needed.

### Operations Complexity

| Operation    | Time Complexity |
| ------------ | --------------- |
| **Get**      | O(1)            |
| **Put**      | O(1)            |
| **Eviction** | O(1)            |

### Pseudocode

```
class LFUCache:
    initialize(capacity):
        maxCapacity = capacity
        minFreq = 0
        keyMap = {}
        freqMap = {}

    get(key):
        if key not in keyMap:
            return -1
        node = keyMap[key]
        updateFrequency(node)
        return node.value

    put(key, value):
        if maxCapacity == 0:
            return
        if key in keyMap:
            node = keyMap[key]
            node.value = value
            updateFrequency(node)
        else:
            if size == maxCapacity:
                evictList = freqMap[minFreq]
                evictNode = evictList.removeHead()
                delete keyMap[evictNode.key]
            newNode = Node(key, value, freq=1)
            keyMap[key] = newNode
            if 1 not in freqMap:
                freqMap[1] = new DoublyLinkedList()
            freqMap[1].addToTail(newNode)
            minFreq = 1

    updateFrequency(node):
        oldFreq = node.freq
        newFreq = oldFreq + 1
        node.freq = newFreq
        freqMap[oldFreq].remove(node)
        if freqMap[oldFreq] is empty:
            delete freqMap[oldFreq]
            if minFreq == oldFreq:
                minFreq = newFreq
        if newFreq not in freqMap:
            freqMap[newFreq] = new DoublyLinkedList()
        freqMap[newFreq].addToTail(node)
```

### Advantages

- Considers **frequency of access**, not just recency
- Excellent for workloads with **stable popular items**
- O(1) operations achievable with proper implementation

### Disadvantages

- **Cache pollution** — Old high-frequency items can get stuck in cache
- **Cold start problem** — New items enter with freq = 1, vulnerable to immediate eviction
- More complex to implement than LRU
- Higher memory overhead
- Slow to adapt to changing access patterns

### Real-World Applications

- **CDNs** — Caching popular content
- **Database Systems** — Buffer pool management
- **DNS Caching** — Frequently resolved domain names
- **Redis** — Offers LFU eviction policies (`volatile-lfu`, `allkeys-lfu`)

### Variants & Improvements

| Variant          | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| **LFU with Aging** | Periodically halves all frequencies to prevent stale entries                                    |
| **Window-LFU**     | Only counts accesses within a sliding time window                                              |
| **TinyLFU**        | Space-efficient frequency estimation using Count-Min Sketch; used in **Caffeine** (Java)       |
| **W-TinyLFU**      | Combines a small LRU admission window with TinyLFU — considered state-of-the-art               |

---

## LRU vs LFU Comparison

| Aspect               | LRU                          | LFU                                   |
| ----------------------| ---------------------------- | ------------------------------------- |
| **Eviction Criteria** | Least recently accessed      | Least frequently accessed             |
| **Tracks**            | Recency                      | Frequency (+ recency for ties)        |
| **Best For**          | Temporal locality             | Stable popularity patterns            |
| **Weakness**          | Sequential scans flush cache  | Stale high-frequency items            |
| **Data Structures**   | 1 HashMap + 1 DLL            | 2 HashMaps + multiple DLLs + minFreq  |
| **Implementation**    | Simpler                      | More complex                          |
| **Adaptability**      | Adapts quickly to changes    | Slow to adapt                         |
| **Memory Overhead**   | Moderate                     | Higher                                |

---

## Related Algorithms

| Algorithm | Eviction Policy                                |
| --------- | ---------------------------------------------- |
| **FIFO**  | Evicts the oldest inserted item                |
| **LRU**   | Evicts the least recently accessed item        |
| **MRU**   | Evicts the most recently used item             |
| **LFU**   | Evicts the least frequently accessed item      |
| **ARC**   | Adaptive combination of LRU and LFU            |
| **CLOCK** | Approximation of LRU using a circular buffer   |
