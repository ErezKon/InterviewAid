# 1821. Find Customers With Positive Revenue this Year

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-customers-with-positive-revenue-this-year](https://leetcode.com/problems/find-customers-with-positive-revenue-this-year)
**Companies:** Google

---

## Problem Description

Find customers with positive revenue in 2021.

---

## Examples

| customers | year | revenue | Expected |
|-----------|------|---------|----------|
| [{"id":1,"revenue":100},{"id":2,"revenue":0}] | 2021 | — | [1] |
| [{"id":3,"revenue":-50}] | 2021 | — | [] |

---

## Approach: SQL Filter ✅

```sql
SELECT customer_id FROM Customers WHERE year = 2021 AND revenue > 0;
```

---

## Walkthrough

1. The `Customers` table contains rows with `customer_id`, `year`, and `revenue`.
2. The `WHERE` clause filters rows where `year = 2021` and `revenue > 0`.
3. The query returns the `customer_id` of matching rows, e.g., for the first example it returns `1`.

---

## Complexity Analysis

- **Time:** O(N) – each row is examined once by the database engine.
- **Space:** O(1) additional space beyond the input table.

---

## Follow-Up Questions

- How would you modify the query to find customers with revenue above a given threshold?
- How to handle multiple years in a single query?

---

## Key Takeaway

> **Simple WHERE filter on year and positive revenue.**