# 3477. Fruits Into Baskets II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fruits-into-baskets-ii](https://leetcode.com/problems/fruits-into-baskets-ii)
**Companies:** Amazon, Google, Meta, Microsoft, Udemy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Brute Force — O(n · m) ✅](#3-approach-brute-force--on--m-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `fruits` and `baskets` arrays, place each fruit in the first basket with sufficient capacity. Mark the basket as used. Count unplaced fruits.

**Constraints:**
- `1 <= n, m <= 100`

---

## 2. Examples

| fruits | baskets | Output | Explanation |
|--------|---------|--------|-------------|
| `[4,2,3]` | `[5,3]` | `0` | Fruit 4 fits basket 5, fruit 2 fits basket 3, fruit 3 has no remaining basket → 0 unplaced. |
| `[5,5,5]` | `[4,4]` | `3` | No basket can hold any fruit, all 3 remain unplaced. |

---

## 3. Approach: Brute Force — O(n · m) ✅

```text
FUNCTION numOfUnplacedFruits(fruits, baskets):
    SET unplaced ← 0
    FOR fruit IN fruits DO
        SET placed ← false
        FOR i ← 0 TO LENGTH(baskets) - 1 DO
            IF baskets[i] >= fruit THEN
                SET baskets[i] ← 0          // mark used
                SET placed ← true
                BREAK
        IF NOT placed THEN
            SET unplaced ← unplaced + 1
    RETURN unplaced
```

---

## 4. Walkthrough

Consider `fruits = [4,2,3]` and `baskets = [5,3]`:

| Step | fruit | baskets state | placed? | unplaced |
|------|-------|---------------|---------|----------|
| 1 | 4 | `[5,3]` → basket 0 used → `[0,3]` | true | 0 |
| 2 | 2 | `[0,3]` → basket 1 used → `[0,0]` | true | 0 |
| 3 | 3 | `[0,0]` → no basket ≥ 3 | false | **1** |

The algorithm scans each basket for each fruit, marking the first sufficient basket as used.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) — each fruit may scan all baskets |
| **Space** | O(1) — only a few counters |

---

## 6. Follow-Up Questions

1. How would you improve the runtime if `m` (number of baskets) were large?
2. Can you adapt the algorithm to return the final state of baskets?
3. What if baskets could hold multiple fruits up to their capacity?

---

## 7. Key Takeaway

> Simple greedy first‑fit works efficiently for small constraints: scan baskets left‑to‑right and place each fruit in the first basket with enough capacity.
