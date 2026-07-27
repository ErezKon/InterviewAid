# 745. Prefix and Suffix Search

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/prefix-and-suffix-search](https://leetcode.com/problems/prefix-and-suffix-search)
**Companies:** Google, Meta, Microsoft

---

## Approach: Wrapped Suffix Trie — O(n·L²) build, O(L) query ✅

```
CLASS WordFilter:
    CONSTRUCTOR(words):
        trie = {}
        FOR weight, word IN enumerate(words):
            // Insert "{suffix}#{word}" for all suffixes
            wrapped = word + "#" + word
            FOR i ← 0 TO len(word):
                node = trie
                FOR c IN wrapped[i:]:
                    IF c NOT IN node: node[c] = {}
                    node = node[c]
                    node['weight'] = weight

    FUNCTION f(pref, suff):
        node = trie
        FOR c IN suff + "#" + pref:
            IF c NOT IN node: RETURN -1
            node = node[c]
        RETURN node['weight']
```
