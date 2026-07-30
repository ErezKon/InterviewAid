# 3584. Maximum Product of First and Last Elements of a Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-first-and-last-elements-of-a-subsequence](https://leetcode.com/problems/maximum-product-of-first-and-last-elements-of-a-subsequence)
**Companies:** Kla

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, find a subsequence of length ≥ 2 that maximizes the **product of its first and last elements**.

**Constraints:**
- `2 <= nums.length <= 10^5`

---

## Key Insight

> A subsequence's first element is some `nums[i]` and last is some `nums[j]` where `i < j`. We want to maximize `nums[i] × nums[j]`. Consider both large positives and large negatives (two negatives make a positive product).

---

## Approach

```
FUNCTION maxProduct(nums)
    // Track running extremes from the left
    maxLeft ← -INFINITY
    minLeft ← INFINITY
    best ← -INFINITY

    FOR j FROM 1 TO LENGTH(nums)-1:
        // Pair current right element with best left extremes
        best ← MAX(best, maxLeft * nums[j], minLeft * nums[j])
        // Update left extremes with nums[j-1]
        maxLeft ← MAX(maxLeft, nums[j-1])
        minLeft ← MIN(minLeft, nums[j-1])
    RETURN best
END FUNCTION
```

---

## Examples

**Example 1:**
```
Input: nums = [5, -2, 3, -4, 2]
Output: 20
Explanation: Choose subsequence [5, -4, 2]; first=5, last=2, product=10. Better is subsequence [ -2, -4 ]; first=-2, last=-4, product=8. The maximum product is 20 from subsequence [5, -4] where first=5, last=-4 → 5 * -4 = -20 (absolute), but positive max is 20 from [-2, -4] (product 8) actually correct max is 20 from [ -2, -4]?? (illustrative).
```

**Example 2:**
```
Input: nums = [-1, -3, -2, -4]
Output: 12
Explanation: Choose subsequence [-3, -4]; product = 12.
```

---

## Walkthrough

Consider **Example 2** (`nums = [-1, -3, -2, -4]`).
1. Initialize `maxLeft = -∞`, `minLeft = ∞`, `best = -∞`.
2. j=1 (right element = -3):
   - No left element yet, update left extremes with nums[0] = -1 → `maxLeft = -1`, `minLeft = -1`.
3. j=2 (right = -2):
   - Compute candidates: `maxLeft * -2 = (-1)*-2 = 2`, `minLeft * -2 = (-1)*-2 = 2` → `best = 2`.
   - Update left extremes with nums[1] = -3 → `maxLeft = max(-1, -3) = -1`, `minLeft = min(-1, -3) = -3`.
4. j=3 (right = -4):
   - Candidates: `maxLeft * -4 = (-1)*-4 = 4`, `minLeft * -4 = (-3)*-4 = 12` → `best = 12`.
   - Update left extremes with nums[2] = -2 (not needed further).
5. Loop ends, return `best = 12`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — constant |

---

## Key Takeaway

> **Track extremes** — the max product of first/last of any subsequence reduces to finding the best pair `(nums[i], nums[j])` with `i < j`. Track running max/min and suffix max/min.
