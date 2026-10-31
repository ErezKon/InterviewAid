# 422. Valid Word Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word-square](https://leetcode.com/problems/valid-word-square)
**Companies:** Google

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py). Rows may have different lengths — the old description's "each string's length equals the number of strings" is not required.*

Given an array of strings `words`, return `true` *if it forms a valid **word square***.

A sequence of strings forms a valid **word square** if the `k`th row and column read the same string, where `0 <= k < max(numRows, numColumns)`.

**Constraints:**
- `1 <= words.length <= 500`
- `1 <= words[i].length <= 500`
- `words[i]` consists of only lowercase English letters.

## Examples

**Example 1:**
```
Input: words = ["abcd","bnrt","crmy","dtye"]
Output: true
Explanation:
The 1st row and 1st column both read "abcd".
The 2nd row and 2nd column both read "bnrt".
The 3rd row and 3rd column both read "crmy".
The 4th row and 4th column both read "dtye".
Therefore, it is a valid word square.
```

**Example 2:**
```
Input: words = ["abcd","bnrt","crm","dt"]
Output: true
Explanation:
The 1st row and 1st column both read "abcd".
The 2nd row and 2nd column both read "bnrt".
The 3rd row and 3rd column both read "crm".
The 4th row and 4th column both read "dt".
Therefore, it is a valid word square.
```

**Example 3:**
```
Input: words = ["ball","area","read","lady"]
Output: false
Explanation:
The 3rd row reads "read" while the 3rd column reads "lead".
Therefore, it is NOT a valid word square.
```

## Approach
Iterate over each position `(i, j)` where `i` is the row index and `j` is the column index. For a valid square, `words[i][j]` must exist and equal `words[j][i]`. If any mismatch or out-of-bounds access occurs, the square is invalid.

```text
FUNCTION isValidWordSquare(words):
    SET n ← LEN(words)
    FOR i ← 0 TO n-1:
        SET row ← words[i]
        FOR j ← 0 TO LEN(row)-1:
            IF j >= n OR i >= LEN(words[j]):
                RETURN false
            IF row[j] ≠ words[j][i]:
                RETURN false
    RETURN true
```

## Walkthrough
Example 2: `words = ["abcd","bnrt","crm","dt"]` (row lengths 4, 4, 3, 2).

| i | row | j checked | words[i][j] vs words[j][i] | Action |
|---|-----|-----------|----------------------------|--------|
|0|`abcd`|0..3|`a/a`, `b/b`, `c/c`, `d/d` (rows 2, 3 have length > 0)|match|
|1|`bnrt`|0..3|`b/b`, `n/n`, `r/r`, `t/t` (`words[3]` has length 2 > 1)|match|
|2|`crm`|0..2|`c/c`, `r/r`, `m/m`|match|
|3|`dt`|0..1|`d/d`, `t/t`|match|

No mismatch or out-of-bounds → **Output: true**. In Example 3 (`["ball","area","read","lady"]`) the check fails already at `(0,2)`: `words[0][2] = 'l'` but `words[2][0] = 'r'` → `false`.

## Complexity Analysis
- Time: O(N) where N is total number of characters across all strings (each character examined once).
- Space: O(1) extra beyond input storage.

## Follow-Up Questions
1. How would you adapt the solution to handle Unicode characters?
2. Can you design an algorithm to suggest the minimal changes needed to make an invalid square valid?
3. What if the input is streamed row-by-row – can you validate with O(1) additional memory?

## Key Takeaway
A word square is validated by ensuring symmetry between rows and columns, which can be checked with a simple double loop.
