# 737. Sentence Similarity II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-similarity-ii](https://leetcode.com/problems/sentence-similarity-ii)
**Companies:** Amazon, Apple, Google, Rippling

---

## Problem Description

Two sentences are similar if each word pair is **transitively** similar via given pairs. Return `true` if the sentences are similar.

---

## Approach: Union-Find — O(P + N) ✅

```
FUNCTION areSentencesSimilarTwo(sentence1, sentence2, similarPairs):
    IF len(sentence1) != len(sentence2): RETURN false
    uf = UnionFind()
    FOR [a, b] IN similarPairs: uf.union(a, b)
    RETURN all(uf.find(w1) == uf.find(w2) for w1, w2 in zip(sentence1, sentence2))
```

Transitive similarity = connected components. Union-Find on word pairs.

| Time | Space |
|------|-------|
| O(P·α(P) + N) | O(P) |

---

## Key Takeaway

> Transitive relationships → Union-Find. Build connected components from the similarity pairs, then check if corresponding words are in the same component.
