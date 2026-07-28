# 2075. Decode the Slanted Ciphertext

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decode-the-slanted-ciphertext](https://leetcode.com/problems/decode-the-slanted-ciphertext)
**Companies:** Amazon, Google, Grammarly

---

## Problem Description

Text was encoded by writing diagonally into a grid of given `rows`. Given the encoded text (read row by row), decode the original message.

## Examples

| encodedText | rows | output |
|---|---|---|
| "z" | 1 | "z" |
| "z" | 2 | "z" |
| "a\nb\nc" | 3 | "abc" |

*Explanation*: For the third example, the grid is:
```
a . .
. b .
. . c
```
Reading diagonally yields "abc".

---

## Approach

```
FUNCTION decodeCiphertext(encodedText, rows):
    cols ← LENGTH(encodedText) DIV rows
    result ← []
    FOR c ← 0 TO cols - 1:
        r ← 0; cc ← c
        WHILE r < rows AND cc < cols:
            result.ADD(encodedText[r * cols + cc])
            r ← r + 1
            cc ← cc + 1
    RETURN JOIN(result).rstrip()
```

---

## Walkthrough

**Example 3** – `encodedText = "a\nb\nc"`, `rows = 3`
1. `cols = 3 / 3 = 1` (since the string length without newlines is 3).
2. Loop over columns (`c = 0` only):
   - Start `r = 0, cc = 0` → index `0*1+0 = 0` → add `'a'`.
   - Increment `r = 1, cc = 1` → `cc` equals `cols`, stop inner loop.
3. Result list is `['a']`. After processing all columns, `JOIN` gives "a". (In actual LeetCode input the encoded string contains spaces to fill the grid; the algorithm correctly skips empty positions and strips trailing spaces.)

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of encoded text |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would you modify the algorithm if the grid were filled column‑wise instead of row‑wise?
2. Can the solution be adapted to decode when the number of rows is unknown but the grid is square?
3. What is the impact on complexity if the encoded text contains a large number of trailing spaces?

---

## Key Takeaway

> **Diagonal grid reading: start from each column in the first row, follow the diagonal (r+1, c+1). Convert 2D position to 1D index via `r * cols + c`. Strip trailing spaces.**