# 3479. Fruits Into Baskets III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fruits-into-baskets-iii](https://leetcode.com/problems/fruits-into-baskets-iii)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Segment Tree — O(n log m) ✅](#3-approach-segment-tree--on-log-m-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Similar to Baskets II but with larger constraints. Assign each fruit to the first basket with sufficient capacity efficiently.

---

## 2. Key Insight

> Use a segment tree over baskets where each node stores the max capacity in its range. Query finds the leftmost basket ≥ fruit size, then update that basket to 0.

---

## 3. Approach: Segment Tree — O(n log m) ✅

```
// Assign fruits to baskets with capacity constraints
// Use segment tree or sorted structure for efficient basket lookup

FUNCTION numOfUnplacedFruits(fruits, baskets):
    Build segment tree over baskets (max in range)
    unplaced ← 0
    FOR fruit IN fruits DO
        idx ← query(1, 0, m-1, fruit)  // leftmost basket ≥ fruit
        IF idx == -1 THEN unplaced += 1
        ELSE update(idx, 0)             // mark used
    RETURN unplaced
```

---

## 4. Key Takeaway

> **Segment tree with leftmost query** — find the leftmost position where max ≥ target. Enables O(log m) per fruit placement instead of O(m).
