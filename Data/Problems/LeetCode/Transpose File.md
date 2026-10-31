# 194. Transpose File

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/transpose-file](https://leetcode.com/problems/transpose-file)
**Companies:** Google, Meta

---

## Problem Description

Given a text file `file.txt`, transpose its content.

You may assume that each row has the same number of columns, and each field is separated by the `' '` character.

## Examples

**Example 1:**
```
If file.txt has the following content:
name age
alice 21
ryan 30
Output the following:
name alice ryan
age 21 30
```

## Approach
Read each line, split into fields, and build an array where each column accumulates its values. After processing all lines, print each column as a space-separated line.

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
- **Time:** O(m × n) where *m* is number of rows and *n* is number of columns.
- **Space:** O(m × n) for storing the transposed matrix (or O(n) if streamed output is used).

## Follow-Up Questions
1. How would you handle rows of varying lengths?
2. Can the transposition be performed in-place for a matrix stored in memory?
3. How would you adapt the solution for very large files that don’t fit in memory?

## Key Takeaway
Building column buffers while reading rows lets you transpose a file efficiently using simple string operations and linear time.
