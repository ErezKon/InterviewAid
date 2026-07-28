# 2388. Change Null Values in a Table to the Previous Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-null-values-in-a-table-to-the-previous-value](https://leetcode.com/problems/change-null-values-in-a-table-to-the-previous-value)
**Companies:** Deloitte

---

## 1. Problem Description

**SQL Problem.** Given a table with some NULL values, replace each NULL with the most recent non-NULL value from previous rows (forward fill).

---

## Examples

| id | drink |
|----|-------|
| 1  | "coffee" |
| 2  | NULL |
| 3  | "tea" |
| 4  | NULL |
| 5  | NULL |

**Output** (after forward‑fill):

| id | drink |
|----|-------|
| 1  | "coffee" |
| 2  | "coffee" |
| 3  | "tea" |
| 4  | "tea" |
| 5  | "tea" |

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

## Walkthrough

1. **Row 1** – `drink` is "coffee", no change.
2. **Row 2** – `drink` is NULL, `LAG … IGNORE NULLS` returns "coffee" from row 1, so it becomes "coffee".
3. **Row 3** – `drink` is "tea", stays "tea".
4. **Row 4** – NULL, previous non‑NULL is "tea" (row 3), becomes "tea".
5. **Row 5** – NULL, previous non‑NULL is still "tea", becomes "tea".

The MySQL version uses a session variable `@val` that carries forward the last non‑NULL value for each row in order.

---

## Complexity Analysis

- **Time:** O(n) – each row is processed once by the window function or the variable scan.
- **Space:** O(1) additional space beyond the result set.

---

## Follow‑Up Questions

- How would you handle backward‑fill (replace NULL with next non‑NULL value)?
- Can you perform the forward‑fill without ordering by a single column?
- How would you adapt the solution for a large dataset that cannot fit in memory?

---

## Key Takeaway

> Forward‑fill NULLs uses `LAG … IGNORE NULLS` in databases that support it (Oracle, SQL Server). In MySQL, use session variables (`@val`) for a running non‑null tracker.
