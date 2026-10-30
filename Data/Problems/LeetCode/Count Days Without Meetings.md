# 3169. Count Days Without Meetings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-days-without-meetings](https://leetcode.com/problems/count-days-without-meetings)
**Companies:** Amazon, Google, Microsoft, Swiggy

---

## Problem Description
You are given a positive integer `days` representing the total number of days an employee is available for work (starting from day 1). You are also given a 2D array `meetings` of size `n` where, `meetings[i] = [start_i, end_i]` represents the starting and ending days of meeting `i` (inclusive).

Return the count of days when the employee is available for work but no meetings are scheduled.

**Note:** The meetings may overlap.

**Constraints:**
- `1 <= days <= 10^9`
- `1 <= meetings.length <= 10^5`
- `meetings[i].length == 2`
- `1 <= meetings[i][0] <= meetings[i][1] <= days`

## Examples
```
Example 1:
  Input: days = 10, meetings = [[5,7],[1,3],[9,10]]
  Output: 2
  Explanation: There is no meeting scheduled on the 4th and 8th days.
```

```
Example 2:
  Input: days = 5, meetings = [[2,4],[1,3]]
  Output: 1
  Explanation: There is no meeting scheduled on the 5th day.
```

```
Example 3:
  Input: days = 6, meetings = [[1,6]]
  Output: 0
  Explanation: Meetings are scheduled for all working days.
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
