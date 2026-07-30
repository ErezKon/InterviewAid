# 2311. Longest Binary Subsequence Less Than or Equal to K

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Find the longest subsequence of a binary string whose value (as a binary number) is ≤ `k`.

---

## 2. Examples

**Example 1:**
```
Input: s = "100101", k = 5
Output: 5
Explanation: The subsequence "00011" (positions 2,3,4,5,6) has binary value 3 which is ≤ 5 and length 5.
```

**Example 2:**
```
Input: s = "111", k = 2
Output: 2
Explanation: The longest valid subsequence is "01" (choose the last two bits), value 1 ≤ 2.
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
