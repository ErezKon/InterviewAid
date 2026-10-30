# 2895. Minimum Processing Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-processing-time](https://leetcode.com/problems/minimum-processing-time)

**Companies:** Adobe, Google, Nutanix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Sort — O(n log n)](#4-approach-greedy-sort--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You have a certain number of processors, each having 4 cores. The number of tasks to be executed is four times the number of processors. Each task must be assigned to a unique core, and each core can only be used once.

You are given an array `processorTime` representing the time each processor becomes available and an array `tasks` representing how long each task takes to complete. Return the *minimum* time needed to complete all tasks.

**Constraints:**
- `1 <= n == processorTime.length <= 25000`
- `1 <= tasks.length <= 10^5`
- `0 <= processorTime[i] <= 10^9`
- `1 <= tasks[i] <= 10^9`
- `tasks.length == 4 * n`

---

## 2. Examples

**Example 1:**
```
Input: processorTime = [8,10], tasks = [2,2,3,1,8,7,4,5]
Output: 16
Explanation: Assign the tasks at indices 4, 5, 6, 7 to the first processor which becomes available at time = 8, and the tasks at indices 0, 1, 2, 3 to the second processor which becomes available at time = 10.
The time taken by the first processor to finish the execution of all tasks is max(8 + 8, 8 + 7, 8 + 4, 8 + 5) = 16.
The time taken by the second processor to finish the execution of all tasks is max(10 + 2, 10 + 2, 10 + 3, 10 + 1) = 13.
```

**Example 2:**
```
Input: processorTime = [10,20], tasks = [2,3,1,2,5,8,4,3]
Output: 23
Explanation: Assign the tasks at indices 1, 4, 5, 6 to the first processor and the others to the second processor.
The time taken by the first processor to finish the execution of all tasks is max(10 + 3, 10 + 5, 10 + 8, 10 + 4) = 18.
The time taken by the second processor to finish the execution of all tasks is max(20 + 2, 20 + 1, 20 + 2, 20 + 3) = 23.
```

---

## 3. Key Insight

> **Greedy matching**: pair the earliest-available processor with the longest tasks. Sort processors ascending, tasks descending. The bottleneck is `processorTime[i] + tasks[i*4]` (each processor's longest task is `tasks[i*4]` after sorting).

---

## 4. Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION minProcessingTime(processorTime, tasks):
    SORT processorTime; SORT tasks DESC
    result = 0
    FOR i, t IN enumerate(processorTime):
        result = MAX(result, t + tasks[i * 4])
    RETURN result
```

---

## 5. Walkthrough

```
processorTime = [8, 10] → sorted: [8, 10]
tasks = [2,2,3,1,8,7,4,5] → sorted desc: [8,7,5,4,3,2,2,1]

i=0: processor at 8, tasks[0]=8 → 8+8=16
i=1: processor at 10, tasks[4]=3 → 10+3=13

result = max(16, 13) = 16 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(1) extra (in-place sort) |

---

## 7. Follow-Up Questions

**Q1: Why does this greedy work?**
By exchange argument: if an early processor gets a short task and a late processor gets a long task, swapping them can only improve (or maintain) the maximum finish time.

**Q2: Why only check `tasks[i*4]` and not all 4 tasks?**
Each processor runs 4 tasks in parallel, so its finish time = available time + max task. After sorting tasks descending, `tasks[i*4]` is the largest among the 4 tasks assigned to processor `i`.

---

## 8. Key Takeaway

> **Match opposites to minimize the maximum** — pair smallest availability with largest tasks. This exchange-argument greedy appears in scheduling, load balancing, and assignment problems.
