# 587. Erect the Fence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/erect-the-fence](https://leetcode.com/problems/erect-the-fence)
**Companies:** Amazon, Google, Meesho

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Convex Hull (Andrew's Monotone Chain)](#approach-convex-hull-andrews-monotone-chain--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `trees[i] = [x, y]` representing tree positions, return the coordinates of trees on the **outer fence** (convex hull). Include collinear points on the boundary.

**Constraints:**
- `1 <= trees.length <= 3000`

---

## Examples

```
Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [[1,1],[2,0],[4,2],[3,3],[2,4]]  (convex hull vertices)
```

---

## Key Insight

> This is a **convex hull** problem. Andrew's Monotone Chain builds upper and lower hulls separately. Use `cross product < 0` (strict) to allow collinear boundary points (the problem requires including them).

---

## Approach: Convex Hull (Andrew's Monotone Chain) — O(n log n) ✅

```
FUNCTION outerTrees(trees):
    SORT trees by (x, y)
    lower = []; upper = []
    FOR p IN trees:
        WHILE len(lower) >= 2 AND cross(lower[-2], lower[-1], p) < 0: lower.POP()
        lower.ADD(p)
    FOR p IN reversed(trees):
        WHILE len(upper) >= 2 AND cross(upper[-2], upper[-1], p) < 0: upper.POP()
        upper.ADD(p)
    RETURN list(SET(lower + upper))
```

**Cross product:** `cross(O, A, B) = (A.x-O.x)*(B.y-O.y) - (A.y-O.y)*(B.x-O.x)`
- `> 0`: counter-clockwise turn
- `= 0`: collinear
- `< 0`: clockwise turn (remove from hull)

---

## Walkthrough

```
trees sorted: [[1,1],[2,0],[2,2],[2,4],[3,3],[4,2]]

Lower hull (left to right):
  [1,1] → [1,1]
  [2,0] → cross([1,1],[2,0]) no check (< 2 pts) → [1,1,2,0]
  [2,2] → cross([1,1],[2,0],[2,2]) = 2 > 0 → keep → [1,1,2,0,2,2]
  ... continues building lower boundary

Upper hull (right to left):
  [4,2] → [4,2]
  [3,3] → [4,2,3,3]
  ... continues building upper boundary

Combine + deduplicate = all boundary points ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(n) — hull storage |

---

## Key Takeaway

> **Convex hull via Andrew's Monotone Chain: sort by (x,y), build lower and upper hulls using cross product. Use strict `< 0` (not `≤ 0`) to keep collinear boundary points.**
