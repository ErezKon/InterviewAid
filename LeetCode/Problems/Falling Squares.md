# 699. Falling Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/falling-squares](https://leetcode.com/problems/falling-squares)
**Companies:** Amazon, Square, Uber

---

## Problem Description

Squares fall one-by-one from above. Each square `[left, sideLength]` lands on top of any previously placed squares it overlaps. After each drop, return the current maximum height across all positions.

---

## Key Insight

> For each new square, find the max height among all previous intervals it overlaps. The new square's height = that max + sideLength. Track intervals and running max height.

---

## Approach: Brute Force Interval Check — O(n²) ✅

```
FUNCTION fallingSquares(positions):
    intervals = []    // (left, right, height)
    result = []; maxH = 0

    FOR [left, side] IN positions:
        right = left + side
        base = 0
        FOR (l, r, h) IN intervals:
            IF l < right AND left < r:    // overlap
                base = MAX(base, h)
        newH = base + side
        intervals.ADD((left, right, newH))
        maxH = MAX(maxH, newH)
        result.ADD(maxH)

    RETURN result
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n²) — check all previous intervals per drop |
| **Space** | O(n) — stored intervals |

Can be optimized to O(n log n) with a segment tree or coordinate compression.

---

## Key Takeaway

> **Interval overlap detection: two intervals `[l1,r1)` and `[l2,r2)` overlap iff `l1 < r2 AND l2 < r1`. Stack squares by finding the max height of overlapping intervals below.**
