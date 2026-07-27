# 904. Fruit Into Baskets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fruit-into-baskets](https://leetcode.com/problems/fruit-into-baskets)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Servicenow, Tiktok, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n) ✅](#3-approach-sliding-window--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Collect fruits from a row of trees into 2 baskets. Each basket holds one type of fruit. Find the maximum number of fruits you can collect in a contiguous subarray.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Equivalent to "Longest Substring with At Most 2 Distinct Characters" (#159). Use sliding window with a frequency map, shrink when more than 2 types appear.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION totalFruit(fruits):
    count = {}
    left = 0
    maxLen = 0

    FOR right ← 0 TO n - 1:
        count[fruits[right]] = count.get(fruits[right], 0) + 1

        WHILE len(count) > 2:
            count[fruits[left]] -= 1
            IF count[fruits[left]] == 0:
                DELETE count[fruits[left]]
            left += 1

        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) — at most 3 keys |

---

## 5. Key Takeaway

> **Sliding window with at most K distinct** is a reusable template. Here K=2. Shrink left when distinct count exceeds K.
