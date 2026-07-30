# 533. Lonely Pixel II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lonely-pixel-ii](https://leetcode.com/problems/lonely-pixel-ii)
**Companies:** Google

---

## 1. Problem Description

Count black pixels in a grid that are in a row with exactly `target` black pixels, and all rows containing a black pixel in that column are identical.

---

## 2. Examples

**Example 1:**
```
Input: picture = [["W","B","W","B"],["W","B","W","B"],["W","B","W","B"]], target = 3
Output: 2
Explanation: The black pixels at (0,1) and (0,3) satisfy the conditions.
```

**Example 2:**
```
Input: picture = [["W","B","W"],["B","W","B"],["W","B","W"]], target = 2
Output: 0
Explanation: No column has exactly 2 black pixels with identical rows.
```

---

## 3. Approach: Row Hashing — O(m·n) ✅

```text
FUNCTION findBlackPixel(picture, target):
    // Convert each row to a hashable representation
    rowMap ← MAP from rowString TO list of rowIndices
    FOR each rowIndex, row IN picture:
        rowStr ← STRING representation of row
        APPEND rowIndex TO rowMap[rowStr]
    // Count black pixels per column
    colCount ← ARRAY of zeros with length = number of columns
    FOR each row IN picture:
        FOR colIndex, pixel IN row:
            IF pixel == 'B':
                INCREMENT colCount[colIndex]
    result ← 0
    // Evaluate each column that has exactly target black pixels
    FOR colIndex FROM 0 TO length(colCount)-1:
        IF colCount[colIndex] != target:
            CONTINUE
        // Gather rows that have a black pixel in this column
        candidateRows ← []
        FOR rowIndex, row IN picture:
            IF row[colIndex] == 'B':
                APPEND rowIndex TO candidateRows
        // All candidate rows must be identical and each contain exactly target black pixels
        referenceRow ← picture[candidateRows[0]]
        IF COUNT of 'B' in referenceRow != target:
            CONTINUE
        allIdentical ← TRUE
        FOR r IN candidateRows:
            IF picture[r] != referenceRow:
                allIdentical ← FALSE
                BREAK
        IF allIdentical:
            INCREMENT result BY target
    RETURN result
```

---

## 4. Walkthrough

Consider the first example picture:
```
W B W B
W B W B
W B W B
```
* Step 1: Hash each row. All rows hash to the same string "W B W B" and are stored together.
* Step 2: Count black pixels per column → colCount = [0,3,0,3].
* Step 3: Columns 1 and 3 have `target` (=3) black pixels.
* Step 4: For column 1, the rows with a black pixel are rows 0,1,2. They are identical and each row contains exactly 3 black pixels, so we add 3 to the result.
* Step 5: Column 3 yields the same contribution. Final result = 2 (since each qualifying column contributes one distinct black pixel position).

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(m·n) – each cell is visited a constant number of times | O(m·n) – storing row hashes and column counts |

---

## 6. Follow-Up Questions

* How would the solution change if the rows only need to be *similar* (e.g., differ by at most one pixel)?
* Can we solve the problem in O(m + n) space by streaming rows?
* How would you adapt the algorithm for a very large sparse matrix?

---

## 7. Key Takeaway

> Hash each row as a string/tuple. Group identical rows. A column qualifies if it has exactly `target` black pixels and all corresponding rows are identical with exactly `target` black pixels.
