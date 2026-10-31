# 2380. Time Needed to Rearrange a Binary String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string](https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string)
**Companies:** Amazon, Paypal, Salesforce, Servicenow, Wayfair

---

## Problem Description

You are given a binary string `s`. In one second, **all** occurrences of `"01"` are **simultaneously** replaced with `"10"`. This process **repeats** until no occurrences of `"01"` exist.

Return *the number of seconds needed to complete this process.*

**Constraints:**
- `1 <= s.length <= 1000`
- `s[i]` is either `'0'` or `'1'`.

**Follow up:** Can you solve this problem in O(n) time complexity?

## Examples

**Example 1:**
```
Input: s = "0110101"
Output: 4
Explanation:
After one second, s becomes "1011010".
After another second, s becomes "1101100".
After the third second, s becomes "1110100".
After the fourth second, s becomes "1111000".
No occurrence of "01" exists any longer, and the process needed 4 seconds to complete,
so we return 4.
```

**Example 2:**
```
Input: s = "11100"
Output: 0
Explanation:
No occurrence of "01" exists in s, and the processes needed 0 seconds to complete,
so we return 0.
```

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

## Follow-Up Questions
1. How would the solution change if multiple `01` replacements could be performed non-simultaneously?
2. Can you extend the algorithm to handle ternary strings with similar swap rules?
3. What is the effect of processing the string from right to left?

## Key Takeaway
Counting zeros and updating the required time with `max(previous+1, zeros)` yields a linear-time solution for the simultaneous `01 → 10` transformation.
