# 3550. Smallest Index With Digit Sum Equal to Index

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index](https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index)
**Companies:** Google

---

## Problem Description
You are given an integer array `nums`.

Return the **smallest** index `i` such that the sum of the digits of `nums[i]` is equal to `i`.

If no such index exists, return `-1`.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

## Examples
```
Example 1:
  Input: nums = [1,3,2]
  Output: 2
  Explanation: For nums[2] = 2, the sum of digits is 2, which is equal to index i = 2. Thus, the output is 2.
```

```
Example 2:
  Input: nums = [1,10,11]
  Output: 1
  Explanation:
    - For nums[1] = 10, the sum of digits is 1 + 0 = 1, which is equal to index i = 1.
    - For nums[2] = 11, the sum of digits is 1 + 1 = 2, which is equal to index i = 2.
    - Since index 1 is the smallest, the output is 1.
```

```
Example 3:
  Input: nums = [1,2,3]
  Output: -1
  Explanation: Since no index satisfies the condition, the output is -1.
```

## Approach
**Algorithm:** Linear scan with digit‑sum computation.

1. Iterate `i` from `0` to `len(nums)-1`.
2. Compute `digitSum(i)` by repeatedly extracting digits.
3. If `digitSum(i) == nums[i]`, return `i`.

**Pseudocode:**
```text
FUNCTION digitSum(x):
    sum ← 0
    WHILE x > 0:
        sum ← sum + (x MOD 10)
        x ← x DIV 10
    RETURN sum

FUNCTION smallestIndex(nums):
    FOR i ← 0 TO LENGTH(nums)-1:
        IF digitSum(i) = nums[i]:
            RETURN i
    RETURN -1  // should never happen per problem guarantee
```

## Walkthrough
For `nums = [0,1,2,3,4]`:
- `i=0`: `digitSum(0)=0` matches `nums[0]` → return `0`.

## Complexity Analysis
- **Time:** O(n · log i) → effectively O(n) because digit sum is at most 9 × number of digits.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you adapt the solution if the array were infinite (conceptually) and you needed the smallest index up to a large bound?
2. Can the problem be solved faster using pre‑computed digit sums for consecutive numbers?
3. What changes are needed if the digit sum condition is replaced by the product of digits?

## Key Takeaway
A straightforward linear scan combined with a simple digit‑sum helper efficiently finds the required index.
