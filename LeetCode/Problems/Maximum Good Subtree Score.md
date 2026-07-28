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

Given a rooted tree where each node holds an integer value, select a subset of nodes within a single subtree such that all selected node values contain **distinct decimal digits**. The score of a selection is the sum of its node values. Return the maximum possible score.

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
values = [12, 34, 56]
edges  = [[0,1],[0,2]]
```
- Node 0 value 12 uses digits {1,2}. Node 1 value 34 uses {3,4}. Node 2 value 56 uses {5,6}. All three masks are disjoint, so the whole tree can be selected. Maximum score = 12 + 34 + 56 = **102**.

**Example 2:**
```
values = [101, 23, 45]
edges  = [[0,1],[1,2]]
```
- Node 0 mask {0,1}. Node 1 mask {2,3}. Node 2 mask {4,5}. All disjoint, score = 101 + 23 + 45 = **169**.

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
