# 1454. Active Users

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/active-users](https://leetcode.com/problems/active-users)
**Companies:** Ciena

---

## 1. Problem Description

**SQL Problem.**

Table: `Accounts`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the primary key (column with unique values) for this table.
This table contains the account id and the user name of each account.
```

Table: `Logins`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| login_date    | date    |
+---------------+---------+
This table may contain duplicate rows.
This table contains the account id of the user who logged in and the login date. A user may log in multiple times in the day.
```

**Active users** are those who logged in to their accounts for five or more consecutive days.

Write a solution to find the id and the name of **active users**.

Return the result table **ordered** by `id`.

**Follow up:** Could you write a general solution if the active users are those who logged in to their accounts for `n` or more consecutive days?

---

## 2. Examples

```
Example 1:
  Input:
  Accounts table:
  +----+----------+
  | id | name     |
  +----+----------+
  | 1  | Winston  |
  | 7  | Jonathan |
  +----+----------+
  Logins table:
  +----+------------+
  | id | login_date |
  +----+------------+
  | 7  | 2020-05-30 |
  | 1  | 2020-05-30 |
  | 7  | 2020-05-31 |
  | 7  | 2020-06-01 |
  | 7  | 2020-06-02 |
  | 7  | 2020-06-02 |
  | 7  | 2020-06-03 |
  | 1  | 2020-06-07 |
  | 7  | 2020-06-10 |
  +----+------------+
  Output:
  +----+----------+
  | id | name     |
  +----+----------+
  | 7  | Jonathan |
  +----+----------+
  Explanation:
  User Winston with id = 1 logged in 2 times only in 2 different days, so, Winston is not an active user.
  User Jonathan with id = 7 logged in 7 times in 6 different days, five of them were consecutive days, so, Jonathan is an active user.
```

---

## 2. Approach: Self-Join or Window Functions ✅

```sql
WITH ranked AS (
    SELECT DISTINCT id, login_date,
           login_date - INTERVAL ROW_NUMBER() OVER (PARTITION BY id ORDER BY login_date) DAY AS grp
    FROM Logins
)
SELECT DISTINCT a.id, a.name
FROM ranked r
JOIN Accounts a ON r.id = a.id
GROUP BY r.id, a.name, r.grp
HAVING COUNT(*) >= 5
ORDER BY a.id;
```

**Trick:** Subtract row_number from date — consecutive dates produce the same group value.

---

## 3. Walkthrough

| Step | Action |
|------|--------|
| 1 | Use `ROW_NUMBER()` to assign an increasing index to each login per user ordered by date. |
| 2 | Compute `login_date - ROW_NUMBER()` which yields a constant for each consecutive streak (the *group*). |
| 3 | Group rows by `id` and the computed `grp`. |
| 4 | `HAVING COUNT(*) >= 5` keeps only groups with at least five rows, i.e., five consecutive days. |
| 5 | Join the qualifying `id`s with `Accounts` to retrieve user details. |

---

## 4. Complexity Analysis

- **Time:** O(N log N) due to the window function sorting rows per user (typically implemented with an index). |
- **Space:** O(N) for the CTE storing the intermediate `ranked` rows.

---

## 5. Follow-Up Questions

1. How would you modify the query to find users with *k* consecutive days for an arbitrary `k`? |
2. How can you return the start and end dates of each qualifying streak? |
3. Extend the problem to consider only logins within the last 30 days.

---

## Key Takeaway

> The "consecutive days" pattern uses `date - ROW_NUMBER()` to create groups. Consecutive dates yield the same group, non-consecutive dates yield different groups. Then `HAVING COUNT(*) >= k` filters for runs of length *k*.
