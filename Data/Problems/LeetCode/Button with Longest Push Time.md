# 3386. Button with Longest Push Time

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/button-with-longest-push-time](https://leetcode.com/problems/button-with-longest-push-time)
**Companies:** Amazon, Jpmorgan

---

## 1. Problem Description

You are given a 2D array `events` which represents a sequence of events where a child pushes a series of buttons on a keyboard.

Each `events[i] = [index_i, time_i]` indicates that the button at index `index_i` was pressed at time `time_i`.

- The array is **sorted** in increasing order of `time`.
- The time taken to press a button is the difference in time between consecutive button presses. The time for the first button is simply the time at which it was pressed.

Return the `index` of the button that took the **longest** time to push. If multiple buttons have the same longest time, return the button with the **smallest** `index`.

**Constraints:**
- `1 <= events.length <= 1000`
- `events[i] == [index_i, time_i]`
- `1 <= index_i, time_i <= 10^5`
- The input is generated such that `events` is sorted in increasing order of `time_i`.

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
Input: events = [[1,2],[2,5],[3,9],[1,15]]
Output: 1
Explanation: - Button with index 1 is pressed at time 2.
- Button with index 2 is pressed at time 5, so it took 5 - 2 = 3 units of time.
- Button with index 3 is pressed at time 9, so it took 9 - 5 = 4 units of time.
- Button with index 1 is pressed again at time 15, so it took 15 - 9 = 6 units of time.
```

**Example 2:**
```
Input: events = [[10,5],[1,7]]
Output: 10
Explanation: - Button with index 10 is pressed at time 5.
- Button with index 1 is pressed at time 7, so it took 7 - 5 = 2 units of time.
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
- Can you extend the solution to return the top-k longest durations?
- What if events are not sorted by time?

---

## Key Takeaway

> Compute each button's push duration as the time difference from the previous event. Track the maximum with tie-breaking on index.
