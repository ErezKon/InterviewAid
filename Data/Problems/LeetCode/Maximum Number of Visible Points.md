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

You are given an array `points`, an integer `angle`, and your `location`, where `location = [posx, posy]` and `points[i] = [xi, yi]` both denote **integral coordinates** on the X-Y plane.

Initially, you are facing directly east from your position. You **cannot move** from your position, but you can **rotate**. In other words, `posx` and `posy` cannot be changed. Your field of view in **degrees** is represented by `angle`, determining how wide you can see from any given view direction. Let `d` be the amount in degrees that you rotate counterclockwise. Then, your field of view is the **inclusive** range of angles `[d - angle/2, d + angle/2]`.

You can **see** some set of points if, for each point, the **angle** formed by the point, your position, and the immediate east direction from your position is **in your field of view**.

There can be multiple points at one coordinate. There may be points at your location, and you can always see these points regardless of your rotation. Points do not obstruct your vision to other points.

Return *the maximum number of points you can see*.

**Constraints:**
- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `location.length == 2`
- `0 <= angle < 360`
- `0 <= posx, posy, xi, yi <= 100`

---

## Examples

```
Example 1:
  Input: points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
  Output: 3
  Explanation: The shaded region represents your field of view. All points can be made visible in your field of view,
    including [3,3] even though [2,2] is in front and in the same line of sight.
```

```
Example 2:
  Input: points = [[2,1],[2,2],[3,4],[1,1]], angle = 90, location = [1,1]
  Output: 4
  Explanation: All points can be made visible in your field of view, including the one at your location.
```

```
Example 3:
  Input: points = [[1,0],[2,1]], angle = 13, location = [1,1]
  Output: 1
  Explanation: You can only see one of the two points.
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
