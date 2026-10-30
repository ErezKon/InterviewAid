# 548. Split Array with Equal Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-array-with-equal-sum](https://leetcode.com/problems/split-array-with-equal-sum)
**Companies:** Alibaba

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below solve a pivot-index problem, not this one. Correct idea: prefix sums; for each middle cut `j`, store every sum `s` with `sum(0,i-1) == sum(i+1,j-1) == s` (valid `i` in the left part) in a set, then scan `k` in the right part and return `true` if `sum(j+1,k-1) == sum(k+1,n-1)` is in the set. O(n²).*

Given an integer array `nums` of length `n`, return `true` if there is a triplet `(i, j, k)` which satisfies the following conditions:

- `0 < i, i + 1 < j, j + 1 < k < n - 1`
- The sum of subarrays `(0, i - 1)`, `(i + 1, j - 1)`, `(j + 1, k - 1)` and `(k + 1, n - 1)` is equal.

A subarray `(l, r)` represents a slice of the original array starting from the element indexed `l` to the element indexed `r`.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 2000`
- `-10^6 <= nums[i] <= 10^6`

## Examples

**Example 1:**
```
Input: nums = [1,2,1,2,1,2,1]
Output: true
Explanation:
i = 1, j = 3, k = 5.
sum(0, i - 1) = sum(0, 0) = 1
sum(i + 1, j - 1) = sum(2, 2) = 1
sum(j + 1, k - 1) = sum(4, 4) = 1
sum(k + 1, n - 1) = sum(6, 6) = 1
```

**Example 2:**
```
Input: nums = [1,2,1,2,1,2,1,2]
Output: false
```

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
At i = 3, leftSum = 10 equals rightSum = 6? Actually rightSum computed as total - leftSum - nums[i+1] = 16 - 10 - 6 = 0, need adjust. Simpler: compare leftSum with total - leftSum - nums[i+1]. At i=2 leftSum=6, rightSum=16-6-4=6 → equal, split after index 2.

## Complexity Analysis
- **Time:** Single pass `O(n)`.
- **Space:** `O(1)` extra space.

## Follow‑Up Questions
1. How would you modify the algorithm to return all possible split indices?
2. Can the solution be extended to handle multiple splits (e.g., three equal‑sum parts)?
3. What changes are needed if the array contains very large integers that may overflow a 32‑bit sum?

## Key Takeaway
A single linear scan with a running prefix sum efficiently determines whether an array can be divided into two parts with equal sums.
