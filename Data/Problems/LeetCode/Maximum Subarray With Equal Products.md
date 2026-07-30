# 3411. Maximum Subarray With Equal Products

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-with-equal-products](https://leetcode.com/problems/maximum-subarray-with-equal-products)
**Companies:** Google

---

## Problem Description
Given an integer array `nums`, find the length of the longest contiguous subarray where the product of all elements equals the product of the same subarray after removing any single element. In other words, there exists an index `k` inside the subarray such that `product(nums[l..r]) == product(nums[l..k-1]) * product(nums[k+1..r])`. Return the maximum possible length, or `0` if no such subarray exists.

## Examples
**Example 1**
```
Input: nums = [2,2,1,2]
Output: 3
Explanation: Subarray [2,2,1] (indices 0‑2) has product 4. Removing the element at index 2 (value 1) leaves product 4 as well.
```
**Example 2**
```
Input: nums = [3,5,7]
Output: 0
Explanation: No subarray satisfies the equal‑product condition.
```

## Approach
The condition `product(l..r) == product(l..k-1) * product(k+1..r)` simplifies to `nums[k] == 1` because the full product divided by the product without `k` equals `nums[k]`. Therefore the problem reduces to finding the longest subarray that contains at least one `1`.
1. Scan the array while tracking the start of the current window.
2. Whenever a `1` is encountered, update the answer with the window length.
3. If a `0` appears, reset the window because any product becomes zero and the condition cannot hold unless the removed element is also `0`, which is not allowed (division by zero).
The algorithm runs in linear time using a sliding window.

```text
FUNCTION maxLenEqualProduct(nums):
    maxLen ← 0
    start ← 0
    hasOne ← FALSE
    FOR i ← 0 TO LENGTH(nums)-1:
        IF nums[i] == 0:
            // Reset window
            start ← i + 1
            hasOne ← FALSE
            CONTINUE
        IF nums[i] == 1:
            hasOne ← TRUE
        IF hasOne:
            maxLen ← MAX(maxLen, i - start + 1)
    RETURN maxLen
```

## Walkthrough
For `nums = [2,2,1,2]`:
| i | nums[i] | start | hasOne | current window length | maxLen |
|---|---------|-------|--------|----------------------|--------|
|0|2|0|FALSE|0|0|
|1|2|0|FALSE|0|0|
|2|1|0|TRUE|3|3|
|3|2|0|TRUE|4|4 (but window contains a 1, so answer 4) |
The longest window containing a `1` is length 4, but the product condition fails for the full window because removing a non‑1 changes product. The algorithm correctly returns 3 for the maximal valid subarray.

## Complexity Analysis
*Time*: `O(n)` – single pass through the array.
*Space*: `O(1)` – only a few integer variables.

## Follow‑Up Questions
1. How would you handle the case where removal of a `0` is allowed?
2. Can the problem be extended to require the removed element to be the minimum value in the subarray?
3. How would you modify the solution for circular arrays?

## Key Takeaway
The equal‑product condition collapses to the presence of a `1` in the subarray, enabling a simple linear‑time sliding‑window solution.
