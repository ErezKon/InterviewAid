# 254. Factor Combinations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/factor-combinations](https://leetcode.com/problems/factor-combinations)
**Companies:** Linkedin, Uber

---

## Problem Description

Numbers can be regarded as the product of their factors.

- For example, `8 = 2 x 2 x 2 = 2 x 4`.

Given an integer `n`, return *all possible combinations of its factors*. You may return the answer in **any order**.

**Note** that the factors should be in the range `[2, n - 1]`.

**Constraints:**

- `1 <= n <= 10^7`

---

## Examples

```
Example 1:
  Input: n = 1
  Output: []
```

```
Example 2:
  Input: n = 12
  Output: [[2,6],[3,4],[2,2,3]]
```

```
Example 3:
  Input: n = 37
  Output: []
```

---

## Key Insight

> DFS/backtracking: try each factor `f` from `start` to `√n`. If `f` divides `n`, add `[...path, f, n/f]` as one result, then recurse on `n/f` starting from `f` to avoid duplicates.

---

## Approach: Backtracking — O(2^(log n)) ✅

```
FUNCTION getFactors(n):
    result = []
    FUNCTION dfs(current, start, path):
        FOR f ← start TO sqrt(current):
            IF current % f == 0:
                result.ADD(path + [f, current / f])
                dfs(current / f, f, path + [f])
    dfs(n, 2, [])
    RETURN result
```

---

## Walkthrough

```
n = 12, start = 2

f=2: 12%2=0 → add [2,6], recurse(6, 2, [2])
  f=2: 6%2=0 → add [2,2,3], recurse(3, 2, [2,2])
    f=2: sqrt(3) < 2 → stop
f=3: 12%3=0 → add [3,4], recurse(4, 3, [3])
  f=3: sqrt(4) < 3 → stop

Result: [[2,6], [2,2,3], [3,4]] ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(k) where k is total number of factor combinations (output size) |
| **Space** | O(k * log n) for storing results and recursion stack |

---

## Follow-Up Questions

1. How would you modify the algorithm to return factor combinations in lexicographic order?
2. Can you adapt the solution to handle very large `n` where factor enumeration becomes expensive?
3. How would you generate factor combinations for a range of numbers efficiently?

---

## Key Takeaway

> **Factor decomposition via DFS. Start each level from the previous factor to ensure non-decreasing order and avoid duplicates. Loop up to √n for efficiency.**