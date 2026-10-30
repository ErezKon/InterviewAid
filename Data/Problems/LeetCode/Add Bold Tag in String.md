# 616. Add Bold Tag in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-bold-tag-in-string](https://leetcode.com/problems/add-bold-tag-in-string)
**Companies:** Google, Gusto, Meta, Tiktok

---

## Problem Description
You are given a string `s` and an array of strings `words`.

You should add a closed pair of bold tag `<b>` and `</b>` to wrap the substrings in `s` that exist in `words`.

- If two such substrings overlap, you should wrap them together with only one pair of closed bold-tag.
- If two substrings wrapped by bold tags are consecutive, you should combine them.

Return `s` *after adding the bold tags*.

**Constraints:**
- `1 <= s.length <= 1000`
- `0 <= words.length <= 100`
- `1 <= words[i].length <= 1000`
- `s` and `words[i]` consist of English letters and digits.
- All the values of `words` are **unique**.

**Note:** This question is the same as 758. Bold Words in String.

## Examples
```
Example 1:
  Input: s = "abcxyz123", words = ["abc","123"]
  Output: "<b>abc</b>xyz<b>123</b>"
  Explanation: The two strings of words are substrings of s as following: "abcxyz123".
  We add <b> before each substring and </b> after each substring.
```
```
Example 2:
  Input: s = "aaabbb", words = ["aa","b"]
  Output: "<b>aaabbb</b>"
  Explanation:
  "aa" appears as a substring two times: "[aa]abbb" and "a[aa]bbb".
  "b" appears as a substring three times: "aaa[b]bb", "aaab[b]b", and "aaabb[b]".
  We add <b> before each substring and </b> after each substring: "<b>a<b>a</b>a</b><b>b</b><b>b</b><b>b</b>".
  Since the first two <b>'s overlap, we merge them: "<b>aaa</b><b>b</b><b>b</b><b>b</b>".
  Since now the four <b>'s are consecutive, we merge them: "<b>aaabbb</b>".
```

## Approach
1. **Mark bold positions** – Create a boolean array `bold` of length `len(s)`. For each word, find all its occurrences in `s` (using `str.find` in a loop) and set the corresponding indices in `bold` to `True`.
2. **Merge intervals while building the result** – Iterate through `s`. When entering a bold region (`bold[i]` is `True` and either `i == 0` or `bold[i-1]` is `False`), append `<b>` to the result. Append the current character. When leaving a bold region (`bold[i]` is `True` and either `i == len(s)-1` or `bold[i+1]` is `False`), append `</b>`.

### Pseudocode
```text
FUNCTION addBoldTag(s, words):
    n ← len(s)
    bold ← [false] * n
    FOR word IN words:
        start ← s.find(word)
        WHILE start != -1:
            FOR i FROM start TO start + len(word) - 1:
                bold[i] ← true
            start ← s.find(word, start + 1)

    result ← []
    FOR i FROM 0 TO n-1:
        IF bold[i] AND (i == 0 OR NOT bold[i-1]):
            result.APPEND("<b>")
        result.APPEND(s[i])
        IF bold[i] AND (i == n-1 OR NOT bold[i+1]):
            result.APPEND("</b>")
    RETURN "".JOIN(result)
```

## Walkthrough
Consider `s = "aaabbcc"` and `words = ["aaa","aab","bc"]`:
1. After processing "aaa", `bold[0..2] = true`.
2. After "aab", `bold[1..3] = true` (now indices 0‑3 are bold).
3. After "bc", `bold[4..5] = true`.
4. The final `bold` array is `[T,T,T,T,T,T,F]`.
5. While building the result we start a `<b>` at index 0, never close it until index 5, producing `<b>aaabbc</b>` and then append the last `c`.

## Complexity Analysis
- **Time Complexity:** `O(N * W * L)` where `N` is `len(s)`, `W` is the number of words, and `L` is the average word length (due to scanning each word's occurrences). In practice this is linear in the total length of `s` plus total matches.
- **Space Complexity:** `O(N)` for the `bold` array and the output string.

## Follow‑Up Questions
- How would you solve the problem without extra `O(N)` space?
- Can you adapt the solution to work with Unicode characters?
- How would you handle a very large list of words efficiently (e.g., using a Trie)?

## Key Takeaway
Marking bold positions in a boolean array and then merging them while constructing the output yields a clean, linear‑time solution.
