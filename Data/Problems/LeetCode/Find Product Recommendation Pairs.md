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

Given a `ProductPurchases` table with `user_id` and `product_id`, find all **pairs of products** `(p1, p2)` where `p1 < p2` that were purchased by at least **3 common customers**. For each pair, count how many customers bought both.

Order by `product1`, then `product2`.

---

## 2. Examples

```
Input:
ProductPurchases:
| user_id | product_id |
|---------|-----------|
| 1       | A         |
| 1       | B         |
| 1       | C         |
| 2       | A         |
| 2       | B         |
| 3       | A         |
| 3       | B         |
| 3       | C         |
| 4       | A         |
| 4       | C         |

Output:
| product1 | product2 | customer_count |
|----------|----------|----------------|
| A        | B        | 3              |
| A        | C        | 3              |

Explanation:
  A & B bought by users 1, 2, 3 → 3 common
  A & C bought by users 1, 3, 4 → 3 common
  B & C bought by users 1, 3    → only 2 (excluded)
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
