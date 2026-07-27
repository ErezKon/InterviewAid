# 2782. Number of Unique Categories

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-unique-categories](https://leetcode.com/problems/number-of-unique-categories)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Union-Find with API — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` items and an API `haveSameCategory(a, b)`, find the number of unique categories.

---

## 2. Key Insight

> Use Union-Find. For each pair, if `haveSameCategory` returns true, union them. Count distinct roots.

---

## 3. Approach: Union-Find with API — O(n²) ✅

```
FUNCTION numberOfCategories(n, categoryHandler):
    parent = [0..n-1]
    FOR i ← 0 TO n-1:
        FOR j ← i+1 TO n-1:
            IF categoryHandler.haveSameCategory(i, j):
                union(i, j)
    RETURN count of distinct find(i) for all i
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² · α(n)) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Union-Find with black-box API.** When you can only query pairwise membership, check all pairs and union. Count connected components.
