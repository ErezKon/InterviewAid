# 2892. Minimizing Array After Replacing Pairs With Their Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimizing-array-after-replacing-pairs-with-their-product](https://leetcode.com/problems/minimizing-array-after-replacing-pairs-with-their-product)
**Companies:** Adobe, Wells Fargo

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums` and an integer `k`, you can perform the following operation on the array any number of times:

- Select two **adjacent** elements of the array like `x` and `y`, such that `x * y <= k`, and replace both of them with a **single element** with value `x * y` (e.g. in one operation the array `[1, 2, 2, 3]` with `k = 5` can become `[1, 4, 3]` or `[2, 2, 3]`, but can't become `[1, 2, 6]`).

Return *the **minimum** possible length of* `nums` *after any number of operations*.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 10⁹`
- `1 ≤ k ≤ 10⁹`

---

## Examples

```
Example 1:
  Input: nums = [2,3,3,7,3,5], k = 20
  Output: 3
  Explanation: We perform these operations:
  1. [2,3,3,7,3,5] -> [6,3,7,3,5]
  2. [6,3,7,3,5] -> [18,7,3,5]
  3. [18,7,3,5] -> [18,7,15]
  It can be shown that 3 is the minimum length possible to achieve with the given operation.
```

```
Example 2:
  Input: nums = [3,3,3,3], k = 6
  Output: 4
  Explanation: We can't perform any operations since the product of every two adjacent elements is greater than 6.
  Hence, the answer is 4.
```

---

## Approach: Greedy Merging — O(n) ✅

```text
FUNCTION minArrayLength(nums, k):
    groups ← 1
    product ← nums[0]
    
    FOR i ← 1 TO LEN(nums) - 1 DO
        IF nums[i] = 0 THEN
            // Zero resets product, always safe to merge
            product ← 0
        ELSE IF product ≤ k / nums[i] THEN
            // product * nums[i] ≤ k, merge
            product ← product * nums[i]
        ELSE
            // Cannot merge, start new group
            groups ← groups + 1
            product ← nums[i]
    
    RETURN groups
```

---

## Walkthrough

Consider `nums = [2,3,5]`, `k = 6`.

| Step | `product` | Action |
|------|-----------|--------|
| Start | `product = 2`, `groups = 1` |
| i=1 (`3`) | `2 ≤ 6/3` → true, `product = 2*3 = 6` |
| i=2 (`5`) | `6 ≤ 6/5` → false, start new group → `groups = 2`, `product = 5` |

Resulting groups = 2, matching the minimal length.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy scan | **O(n)** | **O(1)** |

---

## Follow-Up Questions

- How would the algorithm change if you could merge non-adjacent elements?
- What if the merge condition depended on the sum instead of the product?
- Can you extend the approach to minimize the **sum** of the final array elements?

---

## Key Takeaway

> **Greedy interval merging by product** — keep multiplying adjacent elements while the product stays within bounds. Start a new group when it would exceed `k`.

---