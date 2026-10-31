# 1127. User Purchase Platform

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/user-purchase-platform](https://leetcode.com/problems/user-purchase-platform)
**Companies:** Linkedin

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Spending`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| user_id     | int     |
| spend_date  | date    |
| platform    | enum    |
| amount      | int     |
+-------------+---------+
The table logs the history of the spending of users that make purchases from an online shopping website that has a desktop and a mobile application.
(user_id, spend_date, platform) is the primary key (combination of columns with unique values) of this table.
The platform column is an ENUM (category) type of ('desktop', 'mobile').
```

Write a solution to find the total number of users and the total amount spent using the mobile only, the desktop only, and both mobile and desktop together for each date.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Spending table:
+---------+------------+----------+--------+
| user_id | spend_date | platform | amount |
+---------+------------+----------+--------+
| 1       | 2019-07-01 | mobile   | 100    |
| 1       | 2019-07-01 | desktop  | 100    |
| 2       | 2019-07-01 | mobile   | 100    |
| 2       | 2019-07-02 | mobile   | 100    |
| 3       | 2019-07-01 | desktop  | 100    |
| 3       | 2019-07-02 | desktop  | 100    |
+---------+------------+----------+--------+
Output:
+------------+----------+--------------+-------------+
| spend_date | platform | total_amount | total_users |
+------------+----------+--------------+-------------+
| 2019-07-01 | desktop  | 100          | 1           |
| 2019-07-01 | mobile   | 100          | 1           |
| 2019-07-01 | both     | 200          | 1           |
| 2019-07-02 | desktop  | 100          | 1           |
| 2019-07-02 | mobile   | 100          | 1           |
| 2019-07-02 | both     | 0            | 0           |
+------------+----------+--------------+-------------+
Explanation:
On 2019-07-01, user 1 purchased using both desktop and mobile, user 2 purchased using mobile only and user 3 purchased using desktop only.
On 2019-07-02, user 2 purchased using mobile only, user 3 purchased using desktop only and no one purchased using both platforms.
```

## Approach
Use aggregation functions (`SUM`, `COUNT`, `AVG`, `MAX`) grouped by `user_id` to compute the required metrics in a single query.

```text
FUNCTION UserPurchaseMetrics(purchaseTable):
    SELECT user_id,
           SUM(amount) AS total_spent,
           COUNT(*) AS purchase_count,
           AVG(amount) AS avg_amount,
           MAX(purchase_date) AS last_purchase
    FROM purchaseTable
    GROUP BY user_id
    ORDER BY user_id ASC
    RETURN result
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Scan all rows of `Purchase`. |
| 2 | Group rows by `user_id`. |
| 3 | For each group compute `SUM(amount)`, `COUNT(*)`, `AVG(amount)`, and `MAX(purchase_date)`. |
| 4 | Output a row per user with the aggregated values. |

## Complexity Analysis
- **Time:** O(N) where N is the number of purchase records (single pass with grouping). Index on `user_id` can improve grouping performance.
- **Space:** O(U) for storing results, where U is the number of distinct users.

## Follow-Up Questions
1. How would you include only purchases within the last year?
2. Extend the query to compute the median purchase amount per user.
3. Design a solution that updates these aggregates incrementally as new purchases arrive.

## Key Takeaway
SQL aggregation (`SUM`, `COUNT`, `AVG`, `MAX`) with `GROUP BY` efficiently summarizes per-user purchase statistics in a single pass.
