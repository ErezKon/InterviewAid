# 1484. Group Sold Products By The Date

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/group-sold-products-by-the-date](https://leetcode.com/problems/group-sold-products-by-the-date)
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

Table `Activities`:

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| sell_date   | date    |
| product     | varchar |
+-------------+---------+
There is no primary key (column with unique values) for this table. It may contain duplicates.
Each row of this table contains the product name and the date it was sold in a market.
```

Write a solution to find for each date the number of different products sold and their names.

The sold products names for each date should be sorted lexicographically.

Return the result table ordered by `sell_date`.

The result format is in the following example.

## 2. Approach: GROUP_CONCAT ✅

```sql
SELECT sell_date, COUNT(DISTINCT product) AS num_sold,
    GROUP_CONCAT(DISTINCT product ORDER BY product) AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;
```

## 3. Examples

```
Example 1:
  Input:
  Activities table:
  +------------+------------+
  | sell_date  | product    |
  +------------+------------+
  | 2020-05-30 | Headphone  |
  | 2020-06-01 | Pencil     |
  | 2020-06-02 | Mask       |
  | 2020-05-30 | Basketball |
  | 2020-06-01 | Bible      |
  | 2020-06-02 | Mask       |
  | 2020-05-30 | T-Shirt    |
  +------------+------------+
  Output:
  +------------+----------+------------------------------+
  | sell_date  | num_sold | products                     |
  +------------+----------+------------------------------+
  | 2020-05-30 | 3        | Basketball,Headphone,T-shirt |
  | 2020-06-01 | 2        | Bible,Pencil                 |
  | 2020-06-02 | 1        | Mask                         |
  +------------+----------+------------------------------+
  Explanation:
  For 2020-05-30, Sold items were (Headphone, Basketball, T-shirt), we sort them lexicographically and separate them by a comma.
  For 2020-06-01, Sold items were (Pencil, Bible), we sort them lexicographically and separate them by a comma.
  For 2020-06-02, the Sold item is (Mask), we just return it.
```

## 4. Walkthrough

1. Group rows by `sell_date`.
2. For each group, count distinct `product` values → `num_sold`.
3. Use `GROUP_CONCAT(DISTINCT product ORDER BY product)` to concatenate product names alphabetically.
4. Order final result by `sell_date`.

## 5. Complexity Analysis

- **Time:** O(N log N) due to sorting within `GROUP_CONCAT` (implementation-dependent).
- **Space:** O(G) where G is the number of distinct groups (sell dates).

## 6. Follow-Up Questions

- How would you handle very large result sets that exceed client limits?
- Modify the query to include only products sold more than once per date.
- Convert the solution to a window function based approach.

## Key Takeaway

> `GROUP_CONCAT(DISTINCT ... ORDER BY ...)` creates comma-separated aggregated strings per group.
