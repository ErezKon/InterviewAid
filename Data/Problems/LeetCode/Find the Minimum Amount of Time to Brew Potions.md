# 3494. Find the Minimum Amount of Time to Brew Potions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-minimum-amount-of-time-to-brew-potions](https://leetcode.com/problems/find-the-minimum-amount-of-time-to-brew-potions)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sequential Simulation — O(n · m) ✅](#4-approach-sequential-simulation--on--m-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given `n` wizards with skills and `m` potions requiring mana, wizards process potions in order. Wizard `i` takes `skill[i] * mana[j]` time for potion `j`. Each wizard must finish before the next starts on the same potion. Minimize total time.

**Constraints:**
- `n, m <= 1000`

---

## 2. Examples

**Example 1:**
```
skill = [2, 3]
mana  = [4, 5]
Output: 46
```
*Explanation:* Wizard 0 processes potion 0 in `2*4=8` time, then potion 1 in `2*5=10`. Wizard 1 can start potion 0 after wizard 0 finishes it (`8`), taking `3*4=12` (finishes at `20`). Then potion 1 starts after both wizard 0 (`18`) and wizard 1 (`20`) are done, taking `3*5=15` (finishes at `35`). Total time = `35`.

**Example 2:**
```
skill = [1, 2, 3]
mana  = [1, 2]
Output: 14
```
*Explanation:* Simulate pipeline; final wizard finishes at time `14`.

---

## 3. Key Insight

> Each potion goes through all wizards sequentially. Wizard `i` can start on potion `j` only after finishing potion `j-1` **and** after wizard `i-1` finishes potion `j`. This is a pipeline scheduling problem — track each wizard's availability time.

---

## 4. Approach: Sequential Simulation — O(n · m) ✅

```
FUNCTION minTime(skill, mana):
    n ← LENGTH(skill); m ← LENGTH(mana)
    // ready[i] = time wizard i finishes their current work
    ready ← [0] * n

    FOR j ← 0 TO m - 1 DO
        FOR i ← 0 TO n - 1 DO
            IF i == 0 THEN
                ready[i] ← ready[i] + skill[i] * mana[j]
            ELSE
                ready[i] ← MAX(ready[i], ready[i-1]) + skill[i] * mana[j]

    RETURN ready[n - 1]
```

---

## 5. Walkthrough

Consider `skill = [2,3]`, `mana = [4,5]`.

| Potion | Wizard 0 start | Wizard 0 finish | Wizard 1 start | Wizard 1 finish |
|--------|----------------|----------------|----------------|-----------------|
| 0      | 0              | 8  (`2*4`)      | 8              | 20 (`8+3*4`)    |
| 1      | 8              | 18 (`8+2*5`)    | 20             | 35 (`20+3*5`)   |

Final time = 35.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) — each wizard processes each potion |
| **Space** | O(n) — availability array |

---

## 7. Follow-Up Questions

1. How would the solution change if wizards could work on multiple potions concurrently with limited capacity?
2. Can we optimize further using prefix sums when all `skill` values are equal?
3. What if the order of potions can be rearranged to minimize total time?

---

## 8. Key Takeaway

> **Pipeline simulation**: each wizard starts as soon as both (a) they finish their previous potion and (b) the previous wizard finishes the current potion. Track availability times per wizard.
