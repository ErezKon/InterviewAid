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

You are given two integer arrays, `skill` and `mana`, of length `n` and `m`, respectively.

In a laboratory, `n` wizards must brew `m` potions *in order*. Each potion has a mana capacity `mana[j]` and **must** pass through **all** the wizards sequentially to be brewed properly. The time taken by the `i`-th wizard on the `j`-th potion is `time_ij = skill[i] * mana[j]`.

Since the brewing process is delicate, a potion **must** be passed to the next wizard immediately after the current wizard completes their work. This means the timing must be *synchronized* so that each wizard begins working on a potion **exactly** when it arrives.

Return the **minimum** amount of time required for the potions to be brewed properly.

**Constraints:**
- `n == skill.length`
- `m == mana.length`
- `1 <= n, m <= 5000`
- `1 <= mana[i], skill[i] <= 5000`

---

## 2. Examples

```
Example 1:
  Input: skill = [1,5,2,4], mana = [5,1,4,2]
  Output: 110
  Explanation:
    Potion | Start time | Wizard 0 done by | Wizard 1 done by | Wizard 2 done by | Wizard 3 done by
    0      | 0          | 5                | 30               | 40               | 60
    1      | 52         | 53               | 58               | 60               | 64
    2      | 54         | 58               | 78               | 86               | 102
    3      | 86         | 88               | 98               | 102              | 110
  As an example for why wizard 0 cannot start working on the 1st potion before time t = 52,
  consider the case where the wizards started preparing the 1st potion at time t = 50. At time
  t = 58, wizard 2 is done with the 1st potion, but wizard 3 will still be working on the 0th
  potion till time t = 60.

Example 2:
  Input: skill = [1,1,1], mana = [1,1,1]
  Output: 5
  Explanation:
    1. Preparation of the 0th potion begins at time t = 0, and is completed by time t = 3.
    2. Preparation of the 1st potion begins at time t = 1, and is completed by time t = 4.
    3. Preparation of the 2nd potion begins at time t = 2, and is completed by time t = 5.

Example 3:
  Input: skill = [1,2,3,4], mana = [1,2]
  Output: 21
```

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
