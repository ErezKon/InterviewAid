# 734. Sentence Similarity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sentence-similarity](https://leetcode.com/problems/sentence-similarity)
**Companies:** Google

---

## Problem Description

Two sentences are similar if they have the same length and each word pair is either equal or directly listed in `similarPairs` (not transitive).

---

## Approach

```
FUNCTION areSentencesSimilar(sentence1, sentence2, similarPairs):
    IF LEN(sentence1) != LEN(sentence2): RETURN false
    pairSet ← SET of (a,b) and (b,a) for each pair in similarPairs
    FOR w1, w2 IN ZIP(sentence1, sentence2):
        IF w1 != w2 AND (w1, w2) NOT IN pairSet: RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(P + N) | O(P) — pair set |

---

## Key Takeaway

> Non-transitive similarity — just a direct lookup in a set of pairs. Contrast with Sentence Similarity II (#737) which requires Union-Find for transitive similarity.
