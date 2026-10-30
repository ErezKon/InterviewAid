# 1113. Reported Posts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reported-posts](https://leetcode.com/problems/reported-posts)
**Companies:** Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

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

Write a solution to report the number of posts reported yesterday for each report reason. Assume today is `2019-07-05`.

Return the result table in **any order**.

The result format is in the following example.

---

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
| 2       | 4       | 2019-07-04  | view   | null   |
| 2       | 4       | 2019-07-04  | report | spam   |
| 3       | 4       | 2019-07-04  | view   | null   |
| 3       | 4       | 2019-07-04  | report | spam   |
| 4       | 3       | 2019-07-02  | view   | null   |
| 4       | 3       | 2019-07-02  | report | spam   |
| 5       | 2       | 2019-07-04  | view   | null   |
| 5       | 2       | 2019-07-04  | report | racism |
| 5       | 5       | 2019-07-04  | view   | null   |
| 5       | 5       | 2019-07-04  | report | racism |
+---------+---------+-------------+--------+--------+
Output:
+---------------+--------------+
| report_reason | report_count |
+---------------+--------------+
| spam          | 1            |
| racism        | 2            |
+---------------+--------------+
Explanation: Note that we only care about report reasons with non-zero number of reports.
```

---

## Key Insight

> Filter to `action = 'report'` AND `action_date = '2019-07-04'`, then group by the `extra` column (report reason) and count **distinct** `post_id` values to avoid duplicates from multiple users reporting the same post.

---

## Approach

```
SELECT extra AS report_reason, COUNT(DISTINCT post_id) AS report_count
FROM Actions
WHERE action = 'report'
  AND action_date = '2019-07-04'
  AND extra IS NOT NULL
GROUP BY extra
```

**Steps:**
1. **Filter** rows where `action = 'report'` and `action_date` is yesterday
2. **Exclude** null reasons with `extra IS NOT NULL`
3. **Group** by `extra` (the report reason)
4. **Count** distinct post IDs per group

---

## Walkthrough

Starting with the example data, filter to `action = 'report'` and `action_date = '2019-07-04'`:

| user_id | post_id | action_date | action | extra |
|---------|---------|-------------|--------|-------|
| 1       | 1       | 2019-07-04  | report | spam  |
| 2       | 4       | 2019-07-04  | report | spam  |
| 3       | 4       | 2019-07-04  | report | spam  |

Group by `extra` and count distinct `post_id`:
- **spam** → distinct posts {1, 4} → count = **2**

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — single pass with filter and group |
| Space  | O(k) — where k = number of distinct report reasons |

---

## Follow-Up Questions

1. **What if we need the percentage of reported posts that got removed?**
   → Join with a `Removals` table and compute `COUNT(DISTINCT r.post_id) / COUNT(DISTINCT a.post_id)` — this is LeetCode #1132.

2. **What if "yesterday" isn't hardcoded?**
   → Use `CURDATE() - INTERVAL 1 DAY` or `DATE_SUB(CURDATE(), INTERVAL 1 DAY)`.

3. **Why use COUNT(DISTINCT post_id) instead of COUNT(*)?**
   → Multiple users can report the same post; we want unique posts per reason, not total report actions.

---

## Key Takeaway

> When counting unique entities within groups, always use `COUNT(DISTINCT ...)` to avoid inflated counts from duplicate entries — a common SQL interview trap.
