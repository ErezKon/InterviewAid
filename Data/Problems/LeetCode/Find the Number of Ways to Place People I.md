# 3025. Find the Number of Ways to Place People I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i](https://leetcode.com/problems/find-the-number-of-ways-to-place-people-i)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate Pairs — O(n³) ✅](#3-approach-enumerate-pairs--on³-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given a 2D array `points` of size `n x 2` representing integer coordinates of some points on a 2D plane, where `points[i] = [xi, yi]`.

Count the number of pairs of points `(A, B)`, where

- `A` is on the **upper left** side of `B`, and
- there are no other points in the rectangle (or line) they make (**including the border**), except for the points `A` and `B`.

Return the count.

**Constraints:**
- `2 <= n <= 50`
- `points[i].length == 2`
- `0 <= points[i][0], points[i][1] <= 50`
- All `points[i]` are distinct.

---

## 2. Examples

```
Example 1:
  Input: points = [[1,1],[2,2],[3,3]]
  Output: 0
  Explanation: There is no way to choose A and B such that A is on the upper left side of B.

Example 2:
  Input: points = [[6,2],[4,4],[2,6]]
  Output: 2
  Explanation:
    - The pair (points[1], points[0]), where points[1] is on the upper left side of points[0] and
      the rectangle is empty, is valid.
    - The pair (points[2], points[1]), same as the previous one, is a valid pair.
    - The pair (points[2], points[0]), where points[2] is on the upper left side of points[0], but
      points[1] is inside the rectangle so it's not a valid pair.

Example 3:
  Input: points = [[3,1],[1,3],[1,1]]
  Output: 2
  Explanation:
    - The pair (points[2], points[0]), where points[2] is on the upper left side of points[0] and
      there are no other points on the line they form. Note that it is a valid state when the two
      points form a line.
    - The pair (points[1], points[2]) is a valid pair, same as the previous one.
    - The pair (points[1], points[0]) is not a valid pair as points[2] is on the border of the
      rectangle.
```

---

## 3. Approach: Enumerate Pairs — O(n³) ✅

```text
FUNCTION numberOfPairs(points):
    SET n ← LENGTH(points)
    SET count ← 0
    FOR i ← 0 TO n - 1:
        FOR j ← 0 TO n - 1:
            IF i == j: CONTINUE
            // Alice upper‑left, Bob lower‑right
            IF points[i][0] <= points[j][0] AND points[i][1] >= points[j][1]:
                SET valid ← true
                FOR k ← 0 TO n - 1:
                    IF k == i OR k == j: CONTINUE
                    // Check if point k lies strictly inside rectangle
                    IF points[i][0] < points[k][0] < points[j][0] AND points[j][1] < points[k][1] < points[i][1]:
                        SET valid ← false
                        BREAK
                IF valid: SET count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Consider points `[[0,0],[1,1],[2,2]]`.
1. Pair (0,2): `(0,0)` is upper‑left of `(2,2)`. No other point lies inside, so count = 1.
2. Pair (0,1): valid, count = 2.
3. Pair (1,2): valid, count = 3.
All other ordered pairs fail the geometric condition, resulting in a final answer of `3` (or `2` if unordered pairs are required by the problem statement).

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n³) — n² pairs × n interior checks |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

- How would you improve the solution for `n` up to 10⁵?
- Can the problem be solved using sweep line or segment tree techniques?
- What changes if points can share the same x or y coordinate?

---

## 7. Key Takeaway

> With n ≤ 50, brute‑force O(n³) works. For larger inputs, sorting by x and scanning with a monotonic structure reduces the complexity dramatically.
