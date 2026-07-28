# 1158. Market Analysis I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/market-analysis-i](https://leetcode.com/problems/market-analysis-i)
**Companies:** Amazon, Bloomberg, Google, Poshmark

---

## 1. Problem Description (SQL)

For each user, find their join date and count of orders placed in 2019.

---

## 2. Approach: SQL — LEFT JOIN + GROUP BY ✅

```sql
SELECT u.user_id AS buyer_id, u.join_date,
    COUNT(o.order_id) AS orders_in_2019
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.buyer_id AND YEAR(o.order_date) = 2019
GROUP BY u.user_id, u.join_date;
```

---

## 3. Examples

**Example 1:**
```sql
-- Users table
user_id | join_date
1       | 2018-05-21
2       | 2019-03-11

-- Orders table
order_id | buyer_id | order_date
101      | 1        | 2019-01-10
102      | 1        | 2020-02-15
103      | 2        | 2019-07-22
```
Result:
```
buyer_id | join_date | orders_in_2019
1        | 2018-05-21 | 1
2        | 2019-03-11 | 1
```

**Example 2:** Users with no orders in 2019 are still listed with count 0.

---

## 4. Walkthrough

| Step | Action | Resulting `orders_in_2019` |
|------|--------|----------------------------|
| 1 | LEFT JOIN filters orders to year 2019 | Only orders from 2019 are attached.
| 2 | GROUP BY groups rows per user | Aggregates count per user, missing rows become NULL → COUNT yields 0.

---

## 5. Complexity Analysis

- **Time:** The query runs in O(|Users| + |Orders|) database time, plus indexing overhead.
- **Space:** O(|Users|) for the result set.

---

## 6. Follow‑Up Questions

- How would you modify the query to include orders from multiple years?
- Can you write a version that returns the total order amount per user for 2019?
- How would you handle users with duplicate `user_id` entries?

---

## 3. Key Takeaway

> LEFT JOIN to include users with zero orders. Filter the year in the JOIN condition (not WHERE) to preserve all users.
