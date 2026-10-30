# 299. Bulls and Cows

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulls-and-cows](https://leetcode.com/problems/bulls-and-cows)
**Companies:** Amazon, Epic Systems, Flexport, Google, Meta, Zopsmart

---

## Problem Description
You are playing the **Bulls and Cows** game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

- The number of "bulls", which are digits in the guess that are in the correct position.
- The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.

Given the secret number `secret` and your friend's guess `guess`, return *the hint for your friend's guess*.

The hint should be formatted as `"xAyB"`, where `x` is the number of bulls and `y` is the number of cows. Note that both `secret` and `guess` may contain duplicate digits.

**Constraints:**
- `1 ≤ secret.length, guess.length ≤ 1000`
- `secret.length == guess.length`
- `secret` and `guess` consist of digits only.

## Examples
```
Example 1:
  Input: secret = "1807", guess = "7810"
  Output: "1A3B"
  Explanation: Bulls are connected with a '|' and cows are underlined:
  "1807"
    |
  "7810"

Example 2:
  Input: secret = "1123", guess = "0111"
  Output: "1A1B"
  Explanation: Bulls are connected with a '|' and cows are underlined:
  "1123"        "1123"
    |      or     |
  "0111"        "0111"
  Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.
```

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
