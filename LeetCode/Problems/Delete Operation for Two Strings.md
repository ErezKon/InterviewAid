# 583. Delete Operation for Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-operation-for-two-strings](https://leetcode.com/problems/delete-operation-for-two-strings)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Problem Description

Find the minimum number of deletions (from either string) to make two strings equal.

---

## Examples

| Input | Output |
|-------|--------|
| `word1 = "sea"`, `word2 = "eat"` | `2` |
| `word1 = "leetcode"`, `word2 = "etco"` | `4` |

---

## Approach

```text
FUNCTION minDistance(word1, word2):
    // Compute length of longest common subsequence
    lcs ← LONGEST_COMMON_SUBSEQUENCE(word1, word2)
    // Deletions needed = total length minus twice the LCS length
    RETURN LEN(word1) + LEN(word2) - 2 * lcs
```

---

## Walkthrough

**Example 1:** `word1 = "sea"`, `word2 = "eat"`

1. LCS of "sea" and "eat" is "ea" with length 2.
2. Total length = 3 + 3 = 6.
3. Deletions = 6 - 2*2 = 2 (remove "s" from `word1` and "t" from `word2`).

**Example 2:** `word1 = "leetcode"`, `word2 = "etco"`

1. LCS is "etco" with length 4.
2. Total length = 8 + 4 = 12.
3. Deletions = 12 - 2*4 = 4 (remove "le" and "de" from `word1`).

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m × n) where m and n are string lengths |
| **Space** | O(m × n) or O(min(m,n)) with optimization |

---

## Follow-Up Questions

1. How would you modify the solution to also allow insertions and replacements (i.e., edit distance)?
2. Can you solve the problem using only O(min(m,n)) space?
3. How does the solution change if the strings contain Unicode characters?

---

## Key Takeaway

> **Min deletions = total length − 2 × LCS. Reduces directly to the Longest Common Subsequence problem, solvable with DP.**
