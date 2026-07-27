# 648. Replace Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-words](https://leetcode.com/problems/replace-words)
**Companies:** Amazon, Google, Microsoft, Tiktok, Uber

---

## Approach: Trie — O(n·L) ✅

```
FUNCTION replaceWords(dictionary, sentence):
    trie = {}
    FOR root IN dictionary:
        node = trie
        FOR c IN root:
            IF c NOT IN node: node[c] = {}
            node = node[c]
        node['#'] = root

    result = []
    FOR word IN sentence.SPLIT():
        node = trie
        replaced = false
        FOR c IN word:
            IF c NOT IN node: BREAK
            node = node[c]
            IF '#' IN node:
                result.ADD(node['#'])
                replaced = true
                BREAK
        IF NOT replaced:
            result.ADD(word)

    RETURN JOIN(result, " ")
```
