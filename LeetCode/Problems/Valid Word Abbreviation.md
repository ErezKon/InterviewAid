# 408. Valid Word Abbreviation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word-abbreviation](https://leetcode.com/problems/valid-word-abbreviation)
**Companies:** Amazon, Datadog, Google, Meta, Rokt, Snowflake, Tiktok

---

## Problem Description
Given a string `word` and an abbreviation `abbr`, determine whether `abbr` is a valid abbreviation of `word`. The abbreviation may contain letters that must match exactly and numeric substrings representing the number of characters to skip. Numbers cannot have leading zeros.

## Examples
| word | abbr | output |
|------|------|--------|
| "internationalization" | "i12iz4n" | true |
| "apple" | "a2e" | false |
| "substitution" | "s10n" | true |

## Approach
Use two pointers to traverse `word` and `abbr` simultaneously. When encountering a digit in `abbr`, parse the full number (ensuring no leading zero) and advance the `word` pointer by that amount. Otherwise, compare characters directly. If any mismatch occurs, return false. After the loop, both pointers must reach the ends of their strings.

```text
FUNCTION isValidAbbreviation(word, abbr):
    SET i ← 0  // index in word
    SET j ← 0  // index in abbr
    WHILE i < LEN(word) AND j < LEN(abbr):
        IF abbr[j] IS DIGIT:
            IF abbr[j] = '0':
                RETURN false  // leading zero not allowed
            SET num ← 0
            WHILE j < LEN(abbr) AND abbr[j] IS DIGIT:
                SET num ← num * 10 + INT(abbr[j])
                INCREMENT j
            SET i ← i + num
        ELSE:
            IF word[i] ≠ abbr[j]:
                RETURN false
            INCREMENT i
            INCREMENT j
    RETURN i = LEN(word) AND j = LEN(abbr)
```

## Walkthrough
Consider `word = "internationalization"`, `abbr = "i12iz4n"`.
| Step | i (word) | j (abbr) | Action |
|------|----------|----------|--------|
| 1 | 0 | 0 | letters match `i` → i=1, j=1 |
| 2 | 1 | 1 | digit `1` starts number → parse `12` → i=1+12=13, j=3 |
| 3 | 13 | 3 | letters match `i` → i=14, j=4 |
| 4 | 14 | 4 | digit `4` → i=14+4=18, j=5 |
| 5 | 18 | 5 | letters match `n` → i=19, j=6 (end) |
All pointers reached ends → true.

## Complexity Analysis
- Time: O(n) where n = max(len(word), len(abbr)) – each character processed once.
- Space: O(1) – only constant extra variables.

## Follow-Up Questions
1. How would you modify the algorithm to support abbreviations with alphabetic groups (e.g., "a#b" where `#` means any single character)?
2. Can you extend this to validate abbreviations for a list of words simultaneously?
3. What changes are needed if the abbreviation may contain wildcard `*` representing any number of characters?

## Key Takeaway
Parsing the abbreviation with two pointers and handling numeric skips efficiently determines validity in linear time.
