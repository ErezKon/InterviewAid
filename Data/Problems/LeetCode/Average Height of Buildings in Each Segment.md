# 2015. Average Height of Buildings in Each Segment

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/average-height-of-buildings-in-each-segment](https://leetcode.com/problems/average-height-of-buildings-in-each-segment)
**Companies:** Microsoft

---

## 1. Problem Description

Given `buildings` where each entry is `[start, end, height]`, compute the average height of overlapping buildings for each contiguous segment along the number line.

---

## 2. Key Insight

> Use a **sweep line** with events at each start/end. Track sum of heights and count of active buildings. Between consecutive events, average = sum / count.

---

## 3. Approach: Sweep Line — O(n log n) ✅

```text
FUNCTION averageHeightOfBuildings(buildings):
    events = []
    FOR start, end, height IN buildings:
        events.ADD((start, +height, +1))
        events.ADD((end, -height, -1))
    SORT events by position

    result = []
    sumH = 0; count = 0; prevX = -1
    FOR x, dh, dc IN events:
        IF count > 0 AND x > prevX:
            avg = sumH / count
            IF result AND result[-1][2] == avg:
                result[-1][1] = x    // merge
            ELSE:
                result.ADD([prevX, x, avg])
        sumH += dh; count += dc
        prevX = x
    RETURN result
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## Examples

**Example 1:**
```
buildings = [[1,5,10],[2,6,20],[4,8,30]]
output = [[1,2,10],[2,4,15],[4,5,20],[5,6,25],[6,8,30]]
```
*Explanation:* Between 1‑2 only the first building is active (avg = 10). Between 2‑4 two buildings (10+20)/2 = 15, etc.

**Example 2:**
```
buildings = [[0,3,5],[3,7,5]]
output = [[0,7,5]]
```
*Explanation:* No overlap, average height stays 5 throughout.

---

## Walkthrough

| Step | Event | Active Buildings (height) | SumH | Count | Segment Avg |
|------|-------|---------------------------|------|-------|-------------|
| 1 | (1, +10, +1) | [10] | 10 | 1 | — |
| 2 | (2, +20, +1) | [10,20] | 30 | 2 | avg between 1‑2 = 10 |
| 3 | (4, +30, +1) | [10,20,30] | 60 | 3 | avg between 2‑4 = 15 |
| 4 | (5, -10, -1) | [20,30] | 50 | 2 | avg between 4‑5 = 20 |
| 5 | (6, -20, -1) | [30] | 30 | 1 | avg between 5‑6 = 25 |
| 6 | (8, -30, -1) | [] | 0 | 0 | avg between 6‑8 = 30 |

---

## Complexity Analysis

- **Time:** O(n log n) for sorting the 2n events.
- **Space:** O(n) to store events and the result list.

---

## Key Takeaway

> Sweep line turns overlapping interval problems into sorted event processing. Track running sums and counts between events to compute per-segment aggregates.
