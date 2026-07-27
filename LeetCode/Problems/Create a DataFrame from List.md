# 2877. Create a DataFrame from List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-a-dataframe-from-list](https://leetcode.com/problems/create-a-dataframe-from-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Create a pandas DataFrame from a 2D list of `[student_id, age]` pairs with appropriate column names.

---

## Approach

```python
import pandas as pd

def createDataframe(student_data):
    return pd.DataFrame(student_data, columns=['student_id', 'age'])
```

---

## Key Takeaway

> **`pd.DataFrame(data, columns=...)` creates a DataFrame from a 2D list with named columns. Basic pandas constructor usage.**
