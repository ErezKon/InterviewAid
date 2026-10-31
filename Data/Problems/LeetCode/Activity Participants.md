# 1355. Activity Participants

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/activity-participants](https://leetcode.com/problems/activity-participants)
**Companies:** Ibm

---

## 1. Problem Description

**SQL Problem.**

Table: `Friends`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
| activity      | varchar |
+---------------+---------+
id is the id of the friend and the primary key for this table in SQL.
name is the name of the friend.
activity is the name of the activity which the friend takes part in.
```

Table: `Activities`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
In SQL, id is the primary key for this table.
name is the name of the activity.
```

Find the names of all the activities with neither the maximum nor the minimum number of participants.

Each activity in the `Activities` table is performed by any person in the table Friends.

Return the result table in **any order**.

---

## 2. Examples

```
Example 1:
  Input:
  Friends table:
  +------+--------------+---------------+
  | id   | name         | activity      |
  +------+--------------+---------------+
  | 1    | Jonathan D.  | Eating        |
  | 2    | Jade W.      | Singing       |
  | 3    | Victor J.    | Singing       |
  | 4    | Elvis Q.     | Eating        |
  | 5    | Daniel A.    | Eating        |
  | 6    | Bob B.       | Horse Riding  |
  +------+--------------+---------------+
  Activities table:
  +------+--------------+
  | id   | name         |
  +------+--------------+
  | 1    | Eating       |
  | 2    | Singing      |
  | 3    | Horse Riding |
  +------+--------------+
  Output:
  +--------------+
  | activity     |
  +--------------+
  | Singing      |
  +--------------+
  Explanation:
  Eating activity is performed by 3 friends, maximum number of participants, (Jonathan D. , Elvis Q. and Daniel A.)
  Horse Riding activity is performed by 1 friend, minimum number of participants, (Bob B.)
  Singing is performed by 2 friends (Victor J. and Jade W.)
```


---

## 2. Approach: Subquery with Count ✅

```sql
SELECT activity
FROM Friends
GROUP BY activity
HAVING COUNT(*) > (
    SELECT MIN(cnt) FROM (SELECT COUNT(*) cnt FROM Friends GROUP BY activity) t
) AND COUNT(*) < (
    SELECT MAX(cnt) FROM (SELECT COUNT(*) cnt FROM Friends GROUP BY activity) t
);
```

---

## 3. Walkthrough

| Step | Action |
|------|--------|
| 1 | Group `Friends` by `activity` and compute `COUNT(*)` for each activity. |
| 2 | In a subquery, compute the global minimum (`MIN(cnt)`) and maximum (`MAX(cnt)`) of those counts. |
| 3 | Keep only activities where the count is greater than the minimum **and** less than the maximum. |
| 4 | Return the qualifying activity names. |

---

## 4. Complexity Analysis

- **Time:** O(N) – a single scan to aggregate counts, plus constant-time subqueries over the aggregated result.
- **Space:** O(K) – extra space for the aggregated counts per distinct activity (`K` = number of activities).

---

## 5. Follow-Up Questions

1. How would you modify the query to return activities whose participant count is within the middle 50 % (i.e., between the 25th and 75th percentiles)?
2. How can you include the actual participant count in the result set?
3. Extend the problem to handle ties when multiple activities share the same minimum or maximum count.

---

## Key Takeaway

> Use aggregation to count participants per activity, then filter out the extremes by comparing each count against the global `MIN` and `MAX` values via subqueries.
