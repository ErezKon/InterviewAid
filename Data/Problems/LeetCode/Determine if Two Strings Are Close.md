# 1657. Determine if Two Strings Are Close

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/determine-if-two-strings-are-close](https://leetcode.com/problems/determine-if-two-strings-are-close)
**Companies:** Amazon, Apple, Bloomberg, Google, Microsoft, Phonepe, Postmates

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Frequency Comparison — O(n)](#approach-frequency-comparison--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Two strings are considered **close** if you can attain one from the other using the following operations:

- Operation 1: Swap any two **existing** characters.

- For example, `abcde -> aecdb`

- Operation 2: Transform **every** occurrence of one **existing** character into another **existing** character, and do the same with the other character.

- For example, `aacabb -> bbcbaa` (all `a`'s turn into `b`'s, and all `b`'s turn into `a`'s)

You can use the operations on either string as many times as necessary.

Given two strings, `word1` and `word2`, return `true`* if *`word1`* and *`word2`* are **close**, and *`false`* otherwise.*

**Constraints:**
- `1 <= word1.length, word2.length <= 10^5`
- `word1` and `word2` contain only lowercase English letters.

---

## Examples

**Example 1:**
```
Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.
Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"
```

**Example 2:**
```
Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
```

**Example 3:**
```
Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.
Apply Operation 1: "cabbba" -> "caabbb"
Apply Operation 2: "caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"
```

---

## Key Insight

> Operation 1 (swap) lets you rearrange characters freely — so only **frequencies** matter, not positions. Operation 2 lets you **reassign** which character gets which frequency. Therefore, two strings are close iff:
> 1. They have the **same character set** (Op 2 can't create new characters)
> 2. Their **sorted frequency lists** match (Op 2 can permute which char gets which count)

---

## Approach: Frequency Comparison — O(n) ✅

Two strings are "close" if:
1. Same set of characters
2. Same sorted frequency distribution (frequencies can be swapped)

```
FUNCTION closeStrings(word1, word2):
    IF len(word1) != len(word2): RETURN false

    count1 = frequency of word1
    count2 = frequency of word2

    // Same character set
    IF SET(count1.keys()) != SET(count2.keys()): RETURN false

    // Same sorted frequency distribution
    RETURN SORT(count1.values()) == SORT(count2.values())
```

---

## Walkthrough

```
word1 = "cabbba", word2 = "abbccc"
```

| Step | word1 | word2 |
|------|-------|-------|
| Lengths | 6 | 6 → ✅ |
| Frequencies | {c:1, a:2, b:3} | {a:1, b:2, c:3} |
| Char sets | {a, b, c} | {a, b, c} → ✅ |
| Sorted freqs | [1, 2, 3] | [1, 2, 3] → ✅ |

All checks pass → return `true`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Counting frequencies is O(n); sorting 26 frequencies is O(1) |
| **Space** | O(1) | At most 26 entries in frequency maps |

---

## Follow-Up Questions

**Q1: Why can't Operation 2 create new characters?**
> Op 2 swaps all instances of char X with char Y. If char X doesn't exist in the string, there's nothing to swap. So the character set is invariant.

**Q2: Why do sorted frequencies need to match?**
> Op 2 effectively permutes the frequency assignment (which char gets count 3, which gets count 1, etc.). Sorting both frequency lists removes the assignment order, checking only the multiset of counts.

**Q3: What if we only had Operation 1 (no Op 2)?**
> Then the strings would need identical character frequencies (anagrams). The sorted-frequency check would be replaced by exact frequency equality.

---

## Key Takeaway

> **When operations let you freely rearrange positions (anagram) AND swap character identities (relabeling), the only invariants are the character set and the multiset of frequencies.**
