# 1698. Number of Distinct Substrings in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-substrings-in-a-string](https://leetcode.com/problems/number-of-distinct-substrings-in-a-string)
**Companies:** Bloomberg, Dunzo, Intuit, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Trie — O(n²)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Return the number of **distinct non-empty** substrings of string `s`.

---

## 2. Examples

| s | Output |
|---|--------|
| "abc" | 6 |
| "aaa" | 3 |
| "ababa" | 9 |

*Explanation*: For "abc" the substrings are `a, b, c, ab, bc, abc`. For "aaa" the distinct substrings are `a, aa, aaa`. For "ababa" the distinct substrings are `a, b, ab, ba, aba, bab, abab, baba, ababa`.

---

## 3. Key Insight

> Insert all suffixes into a trie. Each new node created represents a new distinct substring. Count = total trie nodes (excluding root).

---

## 4. Approach: Trie — O(n²) ✅

```text
FUNCTION countDistinct(s):
    root ← {}
    count ← 0
    FOR i ← 0 TO LENGTH(s) - 1:
        node ← root
        FOR j ← i TO LENGTH(s) - 1:
            IF s[j] NOT IN node:
                node[s[j]] ← {}
                count ← count + 1
            node ← node[s[j]]
    RETURN count
```

---

## 5. Walkthrough

Consider `s = "ababa"`.

1. **Insert suffix "ababa"**: creates nodes for `a → b → a → b → a` (5 new nodes).
2. **Insert suffix "baba"**: shares the leading `b` with previous path, adds nodes for `a → b → a` (3 new nodes).
3. **Insert suffix "aba"**: shares `a → b → a` partially, adds no new nodes for the shared prefix, adds 0 new nodes.
4. **Insert suffix "ba"**: shares `b → a` already present, adds 0 new nodes.
5. **Insert suffix "a"**: node `a` already exists, adds 0 new nodes.

Total new nodes created = 5 + 3 = 8. Adding the root node gives 9 distinct substrings, matching the example.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(n²) — trie nodes |

---

## 7. Key Takeaway

> **Trie of all suffixes counts distinct substrings.** Each new trie node = one new unique substring. Alternative: suffix array with LCP array in O(n log n).
