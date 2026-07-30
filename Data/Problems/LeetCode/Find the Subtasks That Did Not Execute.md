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

## 3. Examples

**Example 1:**
```
Tasks = [(1,3), (2,2)]
Executed = [(1,1), (1,3), (2,2)]
Result = [(1,2), (2,1)]
```
Explanation: Task 1 has subtasks 1‑3, executed 1 and 3, so missing 2. Task 2 has subtasks 1‑2, executed only 2, so missing 1.

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