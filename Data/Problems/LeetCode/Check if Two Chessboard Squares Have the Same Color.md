# 3274. Check if Two Chessboard Squares Have the Same Color

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-two-chessboard-squares-have-the-same-color](https://leetcode.com/problems/check-if-two-chessboard-squares-have-the-same-color)

**Companies:** Amazon, Bloomberg, Meta
---
## Problem Description

You are given two strings, `coordinate1` and `coordinate2`, representing the coordinates of a square on an `8 x 8` chessboard.

Below is the chessboard for reference.

![img](https://assets.leetcode.com/uploads/2024/07/17/screenshot-2021-02-20-at-22159-pm.png)

Return `true` if these two squares have the same color and `false` otherwise.

The coordinate will always represent a valid chessboard square. The coordinate will always have the letter first (indicating its column), and the number second (indicating its row).

**Constraints:**
- `coordinate1.length == coordinate2.length == 2`
- `'a' <= coordinate1[0], coordinate2[0] <= 'h'`
- `'1' <= coordinate1[1], coordinate2[1] <= '8'`

## Examples

**Example 1:**
```
Input: coordinate1 = "a1", coordinate2 = "c3"
Output: true
Explanation: Both squares are black.
```

**Example 2:**
```
Input: coordinate1 = "a1", coordinate2 = "h3"
Output: false
Explanation: Square "a1" is black and "h3" is white.
```

## Approach
The color of a square is determined by the parity of the sum of its column index (0‑based) and row index (0‑based). If the parity matches for both squares, they share the same color.

### Pseudocode
```text
FUNCTION SameColor(square1, square2):
    // Convert column letter to 0‑based index
    SET col1 ← ASCII(square1[0]) - ASCII('a')
    SET col2 ← ASCII(square2[0]) - ASCII('a')
    // Convert row character to 0‑based index
    SET row1 ← INT(square1[1]) - 1
    SET row2 ← INT(square2[1]) - 1
    // Compute parity
    SET parity1 ← (col1 + row1) MOD 2
    SET parity2 ← (col2 + row2) MOD 2
    RETURN parity1 == parity2
```

## Walkthrough
Consider squares "a1" and "c3":
- col1 = 0, row1 = 0 → parity1 = (0+0) % 2 = 0
- col2 = 2, row2 = 2 → parity2 = (2+2) % 2 = 0
Both parities match, so the squares share the same color.

## Complexity Analysis
- Time: O(1) – constant work for each square.
- Space: O(1) – only a few integer variables.

## Follow‑Up Questions
- How would you extend this to an N×N board?
- Can you determine the color of a square given only its coordinates without conversion?
- How would you handle invalid inputs (e.g., "i9")?

## Key Takeaway
Two chessboard squares share the same color if the sum of their zero‑based column and row indices have the same parity.