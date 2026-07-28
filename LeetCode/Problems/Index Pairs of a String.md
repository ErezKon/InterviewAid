# 1065. Index Pairs of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/index-pairs-of-a-string](https://leetcode.com/problems/index-pairs-of-a-string)
**Companies:** Amazon

---

## 1. Problem Description

Given a string and a list of words, return all `[i, j]` index pairs where `text[i..j]` matches a word from the list. Sort by start then end index.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `text = "thestory"`, `words = ["the", "story", "sto"]` | `[[0,2],[3,7],[3,5]]` | Substrings "the" (0‑2), "story" (3‑7) and "sto" (3‑5) match words.
| `text = "abcd"`, `words = ["a","bc","d"]` | `[[0,0],[1,2],[3,3]]` | Each word appears as a substring.

## 3. Approach: Brute Force / Trie — O(n · m · k) ✅

```text
FUNCTION indexPairs(text, words):
    // Build a quick‑lookup set of words
    SET wordSet ← SET(words)
    SET result ← []
    FOR i ← 0 TO LENGTH(text) - 1:
        FOR j ← i TO LENGTH(text) - 1:
            IF text[i..j] IN wordSet:
                APPEND [i, j] TO result
    RETURN sorted(result)  // sort by start then end index
```

## 4. Walkthrough

Consider `text = "thestory"` and `words = ["the", "story", "sto"]`.

| i (start) | j (end) | Substring | In wordSet? | Action |
|-----------|---------|-----------|-------------|--------|
| 0 | 0 | "t" | No | – |
| 0 | 1 | "th" | No | – |
| 0 | 2 | "the" | Yes | Append `[0,2]` |
| … | … | … | … | … |
| 3 | 5 | "sto" | Yes | Append `[3,5]` |
| 3 | 7 | "story" | Yes | Append `[3,7]` |

After scanning all start positions, we sort the collected pairs to obtain `[[0,2],[3,5],[3,7]]`.

## 5. Complexity Analysis

- **Time:** O(n · m · k) in the brute‑force version, where *n* is the length of `text`, *m* is the average word length, and *k* is the number of words. Using a Trie reduces it to O(n · L) where *L* is the maximum word length.
- **Space:** O(k · L) for the Trie (or O(k) for the hash set) plus O(p) for the result list, where *p* is the number of matching pairs.

## 6. Follow‑Up Questions

- How would you modify the solution to return the actual substrings instead of index pairs?
- Can you design an algorithm that works in O(n) time using a Trie?
- How would you handle overlapping words and prioritize longer matches?

## Key Takeaway

> Check all substrings against a word set. For efficiency, use a Trie of words and traverse from each starting index.
