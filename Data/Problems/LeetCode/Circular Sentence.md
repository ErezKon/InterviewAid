# 2490. Circular Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/circular-sentence](https://leetcode.com/problems/circular-sentence)
**Companies:** Bloomberg

---

## 1. Problem Description

A sentence is **circular** if the last character of each word equals the first character of the next word, and the last character of the last word equals the first character of the first word. Given a string `sentence`, return whether it is circular.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"leetcode exercises sound delightful"` | `true` | Each word's last character matches the next word's first character, and the chain wraps around. |
| `"hello world"` | `false` | `"hello"` ends with `o` while `"world"` starts with `w`. |
| `"a b a"` | `true` | Single‑character words naturally satisfy the condition.

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
