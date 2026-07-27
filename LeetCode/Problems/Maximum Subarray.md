
# 53. Maximum Subarray

**Difficulty:** 🟡 Medium
**Acceptance:** 53.3%
**LeetCode:** [https://leetcode.com/problems/maximum-subarray](https://leetcode.com/problems/maximum-subarray)
**Companies:** Accenture, Accolite, Airbnb, Amazon, Apple, Arista Networks, Atlassian, Autodesk, Blinkit, Bloomberg, Bytedance, Cisco, Citadel, Cognizant, Coupang, Criteo, De Shaw, Dell, Deloitte, Epam Systems, Fractal Analytics, Goldman Sachs, Google, Hashedin, Hcl, Huawei, Ibm, Infosys, Intel, Jpmorgan, Linkedin, Medianet, Meesho, Meta, Microsoft, Nike, Nvidia, Optum, Oracle, Paypal, Persistent Systems, Phonepe, Salesforce, Samsung, Sap, Servicenow, Squarepoint Capital, Swiggy, Target, Tcs, Tech Mahindra, Tekion, Tesla, Tiktok, Turing, Uber, Upstart, Vimeo, Visa, Walmart Labs, Wells Fargo, Wix, Yandex, Zeta, Zoho, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n²)](#3-approach-1-brute-force--on²)
4. [Approach 2: Kadane's Algorithm — O(n) ✅](#4-approach-2-kadanes-algorithm--on-)
5. [Approach 3: Divide and Conquer — O(n log n)](#5-approach-3-divide-and-conquer--on-log-n)
6. [Walkthrough (Kadane's)](#6-walkthrough-kadanes)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums`, find the **subarray** with the largest sum, and return its sum.

A **subarray** is a contiguous non-empty sequence of elements within the array.

---

## 2. Examples

```
Example 1:
  Input:  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  Output: 6
  Reason: [4, -1, 2, 1] has the largest sum = 6

Example 2:
  Input:  [1]
  Output: 1

Example 3:
  Input:  [5, 4, -1, 7, 8]
  Output: 23
  Reason: [5, 4, -1, 7, 8] — the entire array
```

---

## 3. Approach 1: Brute Force — O(n²)

Check every subarray.

```
FUNCTION maxSubarrayBrute(nums):
    maxSum = -INFINITY

    FOR i ← 0 TO n - 1:
        currentSum = 0
        FOR j ← i TO n - 1:
            currentSum += nums[j]
            maxSum = MAX(maxSum, currentSum)

    RETURN maxSum
```

---

## 4. Approach 2: Kadane's Algorithm — O(n) ✅

### Key Insight

At each position, decide: **extend** the previous subarray or **start fresh** from the current element.

```
currentSum = MAX(nums[i], currentSum + nums[i])
```

If the running sum becomes negative, it's better to start over from the current element.

### Pseudocode

```
FUNCTION maxSubArray(nums):

    currentSum = nums[0]
    maxSum     = nums[0]

    FOR i ← 1 TO n - 1:
        currentSum = MAX(nums[i], currentSum + nums[i])
        maxSum     = MAX(maxSum, currentSum)

    RETURN maxSum
```

### Equivalent Formulation

```
FUNCTION maxSubArray(nums):

    currentSum = 0
    maxSum     = -INFINITY

    FOR each num IN nums:
        currentSum += num

        maxSum = MAX(maxSum, currentSum)

        IF currentSum < 0:
            currentSum = 0           // reset — negative prefix never helps

    RETURN maxSum
```

---

## 5. Approach 3: Divide and Conquer — O(n log n)

Split the array in half. The maximum subarray is either:
1. Entirely in the **left** half,
2. Entirely in the **right** half, or
3. **Crossing** the midpoint.

```
FUNCTION maxSubArrayDC(nums, lo, hi):

    IF lo == hi:
        RETURN nums[lo]

    mid = (lo + hi) / 2

    leftMax  = maxSubArrayDC(nums, lo, mid)
    rightMax = maxSubArrayDC(nums, mid + 1, hi)
    crossMax = maxCrossingSum(nums, lo, mid, hi)

    RETURN MAX(leftMax, rightMax, crossMax)


FUNCTION maxCrossingSum(nums, lo, mid, hi):

    // Extend left from mid
    leftSum = -INFINITY
    sum = 0
    FOR i ← mid DOWNTO lo:
        sum += nums[i]
        leftSum = MAX(leftSum, sum)

    // Extend right from mid+1
    rightSum = -INFINITY
    sum = 0
    FOR i ← mid + 1 TO hi:
        sum += nums[i]
        rightSum = MAX(rightSum, sum)

    RETURN leftSum + rightSum
```

---

## 6. Walkthrough (Kadane's)

```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: num=-2  currentSum=-2  maxSum=-2
i=1: num=1   currentSum=MAX(1, -2+1)=1    maxSum=1
i=2: num=-3  currentSum=MAX(-3, 1-3)=-2   maxSum=1
i=3: num=4   currentSum=MAX(4, -2+4)=4    maxSum=4
i=4: num=-1  currentSum=MAX(-1, 4-1)=3    maxSum=4
i=5: num=2   currentSum=MAX(2, 3+2)=5     maxSum=5
i=6: num=1   currentSum=MAX(1, 5+1)=6     maxSum=6    ★
i=7: num=-5  currentSum=MAX(-5, 6-5)=1    maxSum=6
i=8: num=4   currentSum=MAX(4, 1+4)=5     maxSum=6

Result: 6 ✅  (subarray [4, -1, 2, 1])
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n²) | O(1) |
| **Kadane's** | **O(n)** | **O(1)** |
| Divide & Conquer | O(n log n) | O(log n) |

---

## 8. Follow-Up Questions

### 8.1 Return the actual subarray, not just the sum

Track the start and end indices:

```
FUNCTION maxSubArrayWithIndices(nums):
    currentSum = nums[0]
    maxSum     = nums[0]
    start = 0, end = 0, tempStart = 0

    FOR i ← 1 TO n - 1:
        IF nums[i] > currentSum + nums[i]:
            currentSum = nums[i]
            tempStart = i                // start a new subarray
        ELSE:
            currentSum += nums[i]

        IF currentSum > maxSum:
            maxSum = currentSum
            start = tempStart
            end = i

    RETURN (maxSum, nums[start..end])
```

### 8.2 Maximum Product Subarray (LeetCode #152)

Similar to max sum, but with multiplication. Track both max and min products (because a negative times a negative gives a positive).

```
FUNCTION maxProduct(nums):
    maxProd = nums[0]
    minProd = nums[0]
    result  = nums[0]

    FOR i ← 1 TO n - 1:
        IF nums[i] < 0:
            SWAP(maxProd, minProd)

        maxProd = MAX(nums[i], maxProd * nums[i])
        minProd = MIN(nums[i], minProd * nums[i])

        result = MAX(result, maxProd)

    RETURN result
```

### 8.3 Maximum Circular Subarray Sum (LeetCode #918)

The maximum subarray in a circular array is either:
1. A normal (non-wrapping) subarray → use Kadane's.
2. A **wrapping** subarray → equals `totalSum - minSubarray`.

```
FUNCTION maxSubarraySumCircular(nums):
    maxKadane = kadaneMax(nums)
    minKadane = kadaneMin(nums)
    totalSum  = SUM(nums)

    // Edge case: if all elements are negative
    IF totalSum == minKadane:
        RETURN maxKadane

    RETURN MAX(maxKadane, totalSum - minKadane)
```

### 8.4 What if the subarray must have at least length k?

Compute prefix sums. For each position `i`, you need the minimum prefix sum among `prefix[0..i-k]`.

```
FUNCTION maxSubarrayMinLengthK(nums, k):
    prefix = compute prefix sums
    maxSum = SUM(nums[0..k-1])      // initial window of size k
    minPrefix = 0

    FOR i ← k TO n:
        minPrefix = MIN(minPrefix, prefix[i - k])
        maxSum = MAX(maxSum, prefix[i] - minPrefix)

    RETURN maxSum
```

---

## Key Takeaway

> Kadane's algorithm is the DP solution with O(1) space — the recurrence is `dp[i] = MAX(nums[i], dp[i-1] + nums[i])`. Recognize that **a negative running sum should be discarded** because it can never help future subarrays. This "extend or restart" decision is the heart of the algorithm.
