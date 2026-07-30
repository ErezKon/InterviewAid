# 290. Word Pattern

**Difficulty:** 🟢 Easy
**Acceptance:** 44.0%
**LeetCode:** [https://leetcode.com/problems/word-pattern](https://leetcode.com/problems/word-pattern)
**Companies:** Amazon, Bloomberg, Dropbox, Google, Meta, Microsoft, Nvidia, Uber, Zoho

---

## 1. Problem Description

Given a `pattern` and a string `s`, check if `s` follows the same pattern (bijection between letters and words).

---

## 2. Examples

| pattern | s | Output |
|---------|---|--------|
| "abba" | "dog cat cat dog" | true |
| "abba" | "dog cat cat fish" | false |
| "aaaa" | "dog dog dog dog" | true |

*Explanation*: Each character must map to a unique word and vice‑versa.

---

## 3. Approach: Two Hash Maps — O(n) ✅

```
FUNCTION wordPattern(pattern, s):
    words ← SPLIT(s, ' ')
    IF LENGTH(pattern) != LENGTH(words): RETURN false

    charToWord ← MAP()
    wordToChar ← MAP()

    FOR i ← 0 TO LENGTH(pattern) - 1:
        c ← pattern[i]
        w ← words[i]

        IF c IN charToWord AND charToWord[c] != w: RETURN false
        IF w IN wordToChar AND wordToChar[w] != c: RETURN false

        charToWord[c] ← w
        wordToChar[w] ← c

    RETURN true
```

---

## 4. Walkthrough

Take `pattern = "abba"` and `s = "dog cat cat dog"`.

1. Split `s` → `["dog","cat","cat","dog"]`.
2. Iterate:
   - i=0: map `a`→`dog`, `dog`→`a`.
   - i=1: map `b`→`cat`, `cat`→`b`.
   - i=2: `b` already maps to `cat` – OK.
   - i=3: `a` already maps to `dog` – OK.
All checks pass → `true`.

---

## 5. Complexity Analysis

- **Time**: O(n) where n is the number of words (single pass).
- **Space**: O(k) for the two hash maps, k ≤ n (unique characters/words).

---

## 6. Follow-Up Questions

1. How would you modify the solution to support patterns with wildcard characters?
2. Can you solve the problem using a single hash map and a set?
3. What changes are needed if the pattern and string can contain Unicode characters?

---

## Key Takeaway

> Bijection checking requires two maps (or a map + a set). One‑directional mapping misses cases like pattern="ab", s="dog dog".
