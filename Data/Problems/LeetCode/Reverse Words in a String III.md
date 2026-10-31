# 557. Reverse Words in a String III

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-words-in-a-string-iii](https://leetcode.com/problems/reverse-words-in-a-string-iii)
**Companies:** Amazon, Google, Meta, Microsoft, Zappos, Zoho

---

## Problem Description

Given a string `s`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

**Constraints:**
- `1 <= s.length <= 5 * 10^4`
- `s` contains printable **ASCII** characters.
- `s` does not contain any leading or trailing spaces.
- There is **at least one** word in `s`.
- All the words in `s` are separated by a single space.

---

## Examples

**Example 1:**
```
Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"
```

**Example 2:**
```
Input: s = "Mr Ding"
Output: "rM gniD"
```

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

## Follow-Up Questions

- How would you handle punctuation attached to words?
- Can you solve it without using built-in split/join functions?

---

## Key Takeaway

> Split → reverse each word → join. Contrast with #151 (reverse word order) and #186 (in-place word order reversal).
