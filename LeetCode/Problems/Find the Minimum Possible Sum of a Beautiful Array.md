# 2834. Find the Minimum Possible Sum of a Beautiful Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-possible-sum-of-a-beautiful-array](https://leetcode.com/problems/find-the-minimum-possible-sum-of-a-beautiful-array)
**Companies:** Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Construction — O(n) ✅](#3-approach-greedy-construction--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

An array is **beautiful** if no two elements sum to `target`. Find the minimum possible sum of a beautiful array of size `n`.

**Constraints:**
- `1 <= n <= 10⁹`
- `1 <= target <= 10⁹`

---

## 2. Key Insight

> Use smallest numbers greedily: 1, 2, 3, ... but skip any number whose complement (target - x) is already in the array. For x < target/2, include x and exclude target-x. For x ≥ target, no conflicts.

---

## 3. Approach: Greedy Construction — O(n) ✅

```
FUNCTION minimumPossibleSum(n, target):
    // Take numbers 1, 2, ..., floor(target/2) (up to n of them)
    // Then continue from target, target+1, ... for remaining slots
    half ← target / 2
    take ← MIN(n, half)
    sum ← take * (take + 1) / 2    // sum of 1..take

    remaining ← n - take
    IF remaining > 0 THEN
        // Take target, target+1, ..., target+remaining-1
        sum += remaining * target + remaining * (remaining - 1) / 2

    RETURN sum MOD (10⁹ + 7)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) — closed-form arithmetic |
| **Space** | O(1) |

---

## 5. Key Takeaway

> Take the first `min(n, ⌊target/2⌋)` positive integers, then fill remaining from `target` upward. This avoids all forbidden pairs and minimizes the sum using a closed-form formula.
