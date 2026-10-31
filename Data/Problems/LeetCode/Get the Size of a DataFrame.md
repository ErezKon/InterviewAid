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

DataFrame `players`:

```
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| player_id   | int    |
| name        | object |
| age         | int    |
| position    | object |
| ...         | ...    |
+-------------+--------+
```

Write a solution to calculate and display the **number of rows and columns** of `players`.

Return the result as an array:

`[number of rows, number of columns]`

The result format is in the following example.

---

## 2. Examples

```
Example 1:
  Input:
  +-----------+----------+-----+-------------+--------------------+
  | player_id | name     | age | position    | team               |
  +-----------+----------+-----+-------------+--------------------+
  | 846       | Mason    | 21  | Forward     | RealMadrid         |
  | 749       | Riley    | 30  | Winger      | Barcelona          |
  | 155       | Bob      | 28  | Striker     | ManchesterUnited   |
  | 583       | Isabella | 32  | Goalkeeper  | Liverpool          |
  | 388       | Zachary  | 24  | Midfielder  | BayernMunich       |
  | 883       | Ava      | 23  | Defender    | Chelsea            |
  | 355       | Violet   | 18  | Striker     | Juventus           |
  | 247       | Thomas   | 27  | Striker     | ParisSaint-Germain |
  | 761       | Jack     | 33  | Midfielder  | ManchesterCity     |
  | 642       | Charlie  | 36  | Center-back | Arsenal            |
  +-----------+----------+-----+-------------+--------------------+
  Output:
  [10, 5]
  Explanation:
  This DataFrame contains 10 rows and 5 columns.
```

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
* How can you get the total number of elements (rows × columns) efficiently?

---

## 7. Key Takeaway

> `df.shape` provides the dimensions of a DataFrame in constant time; simply return them as a list.
