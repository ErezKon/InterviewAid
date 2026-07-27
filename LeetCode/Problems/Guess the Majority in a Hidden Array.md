# 1538. Guess the Majority in a Hidden Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/guess-the-majority-in-a-hidden-array](https://leetcode.com/problems/guess-the-majority-in-a-hidden-array)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Query Comparison — O(n) queries ✅](#3-approach-query-comparison)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Hidden binary array. You can query `query(a, b, c, d)` which returns whether the majority among those 4 indices is 0 or 1. Find the index of the majority element using minimal queries.

---

## 2. Key Insight

> Compare each element to a reference by overlapping queries. If `query(0,1,2,3) == query(0,1,2,i)`, then `arr[3] == arr[i]`. Use this to count same/different from a reference.

---

## 3. Approach: Query Comparison — O(n) queries ✅

```
FUNCTION guessMajority(reader):
    // Use query(0,1,2,3) as baseline
    // For each i > 3, compare query(0,1,2,i) with baseline
    // Count same-as-3 vs different-from-3
    // Also determine relationship between indices 0,1,2 and 3
    // Return index of majority group (or -1 if no majority)
```

---

## 4. Key Takeaway

> Clever use of overlapping 4-element queries to determine relative equality. O(n) queries total.
