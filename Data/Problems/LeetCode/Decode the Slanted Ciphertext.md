# 2075. Decode the Slanted Ciphertext

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/decode-the-slanted-ciphertext](https://leetcode.com/problems/decode-the-slanted-ciphertext)
**Companies:** Amazon, Google, Grammarly

---

## Problem Description

A string `originalText` is encoded using a **slanted transposition cipher** to a string `encodedText` with the help of a matrix having a **fixed number of rows** `rows`.

`originalText` is placed first in a top-left to bottom-right manner.
![img](https://assets.leetcode.com/uploads/2021/11/07/exa11.png)
The blue cells are filled first, followed by the red cells, then the yellow cells, and so on, until we reach the end of `originalText`. The arrow indicates the order in which the cells are filled. All empty cells are filled with `' '`. The number of columns is chosen such that the rightmost column will **not be empty** after filling in `originalText`.

`encodedText` is then formed by appending all characters of the matrix in a row-wise fashion.
![img](https://assets.leetcode.com/uploads/2021/11/07/exa12.png)
The characters in the blue cells are appended first to `encodedText`, then the red cells, and so on, and finally the yellow cells. The arrow indicates the order in which the cells are accessed.

For example, if `originalText = "cipher"` and `rows = 3`, then we encode it in the following manner:
![img](https://assets.leetcode.com/uploads/2021/10/25/desc2.png)
The blue arrows depict how `originalText` is placed in the matrix, and the red arrows denote the order in which `encodedText` is formed. In the above example, `encodedText = "ch   ie   pr"`.

Given the encoded string `encodedText` and number of rows `rows`, return *the original string* `originalText`.

**Note:** `originalText` **does not** have any trailing spaces `' '`. The test cases are generated such that there is only one possible `originalText`.

**Constraints:**
- `0 <= encodedText.length <= 10^6`
- `encodedText` consists of lowercase English letters and `' '` only.
- `encodedText` is a valid encoding of some `originalText` that **does not** have trailing spaces.
- `1 <= rows <= 1000`
- The testcases are generated such that there is **only one** possible `originalText`.

## Examples

**Example 1:**
```
Input: encodedText = "ch   ie   pr", rows = 3
Output: "cipher"
Explanation: This is the same example described in the problem description.
```

**Example 2:**
```
Input: encodedText = "iveo    eed   l te   olc", rows = 4
Output: "i love leetcode"
Explanation: The figure above denotes the matrix that was used to encode originalText.
The blue arrows show how we can find originalText from encodedText.
```

**Example 3:**
```
Input: encodedText = "coding", rows = 1
Output: "coding"
Explanation: Since there is only 1 row, both originalText and encodedText are the same.
```

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

1. How would you modify the algorithm if the grid were filled column-wise instead of row-wise?
2. Can the solution be adapted to decode when the number of rows is unknown but the grid is square?
3. What is the impact on complexity if the encoded text contains a large number of trailing spaces?

---

## Key Takeaway

> **Diagonal grid reading: start from each column in the first row, follow the diagonal (r+1, c+1). Convert 2D position to 1D index via `r * cols + c`. Strip trailing spaces.**