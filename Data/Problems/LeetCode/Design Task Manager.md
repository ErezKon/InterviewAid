# 3408. Design Task Manager

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-task-manager](https://leetcode.com/problems/design-task-manager)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

There is a task management system that allows users to manage their tasks, each associated with a priority. The system should efficiently handle adding, modifying, executing, and removing tasks.

Implement the `TaskManager` class:

- `TaskManager(vector<vector<int>>& tasks)` initializes the task manager with a list of user-task-priority triples. Each element in the input list is of the form `[userId, taskId, priority]`, which adds a task to the specified user with the given priority.
- `void add(int userId, int taskId, int priority)` adds a task with the specified `taskId` and `priority` to the user with `userId`. It is **guaranteed** that `taskId` does not exist in the system.
- `void edit(int taskId, int newPriority)` updates the priority of the existing `taskId` to `newPriority`. It is **guaranteed** that `taskId` exists in the system.
- `void rmv(int taskId)` removes the task identified by `taskId` from the system. It is **guaranteed** that `taskId` exists in the system.
- `int execTop()` executes the task with the **highest** priority across all users. If there are multiple tasks with the same **highest** priority, execute the one with the highest `taskId`. After executing, the `taskId` is **removed** from the system. Return the `userId` associated with the executed task. If no tasks are available, return -1.

**Note** that a user may be assigned multiple tasks.

**Constraints:**
- `1 <= tasks.length <= 10^5`
- `0 <= userId <= 10^5`
- `0 <= taskId <= 10^5`
- `0 <= priority <= 10^9`
- `0 <= newPriority <= 10^9`
- At most `2 * 10^5` calls will be made in **total** to `add`, `edit`, `rmv`, and `execTop` methods.
- The input is generated such that `taskId` will be valid.

## Examples

```
Example 1:
  Input:
  ["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
  [[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]
  Output:
  [null, null, null, 3, null, null, 5]
  Explanation:
  TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]); // Initializes with three tasks for Users 1, 2, and 3.
  taskManager.add(4, 104, 5); // Adds task 104 with priority 5 for User 4.
  taskManager.edit(102, 8);   // Updates priority of task 102 to 8.
  taskManager.execTop();      // return 3. Executes task 103 for User 3.
  taskManager.rmv(101);       // Removes task 101 from the system.
  taskManager.add(5, 105, 15); // Adds task 105 with priority 15 for User 5.
  taskManager.execTop();      // return 5. Executes task 105 for User 5.
```

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