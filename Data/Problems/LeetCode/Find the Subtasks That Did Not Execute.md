# 1767. Find the Subtasks That Did Not Execute

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-subtasks-that-did-not-execute](https://leetcode.com/problems/find-the-subtasks-that-did-not-execute)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Cross Join + Anti-Join ✅](#2-approach-sql-cross-join--anti-join-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: premium SQL problem — schema/statement/example verified via doocs/leetcode.*

Table: `Tasks`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| task_id        | int     |
| subtasks_count | int     |
+----------------+---------+
task_id is the column with unique values for this table.
Each row in this table indicates that task_id was divided into subtasks_count subtasks labeled from 1 to subtasks_count.
It is guaranteed that 2 <= subtasks_count <= 20.
```

Table: `Executed`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| task_id       | int     |
| subtask_id    | int     |
+---------------+---------+
(task_id, subtask_id) is the combination of columns with unique values for this table.
Each row in this table indicates that for the task task_id, the subtask with ID subtask_id was executed successfully.
It is guaranteed that subtask_id <= subtasks_count for each task_id.
```

Write a solution to report the IDs of the missing subtasks for each `task_id`.

Return the result table in **any order**.

The result format is in the following example.

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

## 3. Examples

**Example 1:**
```
Input:
Tasks table:
+---------+----------------+
| task_id | subtasks_count |
+---------+----------------+
| 1       | 3              |
| 2       | 2              |
| 3       | 4              |
+---------+----------------+
Executed table:
+---------+------------+
| task_id | subtask_id |
+---------+------------+
| 1       | 2          |
| 3       | 1          |
| 3       | 2          |
| 3       | 3          |
| 3       | 4          |
+---------+------------+
Output:
+---------+------------+
| task_id | subtask_id |
+---------+------------+
| 1       | 1          |
| 1       | 3          |
| 2       | 1          |
| 2       | 2          |
+---------+------------+
Explanation:
Task 1 was divided into 3 subtasks (1, 2, 3). Only subtask 2 was executed successfully, so we include (1, 1) and (1, 3) in the answer.
Task 2 was divided into 2 subtasks (1, 2). No subtask was executed successfully, so we include (2, 1) and (2, 2) in the answer.
Task 3 was divided into 4 subtasks (1, 2, 3, 4). All of the subtasks were executed successfully.
```

---

## 4. Walkthrough

1. **Generate numbers** up to the maximum `subtasks_count` using a recursive CTE (`nums`).
2. **Cross join** each task with all possible subtask IDs (`JOIN nums`).
3. **Left join** the `Executed` table to see which pairs exist.
4. **Filter** rows where `Executed` is NULL – those are the missing pairs.

---

## 5. Complexity Analysis

- **Time:** O(N + M + K) where N is the number of tasks, M is the number of executed rows, and K is the total number of generated `(task_id, subtask_id)` pairs (bounded by the sum of `subtasks_count`).
- **Space:** O(K) for the recursive CTE that holds the generated subtask IDs.

---

## 6. Follow-Up Questions

- How would you handle scenarios where `subtasks_count` is very large and a recursive CTE becomes inefficient?
- Can the solution be adapted for databases that do not support recursive CTEs?
- How would you modify the query to find tasks where **all** subtasks have been executed?

---

## 7. Key Takeaway

> Generate all possible `(task_id, subtask_id)` pairs using a recursive CTE, then anti‑join with the `Executed` table to find missing ones.