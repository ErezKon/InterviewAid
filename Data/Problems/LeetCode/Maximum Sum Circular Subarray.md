# 918. Maximum Sum Circular Subarray

**Difficulty:** 🟡 Medium
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/maximum-sum-circular-subarray](https://leetcode.com/problems/maximum-sum-circular-subarray)
**Companies:** Amazon, Apple, Bloomberg, Goldman Sachs, Google, Makemytrip, Meta, Microsoft, Sprinklr, Two Sigma

---

## 1. Problem Description

Given a **circular integer array** `nums` of length `n`, return *the maximum possible sum of a non-empty **subarray** of *`nums`.

A **circular array** means the end of the array connects to the beginning of the array. Formally, the next element of `nums[i]` is `nums[(i + 1) % n]` and the previous element of `nums[i]` is `nums[(i - 1 + n) % n]`.

A **subarray** may only include each element of the fixed buffer `nums` at most once. Formally, for a subarray `nums[i], nums[i + 1], ..., nums[j]`, there does not exist `i <= k1`, `k2 <= j` with `k1 % n == k2 % n`.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`

---

## 2. Approach: Kadane's + Complement — O(n) ✅

The max circular subarray is either:
1. A normal subarray (standard Kadane's) — `maxSum`
2. A wrapping subarray = `totalSum - minSubarray` — `totalSum - minSum`

```text
FUNCTION maxSubarraySumCircular(nums):
    maxSum = curMax = nums[0]
    minSum = curMin = nums[0]
    totalSum = nums[0]

    FOR i ← 1 TO n - 1:
        curMax = MAX(nums[i], curMax + nums[i])
        maxSum = MAX(maxSum, curMax)

        curMin = MIN(nums[i], curMin + nums[i])
        minSum = MIN(minSum, curMin)

        totalSum += nums[i]

    IF maxSum < 0: RETURN maxSum

    RETURN MAX(maxSum, totalSum - minSum)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,-2,3,-2]
Output: 3
Explanation: Subarray [3] has maximum sum 3.
```

**Example 2:**
```
Input: nums = [5,-3,5]
Output: 10
Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.
```

**Example 3:**
```
Input: nums = [-3,-2,-3]
Output: -2
Explanation: Subarray [-2] has maximum sum -2.
```

---

## 4. Walkthrough

Take Example 2: `nums = [5,-3,5]`.
1. Initialize `maxSum = curMax = 5`, `minSum = curMin = 5`, `totalSum = 5`.
2. Iterate i=1 (value -3):
   - `curMax = MAX(-3, 5 + -3) = 2`; `maxSum = MAX(5,2) = 5`.
   - `curMin = MIN(-3, 5 + -3) = -3`; `minSum = MIN(5,-3) = -3`.
   - `totalSum = 5 + -3 = 2`.
3. Iterate i=2 (value 5):
   - `curMax = MAX(5, 2 + 5) = 7`; `maxSum = MAX(5,7) = 7`.
   - `curMin = MIN(5, -3 + 5) = 2`; `minSum = MIN(-3,2) = -3`.
   - `totalSum = 2 + 5 = 7`.
4. After loop: `maxSum = 7`, `minSum = -3`, `totalSum = 7`.
5. Since `maxSum` is positive, compute wrap sum: `totalSum - minSum = 7 - (-3) = 10`.
6. Return `MAX(7,10) = 10`.

---

## 5. Complexity Analysis

- **Time:** Single pass O(n).
- **Space:** Constant O(1) extra space.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to also return the actual subarray indices?
- Can this approach be extended to find the maximum product subarray in a circular array?
- What if the array size is extremely large and cannot fit into memory? Discuss streaming solutions.

---

## Key Takeaway

> Max circular subarray = max(normal Kadane's, total - min subarray). The "wrapping" case is the complement of the minimum subarray. Handle all‑negative edge case separately.
