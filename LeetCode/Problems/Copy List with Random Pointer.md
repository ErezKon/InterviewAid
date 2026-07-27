
# 138. Copy List with Random Pointer

**Difficulty:** 🟡 Medium
**Acceptance:** 62.9%
**LeetCode:** [https://leetcode.com/problems/copy-list-with-random-pointer](https://leetcode.com/problems/copy-list-with-random-pointer)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Cadence, Cvent, Docusign, Google, Intel, Meta, Microsoft, Mobileye, Morgan Stanley, Nvidia, Oracle, Oyo, Snowflake, Tiktok, Uber, Walmart Labs, Wix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Hash Map — O(n) / O(n)](#3-approach-1-hash-map--on--on)
4. [Approach 2: Interleaving Nodes — O(n) / O(1) ✅](#4-approach-2-interleaving-nodes--on--o1-)
5. [Walkthrough (Interleaving)](#5-walkthrough-interleaving)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

A linked list has nodes with a `next` pointer and a `random` pointer (which can point to any node in the list or `NULL`). Construct a **deep copy** of the list.

---

## 2. Examples

```
Original: 7 → 13 → 11 → 10 → 1
Random:   7.random = NULL
          13.random = 7
          11.random = 1
          10.random = 11
          1.random = 7
```

The deep copy must be entirely new nodes with the same structure.

---

## 3. Approach 1: Hash Map — O(n) / O(n)

Map each original node to its clone. Then wire up `next` and `random` pointers.

```
FUNCTION copyRandomList(head):
    IF head IS NULL: RETURN NULL

    map = {}                           // original → clone

    // Pass 1: Create clones
    node = head
    WHILE node IS NOT NULL:
        map[node] = new Node(node.val)
        node = node.next

    // Pass 2: Wire pointers
    node = head
    WHILE node IS NOT NULL:
        map[node].next   = map.GET(node.next, NULL)
        map[node].random = map.GET(node.random, NULL)
        node = node.next

    RETURN map[head]
```

---

## 4. Approach 2: Interleaving Nodes — O(n) / O(1) ✅

No extra space (besides the new nodes themselves). Three passes:

**Pass 1:** Insert clones right after their originals.
```
A → A' → B → B' → C → C'
```

**Pass 2:** Set random pointers using the interleaving.
```
clone.random = original.random.next
```

**Pass 3:** Separate the two lists.

```
FUNCTION copyRandomList(head):
    IF head IS NULL: RETURN NULL

    // Pass 1: Interleave clones
    node = head
    WHILE node IS NOT NULL:
        clone = new Node(node.val)
        clone.next = node.next
        node.next = clone
        node = clone.next

    // Pass 2: Set random pointers
    node = head
    WHILE node IS NOT NULL:
        clone = node.next
        IF node.random IS NOT NULL:
            clone.random = node.random.next      // original's random's clone
        node = clone.next

    // Pass 3: Separate lists
    node = head
    cloneHead = head.next
    WHILE node IS NOT NULL:
        clone = node.next
        node.next = clone.next
        clone.next = clone.next.next IF clone.next IS NOT NULL ELSE NULL
        node = node.next

    RETURN cloneHead
```

---

## 5. Walkthrough (Interleaving)

```
Original: 1 → 2 → 3
Random:   1.random = 3, 2.random = 1, 3.random = 2

Pass 1 (interleave):
  1 → 1' → 2 → 2' → 3 → 3'

Pass 2 (random pointers):
  1'.random = 1.random.next = 3.next = 3'  ✓
  2'.random = 2.random.next = 1.next = 1'  ✓
  3'.random = 3.random.next = 2.next = 2'  ✓

Pass 3 (separate):
  Original: 1 → 2 → 3
  Clone:    1' → 2' → 3'
  with 1'.random = 3', 2'.random = 1', 3'.random = 2'  ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash Map | O(n) | O(n) |
| **Interleaving** | **O(n)** | **O(1)** (no extra data structures) |

---

## 7. Follow-Up Questions

### 7.1 Clone Graph (LeetCode #133)

Clone an undirected graph. Use BFS/DFS with a hash map from original to clone:

```
FUNCTION cloneGraph(node):
    IF node IS NULL: RETURN NULL
    map = {node: new Node(node.val)}
    queue = [node]

    WHILE queue IS NOT EMPTY:
        curr = queue.DEQUEUE()
        FOR each neighbor IN curr.neighbors:
            IF neighbor NOT IN map:
                map[neighbor] = new Node(neighbor.val)
                queue.ENQUEUE(neighbor)
            map[curr].neighbors.ADD(map[neighbor])

    RETURN map[node]
```

### 7.2 What if the list is circular?

The hash map approach handles circular structures naturally — the map prevents infinite loops. The interleaving approach also works since we iterate by following `next` pointers a finite number of times.

### 7.3 Deep copy of a binary tree with random pointer

Same hash map strategy: first clone all nodes, then wire up `left`, `right`, and `random`.

---

## Key Takeaway

> This problem tests your understanding of **deep copying complex data structures**. The hash map approach is straightforward — map old to new, then rewire. The interleaving approach is clever space optimization that exploits the list structure to locate clones without a map. Both are O(n) time; choose based on whether O(1) space matters.
