# 2012. Sum of Beauty in the Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-beauty-in-the-array](https://leetcode.com/problems/sum-of-beauty-in-the-array)
**Companies:** Amazon

---

## Problem Description

You are given a **0-indexed** integer array `nums`. For each index `i` (`1 <= i <= nums.length - 2`) the **beauty** of `nums[i]` equals:

- `2`, if `nums[j] < nums[i] < nums[k]`, for **all** `0 <= j < i` and for **all** `i < k <= nums.length - 1`.
- `1`, if `nums[i - 1] < nums[i] < nums[i + 1]`, and the previous condition is not satisfied.
- `0`, if none of the previous conditions holds.

Return *the **sum of beauty** of all* `nums[i]` *where* `1 <= i <= nums.length - 2`.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 2
Explanation: For each index i in the range 1 <= i <= 1:
- The beauty of nums[1] equals 2.
```

**Example 2:**
```
Input: nums = [2,4,6,4]
Output: 1
Explanation: For each index i in the range 1 <= i <= 2:
- The beauty of nums[1] equals 1.
- The beauty of nums[2] equals 0.
```

**Example 3:**
```
Input: nums = [3,2,1]
Output: 0
Explanation: For each index i in the range 1 <= i <= 1:
- The beauty of nums[1] equals 0.
```

## Approach
Beauty 2 requires `nums[i]` to be greater than **every** element on its left and smaller than **every** element on its right, i.e. `max(nums[0..i-1]) < nums[i] < min(nums[i+1..n-1])`. Precompute the suffix minimum array once, keep a running prefix maximum while scanning left to right, and fall back to the local neighbour check for beauty 1.

```text
FUNCTION sumOfBeauties(nums):
    n ← LENGTH(nums)
    sufMin[n-1] ← nums[n-1]
    FOR i ← n-2 DOWNTO 0:
        sufMin[i] ← MIN(sufMin[i+1], nums[i])
    preMax ← nums[0]          // max of nums[0..i-1]
    ans ← 0
    FOR i ← 1 TO n-2:
        IF preMax < nums[i] AND nums[i] < sufMin[i+1]:
            ans ← ans + 2
        ELSE IF nums[i-1] < nums[i] AND nums[i] < nums[i+1]:
            ans ← ans + 1
        preMax ← MAX(preMax, nums[i])
    RETURN ans
```

## Walkthrough
Example 2: `nums = [2,4,6,4]`, `sufMin = [2,4,4,4]`.

| i | nums[i] | preMax | sufMin[i+1] | global check | local check | beauty | ans |
|---|---------|--------|-------------|--------------|-------------|--------|-----|
| 1 | 4 | 2 | 4 | 2 < 4 < 4? No | 2 < 4 < 6? Yes | 1 | 1 |
| 2 | 6 | 4 | 4 | 4 < 6 < 4? No | 4 < 6 < 4? No | 0 | 1 |

Output: `1`.

## Complexity Analysis
Time: O(n) – one backward pass for suffix minima and one forward pass.
Space: O(n) for the suffix-minimum array.

## Follow-Up Questions
* Can you avoid the suffix array by using a monotonic stack or by counting "record" positions?
* How would you answer the beauty of an arbitrary index after point updates to the array (segment tree for range max/min)?
* What if the conditions used non-strict inequalities?

## Key Takeaway
"Greater than everything to the left and smaller than everything to the right" reduces to comparing with a prefix maximum and a suffix minimum, which are computable in linear time.
