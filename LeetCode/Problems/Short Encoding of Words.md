# 820. Short Encoding of Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/short-encoding-of-words](https://leetcode.com/problems/short-encoding-of-words)
**Companies:** Apple

---

## Problem Description

Find the length of the shortest reference string that encodes all given words. A word is encoded if it appears as a suffix ending with `#` in the reference string.

---

## Key Insight

> A word is redundant if it's a suffix of another word. Remove all words that are suffixes of other words, then the answer is the sum of remaining word lengths + 1 (for each `#`).

---

## Approach

```
FUNCTION minimumLengthEncoding(words):
    wordSet ← SET(words)
    FOR word IN words:
        FOR i ← 1 TO len(word) - 1:
            wordSet.DISCARD(word[i:])  // remove suffixes
    RETURN SUM(len(w) + 1 for w in wordSet)
```

| Time | Space |
|------|-------|
| O(Σ wᵢ²) | O(Σ wᵢ) |

---

## Key Takeaway

> Suffix deduplication — remove words that are suffixes of longer words. Can also be solved with a **reverse trie** (insert reversed words).
