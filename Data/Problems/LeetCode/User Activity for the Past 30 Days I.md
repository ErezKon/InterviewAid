# 1141. User Activity for the Past 30 Days I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/user-activity-for-the-past-30-days-i](https://leetcode.com/problems/user-activity-for-the-past-30-days-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoom

---

## Problem Description
Given a table `Activity(user_id INT, activity_date DATE)`, return the number of distinct active users for each of the past 30 days (including the given end date). An active user is any user who performed at least one activity on that day.

## Examples
| activity_date | active_users |
|---------------|--------------|
| 2019-07-27    | 5 |
| 2019-07-26    | 3 |
| ...           | ... |
*The output lists each day in the 30‑day window with the count of unique users.*

## Approach
Use a simple aggregation query that filters rows to the required date range, groups by `activity_date`, and counts distinct `user_id`s.

```text
FUNCTION CountActiveUsers(activityTable, endDate):
    SET startDate ← DATE_SUB(endDate, INTERVAL 29 DAY)
    SELECT activity_date AS day,
           COUNT(DISTINCT user_id) AS active_users
    FROM activityTable
    WHERE activity_date BETWEEN startDate AND endDate
    GROUP BY activity_date
    ORDER BY day ASC
    RETURN result
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Compute `startDate` = `endDate` - 29 days. |
| 2 | Filter `Activity` rows where `activity_date` is in `[startDate, endDate]`. |
| 3 | Group the filtered rows by `activity_date`. |
| 4 | For each group, count distinct `user_id` values. |
| 5 | Return the list ordered by date. |

## Complexity Analysis
- **Time:** O(N) where N is the number of rows in `Activity` (single scan). Index on `activity_date` can improve to O(log N) for range selection.
- **Space:** O(D) for storing results, where D ≤ 30 (one entry per day).

## Follow-Up Questions
1. How would you handle missing days with zero active users?
2. Extend the query to return a running total of active users over the window.
3. Adapt the solution for a sliding window of arbitrary size.

## Key Takeaway
Aggregating over a date range with `GROUP BY` and `COUNT(DISTINCT ...)` efficiently yields daily active user counts.
