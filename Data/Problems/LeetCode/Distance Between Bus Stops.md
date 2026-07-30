# 1184. Distance Between Bus Stops

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/distance-between-bus-stops](https://leetcode.com/problems/distance-between-bus-stops)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sum Both Directions](#approach-sum-both-directions)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A bus has `n` stops in a **circular** route. `distance[i]` is the distance between stop `i` and stop `(i+1) % n`. Given `start` and `destination`, return the **shortest** distance between them (traveling clockwise or counterclockwise).

**Constraints:**
- `1 <= n <= 10^4`
- `0 <= start, destination < n`
- `1 <= distance[i] <= 10^4`

---

## Examples

```
Input: distance = [1,2,3,4], start = 0, destination = 1
Output: 1
Explanation: Clockwise 0→1 = 1, Counterclockwise 0→3→2→1 = 4+3+2 = 9. Min = 1.
```

```
Input: distance = [1,2,3,4], start = 0, destination = 3
Output: 4
Explanation: Clockwise 0→1→2→3 = 1+2+3 = 6, Counterclockwise 0→3 = 4. Min = 4.
```

---

## Key Insight

> On a circular route, the two path distances sum to the total circuit length. Compute one direction's distance, then `other = total - one`. Return the smaller.

---

## Approach: Sum Both Directions ✅

```
FUNCTION distanceBetweenBusStops(distance, start, destination):
    IF start > destination THEN SWAP(start, destination)
    
    clockwise ← SUM(distance[start..destination-1])
    total ← SUM(distance)
    
    RETURN MIN(clockwise, total - clockwise)
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Sum the array |
| **Space** | O(1) | Constant extra space |

---

## Key Takeaway

> **On a circular route, two opposing paths sum to the total loop length — compute one and subtract from total to get the other, then return the minimum.**
