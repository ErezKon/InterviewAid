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

A bus has `n` stops numbered from `0` to `n - 1` that form a circle. We know the distance between all pairs of neighboring stops where `distance[i]` is the distance between the stops number `i` and `(i + 1) % n`.

The bus goes along both directions i.e. clockwise and counterclockwise.

Return the shortest distance between the given `start` and `destination` stops.

**Constraints:**
- `1 <= n <= 10^4`
- `distance.length == n`
- `0 <= start, destination < n`
- `0 <= distance[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: distance = [1,2,3,4], start = 0, destination = 1
Output: 1
Explanation: Distance between 0 and 1 is 1 or 9, minimum is 1.
```

**Example 2:**
```
Input: distance = [1,2,3,4], start = 0, destination = 2
Output: 3
Explanation: Distance between 0 and 2 is 3 or 7, minimum is 3.
```

**Example 3:**
```
Input: distance = [1,2,3,4], start = 0, destination = 3
Output: 4
Explanation: Distance between 0 and 3 is 6 or 4, minimum is 4.
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
