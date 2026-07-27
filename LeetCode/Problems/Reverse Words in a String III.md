# 557. Reverse Words in a String III

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-words-in-a-string-iii](https://leetcode.com/problems/reverse-words-in-a-string-iii)
**Companies:** Amazon, Google, Meta, Microsoft, Zappos, Zoho

---

## Problem Description

Reverse each **individual word** in a string while preserving word order and whitespace.

- **Example:** `"Let's take LeetCode contest"` → `"s'teL ekat edoCteeL tsetnoc"`

---

## Approach

```
FUNCTION reverseWords(s):
    RETURN " ".join(word[::-1] for word in s.split())
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Split → reverse each word → join. Contrast with #151 (reverse word order) and #186 (in-place word order reversal).
