# 2075. Decode the Slanted Ciphertext

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decode-the-slanted-ciphertext](https://leetcode.com/problems/decode-the-slanted-ciphertext)
**Companies:** Amazon, Google, Grammarly

---

## Problem Description

Text was encoded by writing diagonally into a grid of given `rows`. Given the encoded text (read row by row), decode the original message.

---

## Approach

```
FUNCTION decodeCiphertext(encodedText, rows):
    cols = len(encodedText) // rows
    result = []
    FOR c ← 0 TO cols - 1:
        r, cc = 0, c
        WHILE r < rows AND cc < cols:
            result.ADD(encodedText[r * cols + cc])
            r += 1; cc += 1
    RETURN JOIN(result).rstrip()
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of encoded text |
| **Space** | O(n) |

---

## Key Takeaway

> **Diagonal grid reading: start from each column in the first row, follow the diagonal (r+1, c+1). Convert 2D position to 1D index via `r * cols + c`. Strip trailing spaces.**
