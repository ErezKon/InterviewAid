# 557. Reverse Words in a String III

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-words-in-a-string-iii](https://leetcode.com/problems/reverse-words-in-a-string-iii)
**Companies:** Amazon, Google, Meta, Microsoft, Zappos, Zoho

---

## Problem Description

Reverse each **individual word** in a string while preserving word order and whitespace.

- **Example:** `"Let's take LeetCode contest"` → `"s'teL ekat edoCteeL tsetnoc"`

---

## Examples

| Input | Output |
|-------|--------|
| `"Let's take LeetCode contest"` | `"s'teL ekat edoCteeL tsetnoc"` |
| `"God Ding"` | `"doG gniD"` |

---

## Approach

```
FUNCTION reverseWords(s):
    RETURN " ".join(word[::-1] for word in s.split())
```

---

## Walkthrough

**Example:** `"Let's take LeetCode contest"`

1. Split string by spaces → `["Let's", "take", "LeetCode", "contest"]`
2. Reverse each word individually:
   - "Let's" → "s'teL"
   - "take" → "ekat"
   - "LeetCode" → "edoCteeL"
   - "contest" → "tsetnoc"
3. Join with spaces → `"s'teL ekat edoCteeL tsetnoc"`

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – each character visited once | O(n) – output string plus split list |

---

## Follow‑Up Questions

- How would you handle punctuation attached to words?
- Can you solve it without using built‑in split/join functions?

---

## Key Takeaway

> Split → reverse each word → join. Contrast with #151 (reverse word order) and #186 (in‑place word order reversal).
