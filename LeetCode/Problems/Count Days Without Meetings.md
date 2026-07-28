# 3169. Count Days Without Meetings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-days-without-meetings](https://leetcode.com/problems/count-days-without-meetings)
**Companies:** Amazon, Google, Microsoft, Swiggy

---

## Problem Description
Given an integer `days` representing the total number of days in a year and a list of meeting intervals `meetings` where each interval is `[start, end]` (inclusive), determine how many days have no meetings scheduled. Meetings may overlap.

## Examples
**Example 1:**
```
Input: days = 10, meetings = [[1,2],[4,7],[9,10]]
Output: 2
Explanation: Days 3 and 8 have no meetings.
```
**Example 2:**
```
Input: days = 5, meetings = [[1,5]]
Output: 0
Explanation: Every day has a meeting.
```

## Approach
Sort the intervals by start time and merge overlapping ones while tracking the end of the last merged interval. For each gap between the previous end and the next start, add the length of the gap to the free‑day count. After processing all intervals, add the remaining days after the last meeting.

### Pseudocode
```text
FUNCTION countDays(days, meetings):
    SORT meetings BY start ASC
    SET free ← 0
    SET end ← 0
    FOR each interval IN meetings:
        SET start ← interval[0]
        SET finish ← interval[1]
        IF start > end + 1:
            SET free ← free + (start - end - 1)
        SET end ← MAX(end, finish)
    SET free ← free + (days - end)
    RETURN free
```

## Walkthrough
Consider `days = 10, meetings = [[1,2],[4,7],[9,10]]`.
| Step | start | end (prev) | free added | new end |
|------|-------|------------|------------|---------|
| Init | - | 0 | 0 | 0 |
| Interval [1,2] | 1 | 0 | 0 (1 ≤ 0+1) | 2 |
| Interval [4,7] | 4 | 2 | 4‑2‑1 = 1 (day 3) | 7 |
| Interval [9,10] | 9 | 7 | 9‑7‑1 = 1 (day 8) | 10 |
| After loop | - | 10 | 10‑10 = 0 | - |
Total free days = 1+1 = 2.

## Complexity Analysis
Sorting dominates the runtime: **Time O(m log m)** where *m* is the number of meetings. The scan is linear, so overall **O(m log m)** time and **O(1)** extra space.

## Follow-Up Questions
1. How would you handle queries that add or remove meetings dynamically?
2. What if meetings are given as a stream and you must output free days after each insertion?
3. Can you extend the solution to return the actual list of free day intervals?

## Key Takeaway
Sorting and merging intervals lets you count uncovered days in a single pass.
