# 1610. Maximum Number of Visible Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-visible-points](https://leetcode.com/problems/maximum-number-of-visible-points)
**Companies:** Amazon, Anduril, Aurora, Google, Nuro, Nvidia

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

Given a list of `points`, your `location`, and a viewing `angle` (in degrees), return the **maximum number of points** visible from your location within the viewing angle. Points at your exact location are always visible.

**Constraints:**
- `1 <= points.length <= 10^5`
- `1 <= angle <= 360`

---

## Examples

**Example 1:**
```
Input:  points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
Output: 3
```

---

## Key Insight

> Convert each point to its angle relative to location using `atan2`. Sort angles, duplicate the array (adding 360° to handle wraparound), then use a **sliding window** of width `angle` to find the maximum count.

---

## Approach: Sliding Window on Sorted Angles — O(n log n) ✅

```
FUNCTION visiblePoints(points, angle, location)
    same ← 0
    angles ← []

    FOR each [x, y] IN points DO
        IF [x, y] = location THEN
            same ← same + 1
        ELSE
            angles.ADD(atan2(y - location[1], x - location[0]) × 180 / π)

    SORT angles
    // Duplicate for circular wraparound
    angles ← angles + [a + 360 FOR a IN angles]

    maxVisible ← 0
    left ← 0
    FOR right ← 0 TO len(angles) - 1 DO
        WHILE angles[right] - angles[left] > angle DO
            left ← left + 1
        maxVisible ← MAX(maxVisible, right - left + 1)

    RETURN maxVisible + same
END FUNCTION
```

---

## Walkthrough

```
points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
```

Angles: atan2(0,1)=0°, atan2(1,1)=45°, atan2(2,2)=45°. Same=0.
Sorted: [0, 45, 45]. Doubled: [0, 45, 45, 360, 405, 405].

Sliding window with width 90:
- right=2: [0,45,45] → span=45 ≤ 90 → count=3 ✅

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting angles |
| Space  | **O(n)** — angles array |

---

## Follow-Up Questions

1. **Why duplicate the angles array?**
   To handle the circular nature of angles (e.g., a window spanning from 350° to 10°).

2. **What if the angle is 360°?**
   All points are visible.

3. **What about points at the same location?**
   Always counted separately (visible regardless of angle).

---

## Key Takeaway

> **Angle conversion + circular sliding window** — convert to polar angles, duplicate for wraparound, and slide a fixed-width window to find the maximum count. Classic geometry + sliding window pattern.
