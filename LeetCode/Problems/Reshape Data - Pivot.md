# 2889. Reshape Data: Pivot

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-pivot](https://leetcode.com/problems/reshape-data-pivot)
**Companies:** Amazon, Meta

---

## Problem Description

Given a DataFrame `weather` with columns `city`, `month`, `temperature`, **pivot** it so each city is a row, each month is a column, and values are temperatures.

---

## Approach

```python
import pandas as pd

def pivotTable(weather: pd.DataFrame) -> pd.DataFrame:
    return weather.pivot(index='city', columns='month', values='temperature')
```

---

## Key Takeaway

> `DataFrame.pivot()` reshapes long-format to wide-format — specify `index` (rows), `columns` (new columns), and `values` (cell data). The inverse of `melt`.
