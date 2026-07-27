# 3901. Good Subsequence Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/good-subsequence-queries](https://leetcode.com/problems/good-subsequence-queries)
**Companies:** Infosys

---

## 1. Problem Description

Given an array and queries `[l, r]`, count "good" subsequences in each subarray. A subsequence is good if all element frequencies differ by at most 1. (Hard problem)

## 2. Approach: Offline + Segment Tree ✅

```
// Process queries offline sorted by right endpoint
// Use segment tree or BIT to track valid subsequence counts
// Maintain frequency constraints with careful bookkeeping
```

## Key Takeaway

> Hard offline query problem requiring efficient data structure (segment tree / BIT) with frequency tracking.
