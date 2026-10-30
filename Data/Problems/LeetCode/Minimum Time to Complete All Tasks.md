# 2589. Minimum Time to Complete All Tasks

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-complete-all-tasks](https://leetcode.com/problems/minimum-time-to-complete-all-tasks)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy + Timeline — O(n · T)](#3-approach-greedy--timeline--on--t)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

There is a computer that can run an unlimited number of tasks **at the same time**. You are given a 2D integer array `tasks` where `tasks[i] = [start_i, end_i, duration_i]` indicates that the `i^th` task should run for a total of `duration_i` seconds (not necessarily continuous) within the **inclusive** time range `[start_i, end_i]`.

You may turn on the computer only when it needs to run a task. You can also turn it off if it is idle.

Return *the minimum time during which the computer should be turned on to complete all tasks*.

**Constraints:**
- `1 <= tasks.length <= 2000`
- `tasks[i].length == 3`
- `1 <= start_i, end_i <= 2000`
- `1 <= duration_i <= end_i - start_i + 1 `

---

## 2. Key Insight

> Sort by end time. For each task, count already-active slots in its range. If not enough, activate new slots from the **right** end (latest possible), maximizing overlap with future tasks.

---

## 3. Approach: Greedy + Timeline — O(n · T) ✅

```text
FUNCTION findMinimumTime(tasks):
    SORT tasks BY end
    active ← ARRAY[0..2000] OF FALSE
    FOR EACH (start, end, dur) IN tasks:
        // Count already-active slots in [start, end]
        existing ← 0
        FOR t ← start TO end:
            IF active[t]:
                existing ← existing + 1
        needed ← dur - existing
        // Activate from right end
        FOR t ← end DOWNTO start:
            IF needed ≤ 0: BREAK
            IF NOT active[t]:
                active[t] ← TRUE
                needed ← needed - 1
    total ← 0
    FOR t ← 0 TO 2000:
        IF active[t]:
            total ← total + 1
    RETURN total
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · T) where T = max end time (2000) |
| **Space** | O(T) — timeline array |

---

## 5. Examples

**Example 1:**
```
Input: tasks = [[2,3,1],[4,5,1],[1,5,2]]
Output: 2
Explanation: - The first task can be run in the inclusive time range [2, 2].
- The second task can be run in the inclusive time range [5, 5].
- The third task can be run in the two inclusive time ranges [2, 2] and [5, 5].
The computer will be on for a total of 2 seconds.
```

**Example 2:**
```
Input: tasks = [[1,3,2],[2,5,3],[5,6,2]]
Output: 4
Explanation: - The first task can be run in the inclusive time range [2, 3].
- The second task can be run in the inclusive time ranges [2, 3] and [5, 5].
- The third task can be run in the two inclusive time range [5, 6].
The computer will be on for a total of 4 seconds.
```

---

## 6. Walkthrough

| Step | Task (start,end,dur) | Active slots before | Needed | Slots added | Active slots after |
|------|----------------------|---------------------|--------|-------------|--------------------|
| 1 | (1,3,2) | none | 2 | 3,2 (from right) | {2,3} |
| 2 | (2,5,2) | {2,3} → 2 slots in range | 0 | none | {2,3} |
| 3 | (5,7,1) | none in [5,7] | 1 | 7 | {2,3,7} |

Total active slots = 3.

---

## 7. Key Takeaway

> **Greedy: sort by deadline, activate latest slots first.** This maximizes overlap with future tasks. Classic scheduling greedy with "latest-first" slot assignment.
