# 3043. Find the Length of the Longest Common Prefix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix](https://leetcode.com/problems/find-the-length-of-the-longest-common-prefix)
**Companies:** Amazon, Bloomberg, Bytedance, Capital One, Coinbase, Databricks, Google, Instacart, Meta, Microsoft, Roblox, Sig, The Trade Desk, Tiktok, Uber, Visa, Ziprecruiter

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Prefix Set — O(n·d + m·d) ✅](#4-approach-prefix-set--ond--md-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two arrays of positive integers `arr1` and `arr2`, find the length of the **longest common prefix** between any pair `(x, y)` where `x ∈ arr1` and `y ∈ arr2`. A common prefix is a shared leading digit sequence.

**Constraints:**
- `1 <= arr1.length, arr2.length <= 5 × 10⁴`
- `1 <= arr1[i], arr2[i] <= 10⁸`

---

## 2. Examples

```
Example 1:
  Input:  arr1 = [1, 10, 100], arr2 = [1000]
  Output: 3
  Reason: 100 and 1000 share prefix "100" (length 3).
```

---

## 3. Key Insight

> Insert all prefixes of arr1 numbers into a hash set. For each arr2 number, check its prefixes (longest first) against the set.

---

## 4. Approach: Prefix Set — O(n·d + m·d) ✅

```
FUNCTION longestCommonPrefix(arr1, arr2):
    prefixSet = set()
    FOR num IN arr1:
        s = str(num)
        FOR i ← 1 TO len(s):
            prefixSet.ADD(s[:i])

    maxLen = 0
    FOR num IN arr2:
        s = str(num)
        FOR i ← len(s) DOWN TO 1:
            IF s[:i] IN prefixSet:
                maxLen = MAX(maxLen, i)
                BREAK

    RETURN maxLen
```

Alternative: Trie for O(total digits) with better constant factor.

---

## 5. Walkthrough

```
arr1 = [1, 10, 100], arr2 = [1000]

Build prefix set from arr1:
  1 → {"1"}
  10 → {"1", "10"}
  100 → {"1", "10", "100"}

Check arr2:
  1000: check "1000" ✗, "100" ✓ → length 3

Result: 3 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O((n + m) · d) where d = max digits |
| **Space** | O(n · d) — prefix set |

---

## 7. Follow-Up Questions

### 7.1 Why prefix set over Trie?

Both work. Prefix set is simpler to implement; Trie has better constant factor for very large inputs and supports efficient prefix counting.

### 7.2 Can we optimize the early break?

Yes — checking from longest prefix first (as shown) exits early once a match is found.

---

## 8. Key Takeaway

> **Prefix set** is a simple and effective approach for finding longest common prefixes across two collections. Build all prefixes of one set, query with the other.
