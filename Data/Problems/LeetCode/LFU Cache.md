# 460. LFU Cache

**Difficulty:** 🔴 Hard
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/lfu-cache](https://leetcode.com/problems/lfu-cache)
**Companies:** Amazon, Apple, Bloomberg, Citadel, Coupang, Devrev, Doordash, Expedia, Goldman Sachs, Google, Kla, Kla Tencor, Linkedin, Meta, Microsoft, Netflix, Netskope, Nutanix, Olx, Oracle, Paypal, Rippling, Salesforce, Servicenow, Snapchat, Tiktok, Uber, Verkada, Visa, Walmart Labs, Wells Fargo, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: HashMap + Frequency Buckets with DLL — O(1) ✅](#3-approach-hashmap--frequency-buckets-with-dll--o1-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Design and implement a data structure for a **Least Frequently Used (LFU)** cache.

Implement the `LFUCache` class:
- `LFUCache(int capacity)` — Initializes with capacity.
- `int get(int key)` — Gets the value (or -1 if not found). Increases the frequency of the key.
- `void put(int key, int value)` — Inserts or updates. When capacity is reached, invalidate the **least frequently used** key. If there's a tie, invalidate the **least recently used** among them.

Both `get` and `put` must run in **O(1)** average time.

---

## 2. Examples

```
Input:
  ["LFUCache","put","put","get","put","get","get","put","get","get","get"]
  [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]

Output: [null,null,null,1,null,-1,3,null,-1,3,4]

Explanation:
  put(1,1), put(2,2)        → cache: {1:1 freq=1, 2:2 freq=1}
  get(1)                     → returns 1, freq of 1 becomes 2
  put(3,3)                   → evicts key 2 (LFU, freq=1), cache: {1:1, 3:3}
  get(2)                     → returns -1 (evicted)
  get(3)                     → returns 3, freq of 3 becomes 2
  put(4,4)                   → evicts key 1 (freq=2 but oldest), wait...
                                Actually key 1 freq=2, key 3 freq=2 → evict LRU among freq=2 → evict 1
                                cache: {3:3, 4:4}
```

---

## 3. Approach: HashMap + Frequency Buckets with DLL — O(1) ✅

### Data Structures

1. **keyMap**: `key → Node(key, value, freq)`
2. **freqMap**: `frequency → DoublyLinkedList of Nodes` (ordered by recency, tail = most recent)
3. **minFreq**: tracks the current minimum frequency

### Operations

```
CLASS LFUCache:
    CONSTRUCTOR(capacity):
        cap = capacity
        keyMap = {}           // key → Node
        freqMap = {}          // freq → DLL
        minFreq = 0

    FUNCTION get(key):
        IF key NOT IN keyMap:
            RETURN -1
        node = keyMap[key]
        updateFreq(node)
        RETURN node.value

    FUNCTION put(key, value):
        IF cap == 0: RETURN

        IF key IN keyMap:
            node = keyMap[key]
            node.value = value
            updateFreq(node)
            RETURN

        IF len(keyMap) >= cap:
            // Evict LFU (and LRU among ties)
            evictNode = freqMap[minFreq].REMOVE_HEAD()  // head = least recent
            DELETE keyMap[evictNode.key]

        newNode = Node(key, value, freq=1)
        keyMap[key] = newNode
        freqMap[1].ADD_TAIL(newNode)
        minFreq = 1

    FUNCTION updateFreq(node):
        freq = node.freq
        freqMap[freq].REMOVE(node)

        // If this was the only node at minFreq, increment minFreq
        IF freq == minFreq AND freqMap[freq] is empty:
            minFreq += 1

        node.freq += 1
        freqMap[node.freq].ADD_TAIL(node)
```

### Why It Works

- **freqMap** groups nodes by frequency. Within each group, the DLL maintains recency order.
- **minFreq** lets us find the eviction candidate in O(1).
- On access, a node moves from `freqMap[f]` to `freqMap[f+1]`. If `freqMap[f]` becomes empty and `f == minFreq`, increment `minFreq`.

---

## 4. Walkthrough

```
capacity = 2

put(1,1): keyMap={1: Node(1,1,f=1)}, freqMap={1:[1]}, minFreq=1
put(2,2): keyMap={1,2}, freqMap={1:[1,2]}, minFreq=1
get(1):   move 1 from freq 1 to freq 2
          freqMap={1:[2], 2:[1]}, minFreq=1
put(3,3): evict LFU → minFreq=1, head of freqMap[1] = key 2 → evict 2
          put 3 at freq 1
          freqMap={1:[3], 2:[1]}, minFreq=1
get(2):   not found → -1
get(3):   move 3 from freq 1 to freq 2
          freqMap={2:[1,3]}, minFreq=2
```

---

## 5. Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| get | O(1) | O(capacity) |
| put | O(1) | O(capacity) |

---

## 6. Follow-Up Questions

### 6.1 LRU Cache (LeetCode #146)?

Simpler version: evict least recently used (no frequency tracking). HashMap + single DLL.

### 6.2 How does LFU compare to LRU in practice?

LFU is better for workloads with stable "hot" items. LRU is better for temporal locality (recent access predicts future access). LFU can suffer from "frequency pollution" — once-popular items that stay cached forever.

### 6.3 What about LFU with aging/decay?

Periodically halve all frequencies to prevent stale high-frequency items from dominating. This is the **Window-LFU** or **aging LFU** variant.

### 6.4 Thread-safe LFU?

Use a read-write lock or concurrent data structures. Segment the cache (like ConcurrentHashMap) to reduce contention.

---

## Key Takeaway

> LFU Cache requires **three data structures** working together: a key map for O(1) lookup, frequency-indexed doubly linked lists for O(1) eviction and reordering, and a minFreq tracker. The critical operation is `updateFreq` — remove from old frequency list, add to new, and conditionally update `minFreq`.
