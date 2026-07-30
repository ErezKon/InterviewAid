# 1754. Largest Merge Of Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-merge-of-two-strings](https://leetcode.com/problems/largest-merge-of-two-strings)
**Companies:** Snapchat

---

## 1. Problem Description

Given two strings `word1` and `word2`, build the lexicographically largest merge by repeatedly taking the first character from whichever remaining string is lexicographically larger.

---

## 2. Examples

**Example 1:**
```
Input: word1 = "cab", word2 = "abc"
Output: "cabcab"
Explanation: Compare "cab" vs "abc" → "cab" is larger, take 'c'.
Now "ab" vs "abc" → "abc" is larger, take 'a' from word2, etc.
```

**Example 2:**
```
Input: word1 = "aaa", word2 = "bbb"
Output: "bbbaaa"
Explanation: "bbb" is always larger than the remaining "aaa".
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
