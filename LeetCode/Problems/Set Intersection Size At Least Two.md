# 757. Set Intersection Size At Least Two

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/set-intersection-size-at-least-two](https://leetcode.com/problems/set-intersection-size-at-least-two)
**Companies:** Amazon, Dp World, Drawbridge, Google, Meta, Microsoft

---

## Problem Description

Given a list of intervals, find the minimum size of a set `S` such that `S` intersects each interval in at least **2** points.

---

## Examples

**Example 1:**
```
Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
Output: 3
Explanation: One optimal set is {2,3,4}. Each interval contains at least two of these points.
```
**Example 2:**
```
Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
Output: 4
Explanation: Set {1,2,4,5} satisfies the requirement.
```

---

## Approach: Greedy — O(n log n) ✅

```text
FUNCTION intersectionSizeTwo(intervals):
    // Sort by end ascending; for ties, start descending
    SORT intervals BY end ASC, start DESC
    last1 ← -1   // largest selected point
    last2 ← -1   // second largest selected point
    count ← 0
    FOR each [start, end] IN intervals:
        IF start > last1:
            // interval misses both selected points → add two new points
            last2 ← end - 1
            last1 ← end
            count ← count + 2
        ELSE IF start > last2:
            // interval misses only the second largest point → add one new point
            last2 ← last1
            last1 ← end
            count ← count + 1
    RETURN count
```

The greedy choice always picks the rightmost possible points, which leaves maximal flexibility for upcoming intervals.

---

## Walkthrough

Consider intervals `[[1,3],[1,4],[2,5],[3,5]]` after sorting:

| Step | Interval | Condition | Action | last2 | last1 | Set size |
|------|----------|-----------|--------|------|------|----------|
| 1 | [1,3] | start(1) > last1(-1) | add 2 points (2,3) | 2 | 3 | 2 |
| 2 | [1,4] | start(1) ≤ last1(3) and start(1) ≤ last2(2) | no addition | 2 | 3 | 2 |
| 3 | [2,5] | start(2) ≤ last1(3) but > last2(2) | add 1 point (5) | 3 | 5 | 3 |
| 4 | [3,5] | start(3) ≤ last1(5) and ≤ last2(3) | no addition | 3 | 5 | 3 |

Final set size = 3.

---

## Complexity Analysis

- **Time:** O(n log n) for sorting the intervals; the greedy scan is O(n).
- **Space:** O(1) extra space beyond the input list.

---

## Follow-Up Questions

1. How would the algorithm change if each interval required at least **k** intersecting points?
2. Can you adapt the solution to work with streaming intervals where the full list is not known upfront?
3. What if intervals can be nested and you need to minimize the sum of selected points instead of count?

---

## Key Takeaway

Sorting intervals by their right endpoint and greedily picking the farthest possible points yields the smallest set that intersects every interval at least twice.
