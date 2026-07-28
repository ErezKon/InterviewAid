# 3894. Traffic Signal Color

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/traffic-signal-color](https://leetcode.com/problems/traffic-signal-color)
**Companies:** Google

---

## Problem Description
A traffic signal cycles through three colors in order: **Green → Yellow → Red → Green**. You are given an integer `n` representing the number of seconds that have elapsed since the signal started at Green at time `0`. Return the color of the signal at second `n`.

## Examples
**Example 1:**
```
Input: n = 0
Output: "Green"
Explanation: At time 0 the signal is Green.
```

**Example 2:**
```
Input: n = 5
Output: "Red"
Explanation: Cycle length is 3 seconds. 5 mod 3 = 2 → third color Red.
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
