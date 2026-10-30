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
- `LFUCache(int capacity)` Initializes the object with the `capacity` of the data structure.
- `int get(int key)` Gets the value of the `key` if the `key` exists in the cache. Otherwise, returns `-1`.
- `void put(int key, int value)` Update the value of the `key` if present, or inserts the `key` if not already present. When the cache reaches its `capacity`, it should invalidate and remove the **least frequently used** key before inserting a new item. For this problem, when there is a **tie** (i.e., two or more keys with the same frequency), the **least recently used** `key` would be invalidated.

To determine the least frequently used key, a **use counter** is maintained for each key in the cache. The key with the smallest **use counter** is the least frequently used key.

When a key is first inserted into the cache, its **use counter** is set to `1` (due to the `put` operation). The **use counter** for a key in the cache is incremented either a `get` or `put` operation is called on it.

The functions `get` and `put` must each run in `O(1)` average time complexity.

**Constraints:**
- `1 <= capacity <= 10^4`
- `0 <= key <= 10^5`
- `0 <= value <= 10^9`
- At most `2 * 10^5` calls will be made to `get` and `put`.

---

## 2. Examples

```
Example 1:
  Input:
    ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
  Output: [null, null, null, 1, null, -1, 3, null, -1, 3, 4]
  Explanation:
    // cnt(x) = the use counter for key x
    // cache=[] will show the last used order for tiebreakers (leftmost element is most recent)
    LFUCache lfu = new LFUCache(2);
    lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
    lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
    lfu.get(1);      // return 1
                     // cache=[1,2], cnt(2)=1, cnt(1)=2
    lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                     // cache=[3,1], cnt(3)=1, cnt(1)=2
    lfu.get(2);      // return -1 (not found)
    lfu.get(3);      // return 3
                     // cache=[3,1], cnt(3)=2, cnt(1)=2
    lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                     // cache=[4,3], cnt(4)=1, cnt(3)=2
    lfu.get(1);      // return -1 (not found)
    lfu.get(3);      // return 3
                     // cache=[3,4], cnt(4)=1, cnt(3)=3
    lfu.get(4);      // return 4
                     // cache=[4,3], cnt(4)=2, cnt(3)=3
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
