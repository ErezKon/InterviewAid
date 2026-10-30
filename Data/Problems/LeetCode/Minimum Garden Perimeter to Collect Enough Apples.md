# 1954. Minimum Garden Perimeter to Collect Enough Apples

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples](https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples)
**Companies:** Amazon

---

## Problem Description

In a garden represented as an infinite 2D grid, there is an apple tree planted at **every** integer coordinate. The apple tree planted at an integer coordinate `(i, j)` has `|i| + |j|` apples growing on it.

You will buy an axis-aligned **square plot** of land that is centered at `(0, 0)`.

Given an integer `neededApples`, return *the **minimum perimeter** of a plot such that **at least***** **`neededApples` *apples are **inside or on** the perimeter of that plot*.

The value of `|x|` is defined as:

- `x` if `x >= 0`
- `-x` if `x < 0`

**Constraints:**
- `1 <= neededApples <= 10^15`

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

**Example 1:**
```
Input: neededApples = 1
Output: 8
Explanation: A square plot of side length 1 does not contain any apples.
However, a square plot of side length 2 has 12 apples inside (as depicted in the image above).
The perimeter is 2 * 4 = 8.
```

**Example 2:**
```
Input: neededApples = 13
Output: 16
```

**Example 3:**
```
Input: neededApples = 1000000000
Output: 5040
```

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
