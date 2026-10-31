# 2014. Longest Subsequence Repeated k Times

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-subsequence-repeated-k-times](https://leetcode.com/problems/longest-subsequence-repeated-k-times)
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

You are given a string `s` of length `n`, and an integer `k`. You are tasked to find the **longest subsequence repeated** `k` times in string `s`.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

A subsequence `seq` is **repeated** `k` times in the string `s` if `seq * k` is a subsequence of `s`, where `seq * k` represents a string constructed by concatenating `seq` `k` times.

- For example, `"bba"` is repeated `2` times in the string `"bababcba"`, because the string `"bbabba"`, constructed by concatenating `"bba"` `2` times, is a subsequence of the string `"**b**a**bab**c**ba**"`.

Return *the **longest subsequence repeated** *`k`* times in string *`s`*. If multiple such subsequences are found, return the **lexicographically largest** one. If there is no such subsequence, return an **empty** string*.

**Constraints:**
- `n == s.length`
- `2 <= k <= 2000`
- `2 <= n < min(2001, k * 8)`
- `s` consists of lowercase English letters.

---

## 2. Approach: BFS on Candidates — O(26^(n/k)) ✅

```text
// Only characters appearing ≥ k times can be in the answer
// BFS/DFS on candidate subsequences (length-first)
// For each candidate, check if candidate * k is a subsequence of s
// Return the lexicographically largest longest candidate
```

---

## 3. Examples

**Example 1:**
```
Input: s = "letsleetcode", k = 2
Output: "let"
Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
"let" is the lexicographically largest one.
```

**Example 2:**
```
Input: s = "bb", k = 2
Output: "b"
Explanation: The longest subsequence repeated 2 times is "b".
```

**Example 3:**
```
Input: s = "ab", k = 2
Output: ""
Explanation: There is no subsequence repeated 2 times. Empty string is returned.
```

---

## 4. Walkthrough

Consider `s = "ababa"`, `k = 2`.

1. Count character frequencies: `a:3, b:2` (both ≥ k).
2. Start BFS with empty string.
3. Append `'a'` → candidate `"a"`. Check `"aa"` is subsequence of `s`? Yes.
4. Append `'b'` → candidate `"b"`. Check `"bb"`? No, discard.
5. Extend `"a"` with `'b'` → `"ab"`. Check `"abab"`? Yes.
6. Extend `"ab"` with `'a'` → `"aba"`. Check `"abaaba"`? Yes (positions 0,2,4, then 0,2,4).
7. No longer candidates pass the check, so `"aba"` is longest.

---

## 5. Complexity Analysis

- **Time:** BFS explores candidates; worst-case `O(26^(n/k) · n)`, but pruning by frequency makes it fast in practice.
- **Space:** Stores queue of candidates, up to `O(26^(n/k))` strings.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm if `k` could be up to `10`?
2. Can you design a DP solution that avoids explicit BFS?
3. What if the alphabet size is large (e.g., Unicode characters)?

---

## 7. Key Takeaway

> Restrict candidates to characters appearing at least `k` times and use BFS/DFS to build the longest repeatable subsequence, checking each candidate by verifying `candidate * k` is a subsequence of `s`.
