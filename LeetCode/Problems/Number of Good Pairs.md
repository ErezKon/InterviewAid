# 1512. Number of Good Pairs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-good-pairs](https://leetcode.com/problems/number-of-good-pairs)
**Companies:** Accenture, Amazon, Bloomberg, Google, Htc, Meta, Microsoft, Sony, Tcs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counter — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count pairs `(i, j)` where `i < j` and `nums[i] == nums[j]`.

---

## 2. Key Insight

> When we encounter a number that appeared `k` times before, it forms `k` new good pairs with the previous occurrences.

---

## 3. Approach: Counter — O(n) ✅

```
FUNCTION numIdenticalPairs(nums):
    count = {}
    pairs = 0
    FOR num IN nums:
        pairs += count.get(num, 0)
        count[num] = count.get(num, 0) + 1
    RETURN pairs
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Accumulate before incrementing.** Each new occurrence of a value pairs with all previous occurrences. Classic counting pairs pattern.
