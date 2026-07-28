# 3484. Design Spreadsheet

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-spreadsheet](https://leetcode.com/problems/design-spreadsheet)
**Companies:** Amazon, Bloomberg, Citadel, Google, Microsoft, Openai, Rippling

---

## Problem Description

Design a spreadsheet with `setCell(cell, value)`, `getCell(cell)`, and `resetCell(cell)`. Cells can reference other cells in formulas.

## Examples

1. `setCell("A1", 5)` → stores 5 in A1.
2. `setFormula("B1", "=A1+3")` → B1 evaluates to 8.
3. `resetCell("A1")` → A1 becomes 0, B1 updates accordingly.

## Approach

```
CLASS Spreadsheet:
    CONSTRUCTOR(rows):
        cells = {}    // "A1" → value

    FUNCTION setCell(cell, value):
        cells[cell] = value

    FUNCTION getCell(cell):
        RETURN cells.get(cell, 0)

    FUNCTION setFormula(cell, formula):
        // Parse formula (e.g., "=A1+B2")
        // Evaluate by resolving cell references
        cells[cell] = evaluate(formula)
```

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | `setCell("A1", 5)` | cells["A1"] = 5 |
| 2 | `setFormula("B1", "=A1+3")` | evaluate reads A1 → 5, adds 3 → 8, stores cells["B1"] = 8 |
| 3 | `resetCell("A1")` | cells["A1"] = 0, re‑evaluate B1 → 3 |

## Complexity Analysis

- `setCell` / `getCell` / `resetCell`: **O(1)** time, **O(1)** space.
- `setFormula`: parsing & evaluating touches each referenced cell → **O(k)** where *k* is number of references.
- Overall storage: **O(m)** for *m* cells.

## Follow-Up Questions

- How would you detect and handle circular dependencies?
- Extend to support built‑in functions like `SUM` over ranges.
- Design a collaborative version with concurrent edits.

---

## Key Takeaway

> **Hash map of cell references. Simple case: store values directly. With formulas: parse and evaluate by resolving cell references recursively. Watch for circular dependencies.**