# 2886. Change Data Type

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/change-data-type](https://leetcode.com/problems/change-data-type)
**Companies:** Google

---

## 1. Problem Description

Given a Pandas DataFrame `students` with a column `grade` stored as strings, convert the `grade` column to integer type and return the updated DataFrame.

---

## 2. Examples

**Example 1:**
```
Input:
students = pd.DataFrame({"name": ["Alice", "Bob"], "grade": ["85", "90"]})

Output:
   name  grade
0  Alice    85
1    Bob    90
```
The `grade` column is now of integer dtype.

---

## 3. Approach: Pandas `astype` ✅

```text
FUNCTION changeDatatype(students):
    // Cast the 'grade' column to integer
    students["grade"] ← students["grade"].astype(int)
    RETURN students
```

---

## 4. Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Receive DataFrame with `grade` as strings | `students['grade']` = ["85", "90"] |
| 2 | Apply `.astype(int)` to the column | `students['grade']` = [85, 90] (int dtype) |
| 3 | Return the modified DataFrame | DataFrame with integer grades |

---

## 5. Complexity Analysis

- **Time:** O(n) where n is the number of rows, due to casting each element.
- **Space:** O(1) extra space (in‑place modification).

---

## 6. Follow-Up Questions

- How would you handle conversion errors if some grades are non‑numeric?
- Can you cast multiple columns to different types in a single operation?

---

## Key Takeaway

> Use `df['col'].astype(target_type)` to efficiently change a column’s datatype in Pandas.
