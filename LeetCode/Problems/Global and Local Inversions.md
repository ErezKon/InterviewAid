# 775. Global and Local Inversions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/global-and-local-inversions](https://leetcode.com/problems/global-and-local-inversions)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Position Check — O(n) ✅](#3-approach-position-check--on-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given a permutation of `[0, n-1]`, return true if global inversions == local inversions. A local inversion is `nums[i] > nums[i+1]`. A global inversion is any `nums[i] > nums[j]` where `i < j`.

---

## 2. Key Insight

> Every local inversion is a global inversion. So `global == local` iff there are no "non-local" inversions. This holds iff no element is more than 1 position away from its sorted index.

---

## 3. Approach: Position Check — O(n) ✅

```
FUNCTION isIdealPermutation(nums):
    // Every local inversion is global. So global == local iff no non-local inversions exist.
    // Non-local: nums[i] > nums[j] where j > i + 1
    // Equivalent: no element is > 1 position away from its sorted position
    FOR i, num IN enumerate(nums):
        IF ABS(num - i) > 1: RETURN false
    RETURN true
```

---

## 4. Key Takeaway

> `|nums[i] - i| ≤ 1` for all i ⟺ no non-local inversions ⟺ global == local. O(n) single check.
