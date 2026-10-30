# 2165. Smallest Value of the Rearranged Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-value-of-the-rearranged-number](https://leetcode.com/problems/smallest-value-of-the-rearranged-number)
**Companies:** Cognizant, Microsoft

---

## Problem Description

You are given an integer `num`. **Rearrange** the digits of `num` such that its value is **minimized** and it does not contain **any** leading zeros.

Return *the rearranged number with minimal value*.

Note that the sign of the number does not change after rearranging the digits.

**Constraints:**
- `-10¹⁵ <= num <= 10¹⁵`

### Examples

```
Example 1:
  Input: num = 310
  Output: 103
  Explanation: The possible arrangements for the digits of 310 are 013, 031, 103, 130, 301, 310.
    The arrangement with the smallest value that does not contain any leading zeros is 103.
```

```
Example 2:
  Input: num = -7605
  Output: -7650
  Explanation: Some possible arrangements for the digits of -7605 are -7650, -6705, -5076, -0567.
    The arrangement with the smallest value that does not contain any leading zeros is -7650.
```

## Approach: Sort Digits — O(d log d) ✅

**Key Insight:** For positive numbers, sort digits ascending and swap the first non-zero digit to the front. For negative numbers, sort digits descending.

```
FUNCTION smallestNumber(num):
    IF num == 0: RETURN 0
    IF num > 0:
        digits = SORT(str(num))
        // Swap first non-zero to front
        FOR i ← 0 TO len(digits)-1:
            IF digits[i] != '0':
                SWAP(digits[0], digits[i])
                BREAK
        RETURN int(JOIN(digits))
    ELSE:
        digits = SORT(str(-num), reverse=true)
        RETURN -int(JOIN(digits))
```

### Complexity

| | |
|---|---|
| **Time** | O(d log d) — d = number of digits |
| **Space** | O(d) |
