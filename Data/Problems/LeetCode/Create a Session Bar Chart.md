# 1435. Create a Session Bar Chart

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-a-session-bar-chart](https://leetcode.com/problems/create-a-session-bar-chart)
**Companies:** Twitch

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Sessions`

```
+---------------------+---------+
| Column Name         | Type    |
+---------------------+---------+
| session_id          | int     |
| duration            | int     |
+---------------------+---------+
session_id is the column of unique values for this table.
duration is the time in seconds that a user has visited the application.
```

You want to know how long a user visits your application. You decided to create bins of `"[0-5>"`, `"[5-10>"`, "[10-15>", and `"15 minutes or more"` and count the number of sessions on it.

Write a solution to report the `(bin, total)`.

Return the result table in **any order**.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
Sessions table:
+-------------+---------------+
| session_id  | duration      |
+-------------+---------------+
| 1           | 30            |
| 2           | 199           |
| 3           | 299           |
| 4           | 580           |
| 5           | 1000          |
+-------------+---------------+
Output:
+--------------+--------------+
| bin          | total        |
+--------------+--------------+
| [0-5>        | 3            |
| [5-10>       | 1            |
| [10-15>      | 0            |
| 15 or more   | 1            |
+--------------+--------------+
Explanation:
For session_id 1, 2, and 3 have a duration greater or equal than 0 minutes and less than 5 minutes.
For session_id 4 has a duration greater or equal than 5 minutes and less than 10 minutes.
There is no session with a duration greater than or equal to 10 minutes and less than 15 minutes.
For session_id 5 has a duration greater than or equal to 15 minutes.
```

---

## Approach

```sql
SELECT '[0-5)'   AS bin, COUNT(session_id) AS total FROM Sessions WHERE duration >= 0   AND duration < 300
UNION ALL
SELECT '[5-10)'  AS bin, COUNT(session_id) AS total FROM Sessions WHERE duration >= 300 AND duration < 600
UNION ALL
SELECT '[10-15)' AS bin, COUNT(session_id) AS total FROM Sessions WHERE duration >= 600 AND duration < 900
UNION ALL
SELECT '15+'     AS bin, COUNT(session_id) AS total FROM Sessions WHERE duration >= 900;
```

---

## Walkthrough

1. **Define bins** – each `SELECT` corresponds to one duration interval.
2. **Filter rows** – `WHERE` clause restricts `duration` to the interval (duration stored in seconds).
3. **Count** – `COUNT(session_id)` returns number of sessions in that interval.
4. **Combine** – `UNION ALL` stacks the four result rows, preserving empty-bin rows with count 0.
5. **Return** – final result lists all bins in the desired order.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each row is examined once per `WHERE` clause (four scans over the table). |
| **Space** | O(1) – only constant-size aggregates are stored.

---

## Follow-Up Questions

- How would you generate the bins dynamically if the interval size were a parameter?
- Can you produce the same result using a `CASE` statement instead of `UNION ALL`?
- How would you modify the query to also return the average session duration per bin?

---

## Key Takeaway

> **SQL binning with `UNION ALL` ensures every predefined interval appears in the output, even when its count is zero.**