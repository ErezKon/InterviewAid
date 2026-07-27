# 711. Number of Distinct Islands II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-islands-ii](https://leetcode.com/problems/number-of-distinct-islands-ii)
**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DFS + Canonical Form — O(m·n·k·log k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count distinct islands considering rotations and reflections as equivalent.

---

## 2. Key Insight

> For each island, generate all 8 transformations (4 rotations × 2 reflections). Normalize each: sort cells, translate to origin. The lexicographically smallest is the canonical form.

---

## 3. Approach: DFS + Canonical Form — O(m·n·k·log k) ✅

```
// DFS to find each island's cells
// Normalize: generate all 8 transformations (rotations + reflections)
// Sort cells, translate to origin, pick canonical form
// Count distinct canonical forms
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n·k·log k) where k = island size |
| **Space** | O(m·n) |

---

## 5. Key Takeaway

> **Canonical form under transformations.** Generate all 8 orientations, normalize each (sort + translate to origin), pick the smallest. Same technique used in polyomino classification.
