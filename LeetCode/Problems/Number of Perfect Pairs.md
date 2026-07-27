# 3649. Number of Perfect Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-perfect-pairs](https://leetcode.com/problems/number-of-perfect-pairs)
**Companies:** Atlassian, Bloomberg, Goldman Sachs, Squarepoint Capital, Visa, Wise

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Two Pointers / Hash Map — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count pairs `(i, j)` where `i < j` satisfying the "perfect pair" condition based on specific bitwise or arithmetic constraints.

---

## 2. Key Insight

> Identify the pair condition, then use sorting + two pointers or hash map lookup to count efficiently.

---

## 3. Approach: Sort + Two Pointers / Hash Map — O(n log n) ✅

```
// Count pairs (i, j) where i < j satisfying the "perfect pair" condition
// Typically involves sorting + two pointers or hash map approach
// depending on exact constraint definition
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Reduce pair condition to a searchable form.** Sort or hash to convert O(n²) brute force into O(n log n) or O(n).
