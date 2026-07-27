# 1804. Implement Trie II (Prefix Tree)

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-trie-ii-prefix-tree](https://leetcode.com/problems/implement-trie-ii-prefix-tree)
**Companies:** Amazon, Microsoft

---

## 1. Problem Description

Extended Trie with `insert`, `countWordsEqualTo`, `countWordsStartingWith`, and `erase` operations.

## 2. Approach: Trie with Word + Prefix Counts ✅

```
CLASS TrieNode:
    children = {}
    wordCount = 0      // how many words end here
    prefixCount = 0    // how many words pass through here

CLASS Trie:
    FUNCTION insert(word):
        node ← root
        FOR c IN word: node = node.children[c]; node.prefixCount += 1
        node.wordCount += 1

    FUNCTION countWordsEqualTo(word):
        node ← traverse(word); RETURN node.wordCount IF found ELSE 0

    FUNCTION countWordsStartingWith(prefix):
        node ← traverse(prefix); RETURN node.prefixCount IF found ELSE 0

    FUNCTION erase(word):
        node ← root
        FOR c IN word: node = node.children[c]; node.prefixCount -= 1
        node.wordCount -= 1
```

## Key Takeaway

> Standard Trie + two counters per node: `wordCount` for exact matches, `prefixCount` for prefix queries. Erase decrements both.
