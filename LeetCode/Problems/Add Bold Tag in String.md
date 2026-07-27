# 616. Add Bold Tag in String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-bold-tag-in-string](https://leetcode.com/problems/add-bold-tag-in-string)
**Companies:** Google, Gusto, Meta, Tiktok

---

## Problem Description
Given a string `s` and a list of strings `words`, you need to add bold tags `<b>` and `</b>` to wrap any substring of `s` that matches **any** word in `words`. If two such substrings overlap or are consecutive, they should be merged into a single bold region.

**Constraints**
- `1 <= s.length <= 1000`
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- All strings consist of lowercase English letters.

## Examples
| Input | Output |
|-------|--------|
| `s = "abcxyz123"`<br>`words = ["abc","123"]` | `<b>abc</b>xyz<b>123</b>` |
| `s = "aaabbcc"`<br>`words = ["aaa","aab","bc"]` | `<b>aaabbc</b>c` |

Explanation: In the second example the bold intervals `[0,4]` (from "aaa" and "aab") and `[4,6]` (from "bc") overlap, so they are merged into a single `<b>` region.

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
