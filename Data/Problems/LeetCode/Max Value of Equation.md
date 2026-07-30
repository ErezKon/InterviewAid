# 1499. Max Value of Equation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/max-value-of-equation](https://leetcode.com/problems/max-value-of-equation)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Monotonic Deque — O(n)](#approach-monotonic-deque--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of points `points` sorted by x-coordinate where `points[i] = [xᵢ, yᵢ]`, and an integer `k`, find the maximum value of `yᵢ + yⱼ + |xᵢ - xⱼ|` where `|xᵢ - xⱼ| ≤ k` and `i < j`.

Since points are sorted by x and `i < j`, `xⱼ ≥ xᵢ`, so `|xᵢ - xⱼ| = xⱼ - xᵢ`.

The equation becomes: **maximize `(yⱼ + xⱼ) + (yᵢ - xᵢ)`** subject to `xⱼ - xᵢ ≤ k`.

**Constraints:**
- `2 ≤ points.length ≤ 10⁵`
- `|xᵢ|, |yᵢ| ≤ 10⁸`
- `0 ≤ k ≤ 2 × 10⁸`
- Points sorted by `xᵢ` ascending.

---

## Examples

**Example 1:**
```
Input:  points = [[1,3],[2,0],[5,10],[6,-10]], k = 1
Output: 4
Explanation: Points [1,3] and [2,0]: 3 + 0 + |1-2| = 4 (|x diff| = 1 ≤ k)
```

**Example 2:**
```
Input:  points = [[0,0],[3,0],[9,2]], k = 3
Output: 3
Explanation: Points [0,0] and [3,0]: 0 + 0 + 3 = 3
```

---

## Key Insight

> Rewrite the equation: `yᵢ + yⱼ + (xⱼ - xᵢ) = (yⱼ + xⱼ) + (yᵢ - xᵢ)`. For each point `j`, we want to maximize `yᵢ - xᵢ` among all valid prior points `i` (where `xⱼ - xᵢ ≤ k`). This is a **sliding window maximum** problem on the value `yᵢ - xᵢ`, solvable with a **monotonic deque**.

---

## Approach: Monotonic Deque — O(n) ✅

```
FUNCTION findMaxValueOfEquation(points, k):
    deque = []    // stores (yᵢ - xᵢ, xᵢ), decreasing by yᵢ - xᵢ
    result = -infinity

    FOR [xj, yj] IN points:
        // Remove points too far away
        WHILE deque is not empty AND xj - deque[0][1] > k:
            deque.POPLEFT()

        // Try pairing with the best valid point
        IF deque is not empty:
            result = MAX(result, yj + xj + deque[0][0])

        // Maintain decreasing monotonic deque
        WHILE deque is not empty AND yj - xj >= deque[-1][0]:
            deque.POP()

        deque.APPEND((yj - xj, xj))

    RETURN result
```

---

## Walkthrough

```
points = [[1,3],[2,0],[5,10],[6,-10]], k = 1
```

| j   | (xj, yj) | Deque (before)     | Best pair          | result | Deque (after)      |
|-----|-----------|--------------------|--------------------|--------|--------------------|
| 0   | (1, 3)    | []                 | —                  | -∞     | [(2, 1)]           |
| 1   | (2, 0)    | [(2, 1)]           | 0+2+2=4            | **4**  | [(2, 1), (-2, 2)]  |
| 2   | (5, 10)   | [] (both expired)  | —                  | 4      | [(5, 5)]           |
| 3   | (6, -10)  | [(5, 5)]           | -10+6+5=1          | 4      | [(5, 5), (-16, 6)] |

**Result:** 4 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Monotonic Deque | **O(n)** | O(n) |
| Heap / Priority Queue | O(n log n) | O(n) |

Each point enters and leaves the deque at most once.

---

## Follow-Up Questions

**Q1: Why a monotonic deque instead of a heap?**
A deque supports O(1) removal from both ends, letting us expire old points efficiently. A heap would need lazy deletion for expired points, giving O(n log n).

**Q2: Could you use a sorted container instead?**
Yes — a balanced BST (like `SortedList`) allows O(log n) insert/delete/max, giving O(n log n) overall. The deque approach is better at O(n).

**Q3: What if points aren't sorted by x?**
Sort them first in O(n log n), then apply the same algorithm. The total complexity becomes O(n log n).

---

## Key Takeaway

> **Decompose the optimization target into "fixed part for j" + "variable part for i", then use a monotonic deque for sliding window maximum.** This pattern applies whenever you maximize `f(j) + g(i)` subject to a distance constraint.
