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

## 3. Examples

| sell_date | product |
|-----------|---------|
| 2021-01-01 | "Apple" |
| 2021-01-01 | "Banana" |
| 2021-01-02 | "Apple" |

**Result**

| sell_date | num_sold | products |
|-----------|----------|----------|
| 2021-01-01 | 2 | Apple,Banana |
| 2021-01-02 | 1 | Apple |

## 4. Walkthrough

1. Group rows by `sell_date`.
2. For each group, count distinct `product` values → `num_sold`.
3. Use `GROUP_CONCAT(DISTINCT product ORDER BY product)` to concatenate product names alphabetically.
4. Order final result by `sell_date`.

## 5. Complexity Analysis

- **Time:** O(N log N) due to sorting within `GROUP_CONCAT` (implementation‑dependent).
- **Space:** O(G) where G is the number of distinct groups (sell dates).

## 6. Follow-Up Questions

- How would you handle very large result sets that exceed client limits?
- Modify the query to include only products sold more than once per date.
- Convert the solution to a window function based approach.

## Key Takeaway

> `GROUP_CONCAT(DISTINCT ... ORDER BY ...)` creates comma‑separated aggregated strings per group.
