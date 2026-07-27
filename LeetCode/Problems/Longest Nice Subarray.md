# 2401. Longest Nice Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-nice-subarray](https://leetcode.com/problems/longest-nice-subarray)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Paytm

---

## 1. Problem Description

Find the longest subarray where every pair of elements bitwise AND to 0 ("nice" subarray).

---

## 2. Approach: Sliding Window + Bitmask — O(n) ✅

```
FUNCTION longestNiceSubarray(nums):
    used = 0; left = 0; maxLen = 0

    FOR right ← 0 TO n - 1:
        WHILE used & nums[right] != 0:
            used ^= nums[left]
            left += 1
        used |= nums[right]
        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Track OR of all window bits in `used`. Conflict = `used & nums[right] != 0` (overlapping bits). Shrink from left using XOR to remove bits. Max window ≤ 30 elements (one per bit).
