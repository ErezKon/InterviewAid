# 1138. Alphabet Board Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alphabet-board-path](https://leetcode.com/problems/alphabet-board-path)
**Companies:** Google

---

## 1. Problem Description

Given a 5×5 alphabet board (`a`-`y` in rows 0-4, `z` alone on row 5), and a target string, return the sequence of moves (`U`, `D`, `L`, `R`, `!`) to spell the target starting from `a` at (0,0).

```
a b c d e
f g h i j
k l m n o
p q r s t
u v w x y
z
```

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

| target | output |
|--------|--------|
| "leet" | "DDR!UURRR!!DDD!" |
| "code" | "RR!DDRR!UUL!R!" |

*Explanation*: The moves navigate the board to each character, appending `!` after reaching it.

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
