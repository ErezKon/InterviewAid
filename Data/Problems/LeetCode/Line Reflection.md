# 356. Line Reflection

**Difficulty:** 🟡 Medium
**Companies:** Google, Yandex

---

## Problem Description

Given a set of 2D points, determine if there exists a vertical line `x = c` such that reflecting all points across it maps each point to another point in the set.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,1],[-1,1]]` | `true` | The line `x = 0` reflects `(1,1)` to `(-1,1)` and vice‑versa. |
| `[[1,1],[2,2]]` | `false` | No single vertical line can map both points to each other. |

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
