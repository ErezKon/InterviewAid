
# 146. LRU Cache

**Difficulty:** 🟡 Medium
**Acceptance:** 47.4%
**LeetCode:** [https://leetcode.com/problems/lru-cache](https://leetcode.com/problems/lru-cache)
**Companies:** Adobe, Akuna Capital, Amazon, Amd, Anduril, Appfolio, Apple, Arista Networks, Atlassian, Audible, Aurora, Autodesk, Bitgo, Bloomberg, Bookingcom, Broadcom, Bytedance, Capital One, Chewy, Cisco, Citadel, Citrix, Cloudflare, Confluent, Couchbase, Coupang, De Shaw, Disney, Docusign, Doordash, Ebay, Epam Systems, Equinix, Expedia, Flipkart, Freecharge, Gartner, General Motors, Github, Glovo, Goldman Sachs, Google, Grab, Ibm, Intel, Intuit, Jane Street, Jpmorgan, Kla, Line, Linkedin, Marqeta, Meta, Microsoft, Mobileye, Moloco, Mongodb, Morgan Stanley, Myntra, Navan, Netflix, Netskope, Nokia, Nordstrom, Nutanix, Nvidia, Okta, Optiver, Oracle, Palantir, Palo Alto Networks, Paypal, Phonepe, Qualcomm, Rakuten, Razorpay, Reddit, Ripple, Rippling, Rivian, Roku, Rubrik, Salesforce, Samsung, Sap, Servicenow, Shopee, Shopify, Siemens, Smartnews, Snapchat, Snowflake, Sofi, Spinny, Splunk, Squarepoint Capital, Squarespace, Stackadapt, Swiggy, Tcs, Tencent, Tesla, Thousandeyes, Tiktok, Tripadvisor, Twitch, Twitter, Uber, Ukg, Verily, Verkada, Viasat, Vimeo, Visa, Vmware, Walmart Labs, Wells Fargo, Whatfix, Yahoo, Yandex, Zenefits, Zocdoc, Zoho, Zoom, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Data Structure Design](#4-data-structure-design)
5. [Solution: HashMap + Doubly Linked List — O(1) ✅](#5-solution-hashmap--doubly-linked-list--o1-)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Design a data structure that follows the **Least Recently Used (LRU)** cache eviction policy.

Implement the `LRUCache` class:
- `LRUCache(int capacity)` — Initialize with positive capacity.
- `int get(int key)` — Return the value if key exists, otherwise return -1.
- `void put(int key, int value)` — Update or insert. If at capacity, **evict the least recently used** key first.

Both `get` and `put` must run in **O(1)** average time.

---

## 2. Examples

```
LRUCache cache = new LRUCache(2)

cache.put(1, 1)       // cache: {1=1}
cache.put(2, 2)       // cache: {1=1, 2=2}
cache.get(1)          // returns 1, cache: {2=2, 1=1} — 1 is now most recent
cache.put(3, 3)       // evicts key 2, cache: {1=1, 3=3}
cache.get(2)          // returns -1 (not found)
cache.put(4, 4)       // evicts key 1, cache: {3=3, 4=4}
cache.get(1)          // returns -1 (evicted)
cache.get(3)          // returns 3
cache.get(4)          // returns 4
```

---

## 3. Key Insight

We need two things in O(1):
1. **Lookup by key** → Hash Map
2. **Track recency order + evict LRU** → Doubly Linked List

Neither alone suffices. Together, they give O(1) for all operations.

---

## 4. Data Structure Design

```
  HashMap                    Doubly Linked List
 ┌─────┬─────┐
 │ k1  │  ●──────┐          LRU                          MRU
 ├─────┼─────┤    │
 │ k2  │  ●────┐  │          HEAD ⇄ [k3] ⇄ [k2] ⇄ [k1] ⇄ TAIL
 ├─────┼─────┤  │  │                  ▲       ▲       ▲
 │ k3  │  ●──┐ │  │                  │       │       │
 └─────┴─────┘│ │  │                  │       │       │
               └─│──│──────────────────┘       │       │
                 └──│──────────────────────────┘       │
                    └──────────────────────────────────┘

- HEAD.next = least recently used
- TAIL.prev = most recently used
- HashMap: key → node pointer for O(1) lookup
```

**Sentinel nodes** (HEAD and TAIL) eliminate edge cases when inserting/removing at boundaries.

---

## 5. Solution: HashMap + Doubly Linked List — O(1) ✅

```
CLASS Node:
    key, value
    prev, next

CLASS LRUCache:

    INITIALIZE(capacity):
        this.capacity = capacity
        this.map = {}                    // key → Node

        this.head = new Node(0, 0)       // sentinel
        this.tail = new Node(0, 0)       // sentinel
        this.head.next = this.tail
        this.tail.prev = this.head


    GET(key):
        IF key NOT IN map:
            RETURN -1

        node = map[key]
        removeNode(node)
        addToTail(node)                  // mark as most recently used
        RETURN node.value


    PUT(key, value):
        IF key IN map:
            node = map[key]
            node.value = value
            removeNode(node)
            addToTail(node)

        ELSE:
            IF SIZE(map) == capacity:
                // Evict LRU — the node right after HEAD
                lru = head.next
                removeNode(lru)
                DELETE map[lru.key]

            newNode = new Node(key, value)
            map[key] = newNode
            addToTail(newNode)


    // ---- Internal helpers ----

    FUNCTION removeNode(node):
        node.prev.next = node.next
        node.next.prev = node.prev

    FUNCTION addToTail(node):
        node.prev = tail.prev
        node.next = tail
        tail.prev.next = node
        tail.prev = node
```

---

## 6. Walkthrough

```
LRUCache(2)

put(1,1):  map={1:N1}        DLL: HEAD ⇄ [1] ⇄ TAIL
put(2,2):  map={1:N1, 2:N2}  DLL: HEAD ⇄ [1] ⇄ [2] ⇄ TAIL
get(1):    found → move to tail
           map={1:N1, 2:N2}  DLL: HEAD ⇄ [2] ⇄ [1] ⇄ TAIL
           returns 1
put(3,3):  at capacity → evict LRU (HEAD.next = [2])
           remove [2] from DLL and map
           add [3]
           map={1:N1, 3:N3}  DLL: HEAD ⇄ [1] ⇄ [3] ⇄ TAIL
get(2):    not in map → returns -1
put(4,4):  at capacity → evict LRU (HEAD.next = [1])
           map={3:N3, 4:N4}  DLL: HEAD ⇄ [3] ⇄ [4] ⇄ TAIL
get(1):    not in map → returns -1
get(3):    found → move to tail → returns 3
get(4):    found → already at tail → returns 4
```

---

## 7. Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| **get** | O(1) | — |
| **put** | O(1) | — |
| **Overall space** | — | O(capacity) |

---

## 8. Follow-Up Questions

### 8.1 LFU Cache (LeetCode #460)

Evict the **least frequently used** item. Requires tracking access frequency. Uses:
- `keyMap`: key → node
- `freqMap`: frequency → doubly linked list of nodes
- `minFreq`: current minimum frequency

See the companion file **LRU and LFU cache algorithms.md** for a complete breakdown.

### 8.2 Thread-safe LRU Cache

For concurrent access:
- **Coarse-grained lock:** Single mutex around get/put — simple but limits throughput.
- **Fine-grained locking:** Segment the hash map (like ConcurrentHashMap), separate locks per segment.
- **Read-write lock:** Allow concurrent reads, exclusive writes.

### 8.3 What if you need TTL (time-to-live) expiration?

Add a `timestamp` field to each node. On `get`, check if `now - timestamp > TTL`. If expired, treat as a miss and evict. Optionally, run a background cleanup thread.

### 8.4 Distributed LRU Cache

In distributed systems (e.g., Memcached, Redis):
- **Consistent hashing** to partition keys across nodes.
- Each node runs its own LRU locally.
- Trade-offs: consistency vs. availability (CAP theorem).

---

## Key Takeaway

> LRU Cache is one of the most frequently asked **design** problems. It tests your ability to combine two data structures (hash map + doubly linked list) to achieve O(1) operations. The sentinel node pattern eliminates boundary checks. This design is used in real systems — operating system page caches, database buffer pools, and web browser caches.
