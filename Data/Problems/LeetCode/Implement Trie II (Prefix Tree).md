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
        FOR c IN word:
            node = node.children[c]
            node.prefixCount += 1
        node.wordCount += 1

    FUNCTION countWordsEqualTo(word):
        node ← traverse(word)
        RETURN node.wordCount IF found ELSE 0

    FUNCTION countWordsStartingWith(prefix):
        node ← traverse(prefix)
        RETURN node.prefixCount IF found ELSE 0

    FUNCTION erase(word):
        node ← root
        FOR c IN word:
            node = node.children[c]
            node.prefixCount -= 1
        node.wordCount -= 1
```

## Examples

**Example 1:**
```
trie = Trie()
trie.insert("apple")
trie.countWordsEqualTo("apple")      // 1
trie.countWordsStartingWith("app")   // 1
trie.erase("apple")
trie.countWordsEqualTo("apple")      // 0
```

**Example 2:**
```
trie.insert("app")
trie.insert("application")
trie.countWordsStartingWith("app")   // 2
```

## Walkthrough

| Step | Operation | Prefix Count Change |
|------|-----------|----------------------|
| 1 | insert("app") | nodes a,p,p prefixCount +1 each, wordCount at last node =1 |
| 2 | insert("apple") | nodes a,p,p prefixCount +1, nodes l,e new nodes created, wordCount at e =1 |
| 3 | countWordsStartingWith("app") | returns prefixCount at node p =2 |
| 4 | erase("app") | decrement prefixCount on a,p,p nodes, wordCount at p =0 |

## Complexity Analysis

- **Time:** Each operation traverses the word length `L`: O(L).
- **Space:** O(N·L) for storing N words of average length L in the Trie.

## Follow-Up Questions

- How would you modify the Trie to support wildcard `.` queries?
- Can you implement a compressed Trie to save space?

## Key Takeaway

> Standard Trie + two counters per node: `wordCount` for exact matches, `prefixCount` for prefix queries. Erase decrements both.
