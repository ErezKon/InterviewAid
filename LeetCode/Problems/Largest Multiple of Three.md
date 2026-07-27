# 1363. Largest Multiple of Three

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-multiple-of-three](https://leetcode.com/problems/largest-multiple-of-three)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

Given an array of digits, return the largest number (as a string) that is divisible by 3, using any subset of digits. Return `""` if impossible.

---

## 2. Key Insight

A number is divisible by 3 iff its digit sum is divisible by 3. Compute `total % 3`. If not 0, remove the fewest/smallest digits with matching remainder.

---

## 3. Approach: Greedy + Remainder — O(n log n) ✅

```
FUNCTION largestMultipleOfThree(digits):
    SORT digits descending
    total = SUM(digits)
    rem = total % 3
    IF rem == 0: join and return

    // Group digits by remainder
    r1 = sorted digits with d%3==1
    r2 = sorted digits with d%3==2

    IF rem == 1:
        remove smallest from r1 (1 digit), OR two smallest from r2
    IF rem == 2:
        remove smallest from r2 (1 digit), OR two smallest from r1

    Sort remaining descending, join
    Handle leading zeros → return "0" if all zeros
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Divisibility by 3 = digit sum % 3 == 0. Remove fewest digits with the right remainder to make sum divisible. Prefer removing 1 digit over 2.
