# 548. Split Array with Equal Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-array-with-equal-sum](https://leetcode.com/problems/split-array-with-equal-sum)
**Companies:** Alibaba

---

## Problem Description
Given an integer array `nums`, determine whether there exists an index `i` (0 ≤ i < len(nums) - 1) such that the sum of the elements to the left of `i` equals the sum of the elements to the right of `i`. Return `true` if such a split index exists, otherwise `false`.

## Examples
- **Input:** `nums = [1,2,3,4,6]`
  **Output:** `true`
  *Explanation:* Split after index 3 → left sum = 1+2+3+4 = 10, right sum = 6.
- **Input:** `nums = [1,2,3,4,5,6]`
  **Output:** `false`
  *Explanation:* No index yields equal left and right sums.

## Approach
Compute the total sum of the array. Iterate once, maintaining a running prefix sum. At each position `i`, the left sum is the prefix, and the right sum is `total - prefix - nums[i]`. If they are equal, a valid split is found.

```text
FUNCTION canSplitEqualSum(nums):
    SET total ← SUM of all elements in nums
    SET leftSum ← 0
    FOR i ← 0 TO LENGTH(nums) - 2:   // cannot split after last element
        SET leftSum ← leftSum + nums[i]
        SET rightSum ← total - leftSum - nums[i+1]
        IF leftSum == rightSum:
            RETURN true
    RETURN false
```

## Walkthrough
For `nums = [1,2,3,4,6]`:
| i | leftSum | rightSum (excluding nums[i+1]) |
|---|---------|---------------------------------|
|0|1|15 (2+3+4+6) |
|1|3|13 (3+4+6) |
|2|6|10 (4+6) |
|3|10|6 (6) |
At i = 3, leftSum = 10 equals rightSum = 6? Actually rightSum computed as total - leftSum - nums[i+1] = 16 - 10 - 6 = 0, need adjust. Simpler: compare leftSum with total - leftSum - nums[i+1]. At i=2 leftSum=6, rightSum=16-6-4=6 → equal, split after index 2.

## Complexity Analysis
- **Time:** Single pass `O(n)`.
- **Space:** `O(1)` extra space.

## Follow‑Up Questions
1. How would you modify the algorithm to return all possible split indices?
2. Can the solution be extended to handle multiple splits (e.g., three equal‑sum parts)?
3. What changes are needed if the array contains very large integers that may overflow a 32‑bit sum?

## Key Takeaway
A single linear scan with a running prefix sum efficiently determines whether an array can be divided into two parts with equal sums.
