# 734. Sentence Similarity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sentence-similarity](https://leetcode.com/problems/sentence-similarity)
**Companies:** Google

---

## Problem Description

We can represent a sentence as an array of words, for example, the sentence `"I am happy with leetcode"` can be represented as `arr = ["I","am","happy","with","leetcode"]`.

Given two sentences `sentence1` and `sentence2` each represented as a string array and given an array of string pairs `similarPairs` where `similarPairs[i] = [xi, yi]` indicates that the two words `xi` and `yi` are similar.

Return *`true` if `sentence1` and `sentence2` are similar, or `false` if they are not similar*.

Two sentences are similar if:

- They have **the same length** (i.e., the same number of words)
- `sentence1[i]` and `sentence2[i]` are similar.

Notice that a word is always similar to itself, also notice that the similarity relation is not transitive. For example, if the words `a` and `b` are similar, and the words `b` and `c` are similar, `a` and `c` are **not necessarily similar**.

**Constraints:**

- `1 <= sentence1.length, sentence2.length <= 1000`
- `1 <= sentence1[i].length, sentence2[i].length <= 20`
- `sentence1[i]` and `sentence2[i]` consist of English letters.
- `0 <= similarPairs.length <= 1000`
- `similarPairs[i].length == 2`
- `1 <= xi.length, yi.length <= 20`
- `xi` and `yi` consist of lower-case and upper-case English letters.
- All the pairs `(xi, yi)` are **distinct**.

---

## Examples

```
Example 1:
  Input: sentence1 = ["great","acting","skills"], sentence2 = ["fine","drama","talent"], similarPairs = [["great","fine"],["drama","acting"],["skills","talent"]]
  Output: true
  Explanation: The two sentences have the same length and each word i of sentence1 is also similar to the corresponding word in sentence2.
```

```
Example 2:
  Input: sentence1 = ["great"], sentence2 = ["great"], similarPairs = []
  Output: true
  Explanation: A word is similar to itself.
```

```
Example 3:
  Input: sentence1 = ["great"], sentence2 = ["doubleplus","good"], similarPairs = [["great","doubleplus"]]
  Output: false
  Explanation: As they don't have the same length, we return false.
```

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

> Direct word-by-word comparison using a hash set of allowed pairs solves the problem efficiently without needing transitive closure.
