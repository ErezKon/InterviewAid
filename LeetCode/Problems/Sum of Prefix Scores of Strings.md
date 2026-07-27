# 2416. Sum of Prefix Scores of Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-prefix-scores-of-strings](https://leetcode.com/problems/sum-of-prefix-scores-of-strings)
**Companies:** Amazon, Bloomberg, Boeing, Google

---

## Approach: Trie — O(N·L) ✅

```
FUNCTION sumPrefixScores(words):
    trie = {}
    FOR word IN words:
        node = trie
        FOR c IN word:
            node = node.setdefault(c, {'count': 0})
            node['count'] += 1

    result = []
    FOR word IN words:
        node = trie; score = 0
        FOR c IN word:
            node = node[c]
            score += node['count']
        result.ADD(score)

    RETURN result
```
