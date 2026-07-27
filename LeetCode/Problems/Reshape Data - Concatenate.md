# 2888. Reshape Data: Concatenate

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-concatenate](https://leetcode.com/problems/reshape-data-concatenate)
**Companies:** Google

---

## Problem Description

Given two DataFrames `df1` and `df2` with the same columns, write a solution to concatenate them **vertically** into one DataFrame.

---

## Approach

```python
import pandas as pd

def concatenateTables(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    return pd.concat([df1, df2], ignore_index=True)
```

---

## Key Takeaway

> `pd.concat()` with `ignore_index=True` stacks DataFrames vertically and resets the index — the fundamental pandas operation for combining datasets with identical schemas.
