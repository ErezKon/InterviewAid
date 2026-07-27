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

Given a string `text` and a string `pattern` of length 2, you may insert **one character** (either `pattern[0]` or `pattern[1]`) anywhere in `text`. Maximize the number of subsequences of `text` equal to `pattern`.

**Constraints:**
- `1 ≤ text.length ≤ 10⁵`
- `pattern.length == 2`

---

## Examples

**Example 1:**
```
Input:  text = "abdcdbc", pattern = "ac"
Output: 4
Explanation: Insert 'a' at the beginning → "aabdcdbc". 
             Subsequences "ac": each 'a' pairs with each 'c' after it.
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
