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

There are `n` employees in a company, numbered from `0` to `n - 1`. Each employee `i` has worked for `hours[i]` hours in the company.

The company requires each employee to work for **at least** `target` hours.

You are given a **0-indexed** array of non-negative integers `hours` of length `n` and a non-negative integer `target`.

Return *the integer denoting the number of employees who worked at least* `target` *hours*.

**Constraints:**

- `1 <= n == hours.length <= 50`
- `0 <= hours[i], target <= 10^5`

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

```
Example 1:
  Input: hours = [0,1,2,3,4], target = 2
  Output: 3
  Explanation: The company wants each employee to work for at least 2 hours.
  - Employee 0 worked for 0 hours and didn't meet the target.
  - Employee 1 worked for 1 hours and didn't meet the target.
  - Employee 2 worked for 2 hours and met the target.
  - Employee 3 worked for 3 hours and met the target.
  - Employee 4 worked for 4 hours and met the target.
  There are 3 employees who met the target.
```

```
Example 2:
  Input: hours = [5,1,4,2,2], target = 6
  Output: 0
  Explanation: The company wants each employee to work for at least 6 hours.
  There are 0 employees who met the target.
```

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

> **Simple threshold counting** – a linear scan with a constant-space counter solves the problem efficiently.
