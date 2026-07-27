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

Given an `Actions` table with columns `user_id`, `post_id`, `action_date`, `action` (enum: 'view', 'like', 'reaction', 'comment', 'report', 'share'), and `extra` (optional reason for report), write a SQL query to report the **number of distinct posts** that were reported yesterday for each report reason. Assume today's date is `2019-07-05`.

**Constraints:**
- There is no primary key; the table may have duplicates
- `extra` is only non-null when `action = 'report'`

---

## Examples

**Input:**

| user_id | post_id | action_date | action | extra  |
|---------|---------|-------------|--------|--------|
| 1       | 1       | 2019-07-01  | view   | null   |
| 1       | 1       | 2019-07-01  | like   | null   |
| 1       | 1       | 2019-07-04  | report | spam   |
| 2       | 4       | 2019-07-04  | report | spam   |
| 3       | 4       | 2019-07-04  | report | spam   |
| 4       | 3       | 2019-07-02  | report | racism |

**Output:**

| report_reason | report_count |
|---------------|-------------|
| spam          | 2           |

**Explanation:** Only the `report` actions from `2019-07-04` (yesterday) matter. Posts 1 and 4 were reported for spam. Post 3 was reported for racism on 07-02 (not yesterday), so it's excluded.

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
