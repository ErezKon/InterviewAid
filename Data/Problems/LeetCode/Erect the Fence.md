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

You are given an array `trees` where `trees[i] = [x_i, y_i]` represents the location of a tree in the garden.

Fence the entire garden using the minimum length of rope, as it is expensive. The garden is well-fenced only if **all the trees are enclosed**.

Return *the coordinates of trees that are exactly located on the fence perimeter*. You may return the answer in **any order**.

**Constraints:**
- `1 <= trees.length <= 3000`
- `trees[i].length == 2`
- `0 <= x_i, y_i <= 100`
- All the given positions are **unique**.

---

## Examples

**Example 1:**
```
Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [[1,1],[2,0],[4,2],[3,3],[2,4]]
Explanation: All the trees will be on the perimeter of the fence except the tree at [2, 2], which will be inside the fence.
```

**Example 2:**
```
Input: trees = [[1,2],[2,2],[4,2]]
Output: [[4,2],[2,2],[1,2]]
Explanation: The fence forms a line that passes through all the trees.
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
