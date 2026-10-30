# 2891. Method Chaining

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/method-chaining](https://leetcode.com/problems/method-chaining)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

```
DataFrame animals
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| name        | object |
| species     | object |
| age         | int    |
| weight      | int    |
+-------------+--------+
```

Write a solution to list the names of animals that weigh **strictly more than** `100` kilograms.

Return the animals sorted by weight in **descending order**.

The result format is in the following example.

In Pandas, **method chaining** enables us to perform operations on a DataFrame without breaking up each operation into a separate line or creating multiple temporary variables.

Can you complete this task in just **one line** of code using method chaining?

---

## Examples

```
Example 1:
  Input:
  DataFrame animals:
  +----------+---------+-----+--------+
  | name     | species | age | weight |
  +----------+---------+-----+--------+
  | Tatiana  | Snake   | 98  | 464    |
  | Khaled   | Giraffe | 50  | 41     |
  | Alex     | Leopard | 6   | 328    |
  | Jonathan | Monkey  | 45  | 463    |
  | Stefan   | Bear    | 100 | 50     |
  | Tommy    | Panda   | 26  | 349    |
  +----------+---------+-----+--------+
  Output:
  +----------+
  | name     |
  +----------+
  | Tatiana  |
  | Jonathan |
  | Tommy    |
  | Alex     |
  +----------+
  Explanation:
  All animals weighing more than 100 should be included in the results table.
  Tatiana's weight is 464, Jonathan's weight is 463, Tommy's weight is 349, and Alex's weight is 328.
  The results should be sorted in descending order of weight.
```

---

## Key Insight

> Chain Pandas operations: filter → sort → select column. Each operation returns a DataFrame, enabling fluent chaining.

---

## Approach

```python
def findHeavyAnimals(animals: pd.DataFrame) -> pd.DataFrame:
    return (animals[animals['weight'] > 100]
            .sort_values('weight', ascending=False)
            [['name']])
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Filter + sort + select | **O(n log n)** | **O(n)** |

---

## Key Takeaway

> **Pandas method chaining** — filter with boolean indexing, sort with `sort_values`, select with column indexing. Each step returns a DataFrame for the next.

---
