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

Can you make the array non-decreasing by modifying **at most one** element?

**Constraints:**
- `1 <= n <= 10⁴`

---

## 2. Key Insight

> At most one violation allowed. When `nums[i] < nums[i-1]`, decide: lower the peak (`nums[i-1] = nums[i]`) or raise the valley (`nums[i] = nums[i-1]`). If `nums[i] < nums[i-2]`, we must raise; otherwise lower.

---

## 3. Approach: Greedy — O(n) ✅

```
FUNCTION checkPossibility(nums):
    count = 0
    FOR i ← 1 TO n - 1:
        IF nums[i] < nums[i - 1]:
            count += 1
            IF count > 1: RETURN false
            IF i >= 2 AND nums[i] < nums[i - 2]:
                nums[i] = nums[i - 1]    // raise nums[i]
            ELSE:
                nums[i - 1] = nums[i]    // lower nums[i-1]
    RETURN true
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Greedy fix at violation.** When a drop is found, choose the fix that minimizes disruption: lower the peak if possible, otherwise raise the valley. Allow at most one fix.
