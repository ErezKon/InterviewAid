# 3386. Button with Longest Push Time

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/button-with-longest-push-time](https://leetcode.com/problems/button-with-longest-push-time)
**Companies:** Amazon, Jpmorgan

---

## 1. Problem Description

Given an array of `[buttonIndex, time]` events, find the button with the longest push duration. Push duration = time difference between consecutive presses (or from time 0 for the first press). If tied, return the smallest index.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION buttonWithLongestPushTime(events):
    bestButton = events[0][0]
    bestDuration = events[0][1]
    
    FOR i FROM 1 TO len(events) - 1:
        duration = events[i][1] - events[i-1][1]
        IF duration > bestDuration OR (duration == bestDuration AND events[i][0] < bestButton):
            bestButton = events[i][0]
            bestDuration = duration
    
    RETURN bestButton
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Compute each button's push duration as the time difference from the previous event. Track the maximum with tie-breaking on index.
