# 1821. Find Customers With Positive Revenue this Year

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-customers-with-positive-revenue-this-year](https://leetcode.com/problems/find-customers-with-positive-revenue-this-year)
**Companies:** Google

---

## Problem Description

Find customers with positive revenue in 2021.

---

## Approach: SQL Filter ✅

```sql
SELECT customer_id FROM Customers WHERE year = 2021 AND revenue > 0;
```

---

## Key Takeaway

> **Simple WHERE filter on year and positive revenue.**
