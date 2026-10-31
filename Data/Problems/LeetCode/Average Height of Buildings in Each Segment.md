# 2015. Average Height of Buildings in Each Segment

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/average-height-of-buildings-in-each-segment](https://leetcode.com/problems/average-height-of-buildings-in-each-segment)
**Companies:** Microsoft

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A perfectly straight street is represented by a number line. The street has building(s) on it and is represented by a 2D integer array `buildings`, where `buildings[i] = [start_i, end_i, height_i]`. This means that there is a building with `height_i` in the **half-closed segment** `[start_i, end_i)`.

You want to **describe** the heights of the buildings on the street with the **minimum** number of non-overlapping **segments**. The street can be represented by the 2D integer array `street` where `street[j] = [left_j, right_j, average_j]` describes a **half-closed segment** `[left_j, right_j)` of the road where the **average** heights of the buildings in the** segment** is `average_j`.

- For example, if `buildings = [[1,5,2],[3,10,4]],` the street could be represented by `street = [[1,3,2],[3,5,3],[5,10,4]]` because:

    	- From 1 to 3, there is only the first building with an average height of `2 / 1 = 2`.
    	- From 3 to 5, both the first and the second building are there with an average height of `(2+4) / 2 = 3`.
    	- From 5 to 10, there is only the second building with an average height of `4 / 1 = 4`.

Given `buildings`, return *the 2D integer array *`street`* as described above (**excluding** any areas of the street where there are no buldings). You may return the array in **any order***.

The **average** of `n` elements is the **sum** of the `n` elements divided (**integer division**) by `n`.

A **half-closed segment** `[a, b)` is the section of the number line between points `a` and `b` **including** point `a` and **not including** point `b`.

**Constraints:**
- `1 <= buildings.length <= 10^5`
- `buildings[i].length == 3`
- `0 <= start_i < end_i <= 10^8`
- `1 <= height_i <= 10^5`

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
Input: buildings = [[1,4,2],[3,9,4]]
Output: [[1,3,2],[3,4,3],[4,9,4]]
Explanation: From 1 to 3, there is only the first building with an average height of 2 / 1 = 2.
From 3 to 4, both the first and the second building are there with an average height of (2+4) / 2 = 3.
From 4 to 9, there is only the second building with an average height of 4 / 1 = 4.
```

**Example 2:**
```
Input: buildings = [[1,3,2],[2,5,3],[2,8,3]]
Output: [[1,3,2],[3,8,3]]
Explanation: From 1 to 2, there is only the first building with an average height of 2 / 1 = 2.
From 2 to 3, all three buildings are there with an average height of (2+3+3) / 3 = 2.
From 3 to 5, both the second and the third building are there with an average height of (3+3) / 2 = 3.
From 5 to 8, there is only the last building with an average height of 3 / 1 = 3.
The average height from 1 to 3 is the same so we can group them into one segment.
The average height from 3 to 8 is the same so we can group them into one segment.
```

**Example 3:**
```
Input: buildings = [[1,2,1],[5,6,1]]
Output: [[1,2,1],[5,6,1]]
Explanation: From 1 to 2, there is only the first building with an average height of 1 / 1 = 1.
From 2 to 5, there are no buildings, so it is not included in the output.
From 5 to 6, there is only the second building with an average height of 1 / 1 = 1.
We cannot group the segments together because an empty space with no buildings seperates the segments.
```

---

## Walkthrough

| Step | Event | Active Buildings (height) | SumH | Count | Segment Avg |
|------|-------|---------------------------|------|-------|-------------|
| 1 | (1, +10, +1) | [10] | 10 | 1 | — |
| 2 | (2, +20, +1) | [10,20] | 30 | 2 | avg between 1-2 = 10 |
| 3 | (4, +30, +1) | [10,20,30] | 60 | 3 | avg between 2-4 = 15 |
| 4 | (5, -10, -1) | [20,30] | 50 | 2 | avg between 4-5 = 20 |
| 5 | (6, -20, -1) | [30] | 30 | 1 | avg between 5-6 = 25 |
| 6 | (8, -30, -1) | [] | 0 | 0 | avg between 6-8 = 30 |

---

## Complexity Analysis

- **Time:** O(n log n) for sorting the 2n events.
- **Space:** O(n) to store events and the result list.

---

## Key Takeaway

> Sweep line turns overlapping interval problems into sorted event processing. Track running sums and counts between events to compute per-segment aggregates.
