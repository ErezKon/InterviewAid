# 905. Sort Array By Parity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-array-by-parity](https://leetcode.com/problems/sort-array-by-parity)
**Companies:** Amazon, Bloomberg, Couchbase, Ebay, Google, Meta, Microsoft

---

## Problem Description

Given an integer array `nums`, move all even integers to the beginning followed by all odd integers. Any order within evens/odds is acceptable.

### Examples

- **Input:** `nums = [3,1,2,4]` → **Output:** `[2,4,3,1]` (any valid reordering)
- **Input:** `nums = [0]` → **Output:** `[0]`

## Approach: Two Pointers — O(n) ✅

**Key Insight:** Partition using two pointers from both ends. Swap odd-at-left with even-at-right.

```
FUNCTION sortArrayByParity(nums):
    lo, hi = 0, n - 1
    WHILE lo < hi:
        IF nums[lo] % 2 == 1:
            SWAP(nums[lo], nums[hi])
            hi -= 1
        ELSE:
            lo += 1
    RETURN nums
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |
