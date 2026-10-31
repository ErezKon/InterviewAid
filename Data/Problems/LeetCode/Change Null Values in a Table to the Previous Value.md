# 2388. Change Null Values in a Table to the Previous Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/change-null-values-in-a-table-to-the-previous-value](https://leetcode.com/problems/change-null-values-in-a-table-to-the-previous-value)
**Companies:** Deloitte

---

## 1. Problem Description

Table: `CoffeeShop`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| drink       | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row in this table shows the order id and the name of the drink ordered. Some drink rows are nulls.
```

Write a solution to replace the `null` values of the drink with the name of the drink of the previous row that is not `null`. It is guaranteed that the drink on the first row of the table is not `null`.

Return the result table **in the same order as the input**.

The result format is shown in the following example.

---

## Examples

```
Example 1:
  Input:
  CoffeeShop table:
  +----+-------------------+
  | id | drink             |
  +----+-------------------+
  | 9  | Rum and Coke      |
  | 6  | null              |
  | 7  | null              |
  | 3  | St Germain Spritz |
  | 1  | Orange Margarita  |
  | 2  | null              |
  +----+-------------------+
  Output:
  +----+-------------------+
  | id | drink             |
  +----+-------------------+
  | 9  | Rum and Coke      |
  | 6  | Rum and Coke      |
  | 7  | Rum and Coke      |
  | 3  | St Germain Spritz |
  | 1  | Orange Margarita  |
  | 2  | Orange Margarita  |
  +----+-------------------+
  Explanation:
  For ID 6, the previous value that is not null is from ID 9. We replace the null with "Rum and Coke".
  For ID 7, the previous value that is not null is from ID 9. We replace the null with "Rum and Coke".
  For ID 2, the previous value that is not null is from ID 1. We replace the null with "Orange Margarita".
  Note that the rows in the output are the same as in the input.
```

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
2. **Row 2** – `drink` is NULL, `LAG … IGNORE NULLS` returns "coffee" from row 1, so it becomes "coffee".
3. **Row 3** – `drink` is "tea", stays "tea".
4. **Row 4** – NULL, previous non-NULL is "tea" (row 3), becomes "tea".
5. **Row 5** – NULL, previous non-NULL is still "tea", becomes "tea".

The MySQL version uses a session variable `@val` that carries forward the last non-NULL value for each row in order.

---

## Complexity Analysis

- **Time:** O(n) – each row is processed once by the window function or the variable scan.
- **Space:** O(1) additional space beyond the result set.

---

## Follow-Up Questions

- How would you handle backward-fill (replace NULL with next non-NULL value)?
- Can you perform the forward-fill without ordering by a single column?
- How would you adapt the solution for a large dataset that cannot fit in memory?

---

## Key Takeaway

> Forward-fill NULLs uses `LAG … IGNORE NULLS` in databases that support it (Oracle, SQL Server). In MySQL, use session variables (`@val`) for a running non-null tracker.
