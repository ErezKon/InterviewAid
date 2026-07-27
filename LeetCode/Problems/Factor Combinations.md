# 254. Factor Combinations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/factor-combinations](https://leetcode.com/problems/factor-combinations)
**Companies:** Linkedin, Uber

---

## Problem Description

Given integer `n`, return all unique combinations of factors (excluding 1 and n itself). Each combination should list factors in non-decreasing order.

---

## Key Insight

> DFS/backtracking: try each factor `f` from `start` to `√n`. If `f` divides `n`, add `[...path, f, n/f]` as one result, then recurse on `n/f` starting from `f` to avoid duplicates.

---

## Approach: Backtracking — O(2^(log n)) ✅

```
FUNCTION getFactors(n):
    result = []
    FUNCTION dfs(n, start, path):
        FOR f ← start TO sqrt(n):
            IF n % f == 0:
                result.ADD(path + [f, n // f])
                dfs(n // f, f, path + [f])
    dfs(n, 2, [])
    RETURN result
```

---

## Walkthrough

```
n = 12, start = 2

f=2: 12%2=0 → add [2,6], recurse(6, 2, [2])
  f=2: 6%2=0 → add [2,2,3], recurse(3, 2, [2,2])
    f=2: √3 < 2 → stop
f=3: 12%3=0 → add [3,4], recurse(4, 3, [3])
  f=3: √4 < 3 → stop

Result: [[2,6], [2,2,3], [3,4]] ✅
```

---

## Key Takeaway

> **Factor decomposition via DFS. Start each level from the previous factor to ensure non-decreasing order and avoid duplicates. Loop up to √n for efficiency.**
