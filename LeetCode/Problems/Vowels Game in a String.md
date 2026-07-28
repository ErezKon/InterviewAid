# 3227. Vowels Game in a String

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Meta
---

## Problem Description
Given a string `s` consisting of lowercase English letters, Alice and Bob play a game where Alice wins if the string contains at least one vowel (`a, e, i, o, u`). Determine whether Alice wins.

## Examples
- Input: `"leetcode"` → Output: `true` (contains vowels `e`, `o`).
- Input: `"bcdfg"` → Output: `false` (no vowels).

## Approach
Count the number of vowel characters in the string. If the count is greater than zero, Alice wins; otherwise, Bob wins.

```text
FUNCTION doesAliceWin(s):
    SET vowelCount ← 0
    FOR ch ← each character IN s:
        IF ch IN {'a','e','i','o','u'}:
            SET vowelCount ← vowelCount + 1
    RETURN vowelCount > 0
```

## Walkthrough
| Step | Character | Vowel Count |
|------|-----------|-------------|
| 1    | 'l'       | 0           |
| 2    | 'e'       | 1           |
| ...  | ...       | ...         |
The function returns `true` because the final count is > 0.

## Complexity Analysis
- Time: O(n), where n is the length of the string.
- Space: O(1) extra space.

## Follow-Up Questions
- How would you modify the solution if consonants also contributed to the score?
- What if the game required counting only distinct vowels?
- Can the game be extended to handle uppercase letters efficiently?

## Key Takeaway
A simple linear scan to count vowels determines the winner in constant extra space.
