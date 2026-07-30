# 3766. Minimum Operations to Make Binary Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-binary-palindrome](https://leetcode.com/problems/minimum-operations-to-make-binary-palindrome)
**Companies:** Teradata

---

## Problem Description
Given a binary string `s` (consisting of characters `'0'` and `'1'`), you may perform an operation that flips a single character (changing `'0'` to `'1'` or `'1'` to `'0'`). Determine the minimum number of flips required to make `s` a palindrome. Return that minimum count.

Constraints typically include `1 ≤ s.length ≤ 10⁵`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"1010"` | `1` | Flip the second character to obtain `"1110"`, then the string reads the same forwards and backwards after flipping the third character as well, but the optimal is flipping the third character to get `"1011"` which is not palindrome. Actually the minimal flips is `1` by flipping the second character to `"1110"` and then the string is not palindrome; correct minimal flips is `1` by flipping the second character to `"1110"`? Let's provide a clear example: `"1001"` needs `0` flips; `"1100"` needs `2` flips (positions 1 and 4). |
| `"111"` | `0` | Already a palindrome.
| `"0101"` | `2` | Flip positions 2 and 3 to get `"0110"` which is palindrome.

## Approach
A palindrome reads the same from both ends, so for each symmetric pair of indices `(i, n‑1‑i)` we only need to ensure the characters match. If they differ, one flip is sufficient to make them equal. Thus the answer is the count of mismatched pairs.

**Algorithm**
1. Initialise `flips = 0`.
2. For `i` from `0` to `⌊(n‑1)/2⌋`:
   - If `s[i] != s[n‑1‑i]`, increment `flips`.
3. Return `flips`.

**Pseudocode**
```text
FUNCTION minFlipsToPalindrome(s):
    SET n ← LENGTH(s)
    SET flips ← 0
    FOR i ← 0 TO (n DIV 2) - 1:
        IF s[i] ≠ s[n - 1 - i]:
            SET flips ← flips + 1
    RETURN flips
```

## Walkthrough
Example `s = "1100"` (n = 4):
| i | s[i] | s[n‑1‑i] | Mismatch? | flips |
|---|------|----------|-----------|-------|
|0|1|0|yes|1|
|1|1|0|yes|2|
Result `flips = 2`.

## Complexity Analysis
- **Time:** `O(n)` – one pass over half the string.
- **Space:** `O(1)` – constant extra space.

## Follow‑Up Questions
1. How would the solution change if each flip had a different cost depending on its position?
2. Can you extend the algorithm to return the actual indices to flip?
3. What if the string contains more than two characters (e.g., ternary strings) – does the same logic apply?

## Key Takeaway
The minimum flips equal the number of mismatched symmetric pairs; each mismatch can be resolved with a single flip.
