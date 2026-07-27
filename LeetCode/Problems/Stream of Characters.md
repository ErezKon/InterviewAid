# 1032. Stream of Characters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/stream-of-characters](https://leetcode.com/problems/stream-of-characters)
**Companies:** Amazon, Google, Jane Street, Meta

---

## Approach: Reverse Trie — O(L) per query ✅

```
CLASS StreamChecker:
    CONSTRUCTOR(words):
        // Build trie of reversed words
        self.trie = {}
        FOR word IN words:
            node = trie
            FOR c IN reversed(word):
                node = node.setdefault(c, {})
            node['#'] = true
        self.stream = []

    FUNCTION query(letter):
        stream.ADD(letter)
        node = trie
        FOR c IN reversed(stream):
            IF c NOT IN node: RETURN false
            node = node[c]
            IF '#' IN node: RETURN true
        RETURN false
```
