# 1453. Maximum Number of Darts Inside of a Circular Dartboard

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard](https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard)
**Companies:** Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `n` darts on a 2D plane at positions `darts[i] = [xi, yi]` and a circle of radius `r`, return the **maximum number of darts** that can lie **inside or on** the boundary of the circle.

**Constraints:**
- `1 <= darts.length <= 100`
- `-10^4 <= xi, yi <= 10^4`
- `1 <= r <= 5000`

---

## Examples

**Example 1:**
```
Input:  darts = [[-2,0],[2,0],[0,2],[0,-2]], r = 2
Output: 4
Explanation: Circle centered at origin with radius 2 covers all 4 points.
```

**Example 2:**
```
Input:  darts = [[-3,0],[3,0],[2,6],[5,4],[0,9],[7,8]], r = 5
Output: 5
```

---

## Key Insight

> The optimal circle **must pass through at least two darts** (or contain just one). For each pair of darts, compute the (up to 2) circle centers of radius `r` passing through both points. For each candidate center, count how many darts fall inside. This gives O(n³).

---

## Approach

```
FUNCTION numPoints(darts, r)
    n ← len(darts)
    result ← 1   // at least 1 dart is always inside

    FOR i ← 0 TO n - 1 DO
        FOR j ← i + 1 TO n - 1 DO
            // Find circle centers of radius r through darts[i] and darts[j]
            centers ← findCircleCenters(darts[i], darts[j], r)

            FOR each center IN centers DO
                count ← 0
                FOR k ← 0 TO n - 1 DO
                    IF distance(center, darts[k]) ≤ r + EPSILON THEN
                        count ← count + 1
                result ← MAX(result, count)

    RETURN result
END FUNCTION

FUNCTION findCircleCenters(p1, p2, r)
    dx ← p2.x - p1.x, dy ← p2.y - p1.y
    d ← SQRT(dx² + dy²)
    IF d > 2 * r THEN RETURN []    // too far apart

    mid ← ((p1.x+p2.x)/2, (p1.y+p2.y)/2)
    h ← SQRT(r² - (d/2)²)
    offset ← (h * dy / d, -h * dx / d)

    RETURN [mid + offset, mid - offset]
END FUNCTION
```

---

## Walkthrough

For `darts = [[-2,0],[2,0],[0,2],[0,-2]], r = 2`:
- Pair (-2,0) and (2,0): distance = 4 = 2r → one center at (0,0).
- Count darts within radius 2 of (0,0): all 4 darts are at distance 2. **Count = 4** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n³)** — n² pairs × n darts to count |
| Space  | **O(1)** — constant extra |

---

## Follow-Up Questions

1. **Can we do better than O(n³)?**
   Angular sweep can achieve O(n² log n): for each dart as anchor, sort other darts by angle and sweep.

2. **What about floating point precision?**
   Use an epsilon (e.g., 10⁻⁶) for distance comparisons.

3. **What if the radius could be adjusted?**
   Different problem — minimum enclosing circle (Welzl's algorithm).

---

## Key Takeaway

> **Circle placement through point pairs** — the optimal circle passes through at least 2 points, giving a finite O(n²) set of candidate centers to check.
