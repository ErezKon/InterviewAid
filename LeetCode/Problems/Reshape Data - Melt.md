# 2890. Reshape Data: Melt

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-melt](https://leetcode.com/problems/reshape-data-melt)
**Companies:** Amazon, Bloomberg

---

## Problem Description

Given a DataFrame with columns `product`, `quarter_1`, `quarter_2`, `quarter_3`, `quarter_4`, **unpivot** (melt) it so each row represents sales for one product in one quarter.

---

## Approach

```python
import pandas as pd

def meltTable(report: pd.DataFrame) -> pd.DataFrame:
    return pd.melt(report, id_vars=['product'], var_name='quarter', value_name='sales')
```

---

## Key Takeaway

> `pd.melt()` transforms wide-format data to long-format — the inverse of `pivot`. Specify `id_vars` for columns to keep, and the remaining columns become rows.
