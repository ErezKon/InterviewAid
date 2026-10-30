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

You are given an array of unique strings `words` where `words[i]` is six letters long. One word of `words` was chosen as a secret word.

You are also given the helper object `Master`. You may call `Master.guess(word)` where `word` is a six-letter-long string, and it must be from `words`. `Master.guess(word)` returns:

- `-1` if `word` is not from `words`, or
- an integer representing the number of exact matches (value and position) of your guess to the secret word.

There is a parameter `allowedGuesses` for each test case where `allowedGuesses` is the maximum number of times you can call `Master.guess(word)`.

For each test case, you should call `Master.guess` with the secret word without exceeding the maximum number of allowed guesses. You will get:

- **`"Either you took too many guesses, or you did not find the secret word."`** if you called `Master.guess` more than `allowedGuesses` times or if you did not call `Master.guess` with the secret word, or
- **`"You guessed the secret word correctly."`** if you called `Master.guess` with the secret word with the number of calls to `Master.guess` less than or equal to `allowedGuesses`.

The test cases are generated such that you can guess the secret word with a reasonable strategy (other than using the bruteforce method).

**Constraints:**
- `1 <= words.length <= 100`
- `words[i].length == 6`
- `words[i]` consist of lowercase English letters.
- All the strings of `words` are **unique**.
- `secret` exists in `words`.
- `10 <= allowedGuesses <= 30`

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

```
Example 1:
  Input: secret = "acckzz", words = ["acckzz","ccbazz","eiowzz","abcczz"], allowedGuesses = 10
  Output: You guessed the secret word correctly.
  Explanation:
  master.guess("aaaaaa") returns -1, because "aaaaaa" is not in words.
  master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6 matches.
  master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.
  master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.
  master.guess("abcczz") returns 4, because "abcczz" has 4 matches.
  We made 5 calls to master.guess, and one of them was the secret, so we pass the test case.
```
```
Example 2:
  Input: secret = "hamada", words = ["hamada","khaled"], allowedGuesses = 10
  Output: You guessed the secret word correctly.
  Explanation: Since there are two words, you can guess both.
```

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
