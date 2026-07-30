# 1954. Minimum Garden Perimeter to Collect Enough Apples

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples](https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples)
**Companies:** Amazon

---

## Problem Description

On an infinite 2D grid, a point `(i,j)` has `|i| + |j|` apples. Find the **minimum perimeter** of an axis‑aligned square centered at origin that collects at least `neededApples` apples.

## Key Insight

> For a square of half‑side `n`, total apples = `2n(n+1)(2n+1)`. Binary search or linear scan for the smallest `n` where this ≥ `neededApples`. Perimeter = `8n`.

## Approach: Binary Search / Linear — O(∛n) ✅

```text
FUNCTION minimumPerimeter(neededApples):
    n ← 1
    WHILE 2 * n * (n + 1) * (2 * n + 1) < neededApples:
        n ← n + 1
    RETURN 8 * n
```

## Examples

| neededApples | Output |
|--------------|--------|
| 1            | 8 |
| 13           | 16 |
| 1000000      | 4000 |

*Explanation*: For `neededApples = 13`, the smallest `n` satisfying the formula is `2`, giving perimeter `8*2 = 16`.

## Walkthrough

1. Start with `n = 1`.
2. Compute apples `= 2*1*2*3 = 12` which is less than `13`.
3. Increment `n` to `2`.
4. Compute apples `= 2*2*3*5 = 60` which meets the requirement.
5. Return perimeter `8*2 = 16`.

## Complexity Analysis

- **Time**: O(∛neededApples) for linear scan (or O(log n) with binary search).
- **Space**: O(1).

## Follow-Up Questions

- How would you adapt the solution for a rectangular region instead of a square?
- Can you derive a closed‑form solution without iteration?
- What if the apple count at each point follows a different function, e.g., `|i| * |j|`?

## Key Takeaway

> The apple formula `2n(n+1)(2n+1)` grows as O(n³), so the search converges quickly — binary search or linear scan both work efficiently.
