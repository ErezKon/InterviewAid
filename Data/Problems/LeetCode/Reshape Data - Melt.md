# 2890. Reshape Data: Melt

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-melt](https://leetcode.com/problems/reshape-data-melt)
**Companies:** Amazon, Bloomberg

---

## Problem Description

```
DataFrame `report`
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| product     | object |
| quarter_1   | int    |
| quarter_2   | int    |
| quarter_3   | int    |
| quarter_4   | int    |
+-------------+--------+
```

Write a solution to **reshape** the data so that each row represents sales data for a product in a specific quarter.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
+-------------+-----------+-----------+-----------+-----------+
| product     | quarter_1 | quarter_2 | quarter_3 | quarter_4 |
+-------------+-----------+-----------+-----------+-----------+
| Umbrella    | 417       | 224       | 379       | 611       |
| SleepingBag | 800       | 936       | 93        | 875       |
+-------------+-----------+-----------+-----------+-----------+
Output:
+-------------+-----------+-------+
| product     | quarter   | sales |
+-------------+-----------+-------+
| Umbrella    | quarter_1 | 417   |
| SleepingBag | quarter_1 | 800   |
| Umbrella    | quarter_2 | 224   |
| SleepingBag | quarter_2 | 936   |
| Umbrella    | quarter_3 | 379   |
| SleepingBag | quarter_3 | 93    |
| Umbrella    | quarter_4 | 611   |
| SleepingBag | quarter_4 | 875   |
+-------------+-----------+-------+
Explanation:
The DataFrame is reshaped from wide to long format. Each row represents the sales of a product in a quarter.
```

---

## Approach

```text
FUNCTION meltTable(report):
    // Use pandas melt to unpivot the wide table
    RETURN pd.melt(report, id_vars=['product'], var_name='quarter', value_name='sales')
```

---

## Walkthrough

1. Identify columns that stay fixed (`product`).
2. Call `pd.melt` with `id_vars=['product']`.
3. `var_name='quarter'` creates a new column containing the original quarter column names.
4. `value_name='sales'` stores the corresponding sales numbers.
5. The function returns the transformed long‑format DataFrame.

---

## Complexity Analysis

- **Time:** O(N) – each cell is visited once during the melt operation.
- **Space:** O(N) – the output DataFrame stores the same number of values as the input.

---

## Follow-Up Questions

- How would you handle missing sales values during the melt?
- How can you perform the inverse operation (pivot) to restore the original shape?
- What if the DataFrame contains additional identifier columns?

---

## Key Takeaway

> `pd.melt()` transforms wide‑format data to long‑format — the inverse of `pivot`. Specify `id_vars` for columns to keep, and the remaining columns become rows.
