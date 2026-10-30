# 1813. Sentence Similarity III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sentence-similarity-iii](https://leetcode.com/problems/sentence-similarity-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Tiktok

---

## Problem Description

You are given two strings `sentence1` and `sentence2`, each representing a **sentence** composed of words. A sentence is a list of **words** that are separated by a **single** space with no leading or trailing spaces. Each word consists of only uppercase and lowercase English characters.

Two sentences `s1` and `s2` are considered **similar** if it is possible to insert an arbitrary sentence (*possibly empty*) inside one of these sentences such that the two sentences become equal. **Note** that the inserted sentence must be separated from existing words by spaces.

For example,

- `s1 = "Hello Jane"` and `s2 = "Hello my name is Jane"` can be made equal by inserting `"my name is"` between `"Hello"` and `"Jane"` in s1.
- `s1 = "Frog cool"` and `s2 = "Frogs are cool"` are **not** similar, since although there is a sentence `"s are"` inserted into `s1`, it is not separated from `"Frog"` by a space.

Given two sentences `sentence1` and `sentence2`, return **true** if `sentence1` and `sentence2` are **similar**. Otherwise, return **false**.

**Constraints:**

- `1 <= sentence1.length, sentence2.length <= 100`
- `sentence1` and `sentence2` consist of lowercase and uppercase English letters and spaces.
- The words in `sentence1` and `sentence2` are separated by a single space.

---

## Examples

```
Example 1:
  Input: sentence1 = "My name is Haley", sentence2 = "My Haley"
  Output: true
  Explanation: sentence2 can be turned to sentence1 by inserting "name is" between "My" and "Haley".
```

```
Example 2:
  Input: sentence1 = "of", sentence2 = "A lot of words"
  Output: false
  Explanation: No single sentence can be inserted inside one of the sentences to make it equal to the other.
```

```
Example 3:
  Input: sentence1 = "Eating right now", sentence2 = "Eating"
  Output: true
  Explanation: sentence2 can be turned to sentence1 by inserting "right now" at the end of the sentence.
```

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
