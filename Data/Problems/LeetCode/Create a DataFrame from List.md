# 2877. Create a DataFrame from List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-a-dataframe-from-list](https://leetcode.com/problems/create-a-dataframe-from-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Create a pandas DataFrame from a 2D list of `[student_id, age]` pairs with appropriate column names.

---

## Examples

**Example 1:**
```
Input: student_data = [[101, 20], [102, 22], [103, 19]]
Output: DataFrame with columns 'student_id' and 'age' and rows:
   student_id  age
0        101   20
1        102   22
2        103   19
```

**Example 2:**
```
Input: student_data = []
Output: Empty DataFrame with columns 'student_id' and 'age'
```

---

## Approach

```text
FUNCTION createDataframe(student_data):
    // Use pandas constructor with column names
    RETURN pd.DataFrame(student_data, columns=['student_id', 'age'])
```

---

## Walkthrough

**Using Example 1:**
1. Receive list `[[101,20],[102,22],[103,19]]`.
2. Call `pd.DataFrame` with this list and column list `['student_id','age']`.
3. Pandas creates a table where each inner list becomes a row and column names are assigned.
4. The resulting DataFrame is returned.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n is number of rows (list length) |
| **Space** | O(n) for storing the DataFrame rows |

---

## Follow-Up Questions

- How would you handle missing values or additional columns in the input list?
- Can you create the DataFrame from a list of dictionaries instead of a list of lists?
- How would you set a specific column as the index of the DataFrame?

---

## Key Takeaway

> **`pd.DataFrame(data, columns=...)` creates a DataFrame from a 2D list with named columns. Basic pandas constructor usage.**