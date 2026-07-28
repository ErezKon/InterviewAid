# 1864. Minimum Number of Swaps to Make the Binary String Alternating

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating)
**Companies:** Amazon, Societe Generale

---

## Problem Description
Given a binary string `s` consisting only of `'0'` and `'1'`, you may swap any two characters. Return the minimum number of swaps required to transform `s` into an alternating string (no two adjacent characters are the same). If it is impossible, return `-1`.

## Examples
| s | Output | Explanation |
|---|---|---|
| "111000" | 1 | Swap the first `'1'` with the last `'0'` to get `"101010"`. |
| "010" | 0 | Already alternating. |
| "000" | -1 | Cannot form an alternating string because counts differ by more than one. |

## Approach
An alternating string must follow one of two patterns depending on the starting character: `0101…` or `1010…`. Count mismatches for each pattern; the number of swaps needed equals half the mismatch count (each swap fixes two positions). Choose the feasible pattern with the smaller swap count.

### Pseudocode
```text
FUNCTION minSwapsAlternating(s):
    SET n ← LENGTH(s)
    // Count zeros and ones
    SET zeros ← COUNT of '0' in s
    SET ones ← n - zeros
    // If length is even, counts must be equal; if odd, difference ≤ 1
    IF ABS(zeros - ones) > 1:
        RETURN -1
    // Helper to compute mismatches for a given start char
    FUNCTION mismatches(startChar):
        SET mism ← 0
        FOR i ← 0 TO n-1:
            SET expected ← startChar IF i % 2 = 0 ELSE OPPOSITE(startChar)
            IF s[i] ≠ expected:
                INCREMENT mism
        RETURN mism
    // Determine feasible start characters
    SET best ← INFINITY
    IF zeros ≥ ones:
        SET best ← MIN(best, mismatches('0') / 2)
    IF ones >= zeros:
        SET best ← MIN(best, mismatches('1') / 2)
    RETURN best
```

## Walkthrough
For `s = "111000"` (n=6, zeros=3, ones=3): both patterns possible.
- Pattern `010101`: mismatches at positions 0,2,4 → 3 mismatches → swaps = 3/2 = 1 (integer division).
- Pattern `101010`: mismatches at positions 1,3,5 → also 3 mismatches.
Minimum swaps = 1.

## Complexity Analysis
- **Time:** O(n) – single pass to count and compute mismatches.
- **Space:** O(1) – only counters.

## Follow-Up Questions
- How would you adapt the solution if swapping adjacent characters only is allowed?
- Can the algorithm be extended to strings with more than two distinct characters?
- What is the minimum number of flips (changing a character) instead of swaps?

## Key Takeaway
By comparing the string against the two possible alternating patterns, the minimal swaps equal half the mismatched positions for the feasible pattern.
