# 1813. Sentence Similarity III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-similarity-iii](https://leetcode.com/problems/sentence-similarity-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok

---

## Problem Description

Two sentences are similar if you can insert a sentence into one to make it equal to the other. The insertion must be at the beginning, end, or middle (not splitting a word).

---

## Approach

```
FUNCTION areSentencesSimilar(sentence1, sentence2):
    w1 = sentence1.split()
    w2 = sentence2.split()
    IF len(w1) < len(w2): SWAP(w1, w2)

    // Match prefix
    i = 0
    WHILE i < len(w2) AND w1[i] == w2[i]: i += 1

    // Match suffix
    j = 0
    WHILE j < len(w2) - i AND w1[len(w1)-1-j] == w2[len(w2)-1-j]: j += 1

    RETURN i + j >= len(w2)
```

| Time | Space |
|------|-------|
| O(n) | O(n) — word arrays |

---

## Key Takeaway

> Match words from the prefix and suffix of the shorter sentence. If together they cover all words in the shorter sentence, the gap in the middle can be "inserted" to make them equal.
