# 631. Design Excel Sum Formula

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-excel-sum-formula](https://leetcode.com/problems/design-excel-sum-formula)
**Companies:** Airbnb, Amazon, Citadel, Google, Microsoft, Openai, Ramp 2, Rippling, Waymo

---

## Problem Description

Design an Excel-like system where cells can hold values or sum formulas referencing other cells/ranges. Setting a cell clears its formula.

---

## Key Insight

Formulas can reference other formulas transitively. Use lazy recursive evaluation via `get()` or eager topological recalculation.

---

## Approach: Topological Recalculation ✅

```
CLASS Excel:
    CONSTRUCTOR(height, width):
        grid = height × width of zeros
        formulas = {}    // (r, c) → list of (r, c) references

    FUNCTION set(row, col, val):
        grid[row][col] = val
        formulas.remove((row, col))    // clear any formula

    FUNCTION get(row, col):
        IF (row, col) IN formulas:
            return SUM(get(r, c) for (r, c) in formulas[(row, col)])
        RETURN grid[row][col]

    FUNCTION sum(row, col, numbers):
        // Parse cell references and ranges
        refs = parse(numbers)
        formulas[(row, col)] = refs
        RETURN get(row, col)
```

---

## Key Takeaway

> **Cell dependency graph: `set` clears formulas, `sum` creates formula dependencies, `get` recursively evaluates. For performance, use topological sort for eager propagation.**
