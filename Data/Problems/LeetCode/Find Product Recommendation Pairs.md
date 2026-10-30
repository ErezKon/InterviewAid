# 3521. Find Product Recommendation Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-product-recommendation-pairs](https://leetcode.com/problems/find-product-recommendation-pairs)
**Companies:** Amazon, Ibm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Self-Join + Aggregation ✅](#4-approach-self-join--aggregation-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: schema/statement/example verified against the official LeetCode page. The Approach below orders by product ids and omits the categories — official ordering is customer_count DESC first, and the output includes both categories from `ProductInfo`.*

Table: `ProductPurchases`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| user_id     | int  |
| product_id  | int  |
| quantity    | int  |
+-------------+------+
(user_id, product_id) is the unique key for this table.
Each row represents a purchase of a product by a user in a specific quantity.
```

Table: `ProductInfo`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_id  | int     |
| category    | varchar |
| price       | decimal |
+-------------+---------+
product_id is the primary key for this table.
Each row assigns a category and price to a product.
```

Amazon wants to implement the **Customers who bought this also bought...** feature based on **co-purchase patterns**. Write a solution to:

- Identify **distinct** product pairs frequently **purchased together by the same customers** (where `product1_id < product2_id`).
- For **each product pair**, determine how many customers purchased **both** products.

A product pair is considered for recommendation **if at least 3 different customers have purchased both products**.

Return *the result table ordered by* `customer_count` *in **descending** order, and in case of a tie, by* `product1_id` *in **ascending** order, and then by* `product2_id` *in **ascending** order* (columns: `product1_id`, `product2_id`, `product1_category`, `product2_category`, `customer_count`).

The result format is in the following example.

---

## 2. Examples

**Example:**
```
Input:
ProductPurchases table:
+---------+------------+----------+
| user_id | product_id | quantity |
+---------+------------+----------+
| 1       | 101        | 2        |
| 1       | 102        | 1        |
| 1       | 103        | 3        |
| 2       | 101        | 1        |
| 2       | 102        | 5        |
| 2       | 104        | 1        |
| 3       | 101        | 2        |
| 3       | 103        | 1        |
| 3       | 105        | 4        |
| 4       | 101        | 1        |
| 4       | 102        | 1        |
| 4       | 103        | 2        |
| 4       | 104        | 3        |
| 5       | 102        | 2        |
| 5       | 104        | 1        |
+---------+------------+----------+
ProductInfo table:
+------------+-------------+-------+
| product_id | category    | price |
+------------+-------------+-------+
| 101        | Electronics | 100   |
| 102        | Books       | 20    |
| 103        | Clothing    | 35    |
| 104        | Kitchen     | 50    |
| 105        | Sports      | 75    |
+------------+-------------+-------+
Output:
+-------------+-------------+-------------------+-------------------+----------------+
| product1_id | product2_id | product1_category | product2_category | customer_count |
+-------------+-------------+-------------------+-------------------+----------------+
| 101         | 102         | Electronics       | Books             | 3              |
| 101         | 103         | Electronics       | Clothing          | 3              |
| 102         | 104         | Books             | Kitchen           | 3              |
+-------------+-------------+-------------------+-------------------+----------------+
Explanation:
- Product pair (101, 102): purchased by users 1, 2, and 4 (3 customers); 101 is Electronics, 102 is Books.
- Product pair (101, 103): purchased by users 1, 3, and 4 (3 customers); 101 is Electronics, 103 is Clothing.
- Product pair (102, 104): purchased by users 2, 4, and 5 (3 customers); 102 is Books, 104 is Kitchen.
The result is ordered by customer_count in descending order. For pairs with the same customer_count, they are ordered by product1_id and then product2_id in ascending order.
```

---

## 3. Key Insight

> Self-join the table on `user_id` to find all product pairs bought by the same customer, then count distinct customers per pair and filter for ≥ 3.

---

## 4. Approach: Self-Join + Aggregation ✅

```
SELECT p1.product_id AS product1,
       p2.product_id AS product2,
       COUNT(DISTINCT p1.user_id) AS customer_count
FROM ProductPurchases p1
JOIN ProductPurchases p2
  ON p1.user_id = p2.user_id
  AND p1.product_id < p2.product_id
GROUP BY p1.product_id, p2.product_id
HAVING COUNT(DISTINCT p1.user_id) >= 3
ORDER BY product1, product2;
```

---

## 5. Walkthrough

```
Self-join on user_id with p1.product_id < p2.product_id:

User 1: (A,B), (A,C), (B,C)
User 2: (A,B)
User 3: (A,B), (A,C), (B,C)
User 4: (A,C)

Group by pair:
  (A,B): users {1,2,3} → 3 ✅
  (A,C): users {1,3,4} → 3 ✅
  (B,C): users {1,3}   → 2 ✗

Result: [(A,B,3), (A,C,3)] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² / k) — self-join on user_id groups, k = number of users |
| **Space** | O(n) — intermediate join results |

---

## 7. Follow-Up Questions

### 7.1 How to optimize for large datasets?

Pre-filter users who bought fewer than 2 products (they can't contribute to any pair). Use indexing on `user_id`.

### 7.2 What if we want pairs with at least K common customers?

Replace `HAVING COUNT(...) >= 3` with `HAVING COUNT(...) >= K`.

### 7.3 How to handle duplicate purchases?

The `COUNT(DISTINCT p1.user_id)` already handles duplicates — each user is counted once per pair.

---

## 8. Key Takeaway

> **Self-join on the shared dimension** (user_id) with an ordering constraint (`p1 < p2`) to generate unique pairs, then aggregate and filter — this is the standard SQL pattern for "find co-occurring items."
