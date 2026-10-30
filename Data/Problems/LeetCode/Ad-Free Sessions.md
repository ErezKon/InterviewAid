# 1809. Ad-Free Sessions

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ad-free-sessions](https://leetcode.com/problems/ad-free-sessions)
**Companies:** Amazon

---

## 1. Problem Description

**SQL Problem.**

Table: `Playback`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| session_id  | int  |
| customer_id | int  |
| start_time  | int  |
| end_time    | int  |
+-------------+------+
session_id is the column with unique values for this table.
customer_id is the ID of the customer watching this session.
The session runs during the inclusive interval between start_time and end_time.
It is guaranteed that start_time <= end_time and that two sessions for the same customer do not intersect.
```

Table: `Ads`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| ad_id       | int  |
| customer_id | int  |
| timestamp   | int  |
+-------------+------+
ad_id is the column with unique values for this table.
customer_id is the ID of the customer viewing this ad.
timestamp is the moment of time at which the ad was shown.
```

Write a solution to report all the sessions that did not get shown any ads.

Return the result table in **any order**.

---

## 2. Examples

```
Example 1:
  Input:
  Playback table:
  +------------+-------------+------------+----------+
  | session_id | customer_id | start_time | end_time |
  +------------+-------------+------------+----------+
  | 1          | 1           | 1          | 5        |
  | 2          | 1           | 15         | 23       |
  | 3          | 2           | 10         | 12       |
  | 4          | 2           | 17         | 28       |
  | 5          | 2           | 2          | 8        |
  +------------+-------------+------------+----------+
  Ads table:
  +-------+-------------+-----------+
  | ad_id | customer_id | timestamp |
  +-------+-------------+-----------+
  | 1     | 1           | 5         |
  | 2     | 2           | 17        |
  | 3     | 2           | 20        |
  +-------+-------------+-----------+
  Output:
  +------------+
  | session_id |
  +------------+
  | 2          |
  | 3          |
  | 5          |
  +------------+
  Explanation:
  The ad with ID 1 was shown to user 1 at time 5 while they were in session 1.
  The ad with ID 2 was shown to user 2 at time 17 while they were in session 4.
  The ad with ID 3 was shown to user 2 at time 20 while they were in session 4.
  We can see that sessions 1 and 4 had at least one ad. Sessions 2, 3, and 5 did not have any ads, so we return them.
```

---

## 3. Approach: LEFT JOIN + IS NULL ✅

```sql
SELECT p.session_id
FROM Playback p
LEFT JOIN Ads a ON p.customer_id = a.customer_id
    AND a.timestamp BETWEEN p.start_time AND p.end_time
WHERE a.ad_id IS NULL;
```

---

## 4. Walkthrough

1. Perform a LEFT JOIN between `Playback` and `Ads` on matching `customer_id` and ad timestamps within the session interval.
2. For sessions with no matching ad, the joined `Ads` columns become `NULL`.
3. Filter rows where `a.ad_id IS NULL` to keep only ad‑free sessions.
4. Return the `session_id` of those rows.

---

## 5. Complexity Analysis

- **Time:** O(N + M) where N is the number of playback rows and M is the number of ad rows (join operation).
- **Space:** O(N) for the result set and temporary join structures.

---

## 6. Follow‑Up Questions

- How would you modify the query to find sessions with **exactly one** ad?
- How to handle overlapping sessions for the same customer?
- Can you write an equivalent query using `NOT EXISTS`?

---

## Key Takeaway

> Anti‑join pattern: LEFT JOIN + `WHERE … IS NULL` efficiently finds rows with no matching record, a classic technique for “not exists” queries in SQL.
