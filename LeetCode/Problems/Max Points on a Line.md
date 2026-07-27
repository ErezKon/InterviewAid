# 149. Max Points on a Line

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/max-points-on-a-line](https://leetcode.com/problems/max-points-on-a-line)
**Companies:** Amazon, Apple, Bloomberg, Cisco, Citadel, Google, Linkedin, Meesho, Meta, Microsoft, Nvidia, Sprinklr, Twitter, Waymo, Zoho, Zoox

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Slope Counting — O(n²)](#approach-slope-counting--on²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of `points` where `points[i] = [xᵢ, yᵢ]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

**Constraints:**
- `1 ≤ points.length ≤ 300`
- `-10⁴ ≤ xᵢ, yᵢ ≤ 10⁴`
- All points are unique.

---

## Examples

**Example 1:**
```
Input:  points = [[1,1],[2,2],[3,3]]
Output: 3
Explanation: All three points are collinear (slope = 1).
```

**Example 2:**
```
Input:  points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
Explanation: Points [1,1],[3,2],[5,3] lie on y = x/2 + 1/2 — but actually
             [1,1],[2,3],[1,4] etc. The best line passes through 4 points.
```

---

## Key Insight

> Two points define a line. For each anchor point, group all other points by their **slope** to the anchor. The largest group + 1 (for the anchor itself) gives the max collinear count through that anchor. Use **GCD-normalized integer pairs** `(dy, dx)` as the slope key to avoid floating-point precision issues.

---

## Approach: Slope Counting — O(n²) ✅

For each point, count slopes to all other points using a hash map. Use GCD-reduced (dy, dx) as the slope key to avoid floating point.

```
FUNCTION maxPoints(points):
    IF len(points) <= 2: RETURN len(points)
    maxCount = 2

    FOR i ← 0 TO n - 1:
        slopes = {}
        FOR j ← i + 1 TO n - 1:
            dy = points[j][1] - points[i][1]
            dx = points[j][0] - points[i][0]
            g = GCD(abs(dy), abs(dx))
            // Normalize: ensure dx > 0, or if dx == 0 then dy > 0
            dy, dx = dy/g, dx/g
            IF dx < 0: dy, dx = -dy, -dx
            IF dx == 0: dy = abs(dy)

            slopes[(dy, dx)] = slopes.get((dy,dx), 1) + 1
            maxCount = MAX(maxCount, slopes[(dy, dx)])

    RETURN maxCount
```

---

## Walkthrough

```
points = [[1,1],[2,2],[3,3],[1,3]]
```

**Anchor = [1,1]:**

| Other point | dy, dx | Normalized | slopes count |
|-------------|--------|------------|--------------|
| [2,2]       | 1, 1   | (1, 1)     | 2            |
| [3,3]       | 2, 2   | (1, 1)     | 3            |
| [1,3]       | 2, 0   | (1, 0)     | 2            |

Best through [1,1]: 3 points on slope (1,1).

**Result:** 3 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Slope Counting | **O(n²)** | O(n) |

For each of n points, we examine n−1 others. The hash map is reset per anchor, holding at most n−1 entries.

---

## Follow-Up Questions

**Q1: Why not use floating-point slopes?**
`dy/dx` as a float loses precision for large coordinates. Two nearly-parallel lines could hash to the same slope. GCD-normalized integer pairs are exact.

**Q2: How do you handle vertical lines (dx = 0)?**
Normalize to `(1, 0)` — all vertical lines through the same anchor are the same line regardless of `dy`.

**Q3: Why do we need to normalize the sign?**
Without sign normalization, the slope from A→B and B→A could produce `(1, -1)` vs `(-1, 1)` — different keys for the same line. Forcing `dx > 0` (or `dy > 0` when `dx = 0`) ensures a unique canonical form.

**Q4: Can you do better than O(n²)?**
Not in the general case for exact solutions. Any algorithm must consider all pairs in the worst case (e.g., all points on one line).

---

## Key Takeaway

> **Use GCD-normalized `(dy, dx)` pairs as slope keys to avoid floating-point issues.** The O(n²) anchor-and-count approach is optimal for this problem and demonstrates careful handling of edge cases (vertical lines, sign normalization).
