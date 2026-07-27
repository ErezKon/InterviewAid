# 2959. Number of Possible Sets of Closing Branches

**Difficulty:** 🔴 Hard

**Companies:** Atlassian, Meesho, Ta Digital

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask + Floyd-Warshall — O(2ⁿ · n³)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` branches with roads, find how many subsets of branches can be closed such that all remaining branches are within `maxDistance` of each other.

---

## 2. Key Insight

> n ≤ 10, so enumerate all 2ⁿ subsets. For each subset of remaining branches, run Floyd-Warshall to check if all pairwise distances ≤ maxDistance.

---

## 3. Approach: Bitmask + Floyd-Warshall — O(2ⁿ · n³) ✅

```
// Bitmask over branches to keep
// For each subset, check if all remaining branches reachable within maxDistance
// Floyd-Warshall on subset
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(2ⁿ · n³) |
| **Space** | O(n²) |

---

## 5. Key Takeaway

> **Small n → bitmask enumeration.** For each subset of open branches, verify connectivity/distance constraint with Floyd-Warshall. Feasible when n ≤ ~15.
