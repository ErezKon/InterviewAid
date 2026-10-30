# 2207. Maximize Number of Subsequences in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-number-of-subsequences-in-a-string](https://leetcode.com/problems/maximize-number-of-subsequences-in-a-string)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Count — O(n)](#approach-greedy-count--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** string `text` and another **0-indexed** string `pattern` of length `2`, both of which consist of only lowercase English letters.

You can add **either** `pattern[0]` **or** `pattern[1]` anywhere in `text` **exactly once**. Note that the character can be added even at the beginning or at the end of `text`.

Return *the **maximum** number of times* `pattern` *can occur as a **subsequence** of the modified *`text`.

A **subsequence** is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

**Constraints:**
- `1 <= text.length <= 10^5`
- `pattern.length == 2`
- `text` and `pattern` consist only of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: text = "abdcdbc", pattern = "ac"
Output: 4
Explanation: If we add pattern[0] = 'a' in between text[1] and text[2], we get "abadcdbc". Now, the number of times "ac" occurs as a subsequence is 4.
Some other strings which have 4 subsequences "ac" after adding a character to text are "aabdcdbc" and "abdacdbc".
However, strings such as "abdcadbc", "abdccdbc", and "abdcdbcc", although obtainable, have only 3 subsequences "ac" and are thus suboptimal.
It can be shown that it is not possible to get more than 4 subsequences "ac" by adding only one character.
```

**Example 2:**
```
Input: text = "aabb", pattern = "ab"
Output: 6
Explanation: Some of the strings which can be obtained from text and have 6 subsequences "ab" are "aaabb", "aaabb", and "aabbb".
```

---

## Key Insight

> Count existing subsequences first by scanning right-to-left (count of `pattern[1]` seen so far × each `pattern[0]` encountered). Then consider two options:
> - Insert `pattern[0]` at the very beginning → pairs with ALL `pattern[1]`s in the string.
> - Insert `pattern[1]` at the very end → pairs with ALL `pattern[0]`s in the string.
> Take the better option.

---

## Approach: Greedy Count — O(n) ✅

```
FUNCTION maximumSubsequenceCount(text, pattern):
    a, b = pattern[0], pattern[1]
    countA = 0; countB = 0; existing = 0

    FOR ch IN text:
        IF ch == b:
            existing += countA    // each prior 'a' forms a subsequence with this 'b'
            countB += 1
        IF ch == a:
            countA += 1

    // Insert 'a' at start → pairs with all countB 'b's
    // Insert 'b' at end → pairs with all countA 'a's
    RETURN existing + MAX(countA, countB)
```

**Special case:** If `a == b`, handle appropriately (every occurrence pairs with every later occurrence).

---

## Walkthrough

```
text = "abdcdbc", pattern = "ac"
```

Scan: count 'a's seen, for each 'c' add count of 'a's.
- 'a': countA=1
- 'b','d','c': existing += 1 (1 'a' before this 'c'), countB=1
- 'd','b','c': existing += 1, countB=2

existing = 2, countA = 1, countB = 2

Insert 'a' at start: +2 (pairs with 2 'c's)
Insert 'c' at end: +1 (pairs with 1 'a')

**Result:** 2 + max(1, 2) = **4** ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n)** | O(1) |

---

## Key Takeaway

> **For 2-char subsequence counting, scan once tracking prefix counts. The optimal insertion is always at the boundary** — `pattern[0]` at the start or `pattern[1]` at the end — whichever creates more new pairs.
