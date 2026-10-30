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
Iterate over each position `(i, j)` where `i` is the row index and `j` is the column index. For a valid square, `words[i][j]` must exist and equal `words[j][i]`. If any mismatch or out‑of‑bounds access occurs, the square is invalid.

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
Take `words = ["ball","area","lead","lady"]`.
| i | j | words[i][j] | words[j][i] | Action |
|---|---|------------|------------|--------|
|0|0|`b`|`b`|match|
|0|1|`a`|`a`|match|
|0|2|`l`|`l`|match|
|0|3|`l`|`l`|match|
|1|0|`a`|`a`|... continue for all cells → all match → true |

## Complexity Analysis
- Time: O(N) where N is total number of characters across all strings (each character examined once).
- Space: O(1) extra beyond input storage.

## Follow-Up Questions
1. How would you adapt the solution to handle Unicode characters?
2. Can you design an algorithm to suggest the minimal changes needed to make an invalid square valid?
3. What if the input is streamed row‑by‑row – can you validate with O(1) additional memory?

## Key Takeaway
A word square is validated by ensuring symmetry between rows and columns, which can be checked with a simple double loop.
