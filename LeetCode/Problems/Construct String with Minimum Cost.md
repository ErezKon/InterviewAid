# 3213. Construct String with Minimum Cost

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/construct-string-with-minimum-cost](https://leetcode.com/problems/construct-string-with-minimum-cost)
**Companies:** Mitsogo

---

## 1. Problem Description

Given a target string and an array of `words` with `costs`, find the minimum cost to construct `target` by concatenating words (each word can be used multiple times). Return -1 if impossible.

---

## 2. Key Insight

> Build an **Aho-Corasick automaton** from all words, then DP over the target string. At each position, the automaton tells which words end here, enabling O(1) transitions per match. Alternative: Trie + DP.

---

## 3. Approach: Trie + DP — O(n × L + total_word_length) ✅

```
FUNCTION minimumCost(target, words, costs):
    // Build trie from words with associated costs (keep min cost per word)
    trie = Trie()
    FOR i, word IN enumerate(words):
        trie.insert(word, costs[i])  // keep min cost at leaf
    
    n = len(target)
    dp = [INF] * (n + 1)
    dp[0] = 0
    
    FOR i FROM 0 TO n-1:
        IF dp[i] == INF: CONTINUE
        // walk trie matching target[i..]
        node = trie.root
        FOR j FROM i TO n-1:
            IF target[j] NOT IN node.children: BREAK
            node = node.children[target[j]]
            IF node.cost != INF:
                dp[j+1] = MIN(dp[j+1], dp[i] + node.cost)
    
    RETURN dp[n] IF dp[n] != INF ELSE -1
```

| Time | Space |
|------|-------|
| O(n × max_word_len + total_word_length) | O(total_word_length + n) |

---

## Key Takeaway

> Word-break with costs: Trie enables efficient prefix matching at each position. Aho-Corasick further optimizes by avoiding redundant trie walks across positions.
