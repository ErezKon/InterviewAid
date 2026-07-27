# 1065. Index Pairs of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/index-pairs-of-a-string](https://leetcode.com/problems/index-pairs-of-a-string)
**Companies:** Amazon

---

## 1. Problem Description

Given a string and a list of words, return all `[i, j]` index pairs where `text[i..j]` matches a word from the list. Sort by start then end index.

## 2. Approach: Brute Force / Trie — O(n · m · k) ✅

```
FUNCTION indexPairs(text, words):
    result ← []
    wordSet ← SET(words)
    FOR i ← 0 TO LENGTH(text) - 1 DO
        FOR j ← i TO LENGTH(text) - 1 DO
            IF text[i..j] IN wordSet: result.ADD([i, j])
    RETURN sorted(result)
```

## Key Takeaway

> Check all substrings against word set. For efficiency, use a Trie of words and traverse from each starting index.
