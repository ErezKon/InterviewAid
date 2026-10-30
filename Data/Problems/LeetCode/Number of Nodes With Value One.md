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

> *Note: premium problem — statement verified via doocs/leetcode.*

There is an **undirected** connected tree with `n` nodes labeled from `1` to `n` and `n - 1` edges. You are given the integer `n`. The parent node of a node with a label `v` is the node with the label `floor (v / 2)`. The root of the tree is the node with the label `1`.

- For example, if `n = 7`, then the node with the label `3` has the node with the label `floor(3 / 2) = 1` as its parent, and the node with the label `7` has the node with the label `floor(7 / 2) = 3` as its parent.

You are also given an integer array `queries`. Initially, every node has a value `0` on it. For each query `queries[i]`, you should flip all values in the subtree of the node with the label `queries[i]`.

Return *the total number of nodes with the value *`1`* **after processing all the queries***.

**Note** that:

- Flipping the value of a node means that the node with the value `0` becomes `1` and vice versa.
- `floor(x)` is equivalent to rounding `x` down to the nearest integer.

**Constraints:**
- `1 <= n <= 10^5`
- `1 <= queries.length <= 10^5`
- `1 <= queries[i] <= n`

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

**Example 1:**
```
Input: n = 5 , queries = [1,2,5]
Output: 3
Explanation: The diagram above shows the tree structure and its status after performing the queries. The blue node represents the value 0, and the red node represents the value 1.
After processing the queries, there are three red nodes (nodes with value 1): 1, 3, and 5.
```

**Example 2:**
```
Input: n = 3, queries = [2,3,3]
Output: 1
Explanation: The diagram above shows the tree structure and its status after performing the queries. The blue node represents the value 0, and the red node represents the value 1.
After processing the queries, there are one red node (node with value 1): 2.
```

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
