# 1160. Find Words That Can Be Formed by Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-words-that-can-be-formed-by-characters](https://leetcode.com/problems/find-words-that-can-be-formed-by-characters)
**Companies:** Amazon, Bloomberg, Google, Karat, Meta, Microsoft, Paypal

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Frequency Counting — O(n · L) ✅](#3-approach-frequency-counting--on--l-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

You are given an array of strings `words` and a string `chars`.

A string is **good** if it can be formed by characters from `chars` (each character can only be used once for **each** word in `words`).

Return *the sum of lengths of all good strings in words*.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length, chars.length <= 100`
- `words[i]` and `chars` consist of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
```

**Example 2:**
```
Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
Output: 10
Explanation: The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.
```

---

## 3. Approach: Frequency Counting — O(n · L) ✅

```text
FUNCTION countCharacters(words, chars):
    charCount ← COUNTER(chars)
    total ← 0
    FOR each word IN words DO
        wordCount ← COUNTER(word)
        IF FOR ALL c IN wordCount: wordCount[c] ≤ charCount[c] THEN
            total ← total + LENGTH(word)
    RETURN total
```
---

## 4. Walkthrough

Consider `words = ["cat","bt","hat","tree"]`, `chars = "atach"`.
1. `charCount` = {a:2, t:1, c:1, h:1}.
2. Word "cat": `wordCount` = {c:1, a:1, t:1} → all ≤ `charCount` → add 3.
3. Word "bt": `wordCount` = {b:1, t:1} → 'b' not in `charCount` → skip.
4. Word "hat": `wordCount` = {h:1, a:1, t:1} → all ≤ `charCount` → add 3 (total 6).
5. Word "tree": `wordCount` = {t:1, r:1, e:2} → 'r' and 'e' missing → skip.
Result = 6.
---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · L) — each word of length L scanned to build its frequency map |
| **Space** | O(C) — frequency map for `chars` (C ≤ 26 for lowercase letters) |
---

## 6. Key Takeaway

> Build a frequency map of the available characters and verify each word against it; sum lengths of words that fit.
