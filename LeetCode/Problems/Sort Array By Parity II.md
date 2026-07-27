# 922. Sort Array By Parity II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-array-by-parity-ii](https://leetcode.com/problems/sort-array-by-parity-ii)
**Companies:** Amazon, Bloomberg, Couchbase, Google, Meta, Microsoft

---

## Problem Description

Given an array where half are even and half are odd, rearrange so that even indices hold even numbers and odd indices hold odd numbers.

### Examples

- **Input:** `nums = [4,2,5,7]` → **Output:** `[4,5,2,7]`
- **Input:** `nums = [2,3]` → **Output:** `[2,3]`

## Approach: Two Pointers — O(n) ✅

**Key Insight:** Use pointer `i` for even indices and `j` for odd indices. Find misplaced elements and swap them.

```
FUNCTION sortArrayByParityII(nums):
    i, j = 0, 1
    WHILE i < n AND j < n:
        WHILE i < n AND nums[i] % 2 == 0: i += 2
        WHILE j < n AND nums[j] % 2 == 1: j += 2
        IF i < n AND j < n: SWAP(nums[i], nums[j])
    RETURN nums
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |
