# 1873. Calculate Special Bonus

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-special-bonus](https://leetcode.com/problems/calculate-special-bonus)
**Companies:** Google

---

## 1. Problem Description

Given an `Employees` table, calculate a bonus for each employee: salary if `employee_id` is odd AND name doesn't start with 'M', otherwise 0. *(SQL problem)*

---

## 2. Approach: CASE Expression — O(n) ✅

```sql
SELECT employee_id,
    CASE
        WHEN employee_id % 2 = 1 AND name NOT LIKE 'M%' THEN salary
        ELSE 0
    END AS bonus
FROM Employees
ORDER BY employee_id;
```

---

## Key Takeaway

> Combine modulo check for odd ID with `NOT LIKE` for name filtering in a single CASE expression.
