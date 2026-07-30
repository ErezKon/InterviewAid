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

```text
CLASS Excel:
    CONSTRUCTOR(height, width):
        grid = height × width of zeros
        formulas = {}    // (r, c) → list of (r, c) references

    FUNCTION set(row, col, val):
        grid[row][col] = val
        formulas.remove((row, col))    // clear any formula

    FUNCTION get(row, col):
        IF (row, col) IN formulas:
            RETURN SUM(get(r, c) for (r, c) in formulas[(row, col)])
        RETURN grid[row][col]

    FUNCTION sum(row, col, numbers):
        // Parse cell references and ranges
        refs = parse(numbers)
        formulas[(row, col)] = refs
        RETURN get(row, col)
```

---

## Examples

| Operation | Result |
|-----------|--------|
| `Excel(3, 3)` | creates a 3×3 sheet |
| `set(1,1,5)` | cell (1,1) = 5 |
| `sum(2,2, ["A1","A2:A3"])` | returns 5 (A1) + 0 + 0 = 5 |
| `set(1,2,3)` | updates cell (1,2) = 3 |
| `get(2,2)` | now returns 5 + 3 = 8 |

---

## Walkthrough

1. **Initialize** a 3×3 sheet – all cells contain `0` and no formulas.
2. **set(1,1,5)** stores `5` at cell A1; no formula is recorded.
3. **sum(2,2,["A1","A2:A3"])** parses references:
   - `A1` → (1,1)
   - `A2:A3` → (2,1) and (3,1) (both `0`).
   The formula for B2 becomes `[ (1,1), (2,1), (3,1) ]`.
4. **get(2,2)** triggers evaluation:
   - Recursively fetches values of referenced cells.
   - Returns `5 + 0 + 0 = 5`.
5. **set(1,2,3)** updates cell B1 to `3`. Since B2’s formula depends on B1 via the range `A2:A3` (which does not include B1), B2’s value remains `5` until the range changes.
6. **get(2,2)** after the update now evaluates the same references, still `5` (no change). If the range had included B1, the result would reflect the new `3`.

---

## Complexity Analysis

- **Time:** Each `set` is O(1). `sum` parses references O(k) where k is number of cells referenced. `get` may traverse the dependency graph; worst‑case O(N) where N is total cells.
- **Space:** Stores grid values O(H·W) and formula mappings O(F) where F is number of formulas.

---

## Key Takeaway

> **Cell dependency graph:** `set` clears formulas, `sum` creates formula dependencies, `get` recursively evaluates. For performance, use topological sort for eager propagation.
