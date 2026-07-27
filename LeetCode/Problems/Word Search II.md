# 212. Word Search II

**Difficulty:** 🔴 Hard
**Acceptance:** 36.0%
**LeetCode:** [https://leetcode.com/problems/word-search-ii](https://leetcode.com/problems/word-search-ii)
**Companies:** Airbnb, Amazon, Apple, Aurora, Bloomberg, Cisco, De Shaw, Doordash, Google, Meta, Microsoft, Oracle, Snapchat, Snowflake, Tiktok, Two Sigma, Uber, Wix, Zoho, Zoom

---

## 1. Problem Description

Given an m×n board of characters and a list of words, return all words that can be formed by sequentially adjacent cells (horizontally or vertically). Same cell can't be reused in a single word.

---

## 2. Approach: Trie + DFS Backtracking — O(m·n·4^L) ✅

Build a Trie from all words, then DFS from each cell using the Trie for pruning.

```
FUNCTION findWords(board, words):
    // Build Trie
    root = new TrieNode()
    FOR word IN words:
        node = root
        FOR char IN word:
            IF char NOT IN node.children:
                node.children[char] = new TrieNode()
            node = node.children[char]
        node.word = word    // store complete word at leaf

    result = []

    FUNCTION dfs(r, c, node):
        IF r < 0 OR r >= m OR c < 0 OR c >= n: RETURN
        char = board[r][c]
        IF char == '#' OR char NOT IN node.children: RETURN

        node = node.children[char]

        IF node.word != null:
            result.ADD(node.word)
            node.word = null    // avoid duplicates

        board[r][c] = '#'       // mark visited
        dfs(r+1, c, node)
        dfs(r-1, c, node)
        dfs(r, c+1, node)
        dfs(r, c-1, node)
        board[r][c] = char      // restore

        // Optimization: prune empty trie branches
        IF node.children is empty:
            DELETE parent's reference to node

    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            dfs(r, c, root)

    RETURN result
```

### Key Optimizations

1. **Trie pruning**: remove matched words and empty branches to speed up later searches.
2. **Store word at leaf**: avoids rebuilding the word from the path.

| Time | Space |
|------|-------|
| O(m·n·4^L) worst case | O(sum of word lengths) for Trie |

---

## Key Takeaway

> Word Search II = Word Search I + Trie. The Trie allows searching for all words simultaneously, pruning paths that don't match any word prefix. The branch pruning optimization is critical for performance.
