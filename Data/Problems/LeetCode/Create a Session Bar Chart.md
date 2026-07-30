# 1435. Create a Session Bar Chart

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-a-session-bar-chart](https://leetcode.com/problems/create-a-session-bar-chart)
**Companies:** Twitch

---

## Problem Description

SQL problem: Categorize sessions by duration into bins (`[0,5)`, `[5,10)`, `[10,15)`, `15+` minutes) and count sessions per bin. Show all bins even if empty.

---

## Examples

**Example 1:**
```
Sessions table:
+------------+----------+
| session_id | duration |
+------------+----------+
| 1          | 120      |
| 2          | 450      |
| 3          | 800      |
| 4          | 950      |
+------------+----------+
```
Result:
```
+-----------+-------+
| bin       | total |
+-----------+-------+
| [0-5)     | 0     |
| [5-10)    | 1     |
| [10-15)   | 2     |
| 15+       | 1     |
+-----------+-------+
```
Explanation: Session 1 (2 min) falls in `[0,5)`, Session 2 (7.5 min) in `[5,10)`, Sessions 3 (13.3 min) and 4 (15.8 min) in `[10,15)` and `15+` respectively.

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
4. **Combine** – `UNION ALL` stacks the four result rows, preserving empty‑bin rows with count 0.
5. **Return** – final result lists all bins in the desired order.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each row is examined once per `WHERE` clause (four scans over the table). |
| **Space** | O(1) – only constant‑size aggregates are stored.

---

## Follow-Up Questions

- How would you generate the bins dynamically if the interval size were a parameter?
- Can you produce the same result using a `CASE` statement instead of `UNION ALL`?
- How would you modify the query to also return the average session duration per bin?

---

## Key Takeaway

> **SQL binning with `UNION ALL` ensures every predefined interval appears in the output, even when its count is zero.**