# 2221. Find Triangular Sum of an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-triangular-sum-of-an-array](https://leetcode.com/problems/find-triangular-sum-of-an-array)
**Companies:** Amazon, De Shaw, Google, Microsoft, Zoho

---

## Problem Description
Given an integer array `nums`, repeatedly replace the array with a new array where each element is the sum of two consecutive elements modulo 10. Continue this process until only one element remains and return that element. This final value is called the triangular sum of the original array.

## Examples
| nums | Triangular Sum |
|------|----------------|
| [1,2,3,4,5] | 8 |
| [5,6,7,1,2,3] | 0 |
*Explanation*: The array is reduced step‑by‑step, applying `(a+b) % 10` each time, until a single number remains.

## Approach
**Algorithm**: Iterative reduction using a sliding window.
1. While the length of `nums` is greater than 1:
   - Create a new list `next`.
   - For each index `i` from `0` to `len(nums)-2`:
     - Compute `val ← (nums[i] + nums[i+1]) % 10`.
     - Append `val` to `next`.
   - Replace `nums` with `next`.
2. Return `nums[0]`.

```text
FUNCTION TriangularSum(nums):
    WHILE LENGTH(nums) > 1:
        SET next ← EMPTY LIST
        FOR i ← 0 TO LENGTH(nums) - 2:
            SET val ← (nums[i] + nums[i+1]) % 10
            APPEND val TO next
        SET nums ← next
    RETURN nums[0]
```

## Walkthrough
For `nums = [1,2,3,4,5]`:
| Iteration | nums before | nums after |
|-----------|-------------|------------|
| 1 | [1,2,3,4,5] | [3,5,7,9] |
| 2 | [3,5,7,9]   | [8,2,6] |
| 3 | [8,2,6]     | [0,8] |
| 4 | [0,8]       | [8] |
Result = 8.

## Complexity Analysis
- **Time**: O(N²) in the worst case because each iteration processes a decreasing array of size N, N‑1, …, 1.
- **Space**: O(N) for the temporary `next` array.

## Follow-Up Questions
1. Can the process be optimized to O(N) using combinatorial properties?
2. How would you compute the triangular sum modulo a different base?
3. What if the reduction rule changed to multiplication modulo 10?

## Key Takeaway
Repeated pairwise reduction with modulo arithmetic gradually collapses the array to a single value, representing the triangular sum.
