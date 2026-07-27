# 2887. Fill Missing Data

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fill-missing-data](https://leetcode.com/problems/fill-missing-data)
**Companies:** Acko, Google

---

## Problem Description

Given a DataFrame `products` with columns `name` and `quantity`, fill missing values in `quantity` with `0`.

---

## Approach: Pandas fillna ✅

```python
import pandas as pd

def fillMissingValues(products: pd.DataFrame) -> pd.DataFrame:
    products['quantity'] = products['quantity'].fillna(0)
    return products
```

---

## Key Takeaway

> **`fillna(value)` is the standard Pandas method for replacing NaN/null values. Simple and idiomatic.**
