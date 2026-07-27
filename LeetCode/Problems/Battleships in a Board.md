# 419. Battleships in a Board

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/battleships-in-a-board](https://leetcode.com/problems/battleships-in-a-board)
**Companies:** Amazon, Bloomberg, Google, Hsbc, Meta, Microsoft, Microstrategy, Tinkoff

---

```
FUNCTION countBattleships(board):
    count = 0
    FOR r ← 0 TO m - 1:
        FOR c ← 0 TO n - 1:
            IF board[r][c] == 'X':
                IF r > 0 AND board[r-1][c] == 'X': CONTINUE
                IF c > 0 AND board[r][c-1] == 'X': CONTINUE
                count += 1
    RETURN count
```

Count only the top-left cell of each battleship. O(1) extra space.
