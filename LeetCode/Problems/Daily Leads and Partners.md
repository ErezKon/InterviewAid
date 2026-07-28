# 1693. Daily Leads and Partners

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/daily-leads-and-partners](https://leetcode.com/problems/daily-leads-and-partners)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

SQL: For each date and make, count distinct leads and distinct partners.

---

## Examples

| date_id | make_name | lead_id | partner_id |
|---------|-----------|---------|------------|
| 2023-01-01 | Toyota | 1 | 10 |
| 2023-01-01 | Toyota | 2 | 10 |
| 2023-01-01 | Toyota | 1 | 11 |
| 2023-01-02 | Honda  | 3 | 12 |

**Result**

| date_id | make_name | unique_leads | unique_partners |
|---------|-----------|--------------|-----------------|
| 2023-01-01 | Toyota | 2 | 2 |
| 2023-01-02 | Honda  | 1 | 1 |

*Explanation*: On 2023-01-01 for Toyota, leads 1 and 2 are distinct (2), partners 10 and 11 are distinct (2).

---

## Approach

```sql
SELECT date_id, make_name,
    COUNT(DISTINCT lead_id) AS unique_leads,
    COUNT(DISTINCT partner_id) AS unique_partners
FROM DailySales
GROUP BY date_id, make_name;
```

---

## Walkthrough

1. **GROUP BY** groups rows by `date_id` and `make_name`.
2. **COUNT(DISTINCT lead_id)** counts unique leads within each group.
3. **COUNT(DISTINCT partner_id)** counts unique partners within each group.
4. The SELECT returns one row per `(date_id, make_name)` with the two counts.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(N) – scans the table once |
| **Space** | O(G) – space for groups, where G is number of distinct `(date_id, make_name)` pairs |

---

## Key Takeaway

> **COUNT(DISTINCT) with GROUP BY provides per‑group unique counts without extra subqueries.**