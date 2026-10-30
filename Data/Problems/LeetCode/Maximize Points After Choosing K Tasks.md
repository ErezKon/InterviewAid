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

> *Note: the Approach below (pick the top `k` tasks) solves an invented problem. Correct idea: sort indices by `technique1[i] - technique2[i]` in descending order. The first `k` use technique 1 and every other task takes `max(technique1[i], technique2[i])`. O(n log n).*

You are given two integer arrays, `technique1` and `technique2`, each of length `n`, where `n` represents the number of tasks to complete.

- If the `i^th` task is completed using technique 1, you earn `technique1[i]` points.
- If it is completed using technique 2, you earn `technique2[i]` points.

You are also given an integer `k`, representing the **minimum** number of tasks that **must** be completed using technique 1.

You **must** complete **at least** `k` tasks using technique 1 (they do not need to be the first `k` tasks).

The remaining tasks may be completed using **either** technique.

Return an integer denoting the **maximum total points** you can earn.

**Constraints:**
- `1 <= n == technique1.length == technique2.length <= 10^5`
- `1 <= technique1[i], technique2[i] <= 10^5`
- `0 <= k <= n`

---

## Examples

**Example 1:**
```
Input: technique1 = [5,2,10], technique2 = [10,3,8], k = 2
Output: 22
Explanation: We must complete at least k = 2 tasks using technique1.
Choosing technique1[1] and technique1[2] (completed using technique 1), and technique2[0] (completed using technique 2), yields the maximum points: 2 + 10 + 10 = 22.
```

**Example 2:**
```
Input: technique1 = [10,20,30], technique2 = [5,15,25], k = 2
Output: 60
Explanation: We must complete at least k = 2 tasks using technique1.
Choosing all tasks using technique 1 yields the maximum points: 10 + 20 + 30 = 60.
```

**Example 3:**
```
Input: technique1 = [1,2,3], technique2 = [4,5,6], k = 0
Output: 15
Explanation: Since k = 0, we are not required to choose any task using technique1.
Choosing all tasks using technique 2 yields the maximum points: 4 + 5 + 6 = 15.
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
