
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

A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a [**deep copy**](https://en.wikipedia.org/wiki/Object_copying#Deep_copy) of the list. The deep copy should consist of exactly `n` **brand new** nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. **None of the pointers in the new list should point to nodes in the original list**.

For example, if there are two nodes `X` and `Y` in the original list, where `X.random --> Y`, then for the corresponding two nodes `x` and `y` in the copied list, `x.random --> y`.

Return *the head of the copied linked list*.

The linked list is represented in the input/output as a list of `n` nodes. Each node is represented as a pair of `[val, random_index]` where:

- `val`: an integer representing `Node.val`
- `random_index`: the index of the node (range from `0` to `n-1`) that the `random` pointer points to, or `null` if it does not point to any node.

Your code will **only** be given the `head` of the original linked list.

**Constraints:**
- `0 <= n <= 1000`
- `-10^4 <= Node.val <= 10^4`
- `Node.random` is `null` or is pointing to some node in the linked list.

---

## 2. Examples

```
Example 1:
  Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
  Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

  Original: 7 → 13 → 11 → 10 → 1
  Random:   7.random = NULL
            13.random = 7
            11.random = 1
            10.random = 11
            1.random = 7
```
```
Example 2:
  Input: head = [[1,1],[2,1]]
  Output: [[1,1],[2,1]]
```
```
Example 3:
  Input: head = [[3,null],[3,0],[3,null]]
  Output: [[3,null],[3,0],[3,null]]
```

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
