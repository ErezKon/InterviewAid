# 303. Range Sum Query - Immutable

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/range-sum-query-immutable](https://leetcode.com/problems/range-sum-query-immutable)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Palantir, Tcs

---

## Problem Description

Given an integer array `nums`, handle multiple queries of the following type:

1. Calculate the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** where `left <= right`.

Implement the `NumArray` class:

- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
- `int sumRange(int left, int right)` Returns the **sum** of the elements of `nums` between indices `left` and `right` **inclusive** (i.e. `nums[left] + nums[left + 1] + ... + nums[right]`).

**Constraints:**

- `1 <= nums.length <= 10⁴`
- `-10⁵ <= nums[i] <= 10⁵`
- `0 <= left <= right < nums.length`
- At most `10⁴` calls will be made to `sumRange`.

---

## Examples

```
Example 1:
  Input: ["NumArray", "sumRange", "sumRange", "sumRange"]
         [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
  Output: [null, 1, -1, -3]
  Explanation:
    NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
    numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
    numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
    numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
```

## Approach

Pre-compute a prefix-sum array where `prefix[i]` stores the sum of the first `i` elements.

```text
CLASS NumArray:
    CONSTRUCTOR(nums):
        prefix ← [0] * (LEN(nums) + 1)
        FOR i ← 0 TO LEN(nums) - 1:
            prefix[i + 1] ← prefix[i] + nums[i]

    FUNCTION sumRange(left, right):
        RETURN prefix[right + 1] - prefix[left]
```

## Walkthrough

1. Build `prefix` for `[1,3,5]` → `[0,1,4,9]`.
2. `sumRange(0,2)`: `prefix[3] - prefix[0] = 9 - 0 = 9`.
3. `sumRange(1,2)`: `prefix[3] - prefix[1] = 9 - 1 = 8`.
4. `sumRange(0,1)`: `prefix[2] - prefix[0] = 4 - 0 = 4`.

## Complexity Analysis

- **Time:** Constructor O(n), each `sumRange` O(1).
- **Space:** O(n) for the prefix array.

---

## Key Takeaway

> Prefix sums turn range-sum queries on a static array into constant-time lookups: `sum(l,r) = prefix[r+1] - prefix[l]`.
