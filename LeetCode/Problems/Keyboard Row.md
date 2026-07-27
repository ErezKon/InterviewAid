# 500. Keyboard Row

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/keyboard-row](https://leetcode.com/problems/keyboard-row)
**Companies:** Amazon, Google, Mathworks, Microsoft

---

## 1. Problem Description

Given an array of strings, return words that can be typed using letters from only **one row** of an American keyboard.

---

## 2. Approach: Set Subset Check — O(n·m) ✅

```
FUNCTION findWords(words):
    rows = [set('qwertyuiop'), set('asdfghjkl'), set('zxcvbnm')]
    result = []
    FOR word IN words:
        w = set(word.lower())
        IF any(w <= row for row in rows):
            result.ADD(word)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n·m) | O(1) |

---

## 3. Key Takeaway

> Convert each word to a set of lowercase chars, then check if it's a **subset** (`<=`) of any keyboard row set. Clean use of Python's set operations.
