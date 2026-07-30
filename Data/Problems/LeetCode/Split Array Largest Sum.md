# 410. Split Array Largest Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-array-largest-sum](https://leetcode.com/problems/split-array-largest-sum)
**Companies:** Amazon, Baidu, Bloomberg, De Shaw, Deloitte, Google, Infosys, Meta, Microsoft, Nutanix, Oracle, Phonepe, Pinterest, Salesforce, Samsung, Tekion, Uber, Yugabyte, Zeta

---

## Problem Description
Given an integer array `nums` and an integer `k`, split the array into `k` non‑empty continuous subarrays. The goal is to minimize the largest sum among these subarrays and return that minimized largest sum.

## Examples
- **Input:** `nums = [7,2,5,10,8]`, `k = 2`
  **Output:** `18`
  *Explanation:* Split into `[7,2,5]` and `[10,8]`; the largest sum is `18`.
- **Input:** `nums = [1,2,3,4,5]`, `k = 3`
  **Output:** `6`
  *Explanation:* Split into `[1,2,3]`, `[4]`, `[5]`; the largest sum is `6`.

## Approach
The answer lies between the maximum single element and the total sum of the array. Perform binary search on this range and use a greedy check to see if the array can be split into at most `k` subarrays without exceeding a candidate maximum sum.

```text
FUNCTION splitArray(nums, k):
    SET lo ← MAXIMUM value in nums
    SET hi ← SUM of all values in nums
    WHILE lo < hi:
        SET mid ← (lo + hi) DIV 2
        IF canSplit(nums, k, mid):
            SET hi ← mid
        ELSE:
            SET lo ← mid + 1
    RETURN lo

FUNCTION canSplit(nums, k, maxSum):
    SET parts ← 1
    SET currentSum ← 0
    FOR num IN nums:
        IF currentSum + num > maxSum:
            SET parts ← parts + 1
            SET currentSum ← 0
        SET currentSum ← currentSum + num
    RETURN parts ≤ k
```

## Walkthrough
For `nums = [7,2,5,10,8]`, `k = 2`:
| Candidate `mid` | Subarray Count (`canSplit`) |
|----------------|-----------------------------|
| 15 | 3 (exceeds `k`) |
| 18 | 2 (fits) |
Binary search converges to `18`.

## Complexity Analysis
- **Time:** `O(n log S)` where `S` is the sum of all elements (binary search iterations) and `n` is the array length.
- **Space:** `O(1)` extra space.

## Follow‑Up Questions
1. How would you adapt the solution to also return the actual partitioning?
2. Can the problem be solved using dynamic programming in `O(n·k)` time?
3. What changes are needed if the subarrays need not be contiguous?

## Key Takeaway
Binary search on the answer combined with a greedy feasibility check efficiently finds the minimal possible largest subarray sum.
