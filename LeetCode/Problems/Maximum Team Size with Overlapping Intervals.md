# 3893. Maximum Team Size with Overlapping Intervals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-team-size-with-overlapping-intervals](https://leetcode.com/problems/maximum-team-size-with-overlapping-intervals)
**Companies:** Agoda

---

## Problem Description
You are given an array `intervals` where each element is a pair `[start, end]` representing the availability of a person. A team can be formed if there exists a time point that lies within **all** intervals of its members (i.e., the intervals overlap). Return the maximum possible size of such a team.

## Examples
**Example 1**
```
Input: intervals = [[1,4],[2,5],[3,6]]
Output: 3
Explanation: All three intervals overlap at time 3‑4, so a team of size 3 is possible.
```
**Example 2**
```
Input: intervals = [[1,2],[3,4],[5,6]]
Output: 1
Explanation: No two intervals overlap; the best we can do is a single‑person team.
```

## Approach
The task reduces to finding the maximum number of intervals that share a common intersection. Sort intervals by their start time and maintain a min‑heap of end times. While iterating:
1. Push the current interval's end into the heap.
2. Remove from the heap any intervals whose end is **strictly less** than the current start (they cannot overlap with the current interval).
3. The heap size after cleanup equals the number of intervals overlapping at the current start; track the maximum size.
This greedy‑heap method runs in O(n log n) time.

## Pseudocode
```text
FUNCTION maximumTeamSize(intervals):
    // Sort intervals by start time
    SORT intervals BY start ASCENDING
    SET minHeap ← EMPTY MIN‑HEAP   // stores end times
    SET maxSize ← 0
    FOR each interval IN intervals:
        SET start ← interval[0]
        SET end ← interval[1]
        // Add current interval's end to heap
        PUSH minHeap WITH end
        // Remove intervals that end before current start
        WHILE minHeap NOT EMPTY AND minHeap.PEEK() < start:
            POP minHeap
        // Current overlapping group size
        SET maxSize ← MAX(maxSize, SIZE(minHeap))
    RETURN maxSize
```

## Walkthrough
For `[[1,4],[2,5],[3,6]]`:
- After sorting, iterate:
  - Interval (1,4): heap=[4], maxSize=1.
  - Interval (2,5): heap=[4,5] (no removal), maxSize=2.
  - Interval (3,6): heap=[4,5,6] (no removal), maxSize=3.
All three intervals overlap, so the answer is 3.

## Complexity Analysis
- **Time:** O(n log n) for sorting plus heap operations.
- **Space:** O(n) in the worst case for the heap.

## Follow‑Up Questions
1. How would you modify the algorithm to also return the time interval where the maximum overlap occurs?
2. Can the problem be solved in O(n) time if the intervals are already sorted?
3. How would you handle intervals with inclusive/exclusive endpoints differently?

## Key Takeaway
Sorting by start time and using a min‑heap of end times efficiently tracks the current overlapping group, yielding the maximum team size in logarithmic time per interval.
