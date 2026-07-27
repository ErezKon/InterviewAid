# 1173. Immediate Food Delivery I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/immediate-food-delivery-i](https://leetcode.com/problems/immediate-food-delivery-i)
**Companies:** Doordash

---

## 1. Problem Description

Find the percentage of orders where the delivery date equals the order date (immediate delivery). (SQL problem)

## 2. Approach: Conditional Aggregation ✅

```sql
SELECT ROUND(
    100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END)
    / COUNT(*), 2
) AS immediate_percentage
FROM Delivery;
```

## Key Takeaway

> Simple percentage calculation: count immediate orders / total orders × 100.
