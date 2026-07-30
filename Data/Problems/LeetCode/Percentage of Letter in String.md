# 2278. Percentage of Letter in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/percentage-of-letter-in-string](https://leetcode.com/problems/percentage-of-letter-in-string)
**Companies:** American Express

---

## Problem Description
Given a string `s` consisting of lowercase English letters and a character `letter`, return the percentage of characters in `s` that equal `letter`. The answer should be a string formatted as a floating‑point number with exactly two decimal places followed by a `%` sign.

Constraints: `1 ≤ s.length ≤ 100`; `s` contains only lowercase letters; `letter` is a single lowercase letter.

## Examples
| s | letter | Output | Explanation |
|---|--------|--------|-------------|
| "foobar" | 'o' | "33.33%" | Two out of six characters are 'o' → 2/6 = 33.33%.
| "abcde" | 'f' | "0.00%" | No occurrence of 'f'.

## Approach
Count occurrences of `letter` and compute the percentage.

1. Initialise `count ← 0`.
2. Iterate over each character `c` in `s`:
   - IF `c == letter`: `SET count ← count + 1`.
3. Compute `percentage ← (count / LENGTH(s)) * 100`.
4. Format `percentage` to two decimal places and append `%`.

## Walkthrough
For `s = "foobar"`, `letter = 'o'`:
- Iterate: count increments twice (positions 2 and 3).
- `percentage = (2 / 6) * 100 = 33.333...` → formatted as `33.33%`.

## Complexity Analysis
- Time: O(n) where n = length of `s`.
- Space: O(1) additional space.

## Follow‑Up Questions
1. How would you modify the solution to handle uppercase letters case‑insensitively?
2. Can you compute the result in a single pass without using division until the end (e.g., using integer arithmetic)?
3. What if you need to return percentages for **all** letters in the string simultaneously?

## Key Takeaway
A simple linear scan counting the target character, followed by a division and formatting, yields the required percentage.
