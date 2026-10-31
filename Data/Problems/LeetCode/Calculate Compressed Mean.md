# 2985. Calculate Compressed Mean

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-compressed-mean](https://leetcode.com/problems/calculate-compressed-mean)
**Companies:** Google

---

## 1. Problem Description

Table: `Orders`

```
+-------------------+------+
| Column Name       | Type |
+-------------------+------+
| order_id          | int  |
| item_count        | int  |
| order_occurrences | int  |
+-------------------+------+
order_id is column of unique values for this table.
This table contains order_id, item_count, and order_occurrences.
```

Write a solution to calculate the **average** number of items per order, rounded to `2` **decimal places**.

Return *the result table in **any** order*.

The result format is in the following example.

---

## Examples

```
Example 1:
  Input:
  Orders table:
  +----------+------------+-------------------+
  | order_id | item_count | order_occurrences |
  +----------+------------+-------------------+
  | 10       | 1          | 500               |
  | 11       | 2          | 1000              |
  | 12       | 3          | 800               |
  | 13       | 4          | 1000              |
  +----------+------------+-------------------+
  Output:
  +-------------------------+
  | average_items_per_order |
  +-------------------------+
  | 2.70                    |
  +-------------------------+
  Explanation: The calculation is as follows:
   - Total items: (1 * 500) + (2 * 1000) + (3 * 800) + (4 * 1000) = 8900
   - Total orders: 500 + 1000 + 800 + 1000 = 3300
   - Therefore, the average items per order is 8900 / 3300 = 2.70
```

---

## 2. Approach: Weighted Average — O(n) ✅

```sql
SELECT ROUND(SUM(value * frequency) / SUM(frequency), 2) AS mean
FROM compressed_data;
```

---

## Walkthrough

1. **Compute weighted sum:** `SUM(value * frequency)` aggregates each row's contribution.
2. **Compute total weight:** `SUM(frequency)` adds up all frequencies.
3. **Divide:** Weighted sum divided by total weight yields the mean.
4. **Round:** `ROUND(..., 2)` formats the result to two decimal places.

For the example table:
- Weighted sum = 10*2 + 20*3 + 30*5 = 200
- Total weight = 2 + 3 + 5 = 10
- Mean = 200 / 10 = 20.00 → rounded to `20.00`.

---

## Complexity Analysis

- **Time:** O(n) – each row is processed once by the aggregation functions.
- **Space:** O(1) – only constant-size aggregates are stored.

---

## Follow-Up Questions

1. How would you compute the weighted median instead of the mean?
2. How can you handle extremely large tables where intermediate sums might overflow?
3. Extend the query to filter rows based on a condition (e.g., `value > 15`).

---

## Key Takeaway

> Weighted mean in SQL is obtained by `SUM(value * weight) / SUM(weight)` and rounded as needed.
