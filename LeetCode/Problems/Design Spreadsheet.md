# 3484. Design Spreadsheet

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-spreadsheet](https://leetcode.com/problems/design-spreadsheet)
**Companies:** Amazon, Bloomberg, Citadel, Google, Microsoft, Openai, Rippling

---

## Problem Description

Design a spreadsheet with `setCell(cell, value)`, `getCell(cell)`, and `resetCell(cell)`. Cells can reference other cells in formulas.

---

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

---

## Key Takeaway

> **Hash map of cell references. Simple case: store values directly. With formulas: parse and evaluate by resolving cell references recursively. Watch for circular dependencies.**
