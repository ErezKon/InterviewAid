# 3042. Count Prefix and Suffix Pairs I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-prefix-and-suffix-pairs-i](https://leetcode.com/problems/count-prefix-and-suffix-pairs-i)
**Companies:** Autodesk, Bloomberg, Capital One, Fico, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** string array `words`.

Let's define a **boolean** function `isPrefixAndSuffix` that takes two strings, `str1` and `str2`:

- `isPrefixAndSuffix(str1, str2)` returns `true` if `str1` is **both** a prefix and a suffix of `str2`, and `false` otherwise.

For example, `isPrefixAndSuffix("aba", "ababa")` is `true` because `"aba"` is a prefix of `"ababa"` and also a suffix, but `isPrefixAndSuffix("abc", "abcd")` is `false`.

Return *an integer denoting the **number** of index pairs *`(i, j)`* such that *`i < j`*, and *`isPrefixAndSuffix(words[i], words[j])`* is *`true`*.*

**Constraints:**
- `1 <= words.length <= 50`
- `1 <= words[i].length <= 10`
- `words[i]` consists only of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: words = ["a","aba","ababa","aa"]
Output: 4
Explanation: In this example, the counted index pairs are:
i = 0 and j = 1 because isPrefixAndSuffix("a", "aba") is true.
i = 0 and j = 2 because isPrefixAndSuffix("a", "ababa") is true.
i = 0 and j = 3 because isPrefixAndSuffix("a", "aa") is true.
i = 1 and j = 2 because isPrefixAndSuffix("aba", "ababa") is true.
Therefore, the answer is 4.
```

**Example 2:**
```
Input: words = ["pa","papa","ma","mama"]
Output: 2
Explanation: In this example, the counted index pairs are:
i = 0 and j = 1 because isPrefixAndSuffix("pa", "papa") is true.
i = 2 and j = 3 because isPrefixAndSuffix("ma", "mama") is true.
Therefore, the answer is 2.
```

**Example 3:**
```
Input: words = ["abab","ab"]
Output: 0
Explanation: In this example, the only valid index pair is i = 0 and j = 1, and isPrefixAndSuffix("abab", "ab") is false.
Therefore, the answer is 0.
```

---

## Key Insight

With small constraints (n ≤ 50, length ≤ 10), brute force O(n² × L) is sufficient. Check `startswith` and `endswith` for each pair.

---

## Approach

```
FUNCTION countPrefixSuffixPairs(words):
    count = 0
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            IF words[j].startswith(words[i]) AND words[j].endswith(words[i]):
                count += 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n² × L) |
| **Space** | O(1) |

---

## Key Takeaway

> **For small constraints, direct string comparison with `startswith`/`endswith` is clean and sufficient. See Part II for the scalable trie-based approach.**
