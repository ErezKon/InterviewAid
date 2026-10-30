# 699. Falling Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/falling-squares](https://leetcode.com/problems/falling-squares)
**Companies:** Amazon, Square, Uber

---

## Problem Description

There are several squares being dropped onto the X-axis of a 2D plane.

You are given a 2D integer array `positions` where `positions[i] = [left_i, sideLength_i]` represents the `i^th` square with a side length of `sideLength_i` that is dropped with its left edge aligned with X-coordinate `left_i`.

Each square is dropped one at a time from a height above any landed squares. It then falls downward (negative Y direction) until it either lands **on the top side of another square** or **on the X-axis**. A square brushing the left/right side of another square does not count as landing on it. Once it lands, it freezes in place and cannot be moved.

After each square is dropped, you must record the **height of the current tallest stack of squares**.

Return *an integer array* `ans` *where* `ans[i]` *represents the height described above after dropping the* `i^th` *square*.

**Constraints:**

- `1 <= positions.length <= 1000`
- `1 <= left_i <= 10^8`
- `1 <= sideLength_i <= 10^6`

---

## Examples

```
Example 1:
  Input: positions = [[1,2],[2,3],[6,1]]
  Output: [2,5,5]
  Explanation:
  After the first drop, the tallest stack is square 1 with a height of 2.
  After the second drop, the tallest stack is squares 1 and 2 with a height of 5.
  After the third drop, the tallest stack is still squares 1 and 2 with a height of 5.
  Thus, we return an answer of [2, 5, 5].
```

```
Example 2:
  Input: positions = [[100,100],[200,100]]
  Output: [100,100]
  Explanation:
  After the first drop, the tallest stack is square 1 with a height of 100.
  After the second drop, the tallest stack is either square 1 or square 2, both with heights of 100.
  Thus, we return an answer of [100, 100].
  Note that square 2 only brushes the right side of square 1, which does not count as landing on it.
```

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
