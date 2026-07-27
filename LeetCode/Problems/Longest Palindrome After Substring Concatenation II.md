# 3504. Longest Palindrome After Substring Concatenation II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii)
**Companies:** Google

---

## 1. Problem Description

Given strings `s` and `t`, find the longest palindrome formed by concatenating a substring of `s` and a substring of `t`.

---

## 2. Approach: Manacher / DP ✅

```
// For each possible split:
//   Match a prefix of s with reverse suffix of t
//   Extend the palindrome in the middle using Manacher's
// Track the longest palindromic concatenation
```

| Time | Space |
|------|-------|
| O(n · m) or O(n²) | O(n + m) |

---

## 3. Key Takeaway

> Combine matched prefix/suffix between the two strings with the longest palindrome extension in between. Manacher's or DP on the combined string helps find optimal extensions.
