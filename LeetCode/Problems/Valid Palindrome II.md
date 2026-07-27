# 680. Valid Palindrome II

**Difficulty:** 🟢 Easy
**Acceptance:** 41.0%
**LeetCode:** [https://leetcode.com/problems/valid-palindrome-ii](https://leetcode.com/problems/valid-palindrome-ii)
**Companies:** Amazon, Apple, Attentive, Bloomberg, Ebay, Fortinet, Google, Ibm, Meta, Microsoft, Roku, Tiktok, Uber, Visa, Whatnot, Yandex

---

## 1. Problem Description

Given a string `s`, return `true` if it can be a palindrome after deleting **at most one** character.

---

## 2. Approach: Two Pointers with Skip — O(n) ✅

```
FUNCTION validPalindrome(s):
    left, right = 0, len(s) - 1

    WHILE left < right:
        IF s[left] != s[right]:
            // Try skipping left or right
            RETURN isPalin(s, left+1, right) OR isPalin(s, left, right-1)
        left += 1
        right -= 1

    RETURN true

FUNCTION isPalin(s, lo, hi):
    WHILE lo < hi:
        IF s[lo] != s[hi]: RETURN false
        lo += 1; hi -= 1
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> On first mismatch, try both options (skip left char or skip right char) and check if either resulting substring is a palindrome. At most one mismatch allows this branching.
