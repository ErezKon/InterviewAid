# 922. Sort Array By Parity II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-array-by-parity-ii](https://leetcode.com/problems/sort-array-by-parity-ii)
**Companies:** Amazon, Bloomberg, Couchbase, Google, Meta, Microsoft

---

## Problem Description

Given an array of integers `nums`, half of the integers in `nums` are **odd**, and the other half are **even**.

Sort the array so that whenever `nums[i]` is odd, `i` is **odd**, and whenever `nums[i]` is even, `i` is **even**.

Return *any answer array that satisfies this condition*.

**Constraints:**
- `2 <= nums.length <= 2 * 10⁴`
- `nums.length` is even.
- Half of the integers in `nums` are even.
- `0 <= nums[i] <= 1000`

**Follow Up:** Could you solve it in-place?

### Examples

```
Example 1:
  Input: nums = [4,2,5,7]
  Output: [4,5,2,7]
  Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.
```

```
Example 2:
  Input: nums = [2,3]
  Output: [2,3]
```

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
