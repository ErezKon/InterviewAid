# 734. Sentence Similarity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sentence-similarity](https://leetcode.com/problems/sentence-similarity)
**Companies:** Google

---

## Problem Description

Two sentences are similar if they have the same length and each word pair is either equal or directly listed in `similarPairs` (not transitive).

---

## Examples

| sentence1 | sentence2 | similarPairs | Output |
|-----------|-----------|--------------|--------|
| ["great","acting","skills"] | ["fine","acting","talent"] | [["great","fine"],["skills","talent"]] | true |
| ["great","acting","skills"] | ["great","acting","skills"] | [] | true |
| ["great","acting","skills"] | ["fine","acting","talent"] | [["great","good"]] | false |

*Explanation*: Each position must either match exactly or be a pair listed in `similarPairs`.

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

---

## Walkthrough

Consider `sentence1 = ["great","acting","skills"]`, `sentence2 = ["fine","acting","talent"]`, `similarPairs = [["great","fine"],["skills","talent"]]`.

1. Lengths are equal (3).
2. Build `pairSet` containing {("great","fine"), ("fine","great"), ("skills","talent"), ("talent","skills")}.
3. Iterate positions:
   - Position 0: "great" vs "fine" → not equal, but ("great","fine") in `pairSet` → ok.
   - Position 1: "acting" vs "acting" → equal → ok.
   - Position 2: "skills" vs "talent" → not equal, but ("skills","talent") in `pairSet` → ok.
4. All positions satisfy condition → return `true`.

---

## Complexity Analysis

**Time:** O(N + P) where N is number of words and P is number of similarity pairs.
**Space:** O(P) for the pair set.

---

## Follow-Up Questions

- How would you handle transitive similarity (Sentence Similarity II)?
- What if the sentences have different lengths but allow insertion of words?

---

## Key Takeaway

> Direct word‑by‑word comparison using a hash set of allowed pairs solves the problem efficiently without needing transitive closure.
