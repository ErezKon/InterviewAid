# 2259. Remove Digit From Number to Maximize Result

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-digit-from-number-to-maximize-result](https://leetcode.com/problems/remove-digit-from-number-to-maximize-result)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Problem Description
Given a string `number` representing a non‑negative integer and a single digit character `digit`, remove exactly one occurrence of `digit` from `number` so that the resulting string represents the largest possible integer. Return the resulting string (without leading zeros).

## Examples
**Example 1**
```
Input: number = "123", digit = "3"
Output: "12"
Explanation: Removing the only '3' yields "12", which is the maximum.
```
**Example 2**
```
Input: number = "133235", digit = "3"
Output: "13335"
Explanation: Removing the second '3' gives the largest value.
```

## Approach
Iterate over all positions where `digit` occurs, form the candidate string by skipping that position, and keep the lexicographically greatest candidate (which corresponds to the numerically largest because all candidates have the same length).

```text
FUNCTION maxNumberAfterRemoval(number, digit):
    best ← ""
    FOR i FROM 0 TO LENGTH(number) - 1:
        IF number[i] = digit:
            candidate ← number[0:i] + number[i+1:]
            IF candidate > best:
                best ← candidate
    RETURN best
```

## Walkthrough
For `number = "133235"`, `digit = "3"`:
| i | candidate | best so far |
|---|-----------|------------|
| 1 | "13235"  | "13235" |
| 2 | "13335"  | "13335" (greater) |
| 4 | "13325"  | remains "13335" |
The final best is "13335".

## Complexity Analysis
Time: `O(n)` where `n` is the length of `number` (one pass over characters). 
Space: `O(1)` extra beyond the output string.

## Follow-Up Questions
1. How would you adapt the solution if you could remove up to `k` occurrences of `digit`?
2. What if the input were an integer type rather than a string—how would you avoid overflow?
3. Can you solve the problem in a single pass without storing all candidates?

## Key Takeaway
Scanning all occurrences of the target digit and keeping the maximum candidate yields the optimal result in linear time.
