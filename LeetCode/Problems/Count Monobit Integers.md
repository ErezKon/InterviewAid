# 3827. Count Monobit Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-monobit-integers](https://leetcode.com/problems/count-monobit-integers)
**Companies:** Zoho

---

## 1. Problem Description

Count integers in a given range where the number of set bits (1s) in binary is odd (monobit condition).

---

## 2. Approach: Iterate and Popcount — O(n) ✅

```
FUNCTION countMonobit(n):
    count = 0
    FOR i FROM 1 TO n:
        IF popcount(i) % 2 == 1:
            count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Check if the popcount (number of set bits) is odd for each number. For larger ranges, digit DP can compute this in O(log n).
