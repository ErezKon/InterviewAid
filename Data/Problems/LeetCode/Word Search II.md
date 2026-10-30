# 212. Word Search II

**Difficulty:** 🔴 Hard
**Acceptance:** 36.0%
**LeetCode:** [https://leetcode.com/problems/word-search-ii](https://leetcode.com/problems/word-search-ii)
**Companies:** Airbnb, Amazon, Apple, Aurora, Bloomberg, Cisco, De Shaw, Doordash, Google, Meta, Microsoft, Oracle, Snapchat, Snowflake, Tiktok, Two Sigma, Uber, Wix, Zoho, Zoom

---

## 1. Problem Description

Given an `m x n` `board` of characters and a list of strings `words`, return *all words on the board*.

Each word must be constructed from letters of sequentially adjacent cells, where **adjacent cells** are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

**Constraints:**
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 12`
- `board[i][j]` is a lowercase English letter.
- `1 <= words.length <= 3 * 10^4`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.
- All the strings of `words` are unique.

---

## 2. Examples

**Example 1:**
```
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

**Example 2:**
```
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
```

---

## 3. Approach: Trie + DFS Backtracking — O(m·n·4^L) ✅

Build a Trie from all words, then DFS from each cell using the Trie for pruning.

```text
FUNCTION findWords(board, words):
    // Build Trie
    root ← new TrieNode()
    FOR word IN words:
        node ← root
        FOR char IN word:
            IF char NOT IN node.children:
                node.children[char] ← new TrieNode()
            node ← node.children[char]
        node.word ← word    // store complete word at leaf

    result ← []
    m ← number of rows in board
    n ← number of columns in board

    FUNCTION dfs(r, c, node):
        IF r < 0 OR r ≥ m OR c < 0 OR c ≥ n: RETURN
        char ← board[r][c]
        IF char = '#' OR char NOT IN node.children: RETURN
        node ← node.children[char]
        IF node.word ≠ null:
            result.APPEND(node.word)
            node.word ← null    // avoid duplicates
        board[r][c] ← '#'
        dfs(r+1, c, node)
        dfs(r-1, c, node)
        dfs(r, c+1, node)
        dfs(r, c-1, node)
        board[r][c] ← char
        IF node.children IS EMPTY:
            DELETE node FROM its parent

    FOR r ← 0 TO m-1:
        FOR c ← 0 TO n-1:
            dfs(r, c, root)
    RETURN result
```

### Key Optimizations

1. **Trie pruning**: remove matched words and empty branches to speed up later searches.
2. **Store word at leaf**: avoids rebuilding the word from the path.

---

## 4. Walkthrough

Consider the first example board and the word "oath".
| Step | Cell (r,c) | Character | Action |
|------|------------|-----------|--------|
| 1 | (0,0) | o | Start DFS, node moves to 'o' in Trie |
| 2 | (1,0) | e | Not in children of 'o', backtrack |
| 3 | (0,1) | a | 'a' is a child of 'o', continue |
| 4 | (1,1) | t | 't' follows 'a' in Trie |
| 5 | (2,1) | h | 'h' completes the word, add "oath" to result |
The algorithm then continues exploring other cells, pruning branches that no longer match any word prefix.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(m·n·4^L) in the worst case, where L is the maximum word length. Trie pruning dramatically reduces the average runtime. |
| Space  | O(sum of word lengths) for the Trie plus O(m·n) recursion stack in the worst case. |

---

## 6. Follow-Up Questions

1. How would you modify the solution to return the words in lexicographical order?
2. Can the algorithm be adapted for diagonal adjacency?
3. How would you handle extremely large boards that cannot fit into memory?

---

## Key Takeaway

> Word Search II = Word Search I + Trie. The Trie allows searching for all words simultaneously, pruning paths that don't match any word prefix. The branch pruning optimization is critical for performance.
