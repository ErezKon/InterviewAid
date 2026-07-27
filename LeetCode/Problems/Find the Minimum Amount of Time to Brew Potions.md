# 3494. Find the Minimum Amount of Time to Brew Potions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-amount-of-time-to-brew-potions](https://leetcode.com/problems/find-the-minimum-amount-of-time-to-brew-potions)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sequential Simulation — O(n · m) ✅](#3-approach-sequential-simulation--on--m-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` wizards with skills and `m` potions requiring mana, wizards process potions in order. Wizard `i` takes `skill[i] * mana[j]` time for potion `j`. Each wizard must finish before the next starts on the same potion. Minimize total time.

**Constraints:**
- `n, m <= 1000`

---

## 2. Key Insight

> Each potion goes through all wizards sequentially. Wizard `i` can start on potion `j` only after finishing potion `j-1` AND after wizard `i-1` finishes potion `j`. This is a pipeline scheduling problem — track each wizard's availability time.

---

## 3. Approach: Sequential Simulation — O(n · m) ✅

```
FUNCTION minTime(skill, mana):
    n ← LENGTH(skill); m ← LENGTH(mana)
    // ready[i] = time wizard i finishes their current work
    ready ← [0] * n

    FOR j ← 0 TO m - 1 DO
        // Each wizard processes potion j after both constraints are met
        FOR i ← 0 TO n - 1 DO
            IF i == 0 THEN
                ready[i] ← ready[i] + skill[i] * mana[j]
            ELSE
                ready[i] ← MAX(ready[i], ready[i-1]) + skill[i] * mana[j]

    RETURN ready[n - 1]
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Pipeline simulation**: each wizard starts as soon as both (a) they finish their previous potion and (b) the previous wizard finishes the current potion. Track availability times per wizard.
