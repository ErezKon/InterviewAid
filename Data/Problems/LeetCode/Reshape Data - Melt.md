# 2890. Reshape Data: Melt

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-melt](https://leetcode.com/problems/reshape-data-melt)
**Companies:** Amazon, Bloomberg

---

## Problem Description

Given a DataFrame with columns `product`, `quarter_1`, `quarter_2`, `quarter_3`, `quarter_4`, **unpivot** (melt) it so each row represents sales for one product in one quarter.

---

## Examples

| Input DataFrame | Output DataFrame |
|---|---|
| `product` | `product` |
| `quarter_1` | `quarter` |
| `quarter_2` | `sales` |
| `quarter_3` | `...` |
| `quarter_4` | `...` |

*Explanation:* The first example shows how each quarter column becomes a separate row with the quarter name and sales value.

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
