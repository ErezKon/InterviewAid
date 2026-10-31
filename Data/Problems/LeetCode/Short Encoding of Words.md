# 820. Short Encoding of Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/short-encoding-of-words](https://leetcode.com/problems/short-encoding-of-words)
**Companies:** Apple

---

## Problem Description

A **valid encoding** of an array of `words` is any reference string `s` and array of indices `indices` such that:

- `words.length == indices.length`
- The reference string `s` ends with the `'#'` character.
- For each index `indices[i]`, the **substring** of `s` starting from `indices[i]` and up to (but not including) the next `'#'` character is equal to `words[i]`.

Given an array of `words`, return *the **length of the shortest reference string*** `s` *possible of any **valid encoding** of* `words`*.*

**Constraints:**

- `1 <= words.length <= 2000`
- `1 <= words[i].length <= 7`
- `words[i]` consists of only lowercase letters.

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

```
Example 1:
  Input: words = ["time", "me", "bell"]
  Output: 10
  Explanation: A valid encoding would be s = "time#bell#" and indices = [0, 2, 5].
  words[0] = "time", the substring of s starting from indices[0] = 0 to the next '#' is "time"
  words[1] = "me", the substring of s starting from indices[1] = 2 to the next '#' is "me"
  words[2] = "bell", the substring of s starting from indices[2] = 5 to the next '#' is "bell"
```

```
Example 2:
  Input: words = ["t"]
  Output: 2
  Explanation: A valid encoding would be s = "t#" and indices = [0].
```

---

## Walkthrough

1. Insert all words into a set.
2. For each word, remove all its suffixes from the set.
3. After processing, the set contains only words that are not suffixes of any other word.
4. Sum the length of each remaining word plus one for the trailing `#`.

For the first example, removing suffixes yields the set {"time", "bell"}. The total length is `LEN("time")+1 + LEN("bell")+1 = 5+5 = 10`.

---

## Complexity Analysis

- **Time:** O(Σ |wᵢ|²) – each word generates all its suffixes.
- **Space:** O(Σ |wᵢ|) – storing the set of words.

---

## Key Takeaway

> Suffix deduplication — remove words that are suffixes of longer words. This can also be solved with a **reverse trie** (insert reversed words).
