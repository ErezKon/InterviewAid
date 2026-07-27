# 3408. Design Task Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-task-manager](https://leetcode.com/problems/design-task-manager)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Design a task manager: `add(userId, taskId, priority)`, `edit(taskId, newPriority)`, `rmv(taskId)`, `execTop()` executes and removes the highest-priority task (ties broken by largest taskId).

---

## Approach

```
CLASS TaskManager:
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

---

## Key Takeaway

> **Hash map for O(1) task lookup + SortedList with `(-priority, -taskId)` tuples for max-priority ordering with taskId tie-breaking. Edit = remove old + insert new.**
