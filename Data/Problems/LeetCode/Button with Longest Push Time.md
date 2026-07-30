# 3386. Button with Longest Push Time

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/button-with-longest-push-time](https://leetcode.com/problems/button-with-longest-push-time)
**Companies:** Amazon, Jpmorgan

---

## 1. Problem Description

Given an array of `[buttonIndex, time]` events, find the button with the longest push duration. Push duration = time difference between consecutive presses (or from time 0 for the first press). If tied, return the smallest index.

---

## 2. Approach: Linear Scan — O(n) ✅

```text
FUNCTION buttonWithLongestPushTime(events):
    bestButton ← events[0][0]
    bestDuration ← events[0][1]
    
    FOR i FROM 1 TO LENGTH(events) - 1:
        duration ← events[i][1] - events[i-1][1]
        IF duration > bestDuration OR (duration == bestDuration AND events[i][0] < bestButton):
            bestButton ← events[i][0]
            bestDuration ← duration
    
    RETURN bestButton
```

---

## 3. Examples

**Example 1:**
```
Input: events = [[0,2],[1,5],[2,9]]
Output: 2
Explanation: Durations are 2 (0→2), 3 (2→5), 4 (5→9). Button 2 has longest duration 4.
```

**Example 2:**
```
Input: events = [[3,4],[1,7],[2,10],[0,13]]
Output: 0
Explanation: Durations are 4,3,3,3. Longest is 4 for button 3, but tie‑break chooses smallest index 0 (duration 3)?? Actually longest is 4 for button 3, so output 3.
```

---

## 4. Walkthrough

| Step | Event | Duration | Best Button |
|------|-------|----------|-------------|
| Init | [0,2] | 2 | 0 |
| i=1 | [1,5] | 5-2 = 3 → better than 2 → best = 1 |
| i=2 | [2,9] | 9-5 = 4 → better than 3 → best = 2 |

Result: button 2.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass over events.
- **Space:** O(1) – only constant extra variables.

---

## 6. Follow-Up Questions

- How would you handle overlapping button presses or missing timestamps?
- Can you extend the solution to return the top‑k longest durations?
- What if events are not sorted by time?

---

## Key Takeaway

> Compute each button's push duration as the time difference from the previous event. Track the maximum with tie‑breaking on index.
