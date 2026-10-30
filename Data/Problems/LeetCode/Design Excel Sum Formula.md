# 631. Design Excel Sum Formula

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-excel-sum-formula](https://leetcode.com/problems/design-excel-sum-formula)
**Companies:** Airbnb, Amazon, Citadel, Google, Microsoft, Openai, Ramp 2, Rippling, Waymo

---

## Problem Description

Design the basic function of **Excel** and implement the function of the sum formula.

Implement the `Excel` class:

- `Excel(int height, char width)` Initializes the object with the `height` and the `width` of the sheet. The sheet is an integer matrix `mat` of size `height x width` with the row index in the range `[1, height]` and the column index in the range `['A', width]`. All the values should be **zero** initially.
- `void set(int row, char column, int val)` Changes the value at `mat[row][column]` to be `val`.
- `int get(int row, char column)` Returns the value at `mat[row][column]`.
- `int sum(int row, char column, List<String> numbers)` Sets the value at `mat[row][column]` to be the sum of cells represented by `numbers` and returns the value at `mat[row][column]`. This sum formula **should exist** until this cell is overlapped by another value or another sum formula. `numbers[i]` could be on the format:
  - `"ColRow"` that represents a single cell.
    - For example, `"F7"` represents the cell `mat[7]['F']`.
  - `"ColRow1:ColRow2"` that represents a range of cells. The range will always be a rectangle where `"ColRow1"` represent the position of the top-left cell, and `"ColRow2"` represents the position of the bottom-right cell.
    - For example, `"B3:F7"` represents the cells `mat[i][j]` for `3 <= i <= 7` and `'B' <= j <= 'F'`.

**Note:** You could assume that there will not be any circular sum reference.

- For example, `mat[1]['A'] == sum(1, "B")` and `mat[1]['B'] == sum(1, "A")`.

**Constraints:**

- `1 <= height <= 26`
- `'A' <= width <= 'Z'`
- `1 <= row <= height`
- `'A' <= column <= width`
- `-100 <= val <= 100`
- `1 <= numbers.length <= 5`
- `numbers[i]` has the format `"ColRow"` or `"ColRow1:ColRow2"`.
- At most `100` calls will be made to `set`, `get`, and `sum`.

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

```
Example 1:
  Input:
  ["Excel", "set", "sum", "set", "get"]
  [[3, "C"], [1, "A", 2], [3, "C", ["A1", "A1:B2"]], [2, "B", 2], [3, "C"]]
  Output:
  [null, null, 4, null, 6]
  Explanation:
  Excel excel = new Excel(3, "C");
   // construct a 3*3 2D array with all zero.
   //   A B C
   // 1 0 0 0
   // 2 0 0 0
   // 3 0 0 0
  excel.set(1, "A", 2);
   // set mat[1]["A"] to be 2.
   //   A B C
   // 1 2 0 0
   // 2 0 0 0
   // 3 0 0 0
  excel.sum(3, "C", ["A1", "A1:B2"]); // return 4
   // set mat[3]["C"] to be the sum of value at mat[1]["A"] and the values sum of the rectangle range
   // whose top-left cell is mat[1]["A"] and bottom-right cell is mat[2]["B"].
   //   A B C
   // 1 2 0 0
   // 2 0 0 0
   // 3 0 0 4
  excel.set(2, "B", 2);
   // set mat[2]["B"] to be 2. Note mat[3]["C"] should also be changed.
   //   A B C
   // 1 2 0 0
   // 2 0 2 0
   // 3 0 0 6
  excel.get(3, "C"); // return 6
```

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
