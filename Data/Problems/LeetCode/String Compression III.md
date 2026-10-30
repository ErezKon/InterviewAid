# 3163. String Compression III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/string-compression-iii](https://leetcode.com/problems/string-compression-iii)
**Companies:** Amazon, Apple, Google, Meta, Microsoft, Qualcomm, Tcs

---

## Problem Description

Given a string `word`, compress it using the following algorithm:

- Begin with an empty string `comp`. While `word` is **not** empty, use the following operation:
  - Remove a maximum length prefix of `word` made of a *single character* `c` repeating **at most** 9 times.
  - Append the length of the prefix followed by `c` to `comp`.

Return the string `comp`.

**Constraints:**
- `1 <= word.length <= 2 * 10^5`
- `word` consists only of lowercase English letters.

## Examples

**Example 1:**
```
Input: word = "abcde"
Output: "1a1b1c1d1e"
Explanation:
Initially, comp = "". Apply the operation 5 times, choosing "a", "b", "c", "d", and "e" as the prefix in each operation.
For each prefix, append "1" followed by the character to comp.
```

**Example 2:**
```
Input: word = "aaaaaaaaaaaaaabb"
Output: "9a5a2b"
Explanation:
Initially, comp = "". Apply the operation 3 times, choosing "aaaaaaaaa", "aaaaa", and "bb" as the prefix in each operation.
- For prefix "aaaaaaaaa", append "9" followed by "a" to comp.
- For prefix "aaaaa", append "5" followed by "a" to comp.
- For prefix "bb", append "2" followed by "b" to comp.
```

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
