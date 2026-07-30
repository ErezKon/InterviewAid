# 3274. Check if Two Chessboard Squares Have the Same Color

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Bloomberg, Meta
---
## Problem Description
Given two squares on a standard 8x8 chessboard, each identified by a column letter ('a' to 'h') and a row number ('1' to '8'), determine whether both squares are of the same color. The bottom‑left square (a1) is black, and colors alternate across rows and columns.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| c1 = "a1", c2 = "c3" | true | Both squares are black. |
| c1 = "a1", c2 = "h8" | false | a1 is black, h8 is white. |

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