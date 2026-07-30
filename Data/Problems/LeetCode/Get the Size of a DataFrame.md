# 2878. Get the Size of a DataFrame

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/get-the-size-of-a-dataframe](https://leetcode.com/problems/get-the-size-of-a-dataframe)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: DataFrame.shape ✅](#3-approach-dataframeshape-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Return the number of rows and columns of a pandas DataFrame as a list `[rows, columns]`.

---

## 2. Examples

| DataFrame `df` | Output |
|----------------|--------|
| `pd.DataFrame({"a":[1,2,3], "b":[4,5,6]})` | `[3, 2]` |
| `pd.DataFrame(columns=["x","y","z"])` | `[0, 3]` |

---

## 3. Approach: DataFrame.shape ✅

```text
FUNCTION getDataframeSize(df):
    // df.shape returns (rows, columns)
    rows, cols ← df.shape
    RETURN [rows, cols]
```

---

## 4. Walkthrough

1. Call `df.shape` → returns a tuple `(rows, cols)`.
2. Unpack the tuple into `rows` and `cols`.
3. Convert the tuple to a list and return.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) – direct attribute access |
| **Space** | O(1) – only a small list is created |

---

## 6. Follow-Up Questions

* How would you retrieve the size of a DataFrame without using `.shape`?
* How can you get the total number of elements (rows × columns) efficiently?

---

## 7. Key Takeaway

> `df.shape` provides the dimensions of a DataFrame in constant time; simply return them as a list.
