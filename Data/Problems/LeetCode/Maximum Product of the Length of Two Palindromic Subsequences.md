# 2002. Maximum Product of the Length of Two Palindromic Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences](https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences)
**Companies:** Ascend, Google

---

## Problem Description
Given a string `s`, find two **disjoint palindromic subsequences** of `s` such that the **product** of their lengths is **maximized**. The two subsequences are **disjoint** if they do not both pick a character at the same index.

Return *the **maximum** possible **product** of the lengths of the two palindromic subsequences*.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters. A string is **palindromic** if it reads the same forward and backward.

**Constraints:**
- `2 <= s.length <= 12`
- `s` consists of lowercase English letters only.

## Examples

```
Example 1:
  Input: s = "leetcodecom"
  Output: 9
  Explanation: An optimal solution is to choose "ete" for the 1st subsequence and "cdc" for the 2nd subsequence.
    The product of their lengths is: 3 * 3 = 9.
```

```
Example 2:
  Input: s = "bb"
  Output: 1
  Explanation: An optimal solution is to choose "b" (the first character) for the 1st subsequence and "b" (the second character) for the 2nd subsequence.
    The product of their lengths is: 1 * 1 = 1.
```

```
Example 3:
  Input: s = "accbcaxxcxx"
  Output: 25
  Explanation: An optimal solution is to choose "accca" for the 1st subsequence and "xxcxx" for the 2nd subsequence.
    The product of their lengths is: 5 * 5 = 25.
```

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

## Walkthrough
Consider the first example `"acdapmpomp"` (length 10).
1. Enumerate all masks (2^10‑1 = 1023). For mask representing positions {0,2,4} we get subsequence "aca", which is a palindrome of length 3.
2. Store this length in `palLen[mask]`.
3. Later, when processing mask for "pmpom" (positions {5,6,7,8,9}), its mask is disjoint from the first (bitwise AND = 0).
4. The algorithm examines the pair of masks, multiplies their lengths 3 × 5 = 15 and updates `best`.
5. After all pairs are checked, `best` holds the maximum product 15.

## Complexity Analysis
| Aspect | Complexity |
|--------|-----------|
| Time   | **O(3^n)** — submask enumeration |
| Space  | **O(2^n)** — palindrome cache |

## Follow-Up Questions
- How would you adapt the solution if the string length could be up to 1000?
- Can you modify the approach to return the actual subsequences, not just the product?
- What if the two palindromes must also be of equal length?

## Key Takeaway
> **Bitmask DP with submask enumeration** — small `n` allows brute-force over all subset pairs. Check palindrome + disjointness via bitmask AND.
