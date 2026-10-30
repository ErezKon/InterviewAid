# 2490. Circular Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/circular-sentence](https://leetcode.com/problems/circular-sentence)
**Companies:** Bloomberg

---

## 1. Problem Description

A **sentence** is a list of words that are separated by a **single** space with no leading or trailing spaces.

- For example, `"Hello World"`, `"HELLO"`, `"hello world hello world"` are all sentences.

Words consist of **only** uppercase and lowercase English letters. Uppercase and lowercase English letters are considered different.

A sentence is **circular** if:

- The last character of each word in the sentence is equal to the first character of its next word.
- The last character of the last word is equal to the first character of the first word.

For example, `"leetcode exercises sound delightful"`, `"eetcode"`, `"leetcode eats soul"` are all circular sentences. However, `"Leetcode is cool"`, `"happy Leetcode"`, `"Leetcode"` and `"I like Leetcode"` are **not** circular sentences.

Given a string `sentence`, return `true` *if it is circular*. Otherwise, return `false`.

**Constraints:**
- `1 <= sentence.length <= 500`
- `sentence` consist of only lowercase and uppercase English letters and spaces.
- The words in `sentence` are separated by a single space.
- There are no leading or trailing spaces.

## 2. Examples

```
Example 1:
  Input: sentence = "leetcode exercises sound delightful"
  Output: true
  Explanation: The words in sentence are ["leetcode", "exercises", "sound", "delightful"].
  - leetcode's last character is equal to exercises's first character.
  - exercises's last character is equal to sound's first character.
  - sound's last character is equal to delightful's first character.
  - delightful's last character is equal to leetcode's first character.
  The sentence is circular.
```

```
Example 2:
  Input: sentence = "eetcode"
  Output: true
  Explanation: The words in sentence are ["eetcode"].
  - eetcode's last character is equal to eetcode's first character.
  The sentence is circular.
```

```
Example 3:
  Input: sentence = "Leetcode is cool"
  Output: false
  Explanation: The words in sentence are ["Leetcode", "is", "cool"].
  - Leetcode's last character is not equal to is's first character.
  The sentence is not circular.
```

## 3. Approach — Check Adjacent Words — O(n) ✅

```text
FUNCTION isCircularSentence(sentence):
    words ← sentence.SPLIT(" ")
    FOR i FROM 0 TO LENGTH(words) - 1:
        IF words[i][LAST] != words[(i + 1) MOD LENGTH(words)][FIRST]:
            RETURN false
    RETURN true
```

## 4. Walkthrough

Consider the sentence `"leetcode exercises sound delightful"`.

1. Split → `["leetcode", "exercises", "sound", "delightful"]`.
2. Compare `"leetcode"[-1] = 'e'` with `"exercises"[0] = 'e'` → match.
3. Compare `"exercises"[-1] = 's'` with `"sound"[0] = 's'` → match.
4. Compare `"sound"[-1] = 'd'` with `"delightful"[0] = 'd'` → match.
5. Wrap around: `"delightful"[-1] = 'l'` with `"leetcode"[0] = 'l'` → match.
6. All checks passed → return `true`.

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n) – each character is examined at most once |
| Space  | O(k) – `k` words stored after splitting (or O(1) with in‑place scan) |

## 6. Follow-Up Questions

- How would you solve the problem without splitting the string into an array?
- Can the solution be adapted to handle punctuation or mixed‑case letters?
- What if the definition of circularity required the *second* character of each word to match the *first* of the next?

## Key Takeaway

> For circular sentence checks, either split and compare word boundaries, or scan for spaces in-place for O(1) extra space.
