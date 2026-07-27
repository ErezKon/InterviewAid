# 79. Word Search

**Difficulty:** 🟡 Medium
**Acceptance:** 43.0%
**LeetCode:** [https://leetcode.com/problems/word-search](https://leetcode.com/problems/word-search)
**Companies:** Accenture, Amazon, Apple, Arista Networks, Atlassian, Bloomberg, Cisco, Citadel, Ebay, Epic Systems, Faire, Goldman Sachs, Google, Grammarly, Ibm, Karat, Makemytrip, Mastercard, Meta, Microsoft, Morgan Stanley, Netflix, Oracle, Paypal, Salesforce, Samsung, Snapchat, Snowflake, Tiktok, Uber, Visa, Walmart Labs, Whatnot, Wix, Yahoo, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Backtracking / DFS — O(m·n·4^L) ✅](#3-approach-backtracking--dfs--omn4l-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially **adjacent cells** (horizontally or vertically). The same cell may **not** be used more than once.

**Constraints:**
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` consist of only lowercase and uppercase English letters.

---

## 2. Examples

```
Example 1:
  Input:  board = [["A","B","C","E"],
                   ["S","F","C","S"],
                   ["A","D","E","E"]]
          word = "ABCCED"
  Output: true

Example 2:
  Input:  board = same as above
          word = "SEE"
  Output: true

Example 3:
  Input:  board = same as above
          word = "ABCB"
  Output: false
```

---

## 3. Approach: Backtracking / DFS — O(m·n·4^L) ✅

### Pseudocode

```
FUNCTION exist(board, word):
    FOR r ← 0 TO rows - 1:
        FOR c ← 0 TO cols - 1:
            IF dfs(board, word, r, c, 0):
                RETURN true
    RETURN false

FUNCTION dfs(board, word, r, c, idx):
    IF idx == len(word):
        RETURN true         // all characters matched

    IF r < 0 OR r >= rows OR c < 0 OR c >= cols:
        RETURN false
    IF board[r][c] != word[idx]:
        RETURN false

    // Mark as visited
    temp = board[r][c]
    board[r][c] = '#'

    // Explore 4 directions
    found = dfs(board, word, r+1, c, idx+1) OR
            dfs(board, word, r-1, c, idx+1) OR
            dfs(board, word, r, c+1, idx+1) OR
            dfs(board, word, r, c-1, idx+1)

    // Restore (backtrack)
    board[r][c] = temp

    RETURN found
```

### Optimization: Early Termination

Before starting DFS, check if the board contains all the characters in the word with sufficient frequency. If not, return false immediately.

---

## 4. Walkthrough

```
board = [["A","B","C","E"],
         ["S","F","C","S"],
         ["A","D","E","E"]]
word = "ABCCED"

Start at (0,0)='A' matches word[0]
  → (0,1)='B' matches word[1]
    → (0,2)='C' matches word[2]
      → (1,2)='C' matches word[3]
        → (2,2)='E' matches word[4]
          → (2,1)='D' matches word[5]
            idx == 6 == len(word) → RETURN true ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n·4^L) where L = word length |
| **Space** | O(L) recursion depth |

In practice, pruning makes it much faster.

---

## 6. Follow-Up Questions

### 6.1 Word Search II (LeetCode #212)?

Search for **multiple words** simultaneously. Build a **Trie** from all words, then DFS on the board using the Trie for pruning. Much more efficient than running Word Search I for each word.

### 6.2 How to handle the board being very large?

- Frequency pruning: check character counts before DFS.
- Start from the rarer end of the word (if the last char is rarer than the first, reverse the word).
- Prune branches early when the remaining board doesn't have enough characters.

### 6.3 What if the word can use diagonal adjacency?

Add 4 more directions: `(1,1), (1,-1), (-1,1), (-1,-1)`. Change 4^L to 8^L.

### 6.4 What if cells can be reused?

Remove the visited marking (no backtracking needed for visits). But cycles become possible — add a maximum depth or visited tracking per path.

---

## Key Takeaway

> Word Search is the canonical **grid backtracking** problem. The pattern: try each cell as a start, DFS with visited marking, backtrack by restoring. Using the grid itself as the visited set (marking with `'#'`) saves space.
