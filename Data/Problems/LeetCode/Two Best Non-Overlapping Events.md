# 2054. Two Best Non-Overlapping Events

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-best-non-overlapping-events](https://leetcode.com/problems/two-best-non-overlapping-events)
**Companies:** Amazon, Google, Grammarly, Jpmorgan, Meta, Microsoft, Razorpay, Tcs

---

## Problem Description

You are given a **0-indexed** 2D integer array of `events` where `events[i] = [startTime_i, endTime_i, value_i]`. The `i`th event starts at `startTime_i` and ends at `endTime_i`, and if you attend this event, you will receive a value of `value_i`. You can choose **at most** **two** **non-overlapping** events to attend such that the sum of their values is **maximized**.

Return *this **maximum** sum.*

Note that the start time and end time is **inclusive**: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time `t`, the next event must start at or after `t + 1`.

**Constraints:**
- `2 <= events.length <= 10^5`
- `events[i].length == 3`
- `1 <= startTime_i <= endTime_i <= 10^9`
- `1 <= value_i <= 10^6`

## Examples

**Example 1:**
```
Input: events = [[1,3,2],[4,5,2],[2,4,3]]
Output: 4
Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.
```

**Example 2:**
```
Input: events = [[1,3,2],[4,5,2],[1,5,5]]
Output: 5
Explanation: Choose event 2 for a sum of 5.
```

**Example 3:**
```
Input: events = [[1,5,3],[1,5,1],[6,6,5]]
Output: 8
Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.
```

## Approach
Sort events by start time. Pre-compute a suffix array `suffixMax[i]` storing the maximum event value from index `i` to end. For each event `i`, binary-search the first event `j` whose start time is greater than `events[i].end`. The best total using event `i` is `events[i].value + suffixMax[j]`. Track the maximum over all `i` and also the single-event maximum.

## Walkthrough
| i | Event (s,e,v) | Binary search j | suffixMax[j] | candidate sum |
|---|---------------|----------------|--------------|---------------|
|0|[1,3,2]|j=1 (start 4) | max value from 1.. = 2 | 2+2=4 |
|1|[4,5,2]|j=3 (out of range) | 0 | 2 |
|2|[2,4,3]|j=3 |0|3 |
Maximum = 4.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting and binary searches.
- **Space:** `O(n)` for the suffix max array.

## Follow-Up Questions
1. How would you extend the solution to select `k` non-overlapping events?
2. Can you solve the problem in `O(n)` after sorting using a two-pointer technique?
3. What changes are needed if events can share endpoints (i.e., end == start is allowed)?

## Key Takeaway
Sorting by start time and using a suffix-max array enables constant-time lookup of the best compatible event for each candidate, yielding an efficient `O(n log n)` solution.

## Approach: Sort + Binary Search + Suffix Max — O(n log n) ✅

```
FUNCTION maxTwoEvents(events):
    SORT events by start time
    n = len(events)

    // Suffix max values
    suffixMax = [0] * (n + 1)
    FOR i ← n - 1 DOWN TO 0:
        suffixMax[i] = MAX(events[i][2], suffixMax[i + 1])

    maxVal = 0
    FOR i ← 0 TO n - 1:
        // Take event i alone
        maxVal = MAX(maxVal, events[i][2])

        // Find first event starting after events[i] ends
        j = bisect_right(starts, events[i][1])
        IF j < n:
            maxVal = MAX(maxVal, events[i][2] + suffixMax[j])

    RETURN maxVal
```
