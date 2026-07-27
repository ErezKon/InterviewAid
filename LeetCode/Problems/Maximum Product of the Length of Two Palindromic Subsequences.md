# 2002. Maximum Product of the Length of Two Palindromic Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences](https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences)
**Companies:** Ascend, Google

---

## Problem Description
Given string `s`, find two **disjoint** subsequences that are both palindromes. Maximize the **product of their lengths**.

## Key Insight
> `|s| ≤ 12` → enumerate all 3^n or 2^n subsets. For each bitmask, check if the subsequence is a palindrome. Then for all disjoint pairs of palindromic masks, maximize the product.

## Approach
```
FUNCTION maxProduct(s)
    n ← len(s)
    // Precompute: for each bitmask, is the subsequence a palindrome?
    palLen ← map from mask → palindrome length (0 if not palindrome)

    FOR mask ← 1 TO 2^n - 1 DO
        subseq ← characters of s selected by mask
        IF subseq is palindrome THEN palLen[mask] ← len(subseq)

    best ← 0
    FOR mask1 in palLen DO
        complement ← ((2^n - 1) XOR mask1)
        // Enumerate submasks of complement
        mask2 ← complement
        WHILE mask2 > 0 DO
            IF mask2 IN palLen THEN
                best ← MAX(best, palLen[mask1] × palLen[mask2])
            mask2 ← (mask2 - 1) & complement
    RETURN best
END FUNCTION
```

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(3^n)** — submask enumeration |
| Space  | **O(2^n)** — palindrome cache |

## Key Takeaway
> **Bitmask DP with submask enumeration** — small `n` allows brute-force over all subset pairs. Check palindrome + disjointness via bitmask AND.
