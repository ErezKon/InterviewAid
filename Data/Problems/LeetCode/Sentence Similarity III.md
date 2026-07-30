# 1813. Sentence Similarity III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-similarity-iii](https://leetcode.com/problems/sentence-similarity-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok

---

## Problem Description

Two sentences are similar if you can insert a sentence into one to make it equal to the other. The insertion must be at the beginning, end, or middle (not splitting a word).

---

## Examples

| sentence1 | sentence2 | Output |
|-----------|-----------|--------|
| "I love eating pizza" | "I love pizza" | true |
| "I love eating pizza" | "I love eating pizza with cheese" | true |
| "I love eating pizza" | "I love pizza eating" | false |

*Explanation*: In the first two examples, the shorter sentence can be obtained by inserting a contiguous block into the longer one. In the third example, the order of words differs, so it's not a simple insertion.

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

---

## Walkthrough

Consider the second example: `sentence1 = "I love eating pizza"`, `sentence2 = "I love eating pizza with cheese"`.

1. Split into words: `w1 = [I, love, eating, pizza]`, `w2 = [I, love, eating, pizza, with, cheese]`.
2. Since `w1` is shorter, swap so `w1` becomes the longer array.
3. Match prefix: `i` progresses through `I, love, eating, pizza` → `i = 4`.
4. No suffix needed because `i` already covers all words of the shorter sentence.
5. `i + j = 4 >= len(w2)=4` → return `true`.

---

## Complexity Analysis

**Time:** O(n) where n is the total number of words across both sentences.
**Space:** O(n) for storing the word arrays.

---

## Follow-Up Questions

- How would you modify the solution to handle transitive similarity (Sentence Similarity II)?
- Could the insertion be split into multiple non‑contiguous blocks?

---

## Key Takeaway

> Match words from the prefix and suffix of the shorter sentence. If together they cover all words in the shorter sentence, the gap in the middle can be "inserted" to make them equal.
