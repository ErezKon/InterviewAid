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

You are given two arrays of integers, `fruits` and `baskets`, each of length `n`, where `fruits[i]` represents the **quantity** of the `i^th` type of fruit, and `baskets[j]` represents the **capacity** of the `j^th` basket.

From left to right, place the fruits according to these rules:

- Each fruit type must be placed in the **leftmost available basket** with a capacity **greater than or equal** to the quantity of that fruit type.
- Each basket can hold **only one** type of fruit.
- If a fruit type **cannot be placed** in any basket, it remains **unplaced**.

Return the number of fruit types that remain unplaced after all possible allocations are made.

**Constraints:**
- `n == fruits.length == baskets.length`
- `1 <= n <= 100`
- `1 <= fruits[i], baskets[i] <= 1000`

---

## 2. Examples

**Example 1:**
```
Input: fruits = [4,2,5], baskets = [3,5,4]
Output: 1
Explanation: - fruits[0] = 4 is placed in baskets[1] = 5.
- fruits[1] = 2 is placed in baskets[0] = 3.
- fruits[2] = 5 cannot be placed in baskets[2] = 4.
Since one fruit type remains unplaced, we return 1.
```

**Example 2:**
```
Input: fruits = [3,6,1], baskets = [6,4,7]
Output: 0
Explanation: - fruits[0] = 3 is placed in baskets[0] = 6.
- fruits[1] = 6 cannot be placed in baskets[1] = 4 (insufficient capacity) but can be placed in the next available basket, baskets[2] = 7.
- fruits[2] = 1 is placed in baskets[1] = 4.
Since all fruits are successfully placed, we return 0.
```

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

> Simple greedy first-fit works efficiently for small constraints: scan baskets left-to-right and place each fruit in the first basket with enough capacity.
