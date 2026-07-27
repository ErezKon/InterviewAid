# 1434. Number of Ways to Wear Different Hats to Each Other

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other](https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other)
**Companies:** De Shaw, Mindtickle, Roblox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask DP — O(40 · 2^n · n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Assign unique hats (1-40) to people (up to 10), where each person has a preference list. Count valid assignments mod 10⁹+7.

---

## 2. Key Insight

> Bitmask over people (≤ 10), not hats (≤ 40). Iterate hats one by one. For each hat, either skip or assign to a person who likes it.

---

## 3. Approach: Bitmask DP — O(40 · 2^n · n) ✅

```
// Bitmask DP over people (up to 10)
// dp[mask] = ways to assign hats to people in mask
// Iterate over hats 1..40, for each hat try assigning to each person who likes it
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(40 · 2^n · n) where n ≤ 10 |
| **Space** | O(2^n) |

---

## 5. Key Takeaway

> **Bitmask over the smaller dimension (people, not hats).** Iterate hats sequentially, update the bitmask of satisfied people. Classic assignment DP trick.
