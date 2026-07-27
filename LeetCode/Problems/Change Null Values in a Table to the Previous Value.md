# 2388. Change Null Values in a Table to the Previous Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-null-values-in-a-table-to-the-previous-value](https://leetcode.com/problems/change-null-values-in-a-table-to-the-previous-value)
**Companies:** Deloitte

---

## 1. Problem Description

**SQL Problem.** Given a table with some NULL values, replace each NULL with the most recent non-NULL value from previous rows (forward fill).

---

## 2. Approach: Window Function ✅

```sql
SELECT id, drink,
       COALESCE(drink,
           LAG(drink) IGNORE NULLS OVER (ORDER BY id)
       ) AS drink
FROM CoffeeShop;
```

Alternative (MySQL without IGNORE NULLS):
```sql
SELECT id,
       @val := COALESCE(drink, @val) AS drink
FROM CoffeeShop, (SELECT @val := NULL) init
ORDER BY id;
```

---

## Key Takeaway

> Forward-fill NULLs uses `LAG ... IGNORE NULLS` in databases that support it (Oracle, SQL Server). In MySQL, use session variables (`@val`) for a running non-null tracker.
