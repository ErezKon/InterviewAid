# 1698. Number of Distinct Substrings in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-substrings-in-a-string](https://leetcode.com/problems/number-of-distinct-substrings-in-a-string)
**Companies:** Bloomberg, Dunzo, Intuit, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Trie — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return the number of **distinct non-empty** substrings of string `s`.

---

## 2. Key Insight

> Insert all suffixes into a trie. Each new node created represents a new distinct substring. Count = total trie nodes (excluding root).

---

## 3. Approach: Trie — O(n²) ✅

```
FUNCTION countDistinct(s):
    // Trie approach
    root = {}
    count = 0
    FOR i ← 0 TO len(s) - 1:
        node = root
        FOR j ← i TO len(s) - 1:
            IF s[j] NOT IN node:
                node[s[j]] = {}
                count += 1
            node = node[s[j]]
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²) — trie nodes |

---

## 5. Key Takeaway

> **Trie of all suffixes counts distinct substrings.** Each new trie node = one new unique substring. Alternative: suffix array with LCP array in O(n log n).
