# 2987. Find Expensive Cities

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-expensive-cities](https://leetcode.com/problems/find-expensive-cities)
**Companies:** Google

---

## Problem Description

Find cities where the average home price exceeds the national average.

---

## Approach: SQL Subquery ✅

```sql
SELECT city
FROM listings
GROUP BY city
HAVING AVG(price) > (SELECT AVG(price) FROM listings)
ORDER BY city;
```

---

## Key Takeaway

> **Compare group average to global average using a subquery in HAVING clause.**
