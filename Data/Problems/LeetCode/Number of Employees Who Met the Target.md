# 2798. Number of Employees Who Met the Target

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-employees-who-met-the-target](https://leetcode.com/problems/number-of-employees-who-met-the-target)
**Companies:** Amazon, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Linear Scan — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Return the number of employees who worked at least `target` hours.

---

## 2. Key Insight

> A single pass over the `hours` array, counting elements that meet or exceed the threshold, yields the answer.

---

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION numberOfEmployeesWhoMetTarget(hours, target):
    SET count ← 0
    FOR h ← EACH element IN hours:
        IF h ≥ target:
            INCREMENT count BY 1
    RETURN count
```

---

## 4. Examples

| hours | target | Output | Explanation |
|-------|--------|--------|-------------|
| [4,5,6,2,1] | 5 | 2 | Employees at indices 1 and 2 worked ≥5 hours. |
| [1,2,3] | 4 | 0 | No employee meets the target.

---

## 5. Walkthrough

For `hours = [4,5,6,2,1]`, `target = 5`:

| Iteration | h | Condition `h ≥ target`? | count |
|-----------|---|------------------------|-------|
| 1 | 4 | No | 0 |
| 2 | 5 | Yes | 1 |
| 3 | 6 | Yes | 2 |
| 4 | 2 | No | 2 |
| 5 | 1 | No | 2 |

Final count = 2.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would you modify the solution if you needed to return the indices of qualifying employees instead of just the count?
2. Can you solve the problem in a single pass without using extra variables beyond the counter?
3. What if the `hours` list is streamed and cannot be stored entirely in memory?

---

## 8. Key Takeaway

> **Simple threshold counting** – a linear scan with a constant‑space counter solves the problem efficiently.
