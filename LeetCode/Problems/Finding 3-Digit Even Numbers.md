# 2094. Finding 3-Digit Even Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/finding-3-digit-even-numbers](https://leetcode.com/problems/finding-3-digit-even-numbers)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate All 3-digit Even Numbers — O(1) ✅](#3-approach-enumerate-all-3-digit-even-numbers)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array of digits, find all unique 3-digit even numbers that can be formed using the digits (each digit used at most as many times as it appears).

**Constraints:**
- `3 <= digits.length <= 100`
- `0 <= digits[i] <= 9`

---

## 2. Key Insight

> Instead of permuting indices, iterate all 3-digit even numbers (100-998, step 2) and check if each can be formed from the available digits.

---

## 3. Approach: Enumerate All 3-digit Even Numbers — O(1) ✅

```
FUNCTION findEvenNumbers(digits):
    result = set()
    FOR i, j, k in all permutations of 3 indices:
        IF digits[i] != 0:
            num = digits[i] * 100 + digits[j] * 10 + digits[k]
            IF num % 2 == 0: result.ADD(num)
    RETURN sorted(result)
```

Alternative: check each of 450 even 3-digit numbers against digit frequencies.

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n³) or O(450) with enumeration approach |
| **Space** | O(1) |

---

## 5. Key Takeaway

> Either permute digit indices or enumerate candidate numbers and verify against digit counts. Both are O(1) since the output space is bounded by 450 numbers.
