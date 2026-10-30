# 1132. Reported Posts II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reported-posts-ii](https://leetcode.com/problems/reported-posts-ii)
**Companies:** Meta

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Actions`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| post_id       | int     |
| action_date   | date    |
| action        | enum    |
| extra         | varchar |
+---------------+---------+
This table may have duplicate rows.
The action column is an ENUM (category) type of ('view', 'like', 'reaction', 'comment', 'report', 'share').
The extra column has optional information about the action, such as a reason for the report or a type of reaction.
```

Table: `Removals`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| post_id       | int     |
| remove_date   | date    |
+---------------+---------+
post_id is the primary key (column with unique values) of this table.
Each row in this table indicates that some post was removed due to being reported or as a result of an admin review.
```

Write a solution to find the average daily percentage of posts that got removed after being reported as spam, **rounded to 2 decimal places**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Actions table:
+---------+---------+-------------+--------+--------+
| user_id | post_id | action_date | action | extra  |
+---------+---------+-------------+--------+--------+
| 1       | 1       | 2019-07-01  | view   | null   |
| 1       | 1       | 2019-07-01  | like   | null   |
| 1       | 1       | 2019-07-01  | share  | null   |
| 2       | 2       | 2019-07-04  | view   | null   |
| 2       | 2       | 2019-07-04  | report | spam   |
| 3       | 4       | 2019-07-04  | view   | null   |
| 3       | 4       | 2019-07-04  | report | spam   |
| 4       | 3       | 2019-07-02  | view   | null   |
| 4       | 3       | 2019-07-02  | report | spam   |
| 5       | 2       | 2019-07-03  | view   | null   |
| 5       | 2       | 2019-07-03  | report | racism |
| 5       | 5       | 2019-07-03  | view   | null   |
| 5       | 5       | 2019-07-03  | report | racism |
+---------+---------+-------------+--------+--------+
Removals table:
+---------+-------------+
| post_id | remove_date |
+---------+-------------+
| 2       | 2019-07-20  |
| 3       | 2019-07-18  |
+---------+-------------+
Output:
+-----------------------+
| average_daily_percent |
+-----------------------+
| 75.00                 |
+-----------------------+
Explanation:
The percentage for 2019-07-04 is 50% because only one post of two spam reported posts were removed.
The percentage for 2019-07-02 is 100% because one post was reported as spam and it was removed.
The other days had no spam reports so the average is (50 + 100) / 2 = 75%
Note that the output is only one number and that we do not care about the remove dates.
```

## Approach
Count distinct user reports per post using a set, then count how many posts meet the threshold.

```text
FUNCTION CountReportedPosts(postIds, reports, k):
    SET reportMap ← MAP from postId to SET of userIds
    FOR each (userId, postId) IN reports:
        IF postId NOT IN reportMap:
            reportMap[postId] ← SET()
        ADD userId TO reportMap[postId]
    SET reportedCount ← 0
    FOR postId IN postIds:
        IF SIZE(reportMap[postId] OR EMPTY SET) ≥ k:
            INCREMENT reportedCount
    RETURN reportedCount
```

## Walkthrough
| Step | (userId,postId) | reportMap after step |
|------|-----------------|----------------------|
| 1 | (101,1) | {1:{101}}
| 2 | (102,1) | {1:{101,102}}
| 3 | (103,2) | {1:{101,102}, 2:{103}}
| 4 | (101,2) | {1:{101,102}, 2:{103,101}}
| 5 | (104,2) | {1:{101,102}, 2:{103,101,104}}

After processing, both post 1 and 2 have ≥2 distinct reporters → result 2.

## Complexity Analysis
- Time: O(R) where R is number of reports.
- Space: O(P + R) for storing sets per post.

## Follow‑Up Questions
1. How would you modify the solution to return the list of reported post IDs?
2. What if each user can report a post only once, but duplicate reports appear in the input?
3. How to handle a streaming scenario where reports arrive in real time?

## Key Takeaway
Using a set per post efficiently tracks distinct reporters, enabling a simple count of posts meeting the report threshold.
