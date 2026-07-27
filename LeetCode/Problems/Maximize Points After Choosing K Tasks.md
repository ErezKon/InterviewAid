# 3767. Maximize Points After Choosing K Tasks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-points-after-choosing-k-tasks](https://leetcode.com/problems/maximize-points-after-choosing-k-tasks)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Greedy / Heap — O(n log n)](#approach-sort--greedy--heap--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of tasks with point values and an integer `k`, choose exactly `k` tasks to maximize total points. Tasks may have dependencies or multiplier effects based on selection order.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ k ≤ n`

---

## Key Insight

> Sort tasks by point value in descending order and greedily select the top `k`. If there are multipliers or bonuses for selecting in a particular order, use a priority queue to dynamically pick the best available task at each step.

---

## Approach: Sort + Greedy / Heap — O(n log n) ✅

```
FUNCTION maximizePoints(tasks, k):
    SORT tasks by points DESC
    RETURN SUM(tasks[i].points FOR i IN 0..k-1)
```

If order-dependent bonuses exist, use a heap to dynamically select the best task at each step.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + top-k | **O(n log n)** | O(1) |

---

## Key Takeaway

> **"Choose k items to maximize score" problems are typically sort + greedy.** When order matters or there are interaction effects, use a priority queue for dynamic selection.
