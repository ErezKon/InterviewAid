# 1629. Slowest Key

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/slowest-key](https://leetcode.com/problems/slowest-key)
**Companies:** Jpmorgan

---

## Problem Description

A newly designed keypad was tested by pressing keys one at a time. You are given a string `keysPressed` of length `n` and an array `releaseTimes` where `releaseTimes[i]` is the time the `i`-th key was released. The `i`-th keypress had a duration of `releaseTimes[i] - releaseTimes[i-1]` (with `releaseTimes[-1] = 0`).

Return the key with the **longest duration**. If there is a tie, return the lexicographically largest key.

### Examples

**Example 1:**
- **Input:** `releaseTimes = [9,29,49,50]`, `keysPressed = "cbcd"`
- **Output:** `"c"`
- **Explanation:** Durations: c=9, b=20, c=20, d=1. Tie between b and c (20 each), `'c' > 'b'`.

**Example 2:**
- **Input:** `releaseTimes = [12,23,36,46,62]`, `keysPressed = "spuda"`
- **Output:** `"a"`

### Constraints

- `releaseTimes.length == n == keysPressed.length`
- `2 <= n <= 1000`
- `1 <= releaseTimes[i] <= 10⁹`
- `releaseTimes` is sorted in non-decreasing order.

---

## Approach: Linear Scan — O(n) ✅

```
FUNCTION slowestKey(releaseTimes, keysPressed):
    maxDur = releaseTimes[0]
    result = keysPressed[0]

    FOR i ← 1 TO n-1:
        dur = releaseTimes[i] - releaseTimes[i-1]
        IF dur > maxDur OR (dur == maxDur AND keysPressed[i] > result):
            maxDur = dur
            result = keysPressed[i]

    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(1) |
