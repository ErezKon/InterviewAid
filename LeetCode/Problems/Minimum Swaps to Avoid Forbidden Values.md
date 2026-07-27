# 3785. Minimum Swaps to Avoid Forbidden Values

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-avoid-forbidden-values](https://leetcode.com/problems/minimum-swaps-to-avoid-forbidden-values)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy / Graph — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a permutation and a set of forbidden values for each position, find the **minimum** number of adjacent swaps to rearrange so no position holds a forbidden value.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Model the problem as placing elements to avoid forbidden positions. Identify conflicts (elements at forbidden positions) and find minimum swaps to resolve all conflicts, potentially using a greedy or cycle-decomposition approach.

---

## 3. Approach: Greedy / Cycle Decomposition ✅

```
FUNCTION minSwaps(nums, forbidden):
    // Build target permutation avoiding forbidden values
    // Decompose permutation into cycles
    // Minimum swaps = n - numCycles (for the conflict subproblem)
    // Handle constraints with BFS/greedy resolution
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Permutation cycle decomposition** — minimum swaps in a permutation = `n - cycles`. When forbidden constraints exist, first determine a valid target permutation, then compute the swap distance.
