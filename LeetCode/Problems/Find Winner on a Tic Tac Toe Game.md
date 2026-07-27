# 1275. Find Winner on a Tic Tac Toe Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game](https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Zoho

---

```
FUNCTION tictactoe(moves):
    rows = [0]*3; cols = [0]*3; diag = antidiag = 0

    FOR i, [r, c] IN enumerate(moves):
        player = 1 IF i % 2 == 0 ELSE -1
        rows[r] += player
        cols[c] += player
        IF r == c: diag += player
        IF r + c == 2: antidiag += player
        IF ABS(rows[r]) == 3 OR ABS(cols[c]) == 3 OR ABS(diag) == 3 OR ABS(antidiag) == 3:
            RETURN "A" IF player == 1 ELSE "B"

    RETURN "Draw" IF len(moves) == 9 ELSE "Pending"
```
