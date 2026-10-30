# 3196. Maximize Total Cost of Alternating Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-total-cost-of-alternating-subarrays](https://leetcode.com/problems/maximize-total-cost-of-alternating-subarrays)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums` with length `n`.

The **cost** of a subarray `nums[l..r]`, where `0 <= l <= r < n`, is defined as:

`cost(l, r) = nums[l] - nums[l + 1] + ... + nums[r] * (−1)^r − l`

Your task is to **split** `nums` into subarrays such that the **total** **cost** of the subarrays is **maximized**, ensuring each element belongs to **exactly one** subarray.

Formally, if `nums` is split into `k` subarrays, where `k > 1`, at indices `i_1, i_2, ..., i_k − 1`, where `0 <= i_1 < i_2 < ... < i_k - 1 < n - 1`, then the total cost will be:

`cost(0, i_1) + cost(i_1 + 1, i_2) + ... + cost(i_k − 1 + 1, n − 1)`

Return an integer denoting the *maximum total cost* of the subarrays after splitting the array optimally.

**Note:** If `nums` is not split into subarrays, i.e. `k = 1`, the total cost is simply `cost(0, n - 1)`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [1,-2,3,4]
Output: 10
Explanation: One way to maximize the total cost is by splitting [1, -2, 3, 4] into subarrays [1, -2, 3] and [4]. The total cost will be (1 + 2 + 3) + 4 = 10.
```

**Example 2:**
```
Input: nums = [1,-1,1,-1]
Output: 4
Explanation: One way to maximize the total cost is by splitting [1, -1, 1, -1] into subarrays [1, -1] and [1, -1]. The total cost will be (1 + 1) + (1 + 1) = 4.
```

**Example 3:**
```
Input: nums = [0]
Output: 0
Explanation: We cannot split the array further, so the answer is 0.
```

**Example 4:**
```
Input: nums = [1,-1]
Output: 2
Explanation: Selecting the whole array gives a total cost of 1 + 1 = 2, which is the maximum.
```

---

## Key Insight

> Each element is either added (+) or subtracted (-) based on its position within its subarray. Starting a new subarray resets the sign to +. So the choice at each element: continue the current subarray (alternating sign) or start a new one (force +). Use DP tracking the current sign state.

---

## Approach: DP — O(n) ✅

```text
FUNCTION maximizeTotalCost(nums):
    // dp_plus = max cost if current element has + sign
    // dp_minus = max cost if current element has - sign
    dp_plus = nums[0]
    dp_minus = -infinity

    FOR i ← 1 TO n - 1:
        new_plus = MAX(dp_plus, dp_minus) + nums[i]    // start new subarray
        new_minus = dp_plus - nums[i]                   // continue, sign flips to -
        dp_plus = new_plus
        dp_minus = new_minus

    RETURN MAX(dp_plus, dp_minus)
```

---

## Walkthrough

Consider `nums = [1,2,3,4]`.
| i | nums[i] | dp_plus (start new) | dp_minus (continue) |
|---|---------|---------------------|---------------------|
|0|1|1| -∞ |
|1|2|MAX(1,-∞)+2 = 3|1-2 = -1 |
|2|3|MAX(3,-1)+3 = 6|3-3 = 0 |
|3|4|MAX(6,0)+4 = 10|6-4 = 2 |
Final answer = MAX(10,2) = 10, achieved by partition `[1]` and `[2,3,4]`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(1) |

---

## Key Takeaway

> **Track two states: current element is + (start of new subarray or even position) or - (odd position in current subarray).** Starting a new subarray resets to +; continuing alternates the sign.
