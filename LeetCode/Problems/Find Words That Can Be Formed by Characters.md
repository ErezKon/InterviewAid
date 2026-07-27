# 1160. Find Words That Can Be Formed by Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-words-that-can-be-formed-by-characters](https://leetcode.com/problems/find-words-that-can-be-formed-by-characters)
**Companies:** Amazon, Bloomberg, Google, Karat, Meta, Microsoft, Paypal

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Frequency Counting — O(n · L) ✅](#2-approach-frequency-counting--on--l-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given an array of `words` and a string `chars`, return the sum of lengths of all words that can be formed using the characters in `chars` (each used at most once per word).

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= chars.length <= 100`

---

## 2. Approach: Frequency Counting — O(n · L) ✅

```
FUNCTION countCharacters(words, chars):
    charCount = Counter(chars)
    total = 0
    FOR word IN words:
        wordCount = Counter(word)
        IF all(wordCount[c] <= charCount[c] for c in wordCount):
            total += len(word)
    RETURN total
```

---

## 3. Key Takeaway

> For each word, check if its character frequencies are a subset of the available characters. Sum lengths of valid words.
