# 422. Valid Word Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word-square](https://leetcode.com/problems/valid-word-square)
**Companies:** Google

---

## Problem Description
Given a list of strings `words`, determine if they form a valid word square. A word square is valid when the k-th row and k-th column read the same string for all valid indices `k`. Each string's length equals the number of strings, and characters at position `i` in the `j`-th word must equal the character at position `j` in the `i`-th word.

## Examples
| words | output |
|-------|--------|
| ["ball","area","lead","lady"] | true |
| ["abcd","bnrt","crmy","dtye"] | false |
| ["abc","b"] | false |

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
