# 2165. Smallest Value of the Rearranged Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-value-of-the-rearranged-number](https://leetcode.com/problems/smallest-value-of-the-rearranged-number)
**Companies:** Cognizant, Microsoft

---

## Problem Description

Given an integer `num`, rearrange its digits to form the smallest possible number that has no leading zeros. If `num` is negative, form the largest magnitude (most negative).

### Examples

- **Input:** `num = 310` → **Output:** `103`
- **Input:** `num = -7605` → **Output:** `-7650`

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
