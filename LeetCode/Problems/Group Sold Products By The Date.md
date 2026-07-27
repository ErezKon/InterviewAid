# 1484. Group Sold Products By The Date

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/group-sold-products-by-the-date](https://leetcode.com/problems/group-sold-products-by-the-date)
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

For each sell date, list the number of distinct products sold and their names (comma-separated, alphabetically). (SQL problem)

## 2. Approach: GROUP_CONCAT ✅

```sql
SELECT sell_date, COUNT(DISTINCT product) AS num_sold,
    GROUP_CONCAT(DISTINCT product ORDER BY product) AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;
```

## Key Takeaway

> `GROUP_CONCAT(DISTINCT ... ORDER BY ...)` creates comma-separated aggregated strings per group.
