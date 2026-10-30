# 1754. Largest Merge Of Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-merge-of-two-strings](https://leetcode.com/problems/largest-merge-of-two-strings)
**Companies:** Snapchat

---

## 1. Problem Description

You are given two strings `word1` and `word2`. You want to construct a string `merge` in the following way: while either `word1` or `word2` are non-empty, choose **one** of the following options:

- If `word1` is non-empty, append the **first** character in `word1` to `merge` and delete it from `word1`.
  - For example, if `word1 = "abc"` and `merge = "dv"`, then after choosing this operation, `word1 = "bc"` and `merge = "dva"`.
- If `word2` is non-empty, append the **first** character in `word2` to `merge` and delete it from `word2`.
  - For example, if `word2 = "abc"` and `merge = ""`, then after choosing this operation, `word2 = "bc"` and `merge = "a"`.

Return *the lexicographically **largest*** `merge` *you can construct*.

A string `a` is lexicographically larger than a string `b` (of the same length) if in the first position where `a` and `b` differ, `a` has a character strictly larger than the corresponding character in `b`. For example, `"abcd"` is lexicographically larger than `"abcc"` because the first position they differ is at the fourth character, and `d` is greater than `c`.

**Constraints:**
- `1 <= word1.length, word2.length <= 3000`
- `word1` and `word2` consist only of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: word1 = "cabaa", word2 = "bcaaa"
  Output: "cbcabaaaaa"
  Explanation: One way to get the lexicographically largest merge is:
  - Take from word1: merge = "c", word1 = "abaa", word2 = "bcaaa"
  - Take from word2: merge = "cb", word1 = "abaa", word2 = "caaa"
  - Take from word2: merge = "cbc", word1 = "abaa", word2 = "aaa"
  - Take from word1: merge = "cbca", word1 = "baa", word2 = "aaa"
  - Take from word1: merge = "cbcab", word1 = "aa", word2 = "aaa"
  - Append the remaining 5 a's from word1 and word2 at the end of merge.
```

```
Example 2:
  Input: word1 = "abcabc", word2 = "abdcaba"
  Output: "abdcabcabcaba"
```

---

## 3. Approach: Greedy Comparison — O((m+n)²) ✅

```text
FUNCTION largestMerge(word1, word2):
    merge ← []
    i ← 0; j ← 0
    WHILE i < LENGTH(word1) AND j < LENGTH(word2):
        IF SUBSTRING(word1, i) >= SUBSTRING(word2, j):
            APPEND merge WITH word1[i]
            i ← i + 1
        ELSE:
            APPEND merge WITH word2[j]
            j ← j + 1
    // Append the remaining suffixes
    APPEND merge WITH SUBSTRING(word1, i) + SUBSTRING(word2, j)
    RETURN CONCATENATE(merge)
```

---

## 4. Walkthrough

Take `word1 = "cab"`, `word2 = "abc"`.
1. Compare "cab" vs "abc" → "cab" larger → take 'c'.
2. Now `word1 = "ab"`, `word2 = "abc"`. Compare "ab" vs "abc" → "abc" larger → take 'a' from `word2`.
3. `word1 = "ab"`, `word2 = "bc"`. Compare "ab" vs "bc" → "bc" larger → take 'b' from `word2`.
4. Continue similarly until both strings are exhausted, producing "cabcab".

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O((m+n)²) – each step may compare two suffixes of length up to O(m+n) | O(m+n) for the result string |

---

## 6. Follow‑Up Questions

* How would you improve the time complexity to O(m+n) using a suffix‑array or rolling hash?
* What if the merge must be the lexicographically smallest instead?
* How does the algorithm change for more than two input strings?

---

## Key Takeaway

> Always pick from the string whose remaining suffix is lexicographically larger. Full suffix comparison handles tiebreaking correctly.
