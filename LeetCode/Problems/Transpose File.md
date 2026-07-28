# 194. Transpose File

**Difficulty:** 🟡 Medium
**Companies:** Google, Meta

---

## Problem Description
Given a text file where each line contains space‑separated values (forming a matrix), output its transpose: rows become columns and columns become rows. Preserve the original order of elements within each row/column.

## Examples
- **Example 1:**
  Input file:
  ```
  a b c
  d e f
  ```
  Output:
  ```
  a d
  b e
  c f
  ```
- **Example 2:**
  Input file:
  ```
  1 2
  3 4
  5 6
  ```
  Output:
  ```
  1 3 5
  2 4 6
  ```

## Approach
Read each line, split into fields, and build an array where each column accumulates its values. After processing all lines, print each column as a space‑separated line.

```text
FUNCTION transposeFile(filePath):
    SET columns ← EMPTY LIST
    FOR each line IN READ_LINES(filePath):
        SET fields ← SPLIT(line, WHITESPACE)
        FOR i ← 0 TO LENGTH(fields) - 1:
            IF i >= LENGTH(columns):
                APPEND EMPTY LIST TO columns
            APPEND fields[i] TO columns[i]
    FOR col IN columns:
        PRINT JOIN(col, " ")
```

## Walkthrough
| line | fields | columns after processing |
|------|--------|--------------------------|
| `a b c` | [a,b,c] | [[a], [b], [c]] |
| `d e f` | [d,e,f] | [[a,d], [b,e], [c,f]] |

Printing each column yields the transposed output.

## Complexity Analysis
- **Time:** O(m × n) where *m* is number of rows and *n* is number of columns.
- **Space:** O(m × n) for storing the transposed matrix (or O(n) if streamed output is used).

## Follow‑Up Questions
1. How would you handle rows of varying lengths?
2. Can the transposition be performed in‑place for a matrix stored in memory?
3. How would you adapt the solution for very large files that don’t fit in memory?

## Key Takeaway
Building column buffers while reading rows lets you transpose a file efficiently using simple string operations and linear time.
