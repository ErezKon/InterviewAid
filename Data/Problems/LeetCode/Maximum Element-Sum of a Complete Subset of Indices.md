# 2862. Maximum Element-Sum of a Complete Subset of Indices

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-element-sum-of-a-complete-subset-of-indices](https://leetcode.com/problems/maximum-element-sum-of-a-complete-subset-of-indices)
**Companies:** Purplle

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Group by Square-Free Part — O(n√n)](#approach-group-by-square-free-part--onn-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **1****-indexed** array `nums`. Your task is to select a **complete subset** from `nums` where every pair of selected indices multiplied is a perfect square,. i. e. if you select `a_i` and `a_j`, `i * j` must be a perfect square.

Return the *sum* of the complete subset with the *maximum sum*.

**Constraints:**
- `1 <= n == nums.length <= 10^4`
- `1 <= nums[i] <= 10^9`

---

## Key Insight

> `i * j` is a perfect square iff `i` and `j` have the same **square-free part** (the product of primes with odd exponents). Group indices by their square-free part. Each group forms a valid "complete subset." Sum each group and return the maximum.

---

## Approach: Group by Square-Free Part — O(n√n) ✅

```text
FUNCTION maximumSum(nums):
    FUNCTION squareFreePart(x):
        SET result ← 1
        FOR p ← 2 WHILE p * p <= x:
            SET count ← 0
            WHILE x % p == 0:
                SET x ← x / p
                SET count ← count + 1
            IF count % 2 == 1:
                SET result ← result * p
        IF x > 1:
            SET result ← result * x
        RETURN result

    SET groups ← MAP default 0
    FOR i ← 1 TO LENGTH(nums):
        SET key ← squareFreePart(i)
        SET groups[key] ← groups[key] + nums[i - 1]

    RETURN MAXIMUM VALUE IN groups
```

---

## Examples

**Example 1:**
```
Input: nums = [8,7,3,5,7,2,4,9]
Output: 16
Explanation: We select elements at indices 2 and 8 and 2 * 8 is a perfect square.
```

**Example 2:**
```
Input: nums = [8,10,3,8,1,13,7,9,4]
Output: 20
Explanation: We select elements at indices 1, 4, and 9. 1 * 4, 1 * 9, 4 * 9 are perfect squares.
```

---

## Walkthrough

Consider the first example `nums = [1,2,3,4]`.
| Index | Value | Square‑Free Part |
|-------|-------|------------------|
| 1     | 1     | 1                |
| 2     | 2     | 2                |
| 3     | 3     | 3                |
| 4     | 4     | 1 (since 4 = 2²) |

1. Compute square‑free part for each index.
2. Group indices by these parts: `{1,4}` → sum 1+4 = 5, `{2}` → 2, `{3}` → 3.
3. The maximum group sum is 5, so the answer is 5.

---

## Follow-Up Questions
- How would the solution change if the array length `n` could be up to `10⁶`?
- Can you extend the approach to return the actual indices of the optimal subset?
- What if the definition of a "complete subset" required `i * j` to be a perfect cube instead of a square?

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Group by square-free part | **O(n√n)** | O(n) |

---

## Key Takeaway

> **"Product is perfect square" ↔ same square-free part.** Group indices by their square-free factorization and sum each group.
