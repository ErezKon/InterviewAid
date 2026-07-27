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

Given a DataFrame `animals` with columns `name`, `species`, `age`, `weight`, list the names of animals that weigh **strictly more than 100**, sorted by `weight` in **descending** order. Use Pandas method chaining.

---

## Examples

**Example:**
```
Input:
| name     | species | age | weight |
|----------|---------|-----|--------|
| Tatiana  | Snake   | 98  | 464    |
| Reli     | Parrot  | 26  | 100    |
| Felix    | Cat     | 34  | 673    |
| Jonas    | Dog     | 2   | 237    |

Output:
| name   |
|--------|
| Felix  |
| Tatiana|
| Jonas  |
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
