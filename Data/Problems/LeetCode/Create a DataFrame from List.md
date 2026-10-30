# 2877. Create a DataFrame from List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-a-dataframe-from-list](https://leetcode.com/problems/create-a-dataframe-from-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Write a solution to **create** a DataFrame from a 2D list called `student_data`. This 2D list contains the IDs and ages of some students.

The DataFrame should have two columns, `student_id` and `age`, and be in the same order as the original 2D list.

The result format is in the following example.

---

## Examples

**Example 1:**
```
Input:
student_data:
[
  [1, 15],
  [2, 11],
  [3, 11],
  [4, 20]
]
Output:
+------------+-----+
| student_id | age |
+------------+-----+
| 1          | 15  |
| 2          | 11  |
| 3          | 11  |
| 4          | 20  |
+------------+-----+
Explanation:
A DataFrame was created on top of student_data, with two columns named student_id and age.
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