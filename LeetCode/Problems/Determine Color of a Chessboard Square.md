# 1812. Determine Color of a Chessboard Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/determine-color-of-a-chessboard-square](https://leetcode.com/problems/determine-color-of-a-chessboard-square)
**Companies:** Jpmorgan

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Parity Check](#approach-parity-check)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `coordinates` representing a chessboard square (e.g., `"a1"`), return `true` if the square is **white**, and `false` if it is **black**.

The coordinate is given as a letter (`a`–`h`) followed by a digit (`1`–`8`). On a standard chessboard, `"a1"` is black.

---

## Examples

```
Input: "a1" → false (black)
Input: "h3" → true  (white)
Input: "c7" → false (black)
```

Visual (partial):
```
8  □ ■ □ ■ □ ■ □ ■
7  ■ □ ■ □ ■ □ ■ □
6  □ ■ □ ■ □ ■ □ ■
...
2  □ ■ □ ■ □ ■ □ ■
1  ■ □ ■ □ ■ □ ■ □
   a b c d e f g h
```

---

## Key Insight

> A square is **white** if the **sum of its column index and row index is even**, and **black** if the sum is odd (using 1-based indexing where a=1). Equivalently: `(letter + digit) % 2 == 0` → white.

---

## Approach: Parity Check ✅

```
FUNCTION squareIsWhite(coordinates):
    col ← coordinates[0] - 'a' + 1     // a=1, b=2, ..., h=8
    row ← coordinates[1] - '0'          // 1–8

    RETURN (col + row) % 2 = 0
END FUNCTION
```

Even simpler — since ASCII values of 'a' and '1' are both odd, you can directly check:

```
FUNCTION squareIsWhite(coordinates):
    RETURN (coordinates[0] + coordinates[1]) % 2 = 0
END FUNCTION
```

---

## Walkthrough

| Square | col | row | col+row | Parity | Color |
|--------|-----|-----|---------|--------|-------|
| `"a1"` | 1   | 1   | 2       | even   | white? No — correction needed |

Actually, `"a1"` is black. Let's re-examine: `'a'` = 97 (odd), `'1'` = 49 (odd). Sum = 146 (even). But `"a1"` is black. So we need **odd sum → white**:

```
FUNCTION squareIsWhite(coordinates):
    RETURN (coordinates[0] + coordinates[1]) % 2 != 0
END FUNCTION
```

| Square | ASCII sum | % 2 | ≠ 0? | Color |
|--------|-----------|-----|------|-------|
| `"a1"` | 97+49=146 | 0   | false | **black** ✅ |
| `"h3"` | 104+51=155 | 1  | true  | **white** ✅ |
| `"c7"` | 99+55=154 | 0   | false | **black** ✅ |

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Two character operations |
| **Space** | O(1) | No extra storage |

---

## Key Takeaway

> **Chessboard color is determined by coordinate parity — a one-line modular arithmetic check replaces any lookup table or conditional logic.**
