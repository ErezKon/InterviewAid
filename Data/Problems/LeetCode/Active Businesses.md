# 1126. Active Businesses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/active-businesses](https://leetcode.com/problems/active-businesses)
**Companies:** Yelp

---

## 1. Problem Description

**SQL Problem.** Given an `Events` table with `business_id`, `event_type`, and `occurrences`, find businesses where the number of occurrences for **more than one** event type exceeds the **average** for that event type across all businesses.

---

## 2. Examples

**Example 1**

| business_id | event_type | occurrences |
|------------|------------|------------|
| 1          | click      | 10 |
| 1          | view       | 5 |
| 2          | click      | 2 |
| 2          | view       | 8 |
| 3          | click      | 7 |
| 3          | view       | 9 |

*Average occurrences*: click → (10+2+7)/3 = 6.33, view → (5+8+9)/3 = 7.33.

Businesses 1 and 3 have **more than one** event type with occurrences above the respective averages, so they are returned.

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
