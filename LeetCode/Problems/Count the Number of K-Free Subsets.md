# 2638. Count the Number of K-Free Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-k-free-subsets](https://leetcode.com/problems/count-the-number-of-k-free-subsets)
**Companies:** Amazon

---

## Problem Description

A subset is **k-free** if no two elements have an absolute difference equal to `k`. Count non-empty k-free subsets of the given array.

---

## Key Insight

Group elements by their value mod `k`. Within each group, sort by value — conflicts only exist between consecutive elements (differing by exactly `k`). Each group becomes a 1D chain where no two adjacent elements can both be chosen — this is the **house robber** problem. Multiply independent group results.

---

## Approach

```
FUNCTION countKFreeSubsets(nums, k):
    groups = defaultdict(list)
    FOR x IN nums: groups[x % k].APPEND(x)
    FOR key IN groups: groups[key].SORT()

    result = 1
    FOR chain IN groups.values():
        // House robber on this chain: count subsets with no two adjacent
        // f(0) = 1 (skip), f(1) = 2 (take or skip first element)
        prev, curr = 1, 2
        FOR i ← 1 TO LENGTH(chain) - 1 DO
            IF chain[i] - chain[i-1] == k:
                prev, curr = curr, prev + curr  // can't take both
            ELSE:
                prev, curr = curr, curr * 2     // independent, double choices
        result *= curr

    RETURN result - 1   // subtract empty subset
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — sorting |
| **Space** | O(n) |

---

## Key Takeaway

> **K-free subsets: group by mod k, sort each group, apply house-robber DP within each group. Groups are independent so multiply their results. Classic reduction of a constraint problem to independent chains.**
