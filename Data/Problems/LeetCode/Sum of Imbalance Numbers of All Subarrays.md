# 2763. Sum of Imbalance Numbers of All Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays](https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below use an invented `max − min − (r − l)` definition. Correct idea (n ≤ 1000): for each left end `i`, extend `j` while keeping a `seen` set and the running imbalance `cnt`: when adding a new value `x`, `cnt += 1`, then `cnt -= 1` if `x−1` is seen and `cnt -= 1` if `x+1` is seen (duplicates change nothing); the imbalance is `cnt − 1`; add it for every `j`. O(n²).*

The **imbalance number** of a **0-indexed** integer array `arr` of length `n` is defined as the number of indices in `sarr = sorted(arr)` such that:

- `0 <= i < n - 1`, and
- `sarr[i+1] - sarr[i] > 1`

Here, `sorted(arr)` is the function that returns the sorted version of `arr`.

Given a **0-indexed** integer array `nums`, return *the **sum of imbalance numbers** of all its **subarrays***.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= nums.length`

## Examples

**Example 1:**
```
Input: nums = [2,3,1,4]
Output: 3
Explanation: There are 3 subarrays with non-zero imbalance numbers:
- Subarray [3, 1] with an imbalance number of 1.
- Subarray [3, 1, 4] with an imbalance number of 1.
- Subarray [1, 4] with an imbalance number of 1.
The imbalance number of all other subarrays is 0. Hence, the sum of imbalance numbers of all the subarrays of nums is 3.
```

**Example 2:**
```
Input: nums = [1,3,3,3,5]
Output: 8
Explanation: There are 7 subarrays with non-zero imbalance numbers:
- Subarray [1, 3] with an imbalance number of 1.
- Subarray [1, 3, 3] with an imbalance number of 1.
- Subarray [1, 3, 3, 3] with an imbalance number of 1.
- Subarray [1, 3, 3, 3, 5] with an imbalance number of 2.
- Subarray [3, 3, 3, 5] with an imbalance number of 1.
- Subarray [3, 3, 5] with an imbalance number of 1.
- Subarray [3, 5] with an imbalance number of 1.
The imbalance number of all other subarrays is 0. Hence, the sum of imbalance numbers of all the subarrays of nums is 8.
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
