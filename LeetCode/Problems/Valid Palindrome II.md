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

```text
FUNCTION validPalindrome(s):
    left ← 0
    right ← len(s) - 1
    WHILE left < right:
        IF s[left] != s[right]:
            // Try skipping left or right character
            RETURN isPalin(s, left + 1, right) OR isPalin(s, left, right - 1)
        left ← left + 1
        right ← right - 1
    RETURN true

FUNCTION isPalin(s, lo, hi):
    WHILE lo < hi:
        IF s[lo] != s[hi]: RETURN false
        lo ← lo + 1
        hi ← hi - 1
    RETURN true
```

---

## 3. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aba"` | `true` | Already a palindrome. |
| `"abca"` | `true` | Delete `'c'` to get `"aba"`. |
| `"abc"` | `false` | No single deletion makes it a palindrome. |

---

## 4. Walkthrough

For `s = "abca"`:
1. left=0 (`a`), right=3 (`a`) → match, move inward.
2. left=1 (`b`), right=2 (`c`) → mismatch.
3. Check `isPalin(s, 2, 2)` → single character, true.
4. Check `isPalin(s, 1, 1)` → single character, true.
5. At least one branch true → overall `true`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow‑Up Questions

* How would you extend this to allow deleting at most *k* characters?
* Can you solve it using dynamic programming for the general case?

---

## Key Takeaway

> On first mismatch, try both options (skip left char or skip right char) and check if either resulting substring is a palindrome. At most one mismatch allows this branching.
