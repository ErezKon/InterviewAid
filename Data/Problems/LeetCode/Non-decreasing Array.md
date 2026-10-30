# 665. Non-decreasing Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/non-decreasing-array](https://leetcode.com/problems/non-decreasing-array)
**Companies:** Amazon, Cashfree, Google, Meta, Turing, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums` with `n` integers, your task is to check if it could become non-decreasing by modifying **at most one element**.

We define an array is non-decreasing if `nums[i] <= nums[i + 1]` holds for every `i` (**0-based**) such that (`0 <= i <= n - 2`).

**Constraints:**

- `n == nums.length`
- `1 <= n <= 10⁴`
- `-10⁵ <= nums[i] <= 10⁵`

---

## 2. Key Insight

> At most one violation allowed. When `nums[i] < nums[i-1]`, decide: lower the peak (`nums[i-1] = nums[i]`) or raise the valley (`nums[i] = nums[i-1]`). If `nums[i] < nums[i-2]`, we must raise; otherwise lower.

---

## 3. Approach: Greedy — O(n) ✅

```text
FUNCTION checkPossibility(nums):
    count ← 0
    FOR i ← 1 TO n - 1:
        IF nums[i] < nums[i - 1]:
            count ← count + 1
            IF count > 1:
                RETURN false
            IF i >= 2 AND nums[i] < nums[i - 2]:
                nums[i] ← nums[i - 1]    // raise nums[i]
            ELSE:
                nums[i - 1] ← nums[i]    // lower nums[i-1]
    RETURN true
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Examples

```
Example 1:
  Input: nums = [4,2,3]
  Output: true
  Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
```

```
Example 2:
  Input: nums = [4,2,1]
  Output: false
  Explanation: You cannot get a non-decreasing array by modifying at most one element.
```

---

## 6. Walkthrough

**Example:** `[4,2,3]`
1. At `i = 1`, `2 < 4` → first violation (`count = 1`).
2. `i >= 2` is false, so we lower the peak: set `nums[0] = 2` → array becomes `[2,2,3]`.
3. Continue scanning, no further violations. Return `true`.

---

## 7. Follow-Up Questions

- How would you extend the solution to allow **k** modifications?
- Can you adapt the greedy check to work for a streaming input where the array is not fully stored?

---

## 8. Key Takeaway

> **Greedy fix at violation.** When a drop is found, choose the fix that minimizes disruption: lower the peak if possible, otherwise raise the valley. Allow at most one fix.
