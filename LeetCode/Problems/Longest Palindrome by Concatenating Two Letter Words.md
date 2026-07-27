# 2131. Longest Palindrome by Concatenating Two Letter Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words](https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words)
**Companies:** Amazon, Bloomberg, Databricks, Google, Meta, Microsoft

---

## 1. Problem Description

Given an array of 2-letter words, find the longest palindrome by concatenating some of them.

---

## 2. Approach: Counting Pairs — O(n) ✅

```
FUNCTION longestPalindrome(words):
    count = Counter(words)
    length = 0; hasCenter = false

    FOR word, c IN count.items():
        rev = word[::-1]
        IF word == rev:
            length += (c // 2) * 4
            IF c % 2 == 1: hasCenter = true
        ELSE IF word < rev AND rev IN count:
            length += MIN(c, count[rev]) * 4

    IF hasCenter: length += 2
    RETURN length
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Palindromic words (e.g., "aa") pair with themselves; non-palindromic words pair with their reverse. One unpaired palindromic word can sit in the center (+2).
