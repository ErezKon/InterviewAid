# 3894. Traffic Signal Color

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/traffic-signal-color](https://leetcode.com/problems/traffic-signal-color)
**Companies:** Google

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

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
The rules are three disjoint conditions on `timer`, so check them in order and fall back to `"Invalid"`.

**Pseudocode**
```text
FUNCTION trafficSignal(timer):
    IF timer = 0
        RETURN "Green"
    IF timer = 30
        RETURN "Orange"
    IF timer > 30 AND timer <= 90
        RETURN "Red"
    RETURN "Invalid"
```

## Walkthrough
| timer | timer = 0? | timer = 30? | 30 < timer <= 90? | Result |
|-------|------------|-------------|-------------------|--------|
| 60 (Example 1) | no | no | yes | "Red" |
| 5 (Example 2) | no | no | no | "Invalid" |

Both match the expected outputs `"Red"` and `"Invalid"`.

## Complexity Analysis
- Time: O(1) – a constant number of comparisons.
- Space: O(1) – no additional data structures.

## Follow-Up Questions
1. How would you make the thresholds configurable (e.g., a sorted list of interval → color rules)?
2. With many interval rules, how would binary search over interval boundaries help?
3. What test cases cover all boundaries (0, 1, 29, 30, 31, 90, 91)?

## Key Takeaway
For small rule-based classification problems, translate each condition directly and pay close attention to inclusive/exclusive boundaries.
