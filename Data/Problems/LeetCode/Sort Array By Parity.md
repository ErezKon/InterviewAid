# 905. Sort Array By Parity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-array-by-parity](https://leetcode.com/problems/sort-array-by-parity)
**Companies:** Amazon, Bloomberg, Couchbase, Ebay, Google, Meta, Microsoft

---

## Problem Description

Given an integer array `nums`, move all the even integers at the beginning of the array followed by all the odd integers.

Return ***any array** that satisfies this condition*.

**Constraints:**
- `1 <= nums.length <= 5000`
- `0 <= nums[i] <= 5000`

### Examples

```
Example 1:
  Input: nums = [3,1,2,4]
  Output: [2,4,3,1]
  Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
```

```
Example 2:
  Input: nums = [0]
  Output: [0]
```

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
