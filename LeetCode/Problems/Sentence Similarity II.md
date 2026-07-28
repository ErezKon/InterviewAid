# 737. Sentence Similarity II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-similarity-ii](https://leetcode.com/problems/sentence-similarity-ii)
**Companies:** Amazon, Apple, Google, Rippling

---

## Problem Description

Given two sentences (as arrays of words) and a list of similar word pairs, determine if the sentences are similar. Two words are similar if they are the same or belong to the same connected component formed by the transitive closure of the given pairs.

---

## Examples

**Example 1:**
```
Input: sentence1 = ["great", "acting", "skills"],
       sentence2 = ["fine", "drama", "talent"],
       similarPairs = [["great","good"],["fine","good"],["acting","drama"],["skills","talent"]]
Output: true
Explanation: "great"~"good"~"fine" and "acting"~"drama", "skills"~"talent".
```

**Example 2:**
```
Input: sentence1 = ["I","love","leetcode"],
       sentence2 = ["I","love","onepiece"],
       similarPairs = []
Output: false
Explanation: The last words are not similar.
```

---

## Approach: Union‑Find — O(P + N)

```text
FUNCTION areSentencesSimilarTwo(sentence1, sentence2, similarPairs):
    IF LENGTH(sentence1) ≠ LENGTH(sentence2):
        RETURN false
    // Build Union‑Find structure for all words
    uf ← NEW UnionFind()
    FOR each pair [a, b] IN similarPairs:
        uf.union(a, b)
    // Verify each position
    FOR i ← 0 TO LENGTH(sentence1) - 1:
        w1 ← sentence1[i]
        w2 ← sentence2[i]
        IF w1 = w2: CONTINUE
        IF NOT uf.connected(w1, w2):
            RETURN false
    RETURN true
```

---

## Walkthrough

| Index | word1 | word2 | Same? | Union‑Find Check |
|------|-------|-------|-------|------------------|
| 0 | great | fine | No | great ↔ good ↔ fine → connected → true |
| 1 | acting | drama | No | acting ↔ drama → connected → true |
| 2 | skills | talent | No | skills ↔ talent → connected → true |

All positions pass, so the sentences are similar.

---

## Complexity Analysis

- **Time:** O(P + N) – building unions for P pairs and checking N word positions.
- **Space:** O(P) – Union‑Find parent map for distinct words.

---

## Follow‑Up Questions

1. How would you handle case‑insensitive word comparison?
2. Can you solve it without extra space by using a hashmap of equivalence classes?
3. What if the similarity relation were not transitive – how would the algorithm change?

---

## Key Takeaway

> Transitive word similarity can be modeled as connected components in an undirected graph; Union‑Find efficiently builds and queries these components.
