# 409. Longest Palindrome

**Difficulty:** 🟢 Easy
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/longest-palindrome](https://leetcode.com/problems/longest-palindrome)
**Companies:** Accenture, Amazon, Bloomberg, Google, Hp, Meta, Microsoft, Tcs, Ubisoft

---

## 1. Problem Description

Given a string `s` of lowercase and uppercase letters, return the length of the longest palindrome that can be built with those letters.

---

## 2. Approach: Frequency Count — O(n) ✅

```
FUNCTION longestPalindrome(s):
    count = frequency map of s
    length = 0
    hasOdd = false

    FOR freq IN count.values():
        length += freq / 2 * 2     // use even part
        IF freq is odd:
            hasOdd = true

    RETURN length + (1 IF hasOdd ELSE 0)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> For palindrome construction: use all even-count characters + even part of odd-count characters + at most one odd character in the center.
