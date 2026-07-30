# 2887. Fill Missing Data

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fill-missing-data](https://leetcode.com/problems/fill-missing-data)
**Companies:** Acko, Google

---

## Problem Description

Given a Pandas `DataFrame` named `products` with columns `name` (string) and `quantity` (numeric, may contain missing values), replace every missing entry in the `quantity` column with `0` and return the updated DataFrame.

---

## Examples

| Input `products` DataFrame | Output `products` DataFrame |
|----------------------------|----------------------------|
| `name: ["A","B","C"]`<br>`quantity: [5, NaN, 2]` | `name: ["A","B","C"]`<br>`quantity: [5, 0, 2]` |
| `name: ["X","Y"]`<br>`quantity: [NaN, NaN]` | `name: ["X","Y"]`<br>`quantity: [0, 0]` |

---

## Approach: Pandas `fillna` — O(n) ✅

```text
FUNCTION fillMissingValues(products):
    // Replace NaN in 'quantity' column with 0
    products['quantity'] = products['quantity'].FILLNA(0)
    RETURN products
```

The `FILLNA` method operates column‑wise and runs in linear time relative to the number of rows.

---

## Walkthrough

1. Receive `products` DataFrame.
2. Call `FILLNA(0)` on the `quantity` column; Pandas internally iterates over each row, substituting `0` for any `NaN`.
3. Return the modified DataFrame, now containing no missing values in `quantity`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n) — one pass over all rows |
| Space  | O(1) additional — operation is in‑place |

---

## Follow-Up Questions

- How would you handle filling missing values with the column mean or median instead of a constant?
- If the DataFrame is too large to fit in memory, how could you perform the fill operation efficiently?
- Can you generalize the solution to fill missing values in multiple columns with different default values?

---

## Key Takeaway

> **`fillna(value)` is the idiomatic Pandas method for replacing missing values; it provides a concise, O(n) solution without manual iteration.**