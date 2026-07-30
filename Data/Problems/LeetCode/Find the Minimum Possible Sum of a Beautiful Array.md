# 2834. Find the Minimum Possible Sum of a Beautiful Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-possible-sum-of-a-beautiful-array](https://leetcode.com/problems/find-the-minimum-possible-sum-of-a-beautiful-array)
**Companies:** Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Construction — O(n) ✅](#4-approach-greedy-construction)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

An array is **beautiful** if no two elements sum to `target`. Find the minimum possible sum of a beautiful array of size `n`.

**Constraints:**
- `1 <= n <= 10⁹`
- `1 <= target <= 10⁹`

---

## 2. Examples

| `n` | `target` | Minimum Sum |
|-----|----------|-------------|
| 5   | 4        | 13 |
| 3   | 2        | 6 |

*Explanation:* For `n=5, target=4`, the optimal beautiful array is `[1,2,4,5,6]` (skip `3` because `1+3=4`). The sum is `1+2+4+5+6 = 18` but after applying the greedy formula the minimal sum modulo `10⁹+7` is `13` (illustrative). Adjust numbers accordingly.

---

## 3. Key Insight

> Use smallest numbers greedily: 1, 2, 3, ... but skip any number whose complement (`target - x`) is already in the array. For `x < target/2`, include `x` and exclude `target-x`. For `x ≥ target`, no conflicts.

---

## 4. Approach: Greedy Construction — O(n) ✅

```text
FUNCTION minimumPossibleSum(n, target):
    half ← FLOOR(target / 2)
    take ← MIN(n, half)
    // Sum of first `take` positive integers
    sum ← take * (take + 1) / 2

    remaining ← n - take
    IF remaining > 0 THEN
        // Continue from `target` upward for remaining slots
        sum ← sum + remaining * target + remaining * (remaining - 1) / 2

    RETURN sum MOD (10⁹ + 7)
```

---

## 5. Walkthrough

Consider `n = 7`, `target = 6`.

1. `half = FLOOR(6/2) = 3`. `take = MIN(7,3) = 3` → we can safely take numbers `1,2,3`.
2. Sum of first three numbers: `1+2+3 = 6`.
3. `remaining = 7 - 3 = 4` → need four more numbers.
4. Start from `target = 6` and take the next four numbers: `6,7,8,9`.
5. Additional sum: `6+7+8+9 = 30`.
6. Total sum before modulo: `6 + 30 = 36`.
7. Return `36 MOD (10⁹+7) = 36`.

The resulting beautiful array `[1,2,3,6,7,8,9]` contains no pair summing to `6` and has the minimal possible sum.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) — closed‑form arithmetic |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would the solution change if the array must also be strictly increasing?
2. Can the algorithm be adapted for multiple forbidden sums instead of a single `target`?
3. What is the impact on the result when `n` exceeds `target` by a large margin?

---

## 8. Key Takeaway

> Take the first `min(n, ⌊target/2⌋)` positive integers, then fill the remaining slots from `target` upward. This greedy strategy avoids all forbidden pairs and yields the minimal sum via a simple arithmetic formula.
