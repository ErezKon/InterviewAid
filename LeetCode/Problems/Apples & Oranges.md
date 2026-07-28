# 1445. Apples & Oranges

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/apples-oranges](https://leetcode.com/problems/apples-oranges)
**Companies:** Meta

---

## 1. Problem Description

Given a `Sales` table with `sale_date`, `fruit` (`'apples'` or `'oranges'`), and `sold_num`, report the difference (apples - oranges) sold on each date. *(SQL problem)*

---

## 2. Approach: Conditional Aggregation — O(n) ✅

```sql
SELECT sale_date,
       SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date
ORDER BY sale_date;
```

---

## 3. Examples

**Example 1:**
```
Sales Table:
+------------+--------+----------+
| sale_date  | fruit  | sold_num |
+------------+--------+----------+
| 2023-01-01 | apples | 10       |
| 2023-01-01 | oranges| 4        |
| 2023-01-02 | apples | 5        |
| 2023-01-02 | oranges| 7        |
+------------+--------+----------+
```
Result:
```
+------------+------+
| sale_date  | diff |
+------------+------+
| 2023-01-01 | 6    |
| 2023-01-02 | -2   |
+------------+------+
```
Explanation: On 2023‑01‑01, 10‑4 = 6 more apples; on 2023‑01‑02, 5‑7 = -2 (more oranges).

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Group rows by `sale_date`.
| 2 | For each row, emit `sold_num` if `fruit='apples'`, otherwise `-sold_num`.
| 3 | Sum the emitted values per date to get the net difference.
| 4 | Order the result by `sale_date` for readability.

---

## 5. Complexity Analysis

- **Time:** O(N) where N is the number of rows in `Sales` (single scan).
- **Space:** O(D) for storing aggregates per distinct date D.

---

## Key Takeaway

> Use `CASE` inside `SUM` to pivot two categories into a single aggregated difference per group.
