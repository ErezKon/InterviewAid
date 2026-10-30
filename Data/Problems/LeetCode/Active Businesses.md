# 1126. Active Businesses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/active-businesses](https://leetcode.com/problems/active-businesses)
**Companies:** Yelp

---

## 1. Problem Description

**SQL Problem.**

Table: `Events`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| business_id   | int     |
| event_type    | varchar |
| occurrences   | int     |
+---------------+---------+
(business_id, event_type) is the primary key (combination of columns with unique values) of this table.
Each row in the table logs the info that an event of some type occurred at some business for a number of times.
```

The **average activity** for a particular `event_type` is the average `occurrences` across all companies that have this event.

An **active business** is a business that has **more than one** `event_type` such that their `occurrences` is **strictly greater** than the average activity for that event.

Write a solution to find all **active businesses**.

Return the result table in **any order**.

---

## 2. Examples

```
Example 1:
  Input:
  Events table:
  +-------------+------------+-------------+
  | business_id | event_type | occurrences |
  +-------------+------------+-------------+
  | 1           | reviews    | 7           |
  | 3           | reviews    | 3           |
  | 1           | ads        | 11          |
  | 2           | ads        | 7           |
  | 3           | ads        | 6           |
  | 1           | page views | 3           |
  | 2           | page views | 12          |
  +-------------+------------+-------------+
  Output:
  +-------------+
  | business_id |
  +-------------+
  | 1           |
  +-------------+
  Explanation:
  The average activity for each event can be calculated as follows:
  - 'reviews': (7+3)/2 = 5
  - 'ads': (11+7+6)/3 = 8
  - 'page views': (3+12)/2 = 7.5
  The business with id=1 has 7 'reviews' events (more than 5) and 11 'ads' events (more than 8), so it is an active business.
```

---

## 2. Approach: CTE + Having ✅

```sql
WITH avg_events AS (
    SELECT event_type, AVG(occurrences) AS avg_occ
    FROM Events
    GROUP BY event_type
)
SELECT e.business_id
FROM Events e
JOIN avg_events a ON e.event_type = a.event_type
WHERE e.occurrences > a.avg_occ
GROUP BY e.business_id
HAVING COUNT(*) > 1;
```

---

## 3. Walkthrough

| Step | Action |
|------|--------|
| 1 | Compute average occurrences per `event_type` using a CTE (`avg_events`). |
| 2 | Join original `Events` with `avg_events` on `event_type`. |
| 3 | Filter rows where `occurrences` > `avg_occ`. |
| 4 | Group the filtered rows by `business_id`. |
| 5 | Keep groups with `COUNT(*) > 1` (more than one qualifying event type). |
| 6 | Return the qualifying `business_id`s. |

---

## 4. Complexity Analysis

- **Time:** O(N) – each row is processed a constant number of times (CTE aggregation, join, filter, group).
- **Space:** O(K) – extra space for the CTE storing averages per distinct `event_type` (K = number of event types).

---

## 5. Follow-Up Questions

1. How would you modify the query to return the specific event types that are above average for each business?
2. How can you handle ties where `occurrences` equals the average?
3. Extend the problem to support a time window (e.g., only events in the last 30 days).

---

## Key Takeaway

> Compute per-event-type averages in a CTE, join back, filter above‑average, then group by business and require multiple qualifying event types with `HAVING COUNT(*) > 1`.
