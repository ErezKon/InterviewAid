# 3408. Design Task Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-task-manager](https://leetcode.com/problems/design-task-manager)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Design a task manager with operations: `add(userId, taskId, priority)`, `edit(taskId, newPriority)`, `rmv(taskId)`, and `execTop()` which executes and removes the highest‑priority task (ties broken by larger taskId).

## Examples

1. `add(1, 101, 5)` → task 101 added for user 1 with priority 5.
2. `add(2, 102, 7)` → task 102 added.
3. `execTop()` → returns user 2 (task 102 has higher priority).
4. `edit(101, 8)` → priority of task 101 becomes 8.
5. `execTop()` → returns user 1 (task 101 now highest).

## Approach

```
CLASS TaskManager:
    CONSTRUCTOR:
        tasks = {}                   // taskId → (userId, priority)
        pq = SortedList()           // (-priority, -taskId) for max ordering

    FUNCTION add(userId, taskId, priority):
        tasks[taskId] = (userId, priority)
        pq.ADD((-priority, -taskId))

    FUNCTION edit(taskId, newPriority):
        oldPriority = tasks[taskId][1]
        pq.REMOVE((-oldPriority, -taskId))
        tasks[taskId] = (tasks[taskId][0], newPriority)
        pq.ADD((-newPriority, -taskId))

    FUNCTION rmv(taskId):
        priority = tasks[taskId][1]
        pq.REMOVE((-priority, -taskId))
        DELETE tasks[taskId]

    FUNCTION execTop():
        (negP, negId) = pq[0]; pq.REMOVE(pq[0])
        taskId = -negId
        userId = tasks[taskId][0]
        DELETE tasks[taskId]
        RETURN userId
```

## Walkthrough

| Step | Operation | PQ Content (priority, taskId) | Result |
|------|-----------|------------------------------|--------|
| 1 | `add(1,101,5)` | [(-5,-101)] | — |
| 2 | `add(2,102,7)` | [(-7,-102), (-5,-101)] | — |
| 3 | `execTop()` | pop (-7,-102) → taskId 102, user 2 | returns 2 |
| 4 | `edit(101,8)` | remove (-5,-101), add (-8,-101) → [(-8,-101)] | — |
| 5 | `execTop()` | pop (-8,-101) → taskId 101, user 1 | returns 1 |

## Complexity Analysis

- `add`, `edit`, `rmv`, `execTop`: each performs a constant‑time hash map operation **O(1)** and a `SortedList` insertion/removal **O(log n)** where *n* is number of tasks.
- Space: **O(n)** for storing tasks and priority queue.

## Follow-Up Questions

- How would you support retrieving the top‑k tasks without removal?
- Can you design a lock‑free concurrent version?
- How to handle duplicate priorities with stable ordering?

---

## Key Takeaway

> **Hash map for O(1) task lookup + SortedList with `(-priority, -taskId)` tuples for max‑priority ordering with taskId tie‑breaking. Edit = remove old + insert new.**