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

You are given an array `nums` consisting of positive integers.

A **special subsequence** is defined as a subsequence of length 4, represented by indices `(p, q, r, s)`, where `p < q < r < s`. This subsequence **must** satisfy the following conditions:

- `nums[p] * nums[r] == nums[q] * nums[s]`
- There must be *at least* **one** element between each pair of indices. In other words, `q - p > 1`, `r - q > 1` and `s - r > 1`.

Return the *number* of different **special** **subsequences** in `nums`.

**Constraints:**
- `7 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,3,6,1]
Output: 1
Explanation: There is one special subsequence in nums.
- (p, q, r, s) = (0, 2, 4, 6):
- This corresponds to elements (1, 3, 3, 1).
- nums[p] * nums[r] = nums[0] * nums[4] = 1 * 3 = 3
- nums[q] * nums[s] = nums[2] * nums[6] = 3 * 1 = 3
```

**Example 2:**
```
Input: nums = [3,4,3,4,3,4,3,4]
Output: 3
Explanation: There are three special subsequences in nums.
- (p, q, r, s) = (0, 2, 4, 6):
- This corresponds to elements (3, 3, 3, 3).
- nums[p] * nums[r] = nums[0] * nums[4] = 3 * 3 = 9
- nums[q] * nums[s] = nums[2] * nums[6] = 3 * 3 = 9
- (p, q, r, s) = (1, 3, 5, 7):
- This corresponds to elements (4, 4, 4, 4).
- nums[p] * nums[r] = nums[1] * nums[5] = 4 * 4 = 16
- nums[q] * nums[s] = nums[3] * nums[7] = 4 * 4 = 16
- (p, q, r, s) = (0, 2, 5, 7):
- This corresponds to elements (3, 3, 4, 4).
- nums[p] * nums[r] = nums[0] * nums[5] = 3 * 4 = 12
- nums[q] * nums[s] = nums[2] * nums[7] = 3 * 4 = 12
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

> **When counting quadruplets with a product/ratio condition, fix the middle pair and use hash maps of reduced fractions to count matching outer elements. Converting products to ratios avoids overflow and enables hash-based counting.**