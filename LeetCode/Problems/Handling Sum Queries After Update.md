# 2569. Handling Sum Queries After Update

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/handling-sum-queries-after-update](https://leetcode.com/problems/handling-sum-queries-after-update)
**Companies:** Trilogy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Segment Tree with Lazy Propagation — O(n + q log n) ✅](#3-approach-segment-tree-with-lazy-propagation)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given arrays `nums1` (binary) and `nums2`, handle three types of queries: flip a range in `nums1`, add `nums1[i] * p` to each `nums2[i]`, and query the sum of `nums2`.

---

## 2. Key Insight

> Query type 2 adds `p * count_of_ones_in_nums1` to sum of `nums2`. So we only need to track the count of 1s in `nums1` efficiently. Range flip = segment tree with lazy XOR.

---

## 3. Approach: Segment Tree with Lazy Propagation — O(n + q log n) ✅

```
// Segment tree on nums1 with lazy XOR for range flips
// Track count of 1s in each segment
// Maintain running sum of nums2
// Type 1: flip range [l, r] in nums1 (lazy XOR)
// Type 2: sum2 += p * count_of_ones_in_nums1
// Type 3: return sum2
```

---

## 4. Key Takeaway

> **Segment tree with lazy XOR** for range flips. The only thing needed from `nums1` is the global count of 1s for type-2 queries.
