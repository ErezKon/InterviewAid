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

---

## Problem Description

Given a rooted tree where each node has a value, find the maximum score by selecting a subset of nodes in a subtree such that all selected nodes have **distinct digits** in their values. The score is the sum of selected node values.

---

## Key Insight

> Each node's value uses a subset of digits 0-9 (bitmask of 10 bits). Use DFS with bitmask DP: `dp[mask]` = max score achievable using exactly the digit set represented by `mask`. Merge child DP tables via subset convolution.

---

## Approach: DFS + Bitmask DP — O(n · 2¹⁰) ✅

```
FUNCTION maxGoodSubtreeScore(vals, edges):
    Build tree; root at 0
    MOD = 10^9 + 7

    FUNCTION dfs(node, parent):
        digitMask = bitmask of digits in vals[node]
        dp = [-infinity] * (1 << 10)
        dp[0] = 0
        dp[digitMask] = vals[node]

        FOR child IN children[node]:
            childDp = dfs(child, node)
            // Merge: for each pair of non-overlapping masks
            newDp = copy(dp)
            FOR m1 with dp[m1] > -inf:
                FOR m2 with childDp[m2] > -inf:
                    IF m1 & m2 == 0:
                        newDp[m1 | m2] = MAX(newDp[m1|m2], dp[m1] + childDp[m2])
            dp = newDp

        RETURN dp

    dp = dfs(0, -1)
    RETURN MAX(dp)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DFS + bitmask DP | **O(n · 3¹⁰)** subset convolution | O(2¹⁰) per node |

---

## Key Takeaway

> **Digit-disjointness = bitmask over 10 digits. Tree DP with subset convolution merges children's DP tables.** Classic tree bitmask DP pattern.
