# 3479. Fruits Into Baskets III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fruits-into-baskets-iii](https://leetcode.com/problems/fruits-into-baskets-iii)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Segment Tree — O(n log m) ✅](#3-approach-segment-tree--on-log-m-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Similar to Baskets II but with larger constraints. Assign each fruit to the first basket with sufficient capacity efficiently.

---

## 2. Key Insight

> Use a segment tree over baskets where each node stores the max capacity in its range. Query finds the leftmost basket ≥ fruit size, then update that basket to 0.

---

## 3. Approach: Segment Tree — O(n log m) ✅

```text
// Assign fruits to baskets with capacity constraints
// Use segment tree or sorted structure for efficient basket lookup

FUNCTION numOfUnplacedFruits(fruits, baskets):
    // Build segment tree over baskets (max in range)
    BUILD segmentTree FROM baskets
    SET unplaced ← 0
    FOR fruit IN fruits DO
        idx ← queryLeftmost(1, 0, m-1, fruit)  // leftmost basket with capacity ≥ fruit
        IF idx == -1 THEN
            SET unplaced ← unplaced + 1
        ELSE
            update(idx, 0)                     // mark basket as used
    RETURN unplaced
```

---

## 4. Examples

**Example 1:**
```
fruits = [2, 5, 1]
baskets = [3, 5]
```
*Result:* `0` (all fruits placed).

**Example 2:**
```
fruits = [4, 4, 4]
baskets = [3, 3]
```
*Result:* `3` (no basket can hold any fruit).

---

## 5. Walkthrough

Take Example 1:
1. Build segment tree over `[3,5]` → root stores max 5.
2. Fruit 2: query finds basket 0 (capacity 3) → update basket 0 to 0.
3. Fruit 5: query now finds basket 1 (capacity 5) → update basket 1 to 0.
4. Fruit 1: query finds no basket with capacity ≥ 1 (both are 0) → count as unplaced.
5. Return `0` unplaced fruits.

---

## 6. Complexity Analysis

- **Time:** O(n log m) – each fruit triggers a segment‑tree query and optional update.
- **Space:** O(m) – segment tree storage for `m` baskets.

---

## 7. Key Takeaway

> **Segment tree with leftmost query** — find the leftmost position where max ≥ target. Enables O(log m) per fruit placement instead of O(m).
