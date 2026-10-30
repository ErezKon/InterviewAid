# 290. Word Pattern

**Difficulty:** 🟢 Easy
**Acceptance:** 44.0%
**LeetCode:** [https://leetcode.com/problems/word-pattern](https://leetcode.com/problems/word-pattern)
**Companies:** Amazon, Bloomberg, Dropbox, Google, Meta, Microsoft, Nvidia, Uber, Zoho

---

## 1. Problem Description

Given a `pattern` and a string `s`, find if `s` follows the same pattern.

Here **follow** means a full match, such that there is a bijection between a letter in `pattern` and a **non-empty** word in `s`. Specifically:

- Each letter in `pattern` maps to **exactly** one unique word in `s`.
- Each unique word in `s` maps to **exactly** one letter in `pattern`.
- No two letters map to the same word, and no two words map to the same letter.

**Constraints:**
- `1 <= pattern.length <= 300`
- `pattern` contains only lower-case English letters.
- `1 <= s.length <= 3000`
- `s` contains only lowercase English letters and spaces `' '`.
- `s` **does not contain** any leading or trailing spaces.
- All the words in `s` are separated by a **single space**.

---

## 2. Examples

**Example 1:**
```
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Explanation: The bijection can be established as:
- 'a' maps to "dog".
- 'b' maps to "cat".
```

**Example 2:**
```
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
```

**Example 3:**
```
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
```

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
