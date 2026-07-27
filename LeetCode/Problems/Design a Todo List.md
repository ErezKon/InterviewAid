# 2590. Design a Todo List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-todo-list](https://leetcode.com/problems/design-a-todo-list)
**Companies:** Bloomberg

---

## Problem Description

Design a todo list supporting `addTask(userId, taskDescription, dueDate, tags)`, `getAllTasks(userId)`, `getTasksForTag(userId, tag)`, `completeTask(userId, taskId)`.

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

## Key Takeaway

> **Standard CRUD design: hash map for tasks, per-user index for lookups, filter by completion status and tags, sort by due date.**
