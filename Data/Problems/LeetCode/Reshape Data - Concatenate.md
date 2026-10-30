# 2888. Reshape Data: Concatenate

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reshape-data-concatenate](https://leetcode.com/problems/reshape-data-concatenate)
**Companies:** Google

---

## 1. Problem Description

```
DataFrame `df1`
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| student_id  | int    |
| name        | object |
| age         | int    |
+-------------+--------+

DataFrame `df2`
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| student_id  | int    |
| name        | object |
| age         | int    |
+-------------+--------+
```

Write a solution to concatenate these two DataFrames **vertically** into one DataFrame.

The result format is in the following example.

---

## 2. Approach

```text
FUNCTION concatenateTables(df1, df2):
    // Use pandas concatenation to stack rows
    SET result ← pd.concat([df1, df2], ignore_index = TRUE)
    RETURN result
```

---

## 3. Examples

**Example 1:**
```
Input:
df1
+------------+---------+-----+
| student_id | name    | age |
+------------+---------+-----+
| 1          | Mason   | 8   |
| 2          | Ava     | 6   |
| 3          | Taylor  | 15  |
| 4          | Georgia | 17  |
+------------+---------+-----+
df2
+------------+------+-----+
| student_id | name | age |
+------------+------+-----+
| 5          | Leo  | 7   |
| 6          | Alex | 7   |
+------------+------+-----+
Output:
+------------+---------+-----+
| student_id | name    | age |
+------------+---------+-----+
| 1          | Mason   | 8   |
| 2          | Ava     | 6   |
| 3          | Taylor  | 15  |
| 4          | Georgia | 17  |
| 5          | Leo     | 7   |
| 6          | Alex    | 7   |
+------------+---------+-----+
Explanation:
The two DataFramess are stacked vertically, and their rows are combined.
```

---

## 4. Walkthrough

1. **Input DataFrames**:
   - `df1` contains rows `[[1, 'A'], [2, 'B']]`.
   - `df2` contains row `[[3, 'C']]`.
2. Call `concatenateTables(df1, df2)`.
3. `pd.concat` stacks the rows from `df2` below those of `df1` and resets the index because `ignore_index` is `TRUE`.
4. The resulting DataFrame has three rows: `[[1, 'A'], [2, 'B'], [3, 'C']]`.

---

## 5. Complexity Analysis

- **Time:** `O(m + n)` where `m` and `n` are the number of rows in `df1` and `df2` respectively, as each row is visited once during concatenation.
- **Space:** `O(m + n)` for the new DataFrame that holds all rows.

---

## 6. Follow-Up Questions

- How would you concatenate DataFrames horizontally (adding columns) instead of vertically?
- What if the two DataFrames have mismatched column orders or missing columns?
- How can you concatenate a large number of DataFrames efficiently without excessive memory overhead?

---

## Key Takeaway

> `pd.concat([...], ignore_index=True)` is the idiomatic pandas operation to vertically stack DataFrames with identical schemas while resetting the index.
