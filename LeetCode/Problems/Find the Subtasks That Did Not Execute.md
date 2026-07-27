# 1767. Find the Subtasks That Did Not Execute

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-subtasks-that-did-not-execute](https://leetcode.com/problems/find-the-subtasks-that-did-not-execute)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Cross Join + Anti-Join ✅](#2-approach-sql-cross-join--anti-join-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given `Tasks(task_id, subtasks_count)` and `Executed(task_id, subtask_id)`, find all `(task_id, subtask_id)` pairs that were **not** executed. (SQL problem)

---

## 2. Approach: SQL Cross Join + Anti-Join ✅

```sql
WITH RECURSIVE nums AS (
    SELECT 1 AS subtask_id
    UNION ALL
    SELECT subtask_id + 1 FROM nums WHERE subtask_id < (SELECT MAX(subtasks_count) FROM Tasks)
)
SELECT t.task_id, n.subtask_id
FROM Tasks t
JOIN nums n ON n.subtask_id <= t.subtasks_count
LEFT JOIN Executed e ON t.task_id = e.task_id AND n.subtask_id = e.subtask_id
WHERE e.task_id IS NULL;
```

---

## 3. Key Takeaway

> Generate all possible `(task_id, subtask_id)` pairs using a recursive CTE, then anti-join with the `Executed` table to find missing ones.
