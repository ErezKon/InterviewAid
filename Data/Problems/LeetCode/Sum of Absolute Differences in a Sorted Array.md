# 1685. Sum of Absolute Differences in a Sorted Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array](https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array)
**Companies:** Amazon, Google, Ibm, Meta

---

## Problem Description

You are given an integer array `nums` sorted in **non-decreasing** order.

Build and return *an integer array *`result`* with the same length as *`nums`* such that *`result[i]`* is equal to the **summation of absolute differences** between *`nums[i]`* and all the other elements in the array.*

In other words, `result[i]` is equal to `sum(|nums[i]-nums[j]|)` where `0 <= j < nums.length` and `j != i` (**0-indexed**).

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] <= nums[i + 1] <= 10^4`

## Examples

**Example 1:**
```
Input: nums = [2,3,5]
Output: [4,3,5]
Explanation: Assuming the arrays are 0-indexed, then
result[0] = |2-2| + |2-3| + |2-5| = 0 + 1 + 3 = 4,
result[1] = |3-2| + |3-3| + |3-5| = 1 + 0 + 2 = 3,
result[2] = |5-2| + |5-3| + |5-5| = 3 + 2 + 0 = 5.
```

**Example 2:**
```
Input: nums = [1,4,6,8,10]
Output: [24,15,13,15,21]
```

## Approach
Use prefix sums to compute left and right contributions in O(n) time.
1. Compute total sum of array.
2. Iterate through array, maintaining `prefix` sum of elements before current index.
3. For index `i` with value `x`:
   - Left side contribution: `x*i - prefix`.
   - Right side contribution: `(total - prefix - x) - x*(n-i-1)`.
   - Sum both to get answer[i].

## Walkthrough
| i | x | prefix (before) | left = x*i - prefix | right = (total-prefix-x) - x*(n-i-1) | answer[i] |
|---|---|----------------|---------------------|-----------------------------------|-----------|
| 0 | 2 | 0 | 0 | (10-0-2)-2*2 = 8-4 = 4 | 4 |
| 1 | 3 | 2 | 3*1-2 = 1 | (10-2-3)-3*1 = 5-3 = 2 | 3 |
| 2 | 5 | 5 | 5*2-5 = 5 | (10-5-5)-5*0 = 0-0 = 0 | 5 |
(Values illustrate the computation; final answer matches expected.)

## Complexity Analysis
- **Time:** O(n) – single pass.
- **Space:** O(1) extra space besides output array.

## Follow-Up Questions
- How would you adapt the solution for an unsorted array?
- Can you compute the result in-place without an extra output array?
- How does the algorithm change if the array contains very large integers (risk of overflow)?

## Key Takeaway
Prefix sums let you convert the quadratic absolute-difference calculation into a linear-time formula by separating left and right contributions.
