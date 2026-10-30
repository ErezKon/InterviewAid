# 356. Line Reflection

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/line-reflection](https://leetcode.com/problems/line-reflection)
**Companies:** Google, Yandex

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given `n` points on a 2D plane, find if there is such a line parallel to the y-axis that reflects the given points symmetrically.

In other words, answer whether or not if there exists a line that after reflecting all points over the given line, the original points' set is the same as the reflected ones.

**Note** that there can be repeated points.

**Follow up:** Could you do better than `O(n^2)`?

**Constraints:**
- `n == points.length`
- `1 <= n <= 10^4`
- `-10^8 <= points[i][j] <= 10^8`

---

## Examples

**Example 1:**
```
Input: points = [[1,1],[-1,1]]
Output: true
Explanation: We can choose the line x = 0.
```

**Example 2:**
```
Input: points = [[1,1],[-1,-1]]
Output: false
Explanation: We can't choose a line.
```

---

## Approach: Hash Set — O(n) ✅

The reflection line must be at `x = (minX + maxX) / 2`. Check every point has its mirror.

```text
FUNCTION isReflected(points):
    // Store all points for O(1) lookup
    pts ← SET((x, y) for each (x, y) in points)
    minX ← MIN(x for each (x, _) in pts)
    maxX ← MAX(x for each (x, _) in pts)
    total ← minX + maxX
    // Verify each point has its reflected counterpart
    FOR each (x, y) in pts:
        IF (total - x, y) NOT IN pts:
            RETURN false
    RETURN true
```

---

## Walkthrough

Consider the input `[[1,1],[-1,1],[2,2],[-2,2]]`.

| Step | minX | maxX | total = minX+maxX | Check point | Mirror exists? |
|------|------|------|-------------------|-------------|----------------|
| 1    | -2   | 2    | 0                 | (1,1)       | (‑1,1) ✅ |
| 2    |      |      |                   | (‑1,1)      | (1,1) ✅ |
| 3    |      |      |                   | (2,2)       | (‑2,2) ✅ |
| 4    |      |      |                   | (‑2,2)      | (2,2) ✅ |

All points have mirrors, so the function returns `true`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

The algorithm scans all points once and stores them in a hash set.

---

## Follow-Up Questions

1. How would the solution change if the reflection line could be any line (not just vertical)?
2. Can you solve the problem using sorting instead of a hash set?
3. What if duplicate points are allowed in the input?

---

## Key Takeaway

> The reflection axis is fixed at `(min + max) / 2`. For each point `(x, y)`, check if `(total - x, y)` exists. Use a set for O(1) lookup.
