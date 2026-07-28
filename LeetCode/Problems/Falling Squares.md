# 699. Falling Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/falling-squares](https://leetcode.com/problems/falling-squares)
**Companies:** Amazon, Square, Uber

---

## Problem Description

Squares fall one-by-one from above. Each square `[left, sideLength]` lands on top of any previously placed squares it overlaps. After each drop, return the current maximum height across all positions.

---

## Examples

| positions | Output | Explanation |
|-----------|--------|-------------|
| `[[1,2],[2,3],[6,1]]` | `[2,5,5]` | 1️⃣ Square at `[1,2]` lands on ground → height 2. 2️⃣ Square `[2,3]` overlaps first, sits on height 2 → new height 5. 3️⃣ Square `[6,1]` does not overlap → height remains 5. |
| `[[100,100],[200,100]]` | `[100,100]` | No overlap, each square forms its own tower.

---

## Key Insight

> For each new square, find the max height among all previous intervals it overlaps. The new square's height = that max + sideLength. Track intervals and running max height.

---

## Approach: Brute Force Interval Check — O(n²) ✅

```text
FUNCTION fallingSquares(positions):
    SET intervals ← []    // each entry: (left, right, height)
    SET result ← []
    SET maxH ← 0
    FOR [left, side] IN positions:
        SET right ← left + side
        SET base ← 0
        FOR (l, r, h) IN intervals:
            IF l < right AND left < r:    // overlap condition
                SET base ← MAX(base, h)
        SET newH ← base + side
        APPEND (left, right, newH) TO intervals
        SET maxH ← MAX(maxH, newH)
        APPEND maxH TO result
    RETURN result
```

---

## Walkthrough

Consider `positions = [[1,2],[2,3],[6,1]]`.
1. **First square** `[1,2]` → interval `[1,3)`, base height 0, new height 2. `intervals = [(1,3,2)]`, `maxH = 2`, `result = [2]`.
2. **Second square** `[2,3]` → interval `[2,5)`. Overlaps with `(1,3,2)` because `1 < 5` and `2 < 3`. Base = 2, new height = 2+3 = 5. Add `(2,5,5)`. `maxH = 5`, `result = [2,5]`.
3. **Third square** `[6,1]` → interval `[6,7)`. No overlap with existing intervals, base = 0, new height = 1. Add `(6,7,1)`. `maxH` stays 5, `result = [2,5,5]`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n²) — each square checks all previous intervals |
| **Space** | O(n) — store intervals and results |

Can be optimized to O(n log n) with a segment tree or coordinate compression.

---

## Follow-Up Questions

- How would you improve the time complexity using a segment tree or binary indexed tree?
- Can you adapt the solution to handle a large coordinate range via coordinate compression?
- What changes are needed if squares can have negative `left` positions?

---

## Key Takeaway

> **Interval overlap detection:** two intervals `[l1,r1)` and `[l2,r2)` overlap iff `l1 < r2 AND l2 < r1`. Stack squares by finding the max height of overlapping intervals below.
