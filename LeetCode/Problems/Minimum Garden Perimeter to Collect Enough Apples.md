# 1954. Minimum Garden Perimeter to Collect Enough Apples

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples](https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples)
**Companies:** Amazon

---

## Problem Description

On an infinite 2D grid, a point `(i,j)` has `|i| + |j|` apples. Find the **minimum perimeter** of an axis-aligned square centered at origin that collects at least `neededApples` apples.

## Key Insight

> For a square of half-side `n`, total apples = `2n(n+1)(2n+1)`. Binary search or linear scan for the smallest `n` where this ≥ `neededApples`. Perimeter = `8n`.

## Approach: Binary Search / Linear — O(∛n) ✅

```
FUNCTION minimumPerimeter(neededApples):
    n ← 1
    WHILE 2 * n * (n + 1) * (2 * n + 1) < neededApples:
        n ← n + 1
    RETURN 8 * n
```

| Time | Space |
|------|-------|
| O(∛neededApples) | O(1) |

## Key Takeaway

> The apple formula `2n(n+1)(2n+1)` grows as O(n³), so the search converges quickly — binary search or linear scan both work efficiently.
