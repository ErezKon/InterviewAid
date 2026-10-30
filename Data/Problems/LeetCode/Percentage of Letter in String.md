# 2278. Percentage of Letter in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/percentage-of-letter-in-string](https://leetcode.com/problems/percentage-of-letter-in-string)
**Companies:** American Express

---

## Problem Description
Given a string `s` and a character `letter`, return *the **percentage** of characters in* `s` *that equal* `letter` ***rounded down** to the nearest whole percent.*

**Constraints:**

- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.
- `letter` is a lowercase English letter.

## Examples

```
Example 1:
  Input: s = "foobar", letter = "o"
  Output: 33
  Explanation:
  The percentage of characters in s that equal the letter 'o' is 2 / 6 * 100% = 33% when rounded down, so we return 33.
```

```
Example 2:
  Input: s = "jjjj", letter = "k"
  Output: 0
  Explanation:
  The percentage of characters in s that equal the letter 'k' is 0%, so we return 0.
```

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
