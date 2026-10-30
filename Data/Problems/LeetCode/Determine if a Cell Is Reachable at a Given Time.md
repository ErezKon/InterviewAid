# 2849. Determine if a Cell Is Reachable at a Given Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/determine-if-a-cell-is-reachable-at-a-given-time](https://leetcode.com/problems/determine-if-a-cell-is-reachable-at-a-given-time)
**Companies:** Github, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Chebyshev Distance](#approach-chebyshev-distance)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given four integers `sx`, `sy`, `fx`, `fy`, and a **non-negative** integer `t`.

In an infinite 2D grid, you start at the cell `(sx, sy)`. Each second, you **must** move to any of its adjacent cells.

Return `true` *if you can reach cell *`(fx, fy)` *after** exactly*** `t` ***seconds***, *or* `false` *otherwise*.

A cell's **adjacent cells** are the 8 cells around it that share at least one corner with it. You can visit the same cell several times.

**Constraints:**
- `1 <= sx, sy, fx, fy <= 10^9`
- `0 <= t <= 10^9`

---

## Examples

**Example 1:**
```
Input: sx = 2, sy = 4, fx = 7, fy = 7, t = 6
Output: true
Explanation: Starting at cell (2, 4), we can reach cell (7, 7) in exactly 6 seconds by going through the cells depicted in the picture above.
```

**Example 2:**
```
Input: sx = 3, sy = 1, fx = 7, fy = 3, t = 3
Output: false
Explanation: Starting at cell (3, 1), it takes at least 4 seconds to reach cell (7, 3) by going through the cells depicted in the picture above. Hence, we cannot reach cell (7, 3) at the third second.
```

---

## Key Insight

> The minimum steps to reach `(fx, fy)` from `(sx, sy)` with 8-directional movement is the **Chebyshev distance**: `max(|fx-sx|, |fy-sy|)`. If `t ≥ minDist`, you can always reach it (waste extra steps by oscillating). The only special case: if start == end and `t == 1`, it's impossible (you must leave but can't return in one step).

---

## Approach: Chebyshev Distance ✅

```
FUNCTION isReachableAtTime(sx, sy, fx, fy, t):
    dx ← ABS(fx - sx)
    dy ← ABS(fy - sy)
    minDist ← MAX(dx, dy)

    // Special case: same cell
    IF minDist = 0 THEN
        RETURN t != 1      // t=0 is fine, t≥2 is fine, t=1 is impossible

    RETURN t >= minDist
END FUNCTION
```

---

## Walkthrough

```
sx=2, sy=4, fx=7, fy=7, t=6
```

```
  Start (2,4)
    ↘  move diagonally 3 steps → (5,7)
    →  move right 2 steps → (7,7)
  Total: 5 steps. We have 6, so waste 1 step: go right then left.
```

| Step | Position | Move |
|------|----------|------|
| 0    | (2,4)    | —    |
| 1    | (3,5)    | diagonal |
| 2    | (4,6)    | diagonal |
| 3    | (5,7)    | diagonal |
| 4    | (6,7)    | right |
| 5    | (7,7)    | right → arrived! |
| 6    | (8,7)→(7,7) | right then left (waste) |

Actually, to arrive exactly at t=6: take one detour step.

`minDist = max(5,3) = 5`, `t = 6 ≥ 5` → **true** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Simple arithmetic |
| **Space** | O(1) | No extra storage |

---

## Follow-Up Questions

**Q1: Why can you always waste extra steps?**
> Once you have at least `minDist` steps, you can oscillate (step right then left, or any back-and-forth) consuming 2 extra steps each time. Any even surplus works. An odd surplus also works because you can take a diagonal detour. The only edge case is start==end with t=1.

**Q2: Why is Chebyshev distance the minimum for 8-directional movement?**
> With diagonals, each step reduces both |dx| and |dy| by at most 1. The bottleneck is the larger dimension: `max(|dx|, |dy|)`.

**Q3: What if movement were 4-directional (no diagonals)?**
> Then the minimum distance would be Manhattan distance: `|dx| + |dy|`, and you'd also need `t` and `minDist` to have the same parity.

---

## Key Takeaway

> **For 8-directional grid movement, the minimum distance is Chebyshev distance `max(|dx|, |dy|)` — and you can reach any cell in exactly `t` steps as long as `t ≥ minDist` (with a special case when start equals destination).**
