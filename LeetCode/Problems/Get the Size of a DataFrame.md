# 2878. Get the Size of a DataFrame

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/get-the-size-of-a-dataframe](https://leetcode.com/problems/get-the-size-of-a-dataframe)
**Companies:** Google

---

## 1. Problem Description

Return the number of rows and columns of a DataFrame as a list `[rows, columns]`. (Pandas problem)

## 2. Approach: DataFrame.shape ✅

```python
def getDataframeSize(players: pd.DataFrame) -> List[int]:
    return list(players.shape)
```

## Key Takeaway

> `df.shape` returns `(rows, cols)` tuple. Convert to list.
