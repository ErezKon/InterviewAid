# 1128. Number of Equivalent Domino Pairs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-equivalent-domino-pairs](https://leetcode.com/problems/number-of-equivalent-domino-pairs)
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Canonical Key + Counter — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count pairs of dominoes `(i, j)` where `i < j` and dominoes `i` and `j` are equivalent (same values regardless of order).

---

## 2. Approach: Canonical Key + Counter — O(n) ✅

```
FUNCTION numEquivDominoPairs(dominoes):
    count = Counter()
    result = 0
    FOR [a, b] IN dominoes:
        key = (MIN(a,b), MAX(a,b))
        result += count[key]
        count[key] += 1
    RETURN result
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 4. Key Takeaway

> **Normalize with (min, max) then count pairs.** For each new domino, it pairs with all previously seen equivalent dominoes. Accumulate count before incrementing.
