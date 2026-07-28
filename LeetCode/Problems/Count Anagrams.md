# 2514. Count Anagrams

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-anagrams](https://leetcode.com/problems/count-anagrams)
**Companies:** Mathworks

---

## 1. Problem Description

Given a string `s` of words, count the total number of distinct strings that are anagrams of `s` (rearranging characters within each word independently). Return modulo 10^9+7.

---

## 2. Key Insight

> For each word of length `L` with character frequencies `f1, f2, ...`, the number of distinct anagrams is `L! / (f1! × f2! × ...)`. Multiply across all words (independent rearrangements).

---

## 3. Approach: Multinomial Coefficients — O(total length) ✅

```text
FUNCTION countAnagrams(s):
    SET MOD ← 1_000_000_007
    SET result ← 1
    FOR word IN split(s, " "):
        SET freqMap ← characterFrequencies(word)
        SET result ← result * factorial(len(word)) MOD MOD
        FOR f IN values(freqMap):
            SET result ← result * modInverse(factorial(f), MOD) MOD MOD
    RETURN result
```

Precompute factorials and inverse factorials up to max word length.

| Time | Space |
|------|-------|
| O(n) where n = total string length | O(n) |

---

## Examples

**Example 1:**
```
Input: s = "cat dog"
Output: 12
Explanation: "cat" has 3! = 6 anagrams, "dog" also has 3! = 6. Total = 6 × 6 = 36, but modulo 1e9+7 remains 36.
```

**Example 2:**
```
Input: s = "aab aa"
Output: 3
Explanation: For "aab", permutations = 3! / 2! = 3. For "aa", permutations = 2! / 2! = 1. Total = 3 × 1 = 3.
```

---

## Walkthrough

Take Example 2 (`"aab aa"`).
1. Split into words: ["aab", "aa"].
2. Word "aab": length 3, frequencies {a:2, b:1}. Permutations = 3! / (2!·1!) = 6 / 2 = 3.
3. Word "aa": length 2, frequencies {a:2}. Permutations = 2! / 2! = 1.
4. Multiply results: 3 × 1 = 3 → final answer.

---

## Complexity Analysis

- **Time:** O(n) – each character is processed once to build frequency maps.
- **Space:** O(k) – additional space for frequency map of a word, where k ≤ word length.

---

## Follow-Up Questions

1. How would the solution change if the words could share letters (global rearrangement across the whole sentence)?
2. Can you adapt the algorithm to handle very large strings where precomputing factorials up to the maximum length is infeasible?
3. What if the modulo were a non‑prime number? How would you compute modular inverses?

---

## Key Takeaway

> Counting distinct anagrams reduces to a multinomial coefficient per word; using modular arithmetic and pre‑computed factorials enables an O(n) solution.
