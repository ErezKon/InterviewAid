# 1159. Market Analysis II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/market-analysis-ii](https://leetcode.com/problems/market-analysis-ii)
**Companies:** Poshmark

---

## 1. Problem Description (SQL)

Table: `Users`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| user_id        | int     |
| join_date      | date    |
| favorite_brand | varchar |
+----------------+---------+
user_id is the primary key (column with unique values) of this table.
This table has the info of the users of an online shopping website where users can sell and buy items.
```

Table: `Orders`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| item_id       | int     |
| buyer_id      | int     |
| seller_id     | int     |
+---------------+---------+
order_id is the primary key (column with unique values) of this table.
item_id is a foreign key (reference column) to the Items table.
buyer_id and seller_id are foreign keys to the Users table.
```

Table: `Items`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| item_id       | int     |
| item_brand    | varchar |
+---------------+---------+
item_id is the primary key (column with unique values) of this table.
```

Write a solution to find for each user whether the brand of the second item (by date) they sold is their favorite brand. If a user sold less than two items, report the answer for that user as no. It is guaranteed that no seller sells more than one item in a day.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Approach: SQL — ROW_NUMBER + Join ✅

```sql
SELECT u.user_id AS seller_id,
    CASE WHEN i.item_brand = u.favorite_brand THEN 'yes' ELSE 'no' END AS 2nd_item_fav_brand
FROM Users u
LEFT JOIN (
    SELECT seller_id, item_id,
        ROW_NUMBER() OVER (PARTITION BY seller_id ORDER BY order_date) AS rn
    FROM Orders
) o ON u.user_id = o.seller_id AND o.rn = 2
LEFT JOIN Items i ON o.item_id = i.item_id;
```

---

## 3. Examples

```
Example 1:
  Input:
  Users table:
  +---------+------------+----------------+
  | user_id | join_date  | favorite_brand |
  +---------+------------+----------------+
  | 1       | 2019-01-01 | Lenovo         |
  | 2       | 2019-02-09 | Samsung        |
  | 3       | 2019-01-19 | LG             |
  | 4       | 2019-05-21 | HP             |
  +---------+------------+----------------+
  Orders table:
  +----------+------------+---------+----------+-----------+
  | order_id | order_date | item_id | buyer_id | seller_id |
  +----------+------------+---------+----------+-----------+
  | 1        | 2019-08-01 | 4       | 1        | 2         |
  | 2        | 2019-08-02 | 2       | 1        | 3         |
  | 3        | 2019-08-03 | 3       | 2        | 3         |
  | 4        | 2019-08-04 | 1       | 4        | 2         |
  | 5        | 2019-08-04 | 1       | 3        | 4         |
  | 6        | 2019-08-05 | 2       | 2        | 4         |
  +----------+------------+---------+----------+-----------+
  Items table:
  +---------+------------+
  | item_id | item_brand |
  +---------+------------+
  | 1       | Samsung    |
  | 2       | Lenovo     |
  | 3       | LG         |
  | 4       | HP         |
  +---------+------------+
  Output:
  +-----------+--------------------+
  | seller_id | 2nd_item_fav_brand |
  +-----------+--------------------+
  | 1         | no                 |
  | 2         | yes                |
  | 3         | yes                |
  | 4         | no                 |
  +-----------+--------------------+
  Explanation:
  The answer for the user with id 1 is no because they sold nothing.
  The answer for the users with id 2 and 3 is yes because the brands of their second sold items are their favorite brands.
  The answer for the user with id 4 is no because the brand of their second sold item is not their favorite brand.
```

---

## 4. Walkthrough

| Step | Action | 2nd Item Brand | Favorite Brand | Result |
|------|--------|----------------|----------------|--------|
| 1    | Compute ROW_NUMBER per seller ordered by `order_date` | – | – | Assigns rank to each sold item |
| 2    | Filter rows where `rn = 2` | Brand of the second sold item | – | Isolated second item per seller |
| 3    | Join with `Items` to get `item_brand` and compare to `favorite_brand` | `item_brand` | `favorite_brand` | `'yes'` if equal else `'no'` |

---

## 5. Complexity Analysis

- **Time:** The query runs in O(|Orders| log |Orders|) due to the window function, plus linear joins on `Users` and `Items`.
- **Space:** O(|Orders|) for the intermediate window result and O(|Users| + |Items|) for join buffers.

---

## 6. Follow‑Up Questions

- How would you modify the query to find the brand of the *k*‑th sold item?
- Can you write a version that returns the full list of items sold by each user with their rank?
- How would you handle ties when multiple items share the same `order_date`?

---

## Key Takeaway

> Use `ROW_NUMBER` to isolate the N‑th record per group, then join to compare attributes.
