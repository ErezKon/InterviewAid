# 299. Bulls and Cows

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulls-and-cows](https://leetcode.com/problems/bulls-and-cows)
**Companies:** Amazon, Epic Systems, Flexport, Google, Meta, Zopsmart

---

## Problem Description
You are given two strings `secret` and `guess` of equal length, consisting of digits `'0'`‑`'9'`. A *bull* is a digit that matches in both value and position. A *cow* is a digit that appears in both strings but in different positions. Return a hint string formatted as `"xAyB"` where `x` is the number of bulls and `y` is the number of cows.

## Examples
- Input: `secret = "1807"`, `guess = "7810"` → Output: `"1A3B"`. One bull (`'8'` at position 2) and three cows (`'1','0','7`).
- Input: `secret = "1123"`, `guess = "0111"` → Output: `"1A1B"`.

## Approach
**Two‑Pass Counting** – First pass counts bulls and records the frequency of non‑matching digits for both strings. Second pass sums the minimum of each digit’s counts to obtain cows.

```text
FUNCTION getHint(secret, guess):
    SET bulls ← 0
    SET sCount[0..9] ← array of zeros
    SET gCount[0..9] ← array of zeros
    FOR i FROM 0 TO LENGTH(secret)-1:
        IF secret[i] = guess[i]:
            SET bulls ← bulls + 1
        ELSE:
            SET sCount[INTEGER(secret[i])] ← sCount[INTEGER(secret[i])] + 1
            SET gCount[INTEGER(guess[i])] ← gCount[INTEGER(guess[i])] + 1
    SET cows ← 0
    FOR d FROM 0 TO 9:
        SET cows ← cows + MIN(sCount[d], gCount[d])
    RETURN STRING(bulls) + "A" + STRING(cows) + "B"
```

## Walkthrough
`secret = "1807"`, `guess = "7810"`:
- Index 0: `1` vs `7` → counts updated.
- Index 1: `8` vs `8` → bull++.
- Index 2: `0` vs `1` → counts.
- Index 3: `7` vs `0` → counts.
After first pass, `sCount = [0,1,0,0,0,0,0,1,0,0]`, `gCount = [1,0,0,0,0,0,0,1,1,0]`.
Cows = min(1,1) for digit 0 + min(1,1) for digit 7 = 2, plus digit 1 mismatch gives another cow → total 3 cows.
Result `1A3B`.

## Complexity Analysis
- **Time:** O(n) where n is the length of the strings.
- **Space:** O(1) – fixed arrays of size 10.

## Follow‑Up Questions
1. How would you adapt the algorithm for an alphabet of letters instead of digits?
2. Can you solve the problem in a single pass without separate count arrays?
3. What if the hint must also report the positions of bulls?

## Key Takeaway
Counting bulls first and then taking the minimum of digit frequencies yields an O(n) solution with constant extra space.
