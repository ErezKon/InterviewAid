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

```
FUNCTION findMinimumTime(tasks):
    SORT tasks BY end
    active = [false] * 2001

    FOR (start, end, dur) IN tasks:
        // Count already-active slots in [start, end]
        existing = SUM(active[t] for t in range(start, end+1))
        needed = dur - existing
        // Activate from right end
        FOR t ← end DOWN TO start:
            IF needed <= 0: BREAK
            IF NOT active[t]:
                active[t] = true
                needed -= 1

    RETURN SUM(active)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · T) where T = max end time (2000) |
| **Space** | O(T) — timeline array |

---

## 5. Key Takeaway

> **Greedy: sort by deadline, activate latest slots first.** This maximizes overlap with future tasks. Classic scheduling greedy with "latest-first" slot assignment.
