# 1858. Longest Word With All Prefixes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-with-all-prefixes](https://leetcode.com/problems/longest-word-with-all-prefixes)
**Companies:** Google

---

## 1. Problem Description

Find the longest word where every prefix is also in the dictionary. Return lexicographically smallest if tie.

---

## 2. Approach: Trie + DFS — O(n·L) ✅

```
// Build trie from all words, marking end-of-word nodes
// DFS from root: only extend through children that are end-of-word
// Track the longest/lex-smallest word found
```

| Time | Space |
|------|-------|
| O(n · L) | O(n · L) |

---

## 3. Key Takeaway

> Build a trie and DFS only through nodes marked as complete words. This ensures every prefix of the path is a valid word.
