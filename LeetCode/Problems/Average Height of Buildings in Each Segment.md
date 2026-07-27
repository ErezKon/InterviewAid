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

```
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

## Key Takeaway

> Sweep line turns overlapping interval problems into sorted event processing. Track running sums and counts between events to compute per-segment aggregates.
