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

```text
FUNCTION findSecretWord(words, master):
    candidates ← words
    FOR attempt ← 0 TO 9:
        guess ← pickBestGuess(candidates)
        matches ← master.guess(guess)
        IF matches == 6: RETURN
        candidates ← [w FOR w IN candidates IF countMatches(w, guess) == matches]

FUNCTION countMatches(a, b):
    RETURN SUM(a[i] == b[i] FOR i FROM 0 TO 5)
```

---

## 4. Examples

**Example 1:**
- Input: `words = ["acckzz","ccbazz","eiowzz","abcczz"]`
- Output: Secret word is guessed within 10 attempts.
- Explanation: Using the minimax strategy, each guess reduces the candidate set dramatically, guaranteeing success.

**Example 2:**
- Input: `words = ["aaaaaa","bbbbbb","cccccc","dddddd"]`
- Output: Failure if the secret is not among the guessed words.
- Explanation: No overlap in characters leads to ambiguous feedback; the algorithm still exhausts possibilities.

---

## 5. Walkthrough

| Step | Guess | Matches | Remaining Candidates |
|------|-------|---------|----------------------|
| 1    | "acckzz" | 2 | `["ccbazz","eiowzz","abcczz"]` |
| 2    | "ccbazz" | 1 | `["acckzz","eiowzz"]` |
| 3    | "eiowzz" | 0 | `["acckzz"]` |
| 4    | "acckzz" | 6 | `[]` (secret found) |

The algorithm selects the guess that minimizes the largest group size after filtering, ensuring rapid convergence.

---

## 6. Complexity Analysis

- **Time:** O(n²) per guess due to evaluating all pairwise match counts; at most 10 guesses → O(10·n²) ≈ O(n²).
- **Space:** O(n) to store candidate list and match counts.

---

## 7. Follow-Up Questions

- How would you adapt the solution if the word length were variable?
- Can you reduce the time complexity using precomputed match matrices?
- What if the API allowed only a limited number of total character comparisons?

---

## Key Takeaway

> **Minimax strategy**: pick the guess that minimizes the maximum group size after filtering. Reduces candidates exponentially, solving in ≤10 guesses.
