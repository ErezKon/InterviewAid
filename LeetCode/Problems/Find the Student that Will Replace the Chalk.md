# 1894. Find the Student that Will Replace the Chalk

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-student-that-will-replace-the-chalk](https://leetcode.com/problems/find-the-student-that-will-replace-the-chalk)
**Companies:** 6Sense, Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Modulo + Linear Scan — O(n) ✅](#3-approach-modulo--linear-scan--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Students use chalk in a circular order. Student `i` uses `chalk[i]` pieces. Given `k` pieces total, find which student will need to replace the chalk (i.e., the first student who can't use their full amount).

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= chalk[i], k <= 10⁹`

---

## 2. Key Insight

> After full rounds of chalk distribution, `k % total` gives the remaining chalk. Then scan linearly to find who runs out.

---

## 3. Approach: Modulo + Linear Scan — O(n) ✅

```
FUNCTION chalkReplacer(chalk, k):
    total = SUM(chalk); k %= total
    FOR i, c IN enumerate(chalk):
        IF k < c: RETURN i
        k -= c
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Modulo** eliminates full rounds, then a single linear scan finds the answer. Could also use binary search on prefix sums for O(log n) after modulo.
