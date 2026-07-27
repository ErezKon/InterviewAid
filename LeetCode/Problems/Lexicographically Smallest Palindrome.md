# 2697. Lexicographically Smallest Palindrome

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-palindrome](https://leetcode.com/problems/lexicographically-smallest-palindrome)
**Companies:** Amazon, Mathworks, Meta, Paypal

---

## 1. Problem Description

Replace characters to make `s` a palindrome with the minimum number of changes. Among all such palindromes, return the lexicographically smallest.

---

## 2. Approach: Two Pointers — O(n) ✅

```
FUNCTION makeSmallestPalindrome(s):
    s = list(s)
    lo, hi = 0, len(s) - 1
    WHILE lo < hi:
        s[lo] = s[hi] = MIN(s[lo], s[hi])
        lo += 1; hi -= 1
    RETURN JOIN(s)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> For each mirror pair, set both to the smaller character. This minimizes changes and produces the lex-smallest palindrome.
