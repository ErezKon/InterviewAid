# 3575. Maximum Good Subtree Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-good-subtree-score](https://leetcode.com/problems/maximum-good-subtree-score)
**Companies:** Infosys

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DFS + Bitmask DP — O(n · 2¹⁰)](#approach-dfs--bitmask-dp--on--2¹⁰-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)
- [Examples](#examples)
- [Walkthrough](#walkthrough)

---

## Problem Description

You are given an undirected tree rooted at node 0 with `n` nodes numbered from 0 to `n - 1`. Each node `i` has an integer value `vals[i]`, and its parent is given by `par[i]`.

A **subset** of nodes within the **subtree** of a node is called **good** if every digit from 0 to 9 appears **at most** once in the decimal representation of the values of the selected nodes.

The **score** of a good subset is the sum of the values of its nodes.

Define an array `maxScore` of length `n`, where `maxScore[u]` represents the **maximum** possible sum of values of a good subset of nodes that belong to the subtree rooted at node `u`, including `u` itself and all its descendants.

Return the sum of all values in `maxScore`.

Since the answer may be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n == vals.length <= 500`
- `1 <= vals[i] <= 10^9`
- `par.length == n`
- `par[0] == -1`
- `0 <= par[i] < n` for `i` in `[1, n - 1]`
- The input is generated such that the parent array `par` represents a valid tree.

---

## Key Insight

> Each node value can be represented as a 10‑bit mask indicating which digits (0‑9) appear. The problem reduces to a tree DP where `dp[mask]` stores the best score achievable using exactly the digit set `mask`. When merging a child’s DP, only combine masks that do not overlap (bitwise AND is zero).

---

## Approach: DFS + Bitmask DP — O(n · 2¹⁰) ✅

```text
FUNCTION maxGoodSubtreeScore(values, edges):
    // Build adjacency list
    SET tree ← BUILD_TREE(edges)
    SET MOD ← 1_000_000_007   // if needed for large sums

    FUNCTION dfs(node, parent):
        // Digit mask of current node’s value
        SET digitMask ← DIGIT_BITMASK(values[node])
        SET dp ← ARRAY_OF(-INFINITY, SIZE = 1 << 10)
        dp[0] ← 0
        dp[digitMask] ← values[node]

        FOR child IN tree[node]:
            IF child = parent: CONTINUE
            SET childDp ← dfs(child, node)
            // Merge child DP into current DP
            SET newDp ← COPY(dp)
            FOR m1 FROM 0 TO (1 << 10) - 1:
                IF dp[m1] = -INFINITY: CONTINUE
                FOR m2 FROM 0 TO (1 << 10) - 1:
                    IF childDp[m2] = -INFINITY: CONTINUE
                    IF (m1 & m2) = 0:
                        SET combinedMask ← m1 | m2
                        SET newScore ← dp[m1] + childDp[m2]
                        newDp[combinedMask] ← MAX(newDp[combinedMask], newScore)
            dp ← newDp
        RETURN dp

    SET rootDp ← dfs(0, -1)
    RETURN MAX(rootDp)
```

---

## Examples

**Example 1:**
```
Input: vals = [2,3], par = [-1,0]
Output: 8
Explanation: - The subtree rooted at node 0 includes nodes {0, 1}. The subset {2, 3} is* *good as the digits 2 and 3 appear only once. The score of this subset is 2 + 3 = 5.
- The subtree rooted at node 1 includes only node {1}. The subset {3} is* *good. The score of this subset is 3.
- The maxScore array is [5, 3], and the sum of all values in maxScore is 5 + 3 = 8. Thus, the answer is 8.
```

**Example 2:**
```
Input: vals = [1,5,2], par = [-1,0,0]
Output: 15
Explanation: ![img](https://assets.leetcode.com/uploads/2025/04/29/screenshot-2025-04-29-at-151408.png)
- The subtree rooted at node 0 includes nodes {0, 1, 2}. The subset {1, 5, 2} is* *good as the digits 1, 5 and 2 appear only once. The score of this subset is 1 + 5 + 2 = 8.
- The subtree rooted at node 1 includes only node {1}. The subset {5} is* *good. The score of this subset is 5.
- The subtree rooted at node 2 includes only node {2}. The subset {2} is* *good. The score of this subset is 2.
- The maxScore array is [8, 5, 2], and the sum of all values in maxScore is 8 + 5 + 2 = 15. Thus, the answer is 15.
```

**Example 3:**
```
Input: vals = [34,1,2], par = [-1,0,1]
Output: 42
Explanation: - The subtree rooted at node 0 includes nodes {0, 1, 2}. The subset {34, 1, 2} is* *good as the digits 3, 4, 1 and 2 appear only once. The score of this subset is 34 + 1 + 2 = 37.
- The subtree rooted at node 1 includes node {1, 2}. The subset {1, 2} is* *good as the digits 1 and 2 appear only once. The score of this subset is 1 + 2 = 3.
- The subtree rooted at node 2 includes only node {2}. The subset {2} is* *good. The score of this subset is 2.
- The maxScore array is [37, 3, 2], and the sum of all values in maxScore is 37 + 3 + 2 = 42. Thus, the answer is 42.
```

**Example 4:**
```
Input: vals = [3,22,5], par = [-1,0,1]
Output: 18
Explanation: - The subtree rooted at node 0 includes nodes {0, 1, 2}. The subset {3, 22, 5} is* *not good, as digit 2 appears twice. Therefore, the subset {3, 5} is valid. The score of this subset is 3 + 5 = 8.
- The subtree rooted at node 1 includes nodes {1, 2}. The subset {22, 5} is* *not good, as digit 2 appears twice. Therefore, the subset {5} is valid. The score of this subset is 5.
- The subtree rooted at node 2 includes {2}. The subset {5} is* *good. The score of this subset is 5.
- The maxScore array is [8, 5, 5], and the sum of all values in maxScore is 8 + 5 + 5 = 18. Thus, the answer is 18.
```

---

## Walkthrough

| Step | Node | Action | dp (selected masks → score) |
|------|------|--------|-----------------------------|
| 1 | 0 (value 12) | Initialize dp with mask `001100` (digits 1,2) | dp[0]=0, dp[mask12]=12 |
| 2 | Recurse child 1 (value 34) | dp child = {0:0, mask34:34} | – |
| 3 | Merge child 1 into node 0 | Combine masks 001100 & 110000 = 0 → new mask `111100` score 46 | dp now has entries for masks {0, mask12, mask34, mask12|mask34} |
| 4 | Recurse child 2 (value 56) | dp child = {0:0, mask56:56} | – |
| 5 | Merge child 2 into accumulated dp | Non‑overlapping merges produce mask `111111` score 102 | Final dp contains max score 102 for mask covering all digits |

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS + Bitmask DP | **O(n · 2¹⁰)** | O(2¹⁰) per recursion stack frame |

---

## Key Takeaway

> **Digit‑disjoint constraint → 10‑bit mask.** Perform a DFS tree DP merging child states only when masks do not overlap. Classic bitmask DP on trees.
