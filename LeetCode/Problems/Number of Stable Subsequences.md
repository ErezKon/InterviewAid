# 3686. Number of Stable Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-stable-subsequences](https://leetcode.com/problems/number-of-stable-subsequences)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP / Combinatorics](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subsequences satisfying the "stable" condition based on element ordering and value constraints. Return mod 10⁹+7.

---

## 2. Key Insight

> Analyze the stability condition to identify which subsequences qualify. Often reducible to counting subsequences with specific ordering or sum properties via DP.

---

## 3. Approach: DP / Combinatorics ✅

```
// DP on subsequence properties
// Track relevant state (e.g., last element, count, sum)
// Transition: include or exclude each element
// Count valid subsequences satisfying the stable condition
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · S) where S = state space |
| **Space** | O(S) |

---

## 5. Key Takeaway

> **Identify the stability invariant, then count via DP.** Reduce the condition to trackable state and enumerate valid subsequences.
