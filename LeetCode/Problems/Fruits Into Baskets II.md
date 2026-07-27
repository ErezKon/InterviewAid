# 3477. Fruits Into Baskets II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fruits-into-baskets-ii](https://leetcode.com/problems/fruits-into-baskets-ii)
**Companies:** Amazon, Google, Meta, Microsoft, Udemy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Brute Force — O(n · m) ✅](#2-approach-brute-force--on--m-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given fruits and baskets arrays, place each fruit in the first basket with sufficient capacity. Mark the basket as used. Count unplaced fruits.

**Constraints:**
- `1 <= n, m <= 100`

---

## 2. Approach: Brute Force — O(n · m) ✅

```
FUNCTION numOfUnplacedFruits(fruits, baskets):
    unplaced = 0
    FOR fruit IN fruits:
        placed = false
        FOR i, basket IN enumerate(baskets):
            IF basket >= fruit:
                baskets[i] = 0    // used
                placed = true
                BREAK
        IF NOT placed: unplaced += 1
    RETURN unplaced
```

---

## 3. Key Takeaway

> Simple greedy first-fit: for each fruit, scan baskets left to right and place in the first one with enough capacity. O(n · m) is fine for small constraints.
