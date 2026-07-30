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

Given tasks with `[start, end, duration]`, the computer runs at chosen time slots. Each task must have `duration` slots active within `[start, end]`. Return the **minimum** total active slots.

**Constraints:**
- `1 <= tasks.length <= 2000`
- `1 <= start <= end <= 2000`

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
Input: tasks = [[1,3,2],[2,5,2]]
Output: 3
Explanation: Activate slots at times 2,3,5. Both tasks have required durations.
```

**Example 2:**
```
Input: tasks = [[1,4,2],[2,6,3],[5,7,1]]
Output: 5
Explanation: Activate slots 3,4,5,6,7. All tasks satisfied with minimal slots.
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
