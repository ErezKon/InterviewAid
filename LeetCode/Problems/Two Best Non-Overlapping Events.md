# 2054. Two Best Non-Overlapping Events

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-best-non-overlapping-events](https://leetcode.com/problems/two-best-non-overlapping-events)
**Companies:** Amazon, Google, Grammarly, Jpmorgan, Meta, Microsoft, Razorpay, Tcs

---

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
