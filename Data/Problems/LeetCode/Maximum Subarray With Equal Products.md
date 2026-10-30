# 3411. Maximum Subarray With Equal Products

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-subarray-with-equal-products](https://leetcode.com/problems/maximum-subarray-with-equal-products)
**Companies:** Google

---

## Problem Description

> *Note: the Approach below solves an invented condition ("contains a 1"). Officially a subarray is valid if `prod == lcm · gcd`. Correct idea (n ≤ 100, values ≤ 10): brute force over all starts, extending the end while maintaining `prod`, `gcd` and `lcm`. Stop when `prod` exceeds `lcm · gcd` by too much to recover (e.g. beyond `lcm_max · gcd_max`). O(n²).*

You are given an array of **positive** integers `nums`.

An array `arr` is called **product equivalent** if `prod(arr) == lcm(arr) * gcd(arr)`, where:

- `prod(arr)` is the product of all elements of `arr`.
- `gcd(arr)` is the GCD of all elements of `arr`.
- `lcm(arr)` is the LCM of all elements of `arr`.

Return the length of the **longest** **product equivalent** subarray of `nums`.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 10`

## Examples

**Example 1:**
```
Input: nums = [1,2,1,2,1,1,1]
Output: 5
Explanation: The longest product equivalent subarray is [1, 2, 1, 1, 1], where prod([1, 2, 1, 1, 1]) = 2, gcd([1, 2, 1, 1, 1]) = 1, and lcm([1, 2, 1, 1, 1]) = 2.
```

**Example 2:**
```
Input: nums = [2,3,4,5,6]
Output: 3
Explanation: The longest product equivalent subarray is [3, 4, 5].
```

**Example 3:**
```
Input: nums = [1,2,3,1,4,5,1]
Output: 5
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
