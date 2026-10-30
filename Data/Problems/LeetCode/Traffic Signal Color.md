# 3894. Traffic Signal Color

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/traffic-signal-color](https://leetcode.com/problems/traffic-signal-color)
**Companies:** Google

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented "mod 3 cycle" problem. Correct idea: direct checks — `timer == 0` → "Green", `timer == 30` → "Orange", `30 < timer <= 90` → "Red", otherwise "Invalid". O(1).*

You are given an integer `timer` representing the remaining time (in seconds) on a traffic signal.

The signal follows these rules:

- If `timer == 0`, the signal is `"Green"`
- If `timer == 30`, the signal is `"Orange"`
- If `30 < timer <= 90`, the signal is `"Red"`

Return the current state of the signal. If none of the above conditions are met, return `"Invalid"`.

**Constraints:**
- `0 <= timer <= 1000`

## Examples

**Example 1:**
```
Input: timer = 60
Output: "Red"
Explanation: Since timer = 60, and 30 < timer <= 90, the answer is "Red".
```

**Example 2:**
```
Input: timer = 5
Output: "Invalid"
Explanation: Since timer = 5, it does not satisfy any of the given conditions, the answer is "Invalid".
```

## Approach
The colors repeat every 3 seconds. Compute `n mod 3` and map the remainder to the corresponding color.

**Pseudocode**
```text
FUNCTION trafficSignalColor(n):
    SET remainder ← n MOD 3
    IF remainder = 0:
        RETURN "Green"
    ELSE IF remainder = 1:
        RETURN "Yellow"
    ELSE:
        RETURN "Red"
```

## Walkthrough
| n | n mod 3 | Color |
|---|---------|-------|
| 0 | 0 | Green |
| 1 | 1 | Yellow |
| 2 | 2 | Red |
| 3 | 0 | Green |
| 5 | 2 | Red |

## Complexity Analysis
- Time: O(1) – only a constant‑time modulo operation.
- Space: O(1) – no additional data structures.

## Follow-Up Questions
1. How would you handle a signal with a custom sequence of colors and varying durations for each color?
2. What if the signal starts at a different initial color?
3. Can you extend the solution to support multiple independent signals synchronizing their cycles?

## Key Takeaway
A traffic light’s color can be determined by a simple modulo operation because its cycle repeats uniformly every three seconds.
