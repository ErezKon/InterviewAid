# 1138. Alphabet Board Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alphabet-board-path](https://leetcode.com/problems/alphabet-board-path)
**Companies:** Google

---

## 1. Problem Description

On an alphabet board, we start at position `(0, 0)`, corresponding to character `board[0][0]`.

Here, `board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]`, as shown in the diagram below.

```
a b c d e
f g h i j
k l m n o
p q r s t
u v w x y
z
```

We may make the following moves:

- `'U'` moves our position up one row, if the position exists on the board;
- `'D'` moves our position down one row, if the position exists on the board;
- `'L'` moves our position left one column, if the position exists on the board;
- `'R'` moves our position right one column, if the position exists on the board;
- `'!'` adds the character `board[r][c]` at our current position `(r, c)` to the answer.

(Here, the only positions that exist on the board are positions with letters on them.)

Return a sequence of moves that makes our answer equal to `target` in the minimum number of moves. You may return any path that does so.

**Constraints:**
- `1 <= target.length <= 100`
- `target` consists only of English lowercase letters.

---

## 2. Key Insight

> Each letter maps to `(row, col)` = `(ord(c) - ord('a')) // 5, (ord(c) - ord('a')) % 5`. Move from current position to target position. **Gotcha:** `z` is at (5,0) — when moving **to** `z`, go left first then down; when moving **from** `z`, go up first then right. This avoids going off the board.

---

## 3. Approach: Coordinate Math — O(n) ✅

```
FUNCTION alphabetBoardPath(target):
    result = []
    r, c = 0, 0
    FOR ch IN target:
        tr = (ord(ch) - ord('a')) // 5
        tc = (ord(ch) - ord('a')) % 5
        // Move UP/LEFT before DOWN/RIGHT to avoid going past 'z' row
        IF tr < r: result += 'U' * (r - tr)
        IF tc < c: result += 'L' * (c - tc)
        IF tr > r: result += 'D' * (tr - r)
        IF tc > c: result += 'R' * (tc - c)
        result += '!'
        r, c = tr, tc
    RETURN ''.join(result)
```

| Time | Space |
|------|-------|
| O(n × 5) = O(n) | O(n) for output |

---

## Examples

```
Example 1:
  Input: target = "leet"
  Output: "DDR!UURRR!!DDD!"
  Explanation: The moves navigate the board to each character, appending '!' after reaching it.

Example 2:
  Input: target = "code"
  Output: "RR!DDRR!UUL!R!"
```

---

## Walkthrough

**Example**: target = "leet"

| Step | Current (r,c) | Target Char | Move Sequence | New (r,c) |
|------|---------------|-------------|---------------|----------|
| 1 | (0,0) | l (2,1) | D D R ! | (2,1) |
| 2 | (2,1) | e (0,4) | U U R R R ! | (0,4) |
| 3 | (0,4) | e (0,4) | ! | (0,4) |
| 4 | (0,4) | t (3,4) | D D D ! | (3,4) |

---

## Complexity Analysis

- **Time**: O(|target|) – each character processed once.
- **Space**: O(|target|) for the result string (output), O(1) auxiliary.

---

## Key Takeaway

> Map characters to grid coordinates and compute moves. The only tricky part is the `z` edge case — always move UP/LEFT before DOWN/RIGHT to avoid stepping off the board at row 5.
