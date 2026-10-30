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

You have `n` tasks and `m` workers. Each task has a strength requirement stored in a **0-indexed** integer array `tasks`, with the `i`th task requiring `tasks[i]` strength to complete. The strength of each worker is stored in a **0-indexed** integer array `workers`, with the `j`th worker having `workers[j]` strength. Each worker can only be assigned to a **single** task and must have a strength **greater than or equal** to the task's strength requirement (i.e., `workers[j] >= tasks[i]`).

Additionally, you have `pills` magical pills that will **increase a worker's strength** by `strength`. You can decide which workers receive the magical pills, however, you may only give each worker **at most one** magical pill.

Given the **0-indexed** integer arrays `tasks` and `workers` and the integers `pills` and `strength`, return *the **maximum** number of tasks that can be completed.*

**Constraints:**
- `n == tasks.length`
- `m == workers.length`
- `1 <= n, m <= 5 × 10^4`
- `0 <= pills <= m`
- `0 <= tasks[i], workers[j], strength <= 10^9`

---

## Examples

```
Example 1:
  Input: tasks = [3,2,1], workers = [0,3,3], pills = 1, strength = 1
  Output: 3
  Explanation:
    We can assign the magical pill and tasks as follows:
    - Give the magical pill to worker 0.
    - Assign worker 0 to task 2 (0 + 1 >= 1)
    - Assign worker 1 to task 1 (3 >= 2)
    - Assign worker 2 to task 0 (3 >= 3)
```

```
Example 2:
  Input: tasks = [5,4], workers = [0,0,0], pills = 1, strength = 5
  Output: 1
  Explanation:
    We can assign the magical pill and tasks as follows:
    - Give the magical pill to worker 0.
    - Assign worker 0 to task 0 (0 + 5 >= 5)
```

```
Example 3:
  Input: tasks = [10,15,30], workers = [0,10,10,10,10], pills = 3, strength = 10
  Output: 2
  Explanation:
    We can assign the magical pills and tasks as follows:
    - Give the magical pill to worker 0 and worker 1.
    - Assign worker 0 to task 0 (0 + 10 >= 10)
    - Assign worker 1 to task 1 (10 + 10 >= 15)
    The last pill is not given because it will not make any worker strong enough for the last task.
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
