# 1126. Active Businesses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/active-businesses](https://leetcode.com/problems/active-businesses)
**Companies:** Yelp

---

## 1. Problem Description

**SQL Problem.** Given an `Events` table with `business_id`, `event_type`, and `occurrences`, find businesses where the number of occurrences for **more than one** event type exceeds the **average** for that event type across all businesses.

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

## Key Takeaway

> Compute per-event-type averages in a CTE, join back, filter above-average, then group by business and require multiple qualifying event types with `HAVING COUNT(*) > 1`.
