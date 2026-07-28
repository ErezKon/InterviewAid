# 2590. Design a Todo List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-todo-list](https://leetcode.com/problems/design-a-todo-list)
**Companies:** Bloomberg

---

## Problem Description

Design a todo list supporting `addTask(userId, taskDescription, dueDate, tags)`, `getAllTasks(userId)`, `getTasksForTag(userId, tag)`, `completeTask(userId, taskId)`.

---

## Examples

| Operation | Input | Output |
|-----------|-------|--------|
| addTask | (1, "Buy milk", "2023-09-01", ["grocery"]) | 1 |
| addTask | (1, "Read book", "2023-09-05", ["leisure"]) | 2 |
| getAllTasks | (1) | [{id:1,…}, {id:2,…}] |
| getTasksForTag | (1, "grocery") | [{id:1,…}] |
| completeTask | (1, 1) | true |

---

## Approach

```
CLASS TodoList:
    tasks = {}        // taskId → {userId, description, dueDate, tags, completed}
    userTasks = defaultdict(list)  // userId → list of taskIds
    nextId = 1

    FUNCTION addTask(userId, desc, dueDate, tags):
        tasks[nextId] = {userId, desc, dueDate, tags, completed: false}
        userTasks[userId].ADD(nextId)
        RETURN nextId++

    FUNCTION getAllTasks(userId):
        RETURN sorted uncompleted tasks by dueDate

    FUNCTION getTasksForTag(userId, tag):
        RETURN sorted uncompleted tasks with matching tag by dueDate

    FUNCTION completeTask(userId, taskId):
        IF valid: tasks[taskId].completed = true
```

---

## Walkthrough

1. **Add first task** – `addTask(1, "Buy milk", "2023-09-01", ["grocery"])` creates taskId = 1, stores it in `tasks` and appends 1 to `userTasks[1]`.
2. **Add second task** – `addTask(1, "Read book", "2023-09-05", ["leisure"])` creates taskId = 2.
3. **Retrieve all tasks** – `getAllTasks(1)` filters `tasks` for user 1 where `completed` is false and sorts by `dueDate`, returning tasks 1 and 2.
4. **Filter by tag** – `getTasksForTag(1, "grocery")` selects only task 1.
5. **Complete a task** – `completeTask(1,1)` marks task 1 as completed; subsequent calls to `getAllTasks` will omit it.

---

## Complexity Analysis

- **Time**: `addTask` O(1), `completeTask` O(1), `getAllTasks`/`getTasksForTag` O(k log k) where *k* is the number of tasks for the user (sorting by due date).
- **Space**: O(n) for storing *n* tasks across all users.

---

## Follow-Up Questions

- How would you support pagination for `getAllTasks`?
- How to handle recurring tasks or reminders?
- How to persist data across server restarts?

---

## Key Takeaway

> **Standard CRUD design: hash map for tasks, per-user index for lookups, filter by completion status and tags, sort by due date.**