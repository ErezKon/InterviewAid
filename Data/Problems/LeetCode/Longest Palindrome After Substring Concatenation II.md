# 3504. Longest Palindrome After Substring Concatenation II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii)
**Companies:** Google

---

## 1. Problem Description

Given strings `s` and `t`, find the longest palindrome that can be formed by concatenating a substring of `s` with a substring of `t` (order matters). You may choose any contiguous substring from each string.

---

## 2. Approach: Manacher / DP ✅

```
// For each possible split point in s and t:
//   1. Match a prefix of s with the reverse of a suffix of t (or vice‑versa).
//   2. On the combined string, run Manacher's algorithm to obtain the longest palindromic radius at every center.
//   3. Combine the matched prefix/suffix length with the longest central palindrome length.
// Track the maximum total length.
```

| Time | Space |
|------|-------|
| O(n · m) or O(n²) | O(n + m) |

---

## Examples

**Example 1:**
```
Input: s = "abac", t = "caba"
Output: 7
Explanation: Choose "aba" from s and "caba" from t → "abacaba", which is a palindrome of length 7.
```

**Example 2:**
```
Input: s = "abc", t = "def"
Output: 0
Explanation: No concatenation of substrings yields a palindrome.
```

## Walkthrough

Take the first example `s = "abac"`, `t = "caba"`.
1. Identify matching prefix‑suffix pairs: `"aba"` (suffix of `t`) matches reverse of prefix `"aba"` (prefix of `s`).
2. Concatenate: `"aba" + "caba" = "abacaba"`.
3. Run Manacher on `"abacaba"` → longest palindrome radius centered at the middle gives length 7.
4. No longer palindrome can be formed with any other substring pair, so answer is 7.

## Complexity Analysis
- **Time:** O(n·m) in the naïve double‑loop, or O(n²) when optimizing with prefix‑suffix hash maps and a single Manacher run.
- **Space:** O(n + m) for the combined string and auxiliary arrays used by Manacher.

## Follow-Up Questions
- How would the solution adapt if you could reorder the two substrings?
- Can the approach be extended to three strings?
- What if the strings are extremely long – can we use rolling hash to reduce the matching step to O(n + m)?

## Key Takeaway

> Combine prefix‑suffix matching between the two strings with Manacher's algorithm to efficiently discover the longest palindromic concatenation.