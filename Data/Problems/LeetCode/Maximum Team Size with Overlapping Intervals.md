# 3893. Maximum Team Size with Overlapping Intervals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-team-size-with-overlapping-intervals](https://leetcode.com/problems/maximum-team-size-with-overlapping-intervals)
**Companies:** Agoda

---

## Problem Description

> *Note: the Approach below counts intervals sharing a common point, but officially a team only needs **one** member who overlaps every other member. Correct idea: for each employee `i`, the employees overlapping `i` number `n − #(end < start_i) − #(start > end_i)`. Compute both counts with binary search on the sorted end and start arrays, and take the max. O(n log n).*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given two integer arrays `startTime` and `endTime` of length `n`.

- `startTime[i]` represents the start time of the `i^th` employee.
- `endTime[i]` represents the end time of the `i^th` employee.

Two employees `i` and `j` can interact if their time intervals **overlap**. Two intervals are considered overlapping if they share **at least one** common time point.

A team is **valid** if there exists **at least one** employee in the team who can interact with every other member of the team.

Return an integer denoting the **maximum** possible size of such a team.

**Constraints:**
- `1 <= n == startTime.length == endTime.length <= 10^5`
- `0 <= startTime[i] <= endTime[i] <= 10^9`

## Examples

**Example 1:**
```
Input: startTime = [1,2,3], endTime = [4,5,6]
Output: 3
Explanation: - For i = 0 with interval [1, 4].
- It overlaps with i = 1 having interval [2, 5] and i = 2 having interval [3, 6].
- Thus, index 0 can interact with all other indices, so the team size is 3.
```

**Example 2:**
```
Input: startTime = [2,5,8], endTime = [3,7,9]
Output: 1
Explanation: - For i = 0, interval [2, 3] does not overlap with [5, 7] or [8, 9].
- For i = 1, interval [5, 7] does not overlap with [2, 3] or [8, 9].
- For i = 2, interval [8, 9] does not overlap with [2, 3] or [5, 7].
- Thus, no index can interact with others, so the maximum team size is 1.
```

**Example 3:**
```
Input: startTime = [3,4,6], endTime = [8,5,7]
Output: 3
Explanation: - For i = 0 with interval [3, 8].
- It overlaps with i = 1 having interval [4, 5] and i = 2 having interval [6, 7].
- Thus, index 0 can interact with all other indices, so the team size is 3.
```

## Approach
The task reduces to finding the maximum number of intervals that share a common intersection. Sort intervals by their start time and maintain a min-heap of end times. While iterating:
1. Push the current interval's end into the heap.
2. Remove from the heap any intervals whose end is **strictly less** than the current start (they cannot overlap with the current interval).
3. The heap size after cleanup equals the number of intervals overlapping at the current start; track the maximum size.
This greedy-heap method runs in O(n log n) time.

## Pseudocode
```text
FUNCTION maximumTeamSize(intervals):
    // Sort intervals by start time
    SORT intervals BY start ASCENDING
    SET minHeap ← EMPTY MIN-HEAP   // stores end times
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

## Follow-Up Questions
1. How would you modify the algorithm to also return the time interval where the maximum overlap occurs?
2. Can the problem be solved in O(n) time if the intervals are already sorted?
3. How would you handle intervals with inclusive/exclusive endpoints differently?

## Key Takeaway
Sorting by start time and using a min-heap of end times efficiently tracks the current overlapping group, yielding the maximum team size in logarithmic time per interval.
