# 1454. Active Users

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/active-users](https://leetcode.com/problems/active-users)
**Companies:** Ciena

---

## 1. Problem Description

**SQL Problem.** Given `Accounts` and `Logins` tables, find "active users" — those who logged in on **5 or more consecutive days**.

---

## 2. Examples

**Example 1**

| id | name   | login_date |
|----|--------|------------|
| 1  | Alice  | 2023-01-01 |
| 1  | Alice  | 2023-01-02 |
| 1  | Alice  | 2023-01-03 |
| 1  | Alice  | 2023-01-04 |
| 1  | Alice  | 2023-01-05 |
| 2  | Bob    | 2023-01-01 |
| 2  | Bob    | 2023-01-03 |
| 2  | Bob    | 2023-01-04 |
| 2  | Bob    | 2023-01-05 |
| 2  | Bob    | 2023-01-06 |

Only **Alice** has a run of 5 consecutive login dates, so the result returns her `id` and `name`.

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

> The "consecutive days" pattern uses `date - ROW_NUMBER()` to create groups. Consecutive dates yield the same group, non‑consecutive dates yield different groups. Then `HAVING COUNT(*) >= k` filters for runs of length *k*.
