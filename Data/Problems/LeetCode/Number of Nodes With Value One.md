# 2445. Number of Nodes With Value One

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-nodes-with-value-one](https://leetcode.com/problems/number-of-nodes-with-value-one)
**Companies:** Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Simulation — O(n + q)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a perfect binary tree with `n` nodes (nodes are numbered from `1` to `n`), you are given a list of query nodes. Each query flips the value of the queried node and **all** of its descendants (0 becomes 1, 1 becomes 0). Initially every node has value `0`. After processing all queries, return the number of nodes whose final value is `1`.

---

## 2. Key Insight

> A node’s final value depends only on the **parity** of the number of flips it receives, either directly or from an ancestor. By propagating the flip count from the root downwards, we can compute each node’s parity in a single pass.

---

## 3. Approach: Simulation — O(n + q) ✅

```text
FUNCTION numberOfNodes(n, queries):
    // flips[i] stores how many times node i is directly flipped
    flips ← ARRAY of size n+1 FILLED WITH 0
    FOR q IN queries:
        flips[q] ← flips[q] + 1

    count ← 0
    FOR node ← 1 TO n:
        IF node > 1:
            // inherit flips from parent (parent = node // 2)
            flips[node] ← flips[node] + flips[node // 2]
        IF flips[node] MOD 2 = 1:
            count ← count + 1
    RETURN count
```

---

## 4. Examples

1. **Input:** `n = 7`, `queries = [3, 5]`
   **Output:** `4`
   **Explanation:**
   - Flip node 3 flips nodes 3, 6, 7.
   - Flip node 5 flips node 5.
   - Nodes 3, 5, 6, 7 end up with value 1.
2. **Input:** `n = 3`, `queries = [1, 2, 2]`
   **Output:** `1`
   **Explanation:**
   - First flip of node 1 flips all nodes (1‑3).
   - Two flips of node 2 cancel each other, leaving node 2 at value 0.
   - Only node 1 remains with value 1.

---

## 5. Walkthrough

Take the first example (`n = 7`, `queries = [3, 5]`).
| Node | Direct flips | Inherited flips (parent) | Total flips | Final value |
|------|--------------|--------------------------|-------------|-------------|
| 1    | 0            | –                        | 0           | 0 |
| 2    | 0            | 0 (parent 1)             | 0           | 0 |
| 3    | 1            | 0 (parent 1)             | 1           | 1 |
| 4    | 0            | 0 (parent 2)             | 0           | 0 |
| 5    | 1            | 0 (parent 2)             | 1           | 1 |
| 6    | 0            | 1 (parent 3)             | 1           | 1 |
| 7    | 0            | 1 (parent 3)             | 1           | 1 |
The count of nodes with value 1 is `4`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + q) — one pass to apply queries, one pass to propagate flips |
| **Space** | O(n) — array storing flip counts |

---

## 7. Follow-Up Questions

- How would the solution change if the tree were **not** perfect and children were given explicitly?
- Can the algorithm be extended to support **range** flip queries efficiently?
- What if each node initially held an arbitrary binary value instead of `0`?

---

## 8. Key Takeaway

> **Propagate flip counts from parent to child.** By accumulating the number of flips along the path from the root, the parity of each node is known in linear time, avoiding repeated subtree traversals.
