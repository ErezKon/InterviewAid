# 1307. Verbal Arithmetic Puzzle

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/verbal-arithmetic-puzzle](https://leetcode.com/problems/verbal-arithmetic-puzzle)
**Companies:** Atlassian, Google, Wells Fargo

---

## Problem Description

Given an equation, represented by `words` on the left side and the `result` on the right side.

You need to check if the equation is solvable under the following rules:

- Each character is decoded as one digit (0 - 9).
- No two characters can map to the same digit.
- Each `words[i]` and `result` are decoded as one number **without** leading zeros.
- Sum of numbers on the left side (`words`) will equal to the number on the right side (`result`).

Return `true` *if the equation is solvable, otherwise return* `false`.

**Constraints:**
- `2 <= words.length <= 5`
- `1 <= words[i].length, result.length <= 7`
- `words[i], result` contain only uppercase English letters.
- The number of different characters used in the expression is at most `10`.

## Examples

**Example 1:**
```
Input: words = ["SEND","MORE"], result = "MONEY"
Output: true
Explanation: Map 'S'-> 9, 'E'->5, 'N'->6, 'D'->7, 'M'->1, 'O'->0, 'R'->8, 'Y'->'2'
Such that: "SEND" + "MORE" = "MONEY" ,  9567 + 1085 = 10652
```

**Example 2:**
```
Input: words = ["SIX","SEVEN","SEVEN"], result = "TWENTY"
Output: true
Explanation: Map 'S'-> 6, 'I'->5, 'X'->0, 'E'->8, 'V'->7, 'N'->2, 'T'->1, 'W'->'3', 'Y'->4
Such that: "SIX" + "SEVEN" + "SEVEN" = "TWENTY" ,  650 + 68782 + 68782 = 138214
```

**Example 3:**
```
Input: words = ["LEET","CODE"], result = "POINT"
Output: false
Explanation: There is no possible mapping to satisfy the equation, so we return false.
Note that two different characters cannot map to the same digit.
```

## Approach
Use depth‑first backtracking with column‑wise verification. Process the addition from the least significant column to the most, maintaining a carry. At each column, try all unused digits for the letters appearing in that column, pruning when the partial sum cannot satisfy the carry constraint.

```text
FUNCTION isSolvable(words, result):
    letters ← UNIQUE letters in words + result
    IF LENGTH(letters) > 10: RETURN false
    REVERSE each word and result for column processing
    RETURN backtrack(col ← 0, row ← 0, carry ← 0, mapping ← {}, usedDigits ← {})

FUNCTION backtrack(col, row, carry, mapping, usedDigits):
    IF col == MAX_LENGTH:
        RETURN carry == 0
    IF row < LENGTH(words):
        letter ← GET_LETTER(words[row], col)
        IF letter IS NULL: RETURN backtrack(col, row+1, carry, mapping, usedDigits)
        IF letter IN mapping:
            RETURN backtrack(col, row+1, carry + mapping[letter], mapping, usedDigits)
        FOR d FROM 0 TO 9:
            IF d IN usedDigits OR (d == 0 AND IS_LEADING(letter, col)): CONTINUE
            mapping[letter] ← d
            usedDigits.ADD(d)
            IF backtrack(col, row+1, carry + d, mapping, usedDigits): RETURN true
            REMOVE mapping[letter]
            usedDigits.REMOVE(d)
        RETURN false
    ELSE:
        // process result letter for this column
        letter ← GET_LETTER(result, col)
        total ← carry
        expectedDigit ← total MOD 10
        newCarry ← total DIV 10
        IF letter IN mapping:
            IF mapping[letter] != expectedDigit: RETURN false
            RETURN backtrack(col+1, 0, newCarry, mapping, usedDigits)
        IF expectedDigit IN usedDigits OR (expectedDigit == 0 AND IS_LEADING(letter, col)): RETURN false
        mapping[letter] ← expectedDigit
        usedDigits.ADD(expectedDigit)
        IF backtrack(col+1, 0, newCarry, mapping, usedDigits): RETURN true
        REMOVE mapping[letter]
        usedDigits.REMOVE(expectedDigit)
        RETURN false
```

## Walkthrough
Consider `SEND + MORE = MONEY`.
| Column (right‑most) | Letters | Partial sum + carry | Assigned digit | New carry |
|---------------------|---------|----------------------|----------------|-----------|
| 0 (units) | D + E = Y | 7 + 5 = 12 | Y←2 | 1 |
| 1 (tens)  | N + R + carry | 6 + 8 + 1 = 15 | E←5 (already) matches 5 | 1 |
| 2 (hundreds) | E + O + carry | 5 + 0 + 1 = 6 | N←6 matches | 0 |
| 3 (thousands) | S + M + carry | 9 + 1 = 10 | O←0 matches | 1 |
| 4 (ten‑thousands) | carry = 1 | M←1 matches | 0 |
All columns satisfied → solution exists.

## Complexity Analysis
- **Time:** O(10! ) in worst case, but heavy pruning reduces practical runtime dramatically.
- **Space:** O(L) for recursion depth, where L is the number of columns (≤ max word length).

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual digit mapping?
2. Can the approach be extended to handle multiplication of words?
3. What optimizations reduce the search space further (e.g., ordering letters by frequency)?

## Key Takeaway
Backtracking column by column with carry propagation prunes impossible digit assignments early, making even hard cryptarithmetic puzzles tractable.
