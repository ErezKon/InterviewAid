# 843. Guess the Word

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/guess-the-word](https://leetcode.com/problems/guess-the-word)
**Companies:** Amazon, Apple, Bloomberg, Dropbox, General Motors, Google, Meta, Microsoft, Verily, Verkada

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Minimax + Filtering — O(n²) per guess ✅](#3-approach-minimax--filtering--on-per-guess-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given a list of 6-letter words and a `master.guess(word)` API that returns how many characters match the secret word, find the secret in at most 10 guesses.

---

## 2. Key Insight

> Pick the guess that minimizes the worst-case remaining candidate count. After each guess, filter candidates to those with the same match count.

---

## 3. Approach: Minimax + Filtering — O(n²) per guess ✅

```
FUNCTION findSecretWord(words, master):
    candidates = words

    FOR _ ← 0 TO 9:
        // Pick word that minimizes worst-case remaining candidates
        guess = pickBestGuess(candidates)
        matches = master.guess(guess)

        IF matches == 6: RETURN

        // Filter candidates to those with same match count
        candidates = [w for w in candidates
                      if countMatches(w, guess) == matches]

FUNCTION countMatches(a, b):
    RETURN SUM(a[i] == b[i] for i in range(6))
```

---

## 4. Key Takeaway

> **Minimax strategy**: pick the guess that minimizes the maximum group size after filtering. Reduces candidates exponentially, solving in ≤10 guesses.
