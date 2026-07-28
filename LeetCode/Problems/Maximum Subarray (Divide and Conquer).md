# 53. Maximum Subarray — Divide and Conquer Variant

See also: [Maximum Subarray.md](Maximum%20Subarray.md) for the Kadane's algorithm solution.

This file covers the **divide and conquer** approach specifically.

**Companies:** Accenture, Accolite, Airbnb, Amazon, Apple, Arista Networks, Atlassian, Autodesk, Blinkit, Bloomberg, Bytedance, Cisco, Citadel, Cognizant, Coupang, Criteo, De Shaw, Dell, Deloitte, Epam Systems, Fractal Analytics, Goldman Sachs, Google, Hashedin, Hcl, Huawei, Ibm, Infosys, Intel, Jpmorgan, Linkedin, Medianet, Meesho, Meta, Microsoft, Nike, Nvidia, Optum, Oracle, Paypal, Persistent Systems, Phonepe, Salesforce, Samsung, Sap, Servicenow, Squarepoint Capital, Swiggy, Target, Tcs, Tech Mahindra, Tekion, Tesla, Tiktok, Turing, Uber, Upstart, Vimeo, Visa, Walmart Labs, Wells Fargo, Wix, Yandex, Zeta, Zoho, Zomato
---

## Problem Description
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. This variant asks you to solve the problem using the **divide and conquer** technique.

## Examples
**Example 1**
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the maximum sum 6.
```
**Example 2**
```
Input: nums = [1]
Output: 1
Explanation: The array contains a single element, which is the answer.
```

## Approach
The divide and conquer method splits the array at its midpoint and recursively finds the maximum subarray in the left half, right half, and the maximum subarray that crosses the midpoint.
1. **Base case**: a single element returns its value.
2. **Recursive case**: compute `leftMax`, `rightMax`, and `crossMax`.
   * `crossMax` is obtained by expanding from the middle to the left to find the maximum suffix sum and to the right to find the maximum prefix sum, then adding them.
3. Return the maximum of the three values.
The recursion depth is `O(log n)` and each level processes the whole array once, giving `O(n log n)` time.

```text
FUNCTION maxSubArray(nums, lo, hi):
    IF lo == hi:
        RETURN nums[lo]
    mid ← (lo + hi) / 2
    leftMax  ← maxSubArray(nums, lo, mid)
    rightMax ← maxSubArray(nums, mid+1, hi)
    crossMax ← maxCrossing(nums, lo, mid, hi)
    RETURN MAX(leftMax, rightMax, crossMax)

FUNCTION maxCrossing(nums, lo, mid, hi):
    leftSum ← -∞
    sum ← 0
    FOR i ← mid DOWNTO lo:
        sum ← sum + nums[i]
        leftSum ← MAX(leftSum, sum)
    rightSum ← -∞
    sum ← 0
    FOR i ← mid+1 TO hi:
        sum ← sum + nums[i]
        rightSum ← MAX(rightSum, sum)
    RETURN leftSum + rightSum
```

## Walkthrough
Consider `nums = [-2,1,-3,4,-1,2,1,-5,4]`.
| Step | Action | Result |
|------|--------|--------|
| Call maxSubArray(0,8) | Split at mid=4 | Recurse left (0‑4) and right (5‑8) |
| Left recursion returns 4 (subarray `[4]`) | Right recursion eventually returns 6 (`[4,-1,2,1]`) | Cross max at mid=4 yields 6 |
| Final max = MAX(4,6,6) = 6 |

## Complexity Analysis
*Time*: Each level processes `n` elements for the crossing step, and there are `log n` levels → `O(n log n)`.
*Space*: Recursion stack depth `O(log n)`.

## Follow‑Up Questions
1. How does Kadane's algorithm improve the time complexity to `O(n)`?
2. Can the divide and conquer approach be adapted to find the maximum subarray sum with length constraints?
3. How would you modify the algorithm to also return the start and end indices of the optimal subarray?

## Key Takeaway
Divide and conquer illustrates the classic “divide, conquer, combine” pattern, yielding an `O(n log n)` solution for Maximum Subarray, while highlighting why a linear‑time greedy method (Kadane) is preferred.
