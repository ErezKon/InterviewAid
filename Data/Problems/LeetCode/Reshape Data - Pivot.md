# 2889. Reshape Data: Pivot

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-pivot](https://leetcode.com/problems/reshape-data-pivot)
**Companies:** Amazon, Meta

---

## Problem Description

Given a DataFrame `weather` with columns `city`, `month`, `temperature`, **pivot** it so each city is a row, each month is a column, and values are temperatures.

---

## Examples

| Input DataFrame | Output DataFrame |
|---|---|
| `city`, `month`, `temperature` rows | `city` rows, `month` columns |
| `('NY', 'Jan', 30)` | `NY` row with `Jan` column = 30 |
| `('NY', 'Feb', 28)` | `NY` row with `Feb` column = 28 |
| `('LA', 'Jan', 60)` | `LA` row with `Jan` column = 60 |

*Explanation:* Each unique `city` becomes a row, each `month` becomes a column, and the intersecting cell holds the temperature.

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
