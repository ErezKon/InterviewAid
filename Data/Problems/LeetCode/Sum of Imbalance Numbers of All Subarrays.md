# 2763. Sum of Imbalance Numbers of All Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays](https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays)
**Companies:** Google

---

## Problem Description
For an array `nums`, the **imbalance number** of a subarray `nums[l..r]` is defined as:
```
max(nums[l..r]) - min(nums[l..r]) - (r - l)
```
In other words, it measures how far the subarray is from being a sequence of consecutive integers. Return the sum of imbalance numbers of **all** possible subarrays of `nums`. The answer may be large, so return it modulo `10^9 + 7`.

## Examples
**Example 1**
```
Input: nums = [2,1,3]
Output: 2
Explanation:
All subarrays and their imbalance numbers:
[2] → 0, [1] → 0, [3] → 0,
[2,1] → max‑min‑1 = 2‑1‑1 = 0,
[1,3] → 3‑1‑1 = 1,
[2,1,3] → 3‑1‑2 = 0.
Sum = 1 + 1 = 2.
```
**Example 2**
```
Input: nums = [1,2,3]
Output: 0
Explanation: Every subarray already forms consecutive integers, so all imbalance numbers are 0.
```

## Approach
The contribution of each element can be counted separately using two monotonic stacks – one for next greater element and one for next smaller element.
1. For each index `i`, find the nearest index `Lmax` to the left where `nums[Lmax] > nums[i]` and `Rmax` to the right where `nums[Rmax] > nums[i]`. The element `nums[i]` is the **maximum** for all subarrays whose left bound lies in `(Lmax, i]` and right bound lies in `[i, Rmax)`. The number of such subarrays is `(i - Lmax) * (Rmax - i)`.
2. Similarly compute `Lmin` and `Rmin` for the nearest smaller elements. The element is the **minimum** for `(i - Lmin) * (Rmin - i)` subarrays.
3. For each subarray, the imbalance contribution is `max - min - (len-1)`. Summing over all subarrays, the total contribution of each element as a maximum adds `nums[i] * (i - Lmax) * (Rmax - i)`. The total contribution as a minimum subtracts `nums[i] * (i - Lmin) * (Rmin - i)`. Finally subtract the total length contribution `∑ (len-1)` which equals the number of subarrays minus the count of elements, i.e., `n*(n+1)/2 - n`.
4. Combine the three sums and take modulo.

```text
FUNCTION sumImbalance(nums):
    MOD ← 1_000_000_007
    n ← LENGTH(nums)
    // helpers to compute next greater/smaller indices
    FUNCTION nextGreater(arr, direction):
        stack ← empty
        result ← array of size n filled with (n if direction = "right" else -1)
        indices ← RANGE(0, n) if direction = "right" else REVERSE(RANGE(0, n))
        FOR i IN indices:
            WHILE stack NOT EMPTY AND arr[stack.TOP] <= arr[i]:
                SET result[stack.POP()] ← i
            stack.PUSH(i)
        RETURN result

    Lmax ← nextGreater(nums, "left")   // nearest greater on left (or -1)
    Rmax ← nextGreater(nums, "right")  // nearest greater on right (or n)
    Lmin ← nextSmaller(nums, "left")
    Rmin ← nextSmaller(nums, "right")

    maxSum ← 0
    minSum ← 0
    FOR i FROM 0 TO n-1:
        SET leftMax ← i - Lmax[i]
        SET rightMax ← Rmax[i] - i
        SET maxSum ← (maxSum + nums[i] * leftMax * rightMax) % MOD

        SET leftMin ← i - Lmin[i]
        SET rightMin ← Rmin[i] - i
        SET minSum ← (minSum + nums[i] * leftMin * rightMin) % MOD

    totalSubarrays ← n * (n + 1) / 2
    lengthContribution ← (totalSubarrays - n) % MOD
    ans ← (maxSum - minSum - lengthContribution) % MOD
    IF ans < 0: ans ← ans + MOD
    RETURN ans
```

## Walkthrough
| i | nums[i] | Lmax | Rmax | leftMax | rightMax | max contribution |
|---|---------|------|------|---------|----------|-----------------|
| 0 | 2       | -1   | 2    | 1       | 2        | 2 * 1 * 2 = 4   |
| 1 | 1       | 0    | 2    | 1       | 1        | 1 * 1 * 1 = 1   |
| 2 | 3       | -1   | 3    | 3       | 1        | 3 * 3 * 1 = 9   |
Summing max contributions = 14, similarly compute min contributions = 12, length contribution = 3, final answer = 14‑12‑3 = -1 → modulo = 2.

## Complexity Analysis
- **Time:** O(n) – each element is pushed/popped at most once in each monotonic stack.
- **Space:** O(n) – stacks and four auxiliary index arrays.

## Follow-Up Questions
1. How would the algorithm change if the imbalance definition used `max - min` without subtracting length?
2. Can the same monotonic‑stack technique be applied to compute the sum of range sums for all subarrays?
3. How would you adapt the solution for a streaming setting where numbers arrive one by one?

## Key Takeaway
Monotonic stacks let us count how many subarrays treat each element as the maximum or minimum, turning a seemingly quadratic sum into a linear‑time calculation.
