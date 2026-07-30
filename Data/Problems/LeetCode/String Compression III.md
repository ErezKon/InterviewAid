# 3163. String Compression III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/string-compression-iii](https://leetcode.com/problems/string-compression-iii)
**Companies:** Amazon, Apple, Google, Meta, Microsoft, Qualcomm, Tcs

---

## Problem Description
Given a string `word` consisting of lowercase letters, compress it by replacing each maximal group of consecutive identical characters with the length of the group (capped at 9) followed by the character. Return the resulting compressed string.

## Examples
- **Input:** `word = "aabccc"` **Output:** `"2a1b3c"`
- **Input:** `word = "aaaaaaaaaaa"` **Output:** `"9a2a"` // groups limited to size 9.
- **Input:** `word = "abc"` **Output:** `"1a1b1c"`

## Approach
**Algorithm:** Simple linear scan (Greedy).
- **Insight:** Process the string from left to right, count up to 9 identical characters, output the count and character, then continue.

### Pseudocode
```text
FUNCTION compressedString(word):
    result ← ""
    i ← 0
    WHILE i < LENGTH(word):
        c ← word[i]
        count ← 0
        WHILE i < LENGTH(word) AND word[i] = c AND count < 9:
            count ← count + 1
            i ← i + 1
        result ← result + STRING(count) + c
    RETURN result
```

## Walkthrough
For `word = "aabccc"`:
| i | char | count | result |
|---|------|-------|--------|
|0|a|2|"2a"|
|2|b|1|"2a1b"|
|3|c|3|"2a1b3c"|
Final result `"2a1b3c"`.

## Complexity Analysis
- **Time:** O(n) where n is length of `word`.
- **Space:** O(1) extra besides output string.

## Follow-Up Questions
- How would you modify the algorithm if the count limit were larger than 9?
- Can you compress the string in-place without using extra space for the result?
- What if the input contains Unicode characters?

## Key Takeaway
A single pass with a counter up to the maximum group size yields the required compression efficiently.
