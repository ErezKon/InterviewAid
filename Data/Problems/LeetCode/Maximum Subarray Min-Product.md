# 1856. Maximum Subarray Min-Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-min-product](https://leetcode.com/problems/maximum-subarray-min-product)
**Companies:** Amazon, Google, Uber

---

## Problem Description

The **min-product** of an array is equal to the **minimum value** in the array **multiplied by** the array's **sum**.

- For example, the array `[3,2,5]` (minimum value is `2`) has a min-product of `2 * (3+2+5) = 2 * 10 = 20`.

Given an array of integers `nums`, return *the **maximum min-product** of any **non-empty subarray** of *`nums`. Since the answer may be large, return it **modulo** `10^9 + 7`.

Note that the min-product should be maximized **before** performing the modulo operation. Testcases are generated such that the maximum min-product **without** modulo will fit in a **64-bit signed integer**.

A **subarray** is a **contiguous** part of an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^7`

## Examples

**Example 1:**
```
Input: nums = [1,2,3,2]
Output: 14
Explanation: The maximum min-product is achieved with the subarray [2,3,2] (minimum value is 2).
2 * (2+3+2) = 2 * 7 = 14.
```

**Example 2:**
```
Input: nums = [2,3,3,1,2]
Output: 18
Explanation: The maximum min-product is achieved with the subarray [3,3] (minimum value is 3).
3 * (3+3) = 3 * 6 = 18.
```

**Example 3:**
```
Input: nums = [3,1,5,6,4,2]
Output: 60
Explanation: The maximum min-product is achieved with the subarray [5,6,4] (minimum value is 4).
4 * (5+6+4) = 4 * 15 = 60.
```

## Approach
The min‑product can be maximized by treating each element as the minimum of a candidate subarray. Using a **monotonic stack** we find, for each index `i`, the nearest smaller element to the left and right, which gives the maximal span where `nums[i]` remains the minimum. With a prefix‑sum array we can compute the sum of that span in O(1).
1. Build prefix sums `pref` where `pref[0]=0` and `pref[i+1]=pref[i]+nums[i]`.
2. Iterate through `nums` with a stack storing indices of increasing values.
3. When popping an index `mid`, the left boundary is the new stack top (or `-1`) and the right boundary is the current index `i`. Compute `subSum = pref[i] - pref[left+1]` and update `maxProd = max(maxProd, nums[mid] * subSum)`.
4. After the loop, process remaining stack elements with `i = n` as the right boundary.
5. Return `maxProd % MOD`.

```text
FUNCTION maxSumMinProduct(nums):
    MOD ← 1_000_000_007
    n ← LENGTH(nums)
    // Prefix sums
    pref ← ARRAY(n+1, 0)
    FOR i ← 0 TO n-1:
        pref[i+1] ← pref[i] + nums[i]
    stack ← EMPTY_STACK()
    maxProd ← 0
    FOR i ← 0 TO n:
        // Use sentinel at i == n with value -∞ to flush stack
        WHILE NOT IS_EMPTY(stack) AND (i == n OR nums[TOP(stack)] > (IF i < n THEN nums[i] ELSE -∞)):
            mid ← POP(stack)
            left ← TOP(stack) IF NOT IS_EMPTY(stack) ELSE -1
            subSum ← pref[i] - pref[left+1]
            maxProd ← MAX(maxProd, nums[mid] * subSum)
        PUSH(stack, i)
    RETURN maxProd MOD MOD
```

## Walkthrough
For `nums = [1,2,3,2]`:
| i | Action | Stack | left | right (i) | subSum | product |
|---|--------|-------|------|-----------|--------|---------|
|0|push 0|[0]|-|-| - | - |
|1|push 1|[0,1]|-|-| - | - |
|2|push 2|[0,1,2]|-|-| - | - |
|3|nums[2] > nums[3] → pop 2|[0,1]|left=1|right=3|pref[3]-pref[2]=6-3=3|3*3=9|
|3|push 3|[0,1,3]|-|-| - | - |
|4 (sentinel)|pop 3 → left=1, sum=pref[4]-pref[2]=8-3=5, prod=2*5=10|
|   |pop 1 → left=0, sum=pref[4]-pref[1]=8-1=7, prod=2*7=14 (max) |
|   |pop 0 → left=-1, sum=pref[4]-pref[0]=8, prod=1*8=8 |
Result = 14.

## Complexity Analysis
*Time*: Each element is pushed and popped at most once → `O(n)`.
*Space*: Prefix array `O(n)` and stack `O(n)` in worst case.

## Follow‑Up Questions
1. How would you adapt the algorithm to return the subarray indices achieving the maximum min‑product?
2. Can the approach be extended to handle the product of the minimum and the **maximum** element of a subarray?
3. What changes are needed if the array may contain negative numbers?

## Key Takeaway
A monotonic stack combined with prefix sums efficiently enumerates every possible subarray where a given element is the minimum, enabling an `O(n)` solution for the maximum min‑product.
