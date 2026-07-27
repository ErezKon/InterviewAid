# 3093. Longest Common Suffix Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-common-suffix-queries](https://leetcode.com/problems/longest-common-suffix-queries)
**Companies:** Google

---

## 1. Problem Description

Given `wordsContainer` and `wordsQuery`, for each query find the word in the container with the longest common suffix. Ties broken by shortest length, then smallest index.

---

## 2. Approach: Reverse Trie — O(n·L) ✅

```
// Build a trie from reversed words in wordsContainer
// At each trie node, store the best matching word index
//   (longest suffix → deepest node; ties: shortest word, smallest index)
// For each query, traverse reversed query in trie
// Return best index at the deepest matching node
```

| Time | Space |
|------|-------|
| O(n · L) for build + O(q · L) for queries | O(n · L) |

---

## 3. Key Takeaway

> Reverse all words and build a trie. Longest common suffix = longest common prefix of reversed strings. Store the best candidate at each node for O(L) per query.
