# 2896. Apply Operations to Make Two Strings Equal

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/apply-operations-to-make-two-strings-equal
**Companies:** Zeta
---

## Problem Description
Given two strings `s1` and `s2` of equal length and an integer `x`, you may perform the following operation any number of times: choose an index `i` where `s1[i] != s2[i]` and either flip the character at `i` in `s1` (cost `x/2`) or swap mismatched characters at two indices `i` and `j` (cost `|i - j|`). Determine the minimum total cost to make `s1` equal to `s2`, or return `-1` if impossible.

## Examples
**Example 1**
```
Input: s1 = "abc", s2 = "bca", x = 4
Output: 3
Explanation: Swap positions 0 and 1 (cost 1) and flip position 2 (cost 2).
```
**Example 2**
```
Input: s1 = "abc", s2 = "def", x = 2
Output: -1
Explanation: Number of mismatches is odd, cannot be resolved.
```

## Approach
1. Identify all mismatch indices.
2. If the count of mismatches is odd, return `-1`.
3. Use dynamic programming where `dp[i]` is the minimum cost to resolve the first `i` mismatches.
   - Pair the last two mismatches: cost = distance between them.
   - Flip the last mismatch alone: cost = `x/2`.
   Choose the cheaper option at each step.

```text
FUNCTION minOperations(s1, s2, x):
    diffs ← []
    FOR i ← 0 TO LENGTH(s1)-1:
        IF s1[i] != s2[i]:
            APPEND i TO diffs
    m ← LENGTH(diffs)
    IF m MOD 2 != 0:
        RETURN -1
    dp ← ARRAY of size m+1 filled with 0
    dp[0] ← 0
    dp[1] ← x / 2
    FOR i ← 2 TO m:
        pairCost ← diffs[i-1] - diffs[i-2]
        flipCost ← x / 2
        dp[i] ← MIN(dp[i-2] + pairCost, dp[i-1] + flipCost)
    RETURN dp[m]
```

## Walkthrough
For `s1 = "abc", s2 = "bca", x = 4`:
- Mismatch indices: [0,1,2] (m = 3, odd → impossible) → returns -1.
If we change `s2` to `"bac"`, mismatches are [0,2].
- Pair cost = 2, flip cost = 2 → dp[2] = 2.
Result = 2.

## Complexity Analysis
*Time*: O(n) to collect mismatches plus O(m) DP, overall O(n).
*Space*: O(m) for the `diffs` list and DP array.

## Follow‑Up Questions
1. How would the solution change if swapping any two mismatched characters incurs a fixed cost instead of distance?
2. Can you extend the DP to handle a third operation type, such as rotating a substring?
3. What is the optimal strategy when `x` is very large compared to any possible distance?

## Key Takeaway
Transform the problem into a DP over mismatch positions, choosing between pairing adjacent mismatches (distance cost) or flipping individually (fixed half‑cost).
