# 723. Candy Crush

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/candy-crush](https://leetcode.com/problems/candy-crush)
**Companies:** Bloomberg, Braze, Capital One, Google, Meta, Pinterest, Roblox, Rubrik, Tiktok, Uber, Visa

---

## Approach: Simulate — O((m·n)²) ✅

```
FUNCTION candyCrush(board):
    WHILE true:
        // 1. Mark cells to crush (3+ consecutive horizontally or vertically)
        toCrush = set()

        FOR r ← 0 TO m - 1:
            FOR c ← 0 TO n - 3:
                IF board[r][c] != 0 AND board[r][c] == board[r][c+1] == board[r][c+2]:
                    toCrush.ADD((r,c), (r,c+1), (r,c+2))

        FOR c ← 0 TO n - 1:
            FOR r ← 0 TO m - 3:
                IF board[r][c] != 0 AND board[r][c] == board[r+1][c] == board[r+2][c]:
                    toCrush.ADD((r,c), (r+1,c), (r+2,c))

        IF toCrush is empty: BREAK

        // 2. Crush
        FOR (r, c) IN toCrush: board[r][c] = 0

        // 3. Gravity (drop non-zero values down in each column)
        FOR c ← 0 TO n - 1:
            write = m - 1
            FOR r ← m - 1 DOWN TO 0:
                IF board[r][c] != 0:
                    board[write][c] = board[r][c]
                    write -= 1
            FOR r ← write DOWN TO 0:
                board[r][c] = 0

    RETURN board
```
