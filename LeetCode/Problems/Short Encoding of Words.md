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

```text
FUNCTION minimumLengthEncoding(words):
    wordSet ← SET(words)
    FOR word IN words:
        FOR i ← 1 TO LEN(word) - 1:
            wordSet.DISCARD(word[i:])  // remove suffixes
    RETURN SUM(LEN(w) + 1 FOR w IN wordSet)
```

---

## Examples

**Example 1:**
```
words = ["time", "me", "bell"]
```
The optimal encoding is `"time#bell#"`, length **10**.

**Example 2:**
```
words = ["t"]
```
Encoding is `"t#"`, length **2**.

---

## Walkthrough

1. Insert all words into a set.
2. For each word, remove all its suffixes from the set.
3. After processing, the set contains only words that are not suffixes of any other word.
4. Sum the length of each remaining word plus one for the trailing `#`.

For the first example, removing suffixes yields the set {"time", "bell"}. The total length is `LEN("time")+1 + LEN("bell")+1 = 5+5 = 10`.

---

## Complexity Analysis

- **Time:** O(Σ |wᵢ|²) – each word generates all its suffixes.
- **Space:** O(Σ |wᵢ|) – storing the set of words.

---

## Key Takeaway

> Suffix deduplication — remove words that are suffixes of longer words. This can also be solved with a **reverse trie** (insert reversed words).
