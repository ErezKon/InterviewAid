# 408. Valid Word Abbreviation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-word-abbreviation](https://leetcode.com/problems/valid-word-abbreviation)
**Companies:** Amazon, Datadog, Google, Meta, Rokt, Snowflake, Tiktok

---

## Problem Description

A string can be **abbreviated** by replacing any number of **non-adjacent**, **non-empty** substrings with their lengths. The lengths **should not** have leading zeros.

For example, a string such as `"substitution"` could be abbreviated as (but not limited to):

- `"s10n"` (`"s ubstitutio n"`)
- `"sub4u4"` (`"sub stit u tion"`)
- `"12"` (`"substitution"`)
- `"su3i1u2on"` (`"su bst i t u ti on"`)
- `"substitution"` (no substrings replaced)

The following are **not valid** abbreviations:

- `"s55n"` (`"s ubsti tutio n"`, the replaced substrings are adjacent)
- `"s010n"` (has leading zeros)
- `"s0ubstitution"` (replaces an empty substring)

Given a string `word` and an abbreviation `abbr`, return *whether the string **matches** the given abbreviation*.

A **substring** is a contiguous **non-empty** sequence of characters within a string.

**Constraints:**
- `1 <= word.length <= 20`
- `word` consists of only lowercase English letters.
- `1 <= abbr.length <= 10`
- `abbr` consists of lowercase English letters and digits.
- All the integers in `abbr` will fit in a 32-bit integer.

## Examples

**Example 1:**
```
Input: word = "internationalization", abbr = "i12iz4n"
Output: true
Explanation: The word "internationalization" can be abbreviated as "i12iz4n" ("i nternational iz atio n").
```

**Example 2:**
```
Input: word = "apple", abbr = "a2e"
Output: false
Explanation: The word "apple" cannot be abbreviated as "a2e".
```

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
