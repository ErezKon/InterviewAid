# 2054. Two Best Non-Overlapping Events

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-best-non-overlapping-events](https://leetcode.com/problems/two-best-non-overlapping-events)
**Companies:** Amazon, Google, Grammarly, Jpmorgan, Meta, Microsoft, Razorpay, Tcs

---

## Problem Description
You are given an array `events` where each event is represented as `[start, end, value]`. An event starts at time `start`, ends at time `end` (inclusive), and yields `value` points if attended. Choose at most two non‑overlapping events to maximize the total value. Return the maximum sum of values.

## Examples
**Example 1:**
Input: `events = [[1,3,2],[4,5,2],[2,4,3]]`
Output: `4`
Explanation: Choose events `[1,3,2]` and `[4,5,2]` for a total of `4`.

**Example 2:**
Input: `events = [[1,5,5],[2,3,1],[4,6,4]]`
Output: `9`
Explanation: Choose events `[1,5,5]` and `[4,6,4]` (they overlap at time 4, so not allowed). Best is `[1,5,5]` alone = `5` or `[2,3,1]` + `[4,6,4]` = `5`. Hence answer `5`.

## Approach
Sort events by start time. Pre‑compute a suffix array `suffixMax[i]` storing the maximum event value from index `i` to end. For each event `i`, binary‑search the first event `j` whose start time is greater than `events[i].end`. The best total using event `i` is `events[i].value + suffixMax[j]`. Track the maximum over all `i` and also the single‑event maximum.

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

## Follow‑Up Questions
1. How would you extend the solution to select `k` non‑overlapping events?
2. Can you solve the problem in `O(n)` after sorting using a two‑pointer technique?
3. What changes are needed if events can share endpoints (i.e., end == start is allowed)?

## Key Takeaway
Sorting by start time and using a suffix‑max array enables constant‑time lookup of the best compatible event for each candidate, yielding an efficient `O(n log n)` solution.

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
