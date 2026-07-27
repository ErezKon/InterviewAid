# 583. Delete Operation for Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-operation-for-two-strings](https://leetcode.com/problems/delete-operation-for-two-strings)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Problem Description

Find the minimum number of deletions (from either string) to make two strings equal.

---

## Approach

```
FUNCTION minDistance(word1, word2):
    lcs = longestCommonSubsequence(word1, word2)
    RETURN len(word1) + len(word2) - 2 * lcs
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) for LCS |
| **Space** | O(m × n), or O(min(m,n)) with space optimization |

---

## Key Takeaway

> **Min deletions to make two strings equal = total length − 2 × LCS. Reduces directly to the Longest Common Subsequence problem.**
