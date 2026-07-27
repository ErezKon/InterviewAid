# 556. Next Greater Element III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-element-iii](https://leetcode.com/problems/next-greater-element-iii)
**Companies:** Adobe, Amazon, Bloomberg, Doordash, Google, Infosys, Meta, Microsoft, Mitsogo, Morgan Stanley, Oracle, Tiktok, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Next Permutation — O(d)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a positive integer `n`, find the **smallest** integer with the **same digits** that is greater than `n`. Return `-1` if no such number exists or it exceeds 32-bit integer range.

---

## 2. Key Insight

> This is exactly the **Next Permutation** algorithm (#31) applied to the digits of `n`. Find pivot, swap with successor, reverse suffix.

---

## 3. Approach: Next Permutation — O(d) ✅

```
FUNCTION nextGreaterElement(n):
    digits = list(str(n))

    // 1. Find rightmost digit smaller than its successor
    i = len(digits) - 2
    WHILE i >= 0 AND digits[i] >= digits[i+1]:
        i -= 1
    IF i < 0: RETURN -1

    // 2. Find rightmost digit greater than digits[i]
    j = len(digits) - 1
    WHILE digits[j] <= digits[i]:
        j -= 1

    // 3. Swap and reverse
    SWAP(digits[i], digits[j])
    REVERSE(digits[i+1:])

    result = int(JOIN(digits))
    RETURN result IF result <= 2^31 - 1 ELSE -1
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d) — d = number of digits |
| **Space** | O(d) |

---

## 5. Key Takeaway

> **Next Permutation on digits.** Same three-step algorithm: find pivot, swap with smallest larger digit to the right, reverse suffix. Check 32-bit overflow.
