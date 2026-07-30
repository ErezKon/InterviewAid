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

Given an array of strings `words`, count pairs `(i, j)` where `i < j` and `words[i]` is both a **prefix** and a **suffix** of `words[j]`.

**Constraints:**
- `1 <= words.length <= 50`
- `1 <= words[i].length <= 10`

---

## Examples

**Example 1:**
- **Input:** `words = ["a","aba","ababa","aa"]`
- **Output:** `4`

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
