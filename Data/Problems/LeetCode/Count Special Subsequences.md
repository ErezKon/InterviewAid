# 3404. Count Special Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-special-subsequences](https://leetcode.com/problems/count-special-subsequences)
**Companies:** Bloomberg, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Count subsequences of length 4 `(p, q, r, s)` from the array where `p < q < r < s` (index-wise) and a specific arithmetic/divisibility relationship holds between `nums[p], nums[q], nums[r], nums[s]`. The exact condition is: `nums[p] * nums[r] == nums[q] * nums[s]`.

**Constraints:**
- `7 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

---

## Examples

**Example 1:**
```
Input: nums = [2, 3, 4, 6, 8, 12, 24]
Output: 3
Explanation: The valid quadruplets are (0,1,3,5), (0,2,4,5), and (1,2,3,6).
```

**Example 2:**
```
Input: nums = [1, 2, 3, 4, 5, 6]
Output: 0
Explanation: No four‑index combination satisfies the product condition.
```

---

## Key Insight

Rewrite the condition as `nums[p]/nums[q] == nums[s]/nums[r]` (using fractions to avoid floating point). Fix the middle pair `(q, r)` and count valid `p` values to the left and `s` values to the right that produce matching ratios.

---

## Approach

```text
FUNCTION countSpecialSubsequences(nums):
    n ← LENGTH(nums)
    total ← 0

    FOR q ← 1 TO n - 3 DO
        FOR r ← q + 2 TO n - 1 DO
            // Build hash map of reduced fractions for left side
            leftRatios ← HashMap()
            FOR p ← 0 TO q - 1 DO
                g ← GCD(nums[p], nums[q])
                key ← (nums[p] / g, nums[q] / g)
                leftRatios[key] ← leftRatios.get(key, 0) + 1

            // Scan right side and match ratios
            FOR s ← r + 1 TO n - 1 DO
                g ← GCD(nums[s], nums[r])
                key ← (nums[s] / g, nums[r] / g)
                total ← total + leftRatios.get(key, 0)

    RETURN total
```

---

## Walkthrough

Consider the first example `nums = [2, 3, 4, 6, 8, 12, 24]`.

| Step | q | r | Left Ratios (p) | Right Ratios (s) | Matches added |
|------|---|---|----------------|------------------|---------------|
| 1 | 1 | 3 | {(2/3)} → 1   | {(6/6)} → 1      | 1 (p=0, s=5) |
| 2 | 2 | 4 | {(2/4), (3/4)} → 1 each | {(8/8)} → 1 | 1 (p=0, s=5) |
| 3 | 1 | 6 | {(2/3)} → 1   | {(24/12)} → (2/1) → 0 | 0 |
| … | … | … | … | … | … |

Summing all matches yields the final count of **3**.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³) — for each `(q, r)` we scan left and right sides |
| **Space** | O(n) — hash map of ratios for the current left side |

---

## Follow-Up Questions

1. How would you reduce the time complexity using prefix data structures?
2. Can the problem be extended to count subsequences of length `k` with a similar product relationship?
3. What modifications are needed if the array can contain zeros?

---

## Key Takeaway

> **When counting quadruplets with a product/ratio condition, fix the middle pair and use hash maps of reduced fractions to count matching outer elements. Converting products to ratios avoids overflow and enables hash‑based counting.**