# 570. Managers with at Least 5 Direct Reports

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/managers-with-at-least-5-direct-reports](https://leetcode.com/problems/managers-with-at-least-5-direct-reports)
**Companies:** Amazon, Bloomberg, Deloitte, Google, Meta, Microsoft, Tcs, Zs Associates

---

## 1. Problem Description (SQL)

Find managers who have at least 5 employees reporting directly to them.

---

## 2. Approach: SQL — Self-Join + GROUP BY ✅

```sql
SELECT e.name
FROM Employee e
JOIN (
    SELECT managerId
    FROM Employee
    WHERE managerId IS NOT NULL
    GROUP BY managerId
    HAVING COUNT(*) >= 5
) m ON e.id = m.managerId;
```

---

## 3. Key Takeaway

> Group by managerId, filter with HAVING ≥ 5, then join back to get the manager's name.
