# 1322. Ads Performance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/ads-performance](https://leetcode.com/problems/ads-performance)
**Companies:** Meta

---

## 1. Problem Description

**SQL Problem.**

Table: `Ads`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| ad_id         | int     |
| user_id       | int     |
| action        | enum    |
+---------------+---------+
(ad_id, user_id) is the primary key (combination of columns with unique values) for this table.
Each row of this table contains the ID of an Ad, the ID of a user, and the action taken by this user regarding this Ad.
The action column is an ENUM (category) type of ('Clicked', 'Viewed', 'Ignored').
```

A company is running Ads and wants to calculate the performance of each Ad.

Performance of the Ad is measured using Click-Through Rate (CTR) where:

```
CTR = 0                                    if Ad total clicks + Ad total views = 0
CTR = Ad total clicks / (Ad total clicks + Ad total views) × 100   otherwise
```

Write a solution to find the `ctr` of each Ad. **Round** `ctr` to **two decimal points**.

Return the result table ordered by `ctr` in **descending order** and by `ad_id` in **ascending order** in case of a tie.

---

## 2. Approach: SQL Aggregation ✅

```sql
SELECT ad_id,
       ROUND(IFNULL(
           SUM(CASE WHEN action = 'Clicked' THEN 1 ELSE 0 END) * 100.0 /
           NULLIF(SUM(CASE WHEN action IN ('Clicked','Viewed') THEN 1 ELSE 0 END), 0),
       0), 2) AS ctr
FROM Ads
GROUP BY ad_id
ORDER BY ctr DESC, ad_id ASC;
```

---

## 3. Examples

```
Example 1:
  Input:
  Ads table:
  +-------+---------+---------+
  | ad_id | user_id | action  |
  +-------+---------+---------+
  | 1     | 1       | Clicked |
  | 2     | 2       | Clicked |
  | 3     | 3       | Viewed  |
  | 5     | 5       | Ignored |
  | 1     | 7       | Ignored |
  | 2     | 7       | Viewed  |
  | 3     | 5       | Clicked |
  | 1     | 4       | Viewed  |
  | 2     | 11      | Viewed  |
  | 1     | 2       | Clicked |
  +-------+---------+---------+
  Output:
  +-------+-------+
  | ad_id | ctr   |
  +-------+-------+
  | 1     | 66.67 |
  | 3     | 50.00 |
  | 2     | 33.33 |
  | 5     | 0.00  |
  +-------+-------+
  Explanation:
  for ad_id = 1, ctr = (2/(2+1)) * 100 = 66.67
  for ad_id = 2, ctr = (1/(1+2)) * 100 = 33.33
  for ad_id = 3, ctr = (1/(1+1)) * 100 = 50.00
  for ad_id = 5, ctr = 0.00, Note that ad_id = 5 has no clicks or views.
  Note that we do not care about Ignored Ads.
```

---

## 4. Walkthrough

1. **Count clicks** per `ad_id` using `SUM(CASE WHEN action = 'Clicked' THEN 1 ELSE 0 END)`.
2. **Count clicks + views** per `ad_id` using `SUM(CASE WHEN action IN ('Clicked','Viewed') THEN 1 ELSE 0 END)`.
3. **Compute CTR** as `clicks * 100.0 / (clicks + views)`. Use `NULLIF` to avoid division by zero.
4. **Round** the result to two decimal places with `ROUND(..., 2)`.
5. **Order** the output as required.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(N) (single table scan) | O(G) where G is number of distinct `ad_id`s |

---

## 6. Follow‑Up Questions

1. How would you modify the query to compute CTR per day?
2. What if you need to exclude `Ignored` actions from the denominator?
3. How can you handle ads with no clicks or views more efficiently?

---

## Key Takeaway

> Standard SQL aggregation with `CASE WHEN` for conditional counting. Use `NULLIF` to avoid division by zero and `IFNULL` to default to 0.