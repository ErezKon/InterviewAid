# 2311. Longest Binary Subsequence Less Than or Equal to K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-binary-subsequence-less-than-or-equal-to-k](https://leetcode.com/problems/longest-binary-subsequence-less-than-or-equal-to-k)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

You are given a binary string `s` and a positive integer `k`.

Return *the length of the **longest** subsequence of *`s`* that makes up a **binary** number less than or equal to* `k`.

Note:

- The subsequence can contain **leading zeroes**.
- The empty string is considered to be equal to `0`.
- A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

**Constraints:**
- `1 <= s.length <= 1000`
- `s[i]` is either `'0'` or `'1'`.
- `1 <= k <= 10^9`

---

## 2. Examples

**Example 1:**
```
Input: s = "1001010", k = 5
Output: 5
Explanation: The longest subsequence of s that makes up a binary number less than or equal to 5 is "00010", as this number is equal to 2 in decimal.
Note that "00100" and "00101" are also possible, which are equal to 4 and 5 in decimal, respectively.
The length of this subsequence is 5, so 5 is returned.
```

**Example 2:**
```
Input: s = "00101001", k = 1
Output: 6
Explanation: "000001" is the longest subsequence of s that makes up a binary number less than or equal to 1, as this number is equal to 1 in decimal.
The length of this subsequence is 6, so 6 is returned.
```

---

## 3. Approach: Greedy — O(n) ✅

Take all '0's (they don't increase value). Then greedily add '1's from right to left while value stays ≤ k.

```text
FUNCTION longestSubsequence(s, k):
    // Count zeros – they are always included
    SET zeros ← COUNT of '0' in s
    SET ones ← 0
    SET value ← 0
    FOR i ← LENGTH(s) - 1 DOWN TO 0:
        IF s[i] == '1':
            // Adding this '1' contributes 2^ones to the value
            IF value + (1 << ones) <= k:
                SET value ← value + (1 << ones)
                SET ones ← ones + 1
        // zeros are already counted, no action needed
    RETURN zeros + ones
```

---

## 4. Walkthrough

Consider `s = "100101"`, `k = 5`.

| Index (right→left) | Char | Current value | Ones added | Reason |
|--------------------|------|---------------|------------|--------|
| 5 (last)           | 1    | 0             | 1 (2^0)    | 0+1 ≤ 5 → keep |
| 4                  | 0    | 1             | —          | zero, always kept |
| 3                  | 1    | 1             | 1 (2^1)    | 1+2 ≤ 5 → keep |
| 2                  | 0    | 3             | —          | zero |
| 1                  | 0    | 3             | —          | zero |
| 0 (first)          | 1    | 3             | 1 (2^2)    | 3+4 > 5 → skip |

Zeros counted: 3, ones kept: 2 → total length 5.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

The algorithm scans the string once and uses constant extra memory.

---

## 6. Follow-Up Questions

1. How would the solution change if the subsequence must be contiguous (i.e., a substring)?
2. Can we extend the approach to handle decimal strings with a value limit?
3. What if we need the lexicographically smallest longest subsequence?

---

## 7. Key Takeaway

> All zeros are free (they contribute nothing to value). Greedily add 1s from the right (low-order bits) since they contribute the least value per bit.
