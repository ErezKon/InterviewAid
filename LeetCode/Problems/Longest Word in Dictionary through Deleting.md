# 524. Longest Word in Dictionary through Deleting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-in-dictionary-through-deleting](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting)
**Companies:** Google

---

## 1. Problem Description

Find the longest word in the dictionary that is a subsequence of `s`. Break ties lexicographically.

---

## 2. Approach: Sort + Subsequence Check — O(n·L + d·L) ✅

```
FUNCTION findLongestWord(s, dictionary):
    SORT dictionary by (-len, lexicographic)
    FOR word IN dictionary:
        IF isSubsequence(word, s): RETURN word
    RETURN ""

FUNCTION isSubsequence(word, s):
    i = 0
    FOR c IN s:
        IF i < len(word) AND word[i] == c: i += 1
    RETURN i == len(word)
```

| Time | Space |
|------|-------|
| O(d · L · log d + d · |s|) | O(1) extra |

---

## 3. Key Takeaway

> Sort dictionary by length desc, then lex. First word that is a subsequence of `s` is the answer. Two-pointer subsequence check in O(|s|).
