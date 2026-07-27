# 2886. Change Data Type

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/change-data-type](https://leetcode.com/problems/change-data-type)
**Companies:** Google

---

## 1. Problem Description

**Pandas Problem.** Change the data type of a column (e.g., `grade` column to integer) in a DataFrame.

---

## 2. Approach: Pandas astype ✅

```python
import pandas as pd

def changeDatatype(students: pd.DataFrame) -> pd.DataFrame:
    students['grade'] = students['grade'].astype(int)
    return students
```

---

## Key Takeaway

> `df['col'].astype(type)` is the standard Pandas way to cast column types. Common types: `int`, `float`, `str`, `bool`.
