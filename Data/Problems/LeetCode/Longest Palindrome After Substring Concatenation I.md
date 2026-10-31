# 3503. Longest Palindrome After Substring Concatenation I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-i](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-i)
**Companies:** Google, Meta

---

## 1. Problem Description

You are given two strings, `s` and `t`.

You can create a new string by selecting a substring from `s` (possibly empty) and a substring from `t` (possibly empty), then concatenating them **in order**.

Return the length of the **longest** palindrome that can be formed this way.

**Constraints:**
- `1 <= s.length, t.length <= 30`
- `s` and `t` consist of lowercase English letters.

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

## Examples

**Example 1:**
```
Input: s = "a", t = "a"
Output: 2
Explanation: Concatenating "a" from s and "a" from t results in "aa", which is a palindrome of length 2.
```

**Example 2:**
```
Input: s = "abc", t = "def"
Output: 1
Explanation: Since all characters are different, the longest palindrome is any single character, so the answer is 1.
```

**Example 3:**
```
Input: s = "b", t = "aaaa"
Output: 4
Explanation: Selecting "aaaa" from t is the longest palindrome, so the answer is 4.
```

**Example 4:**
```
Input: s = "abcde", t = "ecdba"
Output: 5
Explanation: Concatenating "abc" from s and "ba" from t results in "abcba", which is a palindrome of length 5.
```

## Walkthrough

Take the first example `s = "abac"`, `t = "caba"`.
1. Enumerate substrings of `s` → "a", "ab", "aba", "abac", ...
2. Enumerate substrings of `t` → "c", "ca", "cab", "caba", ...
3. Concatenate each pair and test palindrome:
   - "aba" + "caba" = "abacaba" → palindrome, length 7.
   - All other pairs produce shorter or non-palindromic strings.
4. Track the maximum length found, which is 7.

## Complexity Analysis
- **Time:** O(n²·m²) in the naïve enumeration; with pre-computed palindrome tables it can be reduced.
- **Space:** O(n + m) for storing the strings and any auxiliary palindrome lookup tables.

## Follow-Up Questions
- How can we improve the time complexity using hashing or prefix-suffix matching?
- What changes are needed if we allow reordering of the two substrings?
- Can the approach be extended to three strings?

## Key Takeaway

> Brute-force enumeration works for moderate input sizes, but matching prefix-suffix pairs and using palindrome preprocessing can dramatically cut the search space.