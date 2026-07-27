# 425. Word Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/word-squares](https://leetcode.com/problems/word-squares)
**Companies:** Google

---

## Approach: Backtracking + Trie — O(n·26^L) ✅

```
FUNCTION wordSquares(words):
    trie = build trie from words
    result = []

    FOR word IN words:
        backtrack([word], words, trie, result)

    RETURN result

FUNCTION backtrack(square, words, trie, result):
    IF len(square) == len(words[0]):
        result.ADD(copy of square)
        RETURN

    // The prefix for the next word is formed by column values
    idx = len(square)
    prefix = JOIN(square[i][idx] for i in range(idx))

    FOR candidate IN trie.getWordsWithPrefix(prefix):
        square.ADD(candidate)
        backtrack(square, words, trie, result)
        square.REMOVE_LAST()
```

The key insight: row i, column j must equal row j, column i (symmetric property).
