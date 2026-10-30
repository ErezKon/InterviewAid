# 2889. Reshape Data: Pivot

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-pivot](https://leetcode.com/problems/reshape-data-pivot)
**Companies:** Amazon, Meta

---

## Problem Description

```
DataFrame `weather`
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| city        | object |
| month       | object |
| temperature | int    |
+-------------+--------+
```

Write a solution to **pivot** the data so that each row represents temperatures for a specific month, and each city is a separate column.

The result format is in the following example.

```

---

## Examples

**Example 1:**
```
Input:
+--------------+----------+-------------+
| city         | month    | temperature |
+--------------+----------+-------------+
| Jacksonville | January  | 13          |
| Jacksonville | February | 23          |
| Jacksonville | March    | 38          |
| Jacksonville | April    | 5           |
| Jacksonville | May      | 34          |
| ElPaso       | January  | 20          |
| ElPaso       | February | 6           |
| ElPaso       | March    | 26          |
| ElPaso       | April    | 2           |
| ElPaso       | May      | 43          |
+--------------+----------+-------------+
Output:
+----------+--------+--------------+
| month    | ElPaso | Jacksonville |
+----------+--------+--------------+
| April    | 2      | 5            |
| February | 6      | 23           |
| January  | 20     | 13           |
| March    | 26     | 38           |
| May      | 43     | 34           |
+----------+--------+--------------+
Explanation:
The table is pivoted, each column represents a city, and each row represents a specific month.
```

---

## Approach

```text
FUNCTION pivotTable(weather):
    // Use pandas pivot to reshape long to wide format
    RETURN pd.pivot(weather, index='city', columns='month', values='temperature')
```

---

## Walkthrough

1. Identify the identifier column (`city`) that will become rows.
2. Identify the column (`month`) that will become new column headers.
3. Use `pd.pivot` with `index='city'`, `columns='month'`, `values='temperature'`.
4. The function returns a DataFrame where each city has a column for each month containing the temperature.

---

## Complexity Analysis

- **Time:** O(N) – each row is processed once during the pivot.
- **Space:** O(N) – the output DataFrame stores the same number of values as the input.

---

## Key Takeaway

> `DataFrame.pivot()` reshapes long‑format to wide‑format — specify `index` (rows), `columns` (new columns), and `values` (cell data). The inverse of `melt`.
