# 3503. Longest Palindrome After Substring Concatenation I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-i](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-i)
**Companies:** Google, Meta

---

## 1. Problem Description

Given strings `s` and `t`, find the longest palindrome formed by concatenating a substring of `s` and a substring of `t`.

---

## 2. Approach: Brute Force with Palindrome Check — O(n²·m²) ✅

```
// Enumerate all substrings of s and t
// For each pair, check if concatenation is a palindrome
// Track the longest
// Optimize: precompute palindrome checks, match prefixes/suffixes
```

| Time | Space |
|------|-------|
| O(n² · m²) brute, optimizable | O(n + m) |

---

## 3. Key Takeaway

> For the medium version, brute force with early termination works given smaller constraints. Match reversed portions between s and t, then extend with palindromic middles.
