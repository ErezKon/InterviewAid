# 1864. Minimum Number of Swaps to Make the Binary String Alternating

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating](https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-binary-string-alternating)
**Companies:** Amazon, Societe Generale

---

## Problem Description

Given a binary string `s`, return *the **minimum** number of character swaps to make it **alternating**, or *`-1`* if it is impossible.*

The string is called **alternating** if no two adjacent characters are equal. For example, the strings `"010"` and `"1010"` are alternating, while the string `"0100"` is not.

Any two characters may be swapped, even if they are **not adjacent**.

**Constraints:**
- `1 <= s.length <= 1000`
- `s[i]` is either `'0'` or `'1'`.

## Examples

**Example 1:**
```
Input: s = "111000"
Output: 1
Explanation: Swap positions 1 and 4: "111000" -> "101010"
The string is now alternating.
```

**Example 2:**
```
Input: s = "010"
Output: 0
Explanation: The string is already alternating, no swaps are needed.
```

**Example 3:**
```
Input: s = "1110"
Output: -1
```

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
