# 3767. Maximize Points After Choosing K Tasks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-points-after-choosing-k-tasks](https://leetcode.com/problems/maximize-points-after-choosing-k-tasks)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of tasks with point values and an integer `k`, choose exactly `k` tasks to maximize total points. Tasks may have dependencies or multiplier effects based on selection order.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ n`

---

## Examples

**Example 1:**
```
Input: tasks = [5, 3, 9, 1, 7], k = 3
Output: 21
Explanation: Choose tasks with points 9, 7, and 5 for a total of 21.
```

**Example 2:**
```
Input: tasks = [2, 4, 6, 8], k = 2
Output: 14
Explanation: Selecting the two largest values 8 and 6 yields the maximum sum.
```

---

## Approach

> Sort tasks by point value in descending order and greedily select the top `k`. If there are order‑dependent bonuses, maintain a max‑heap to pick the best available task at each step.

```text
FUNCTION maximizePoints(tasks, k):
    SORT tasks BY points DESCENDING
    SET total ← 0
    FOR i ← 0 TO k-1:
        SET total ← total + tasks[i]
    RETURN total
```

---

## Walkthrough

Consider Example 1: `tasks = [5, 3, 9, 1, 7]`, `k = 3`.

| Step | Sorted tasks | Selected | Running total |
|------|--------------|----------|---------------|
| 0    | [9,7,5,3,1]  | –        | 0 |
| 1    | –            | 9        | 9 |
| 2    | –            | 7        | 16 |
| 3    | –            | 5        | 21 |

After selecting the top three values, the maximum achievable points are 21.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + top‑k | **O(n log n)** | O(1) |

---

## Follow-Up Questions

1. How would you handle tasks that have prerequisite dependencies?
2. What if each task provides a multiplier that depends on the order of selection?
3. Can you solve the problem in O(n) time using a selection algorithm instead of sorting?

---

## Key Takeaway

> **"Choose k items to maximize score" problems are typically solved with a sort‑and‑greedy approach.** When order‑dependent bonuses exist, a priority queue enables dynamic selection.
