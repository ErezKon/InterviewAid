# 3404. Count Special Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-special-subsequences](https://leetcode.com/problems/count-special-subsequences)
**Companies:** Bloomberg, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Count subsequences of length 4 `(p, q, r, s)` from the array where `p < q < r < s` (index-wise) and a specific arithmetic/divisibility relationship holds between `nums[p], nums[q], nums[r], nums[s]`. The exact condition is: `nums[p] * nums[r] == nums[q] * nums[s]`.

**Constraints:**
- `7 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

---

## Key Insight

Rewrite the condition as `nums[p]/nums[q] == nums[s]/nums[r]` (using fractions to avoid floating point). Fix the middle pair `(q, r)` and count valid `p` values to the left and `s` values to the right that produce matching ratios.

---

## Approach

```
FUNCTION countSpecialSubsequences(nums):
    n = LENGTH(nums)
    count = 0

    FOR q ← 1 TO n - 3 DO
        FOR r ← q + 2 TO n - 1 DO  // gap of at least 1 between q and r
            // Count p < q where nums[p]/nums[q] matches
            // Count s > r where nums[s]/nums[r] matches
            // Use reduced fractions as keys
            leftRatios = HashMap()
            FOR p ← 0 TO q - 1 DO
                g = GCD(nums[p], nums[q])
                leftRatios[(nums[p]/g, nums[q]/g)] += 1

            FOR s ← r + 1 TO n - 1 DO
                g = GCD(nums[s], nums[r])
                key = (nums[s]/g, nums[r]/g)
                count += leftRatios.get(key, 0)

    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³) — fix (q,r), scan left and right |
| **Space** | O(n) — ratio hash maps |

---

## Key Takeaway

> **When counting quadruplets with a product/ratio condition, fix the middle pair and use hash maps of reduced fractions to count matching outer elements. Converting products to ratios avoids overflow and enables hash-based counting.**
