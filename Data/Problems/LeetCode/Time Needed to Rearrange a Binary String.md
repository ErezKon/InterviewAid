# 2380. Time Needed to Rearrange a Binary String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string](https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string)
**Companies:** Amazon, Paypal, Salesforce, Servicenow, Wayfair

---

## Problem Description
Given a binary string `s`, in one second every occurrence of the substring `01` can be simultaneously replaced with `10`. The operation repeats until no `01` remains. Return the number of seconds required to eliminate all `01` patterns.

## Examples
| s | Output | Explanation |
|---|--------|-------------|
| `"0110101"` | `4` | Transformations: `0110101 → 1011010 → 1101100 → 1110100 → 1111000` |
| `"111"` | `0` | No `01` pattern exists.

## Approach
Iterate through the string, tracking the number of zeros seen so far. For each `1` that follows a zero, the time needed for that `1` to move past all preceding zeros is `max(previousTime + 1, zeros)`. The maximum of these times is the answer.

```text
FUNCTION secondsToRemoveOccurrences(s):
    SET seconds ← 0
    SET zeros ← 0
    FOR c IN s:
        IF c = '0':
            SET zeros ← zeros + 1
        ELSE IF zeros > 0:
            SET seconds ← MAX(seconds + 1, zeros)
    RETURN seconds
```

## Walkthrough
For `s = "0110101"`:
| Index | char | zeros | seconds (after) |
|-------|------|-------|-----------------|
| 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | MAX(0+1,1)=1 |
| 2 | 1 | 1 | MAX(1+1,1)=2 |
| 3 | 0 | 2 | 2 |
| 4 | 1 | 2 | MAX(2+1,2)=3 |
| 5 | 0 | 3 | 3 |
| 6 | 1 | 3 | MAX(3+1,3)=4 |
Result = 4 seconds.

## Complexity Analysis
*Time*: O(n) – single pass over the string.
*Space*: O(1) – only counters are used.

## Follow‑Up Questions
1. How would the solution change if multiple `01` replacements could be performed non‑simultaneously?
2. Can you extend the algorithm to handle ternary strings with similar swap rules?
3. What is the effect of processing the string from right to left?

## Key Takeaway
Counting zeros and updating the required time with `max(previous+1, zeros)` yields a linear‑time solution for the simultaneous `01 → 10` transformation.
