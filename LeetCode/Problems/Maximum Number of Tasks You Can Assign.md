# 2071. Maximum Number of Tasks You Can Assign

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign](https://leetcode.com/problems/maximum-number-of-tasks-you-can-assign)
**Companies:** Amazon, Bloomberg, Google, Meta, Walmart Labs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given arrays `tasks` (difficulty), `workers` (strength), `pills` (number of strength pills), and `strength` (boost per pill), assign tasks to workers such that each worker can do at most one task (with or without a pill). Return the **maximum number of tasks** that can be assigned.

**Constraints:**
- `1 <= tasks.length, workers.length <= 5 × 10^4`
- `0 <= pills <= workers.length`
- `1 <= tasks[i], workers[i], strength <= 10^9`

---

## Examples

**Example 1:**
```
Input:  tasks = [3,2,1], workers = [0,3,3], pills = 1, strength = 1
Output: 3
Explanation: Worker 0 uses pill (0+1=1 ≥ 1), worker 1 (3 ≥ 2), worker 2 (3 ≥ 3).
```

---

## Key Insight

> **Binary search on k** (number of tasks to assign). For a given k, check if the k easiest tasks can be done by the k strongest workers, with greedy pill allocation. Use a sorted container for efficient matching.

---

## Approach: Binary Search + Greedy — O(n log n log m) ✅

```
FUNCTION maxTaskAssign(tasks, workers, pills, strength)
    SORT tasks
    SORT workers

    FUNCTION canAssign(k)
        // Use k easiest tasks + k strongest workers
        available ← SortedList(workers[-k:])
        pillsLeft ← pills

        FOR task IN reversed(tasks[:k]) DO
            IF available.LAST ≥ task THEN
                available.REMOVE(available.LAST)
            ELSE
                // Need pill: find weakest worker who can do it with pill
                IF pillsLeft = 0 THEN RETURN false
                idx ← available.bisect_left(task - strength)
                IF idx = len(available) THEN RETURN false
                available.POP(idx)
                pillsLeft ← pillsLeft - 1
        RETURN true

    lo ← 0, hi ← MIN(len(tasks), len(workers))
    WHILE lo < hi DO
        mid ← (lo + hi + 1) / 2
        IF canAssign(mid) THEN lo ← mid
        ELSE hi ← mid - 1
    RETURN lo
END FUNCTION
```

---

## Walkthrough

```
tasks = [3,2,1] → sorted: [1,2,3]
workers = [0,3,3] → sorted: [0,3,3]
pills = 1, strength = 1
```

Binary search: try k=3
- available = [0,3,3], process tasks in reverse [3,2,1]
- Task 3: available.last=3 ≥ 3 ✅ → remove. available=[0,3]
- Task 2: available.last=3 ≥ 2 ✅ → remove. available=[0]
- Task 1: available.last=0 < 1. Use pill: find idx where ≥ 1-1=0 → idx=0. Pop. pillsLeft=0. ✅

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log²n)** — binary search × greedy check with sorted list |
| Space  | **O(n)** — sorted list |

---

## Follow-Up Questions

1. **Why process hardest tasks first in canAssign?**
   Hardest tasks are most constrained — assign them first to avoid wasting strong workers on easy tasks.

2. **Why use the weakest pill-eligible worker?**
   Save stronger workers for harder tasks that might not need pills.

3. **Could this work without a sorted container?**
   A deque-based approach can also work in O(n log n) total.

---

## Key Takeaway

> **Binary search on answer + greedy assignment** — binary search the number of assignable tasks, then greedily match hardest-first with smart pill allocation using a sorted container.
