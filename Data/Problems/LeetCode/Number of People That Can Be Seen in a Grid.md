# 2282. Number of People That Can Be Seen in a Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-people-that-can-be-seen-in-a-grid](https://leetcode.com/problems/number-of-people-that-can-be-seen-in-a-grid)
**Companies:** Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack per Row/Column — O(m·n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an `m x n` **0-indexed** 2D array of positive integers `heights` where `heights[i][j]` is the height of the person standing at position `(i, j)`.

A person standing at position `(row_1, col_1)` can see a person standing at position `(row_2, col_2)` if:

- The person at `(row_2, col_2)` is to the right **or** below the person at `(row_1, col_1)`. More formally, this means that either `row_1 == row_2` and `col_1 < col_2` **or** `row_1 < row_2` and `col_1 == col_2`.
- Everyone in between them is shorter than **both** of them.

Return* an *`m x n`* 2D array of integers *`answer`* where *`answer[i][j]`* is the number of people that the person at position *`(i, j)`* can see.*

**Constraints:**
- `1 <= heights.length <= 400`
- `1 <= heights[i].length <= 400`
- `1 <= heights[i][j] <= 10^5`

---

## 2. Key Insight

> Use monotonic decreasing stacks. For each row (looking right) and column (looking down), a person can see the next person, and can see past shorter people to the next taller-or-equal person.

---

## 3. Approach: Monotonic Stack per Row/Column — O(m·n) ✅

```text
FUNCTION seePeople(heights):
    m ← NUMBER OF ROWS IN heights
    n ← NUMBER OF COLUMNS IN heights
    result ← MATRIX OF ZEROES WITH DIMENSIONS m × n

    // Process each row from right to left
    FOR r ← 0 TO m-1:
        stack ← []
        FOR c ← n-1 DOWNTO 0:
            visible ← 0
            WHILE stack NOT EMPTY AND heights[r][c] > stack.TOP():
                stack.POP()
                visible ← visible + 1
            IF stack NOT EMPTY:
                // Can see the first taller-or-equal person
                visible ← visible + 1
            result[r][c] ← result[r][c] + visible
            stack.PUSH(heights[r][c])

    // Process each column from bottom to top
    FOR c ← 0 TO n-1:
        stack ← []
        FOR r ← m-1 DOWNTO 0:
            visible ← 0
            WHILE stack NOT EMPTY AND heights[r][c] > stack.TOP():
                stack.POP()
                visible ← visible + 1
            IF stack NOT EMPTY:
                visible ← visible + 1
            result[r][c] ← result[r][c] + visible
            stack.PUSH(heights[r][c])

    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: heights = [[3,1,4,2,5]]
Output: [[2,1,2,1,0]]
Explanation: - The person at (0, 0) can see the people at (0, 1) and (0, 2).
  Note that he cannot see the person at (0, 4) because the person at (0, 2) is taller than him.
- The person at (0, 1) can see the person at (0, 2).
- The person at (0, 2) can see the people at (0, 3) and (0, 4).
- The person at (0, 3) can see the person at (0, 4).
- The person at (0, 4) cannot see anybody.
```

**Example 2:**
```
Input: heights = [[5,1],[3,1],[4,1]]
Output: [[3,1],[2,1],[1,0]]
Explanation: - The person at (0, 0) can see the people at (0, 1), (1, 0) and (2, 0).
- The person at (0, 1) can see the person at (1, 1).
- The person at (1, 0) can see the people at (1, 1) and (2, 0).
- The person at (1, 1) can see the person at (2, 1).
- The person at (2, 0) can see the person at (2, 1).
- The person at (2, 1) cannot see anybody.
```

---

## 5. Walkthrough

Consider the first example grid:
| Row/Col | 0 | 1 | 2 |
|---------|---|---|---|
| **0**   | 3 | 1 | 4 |
| **1**   | 2 | 5 | 1 |

**Row processing (right‑to‑left)**
- Row 0: start with empty stack.
  - c=2 (value 4): stack empty → visible=0, push 4.
  - c=1 (value 1): 1 < 4 → visible=1 (can see 4), push 1.
  - c=0 (value 3): pop 1 (shorter) → visible=1, now top=4 (taller) → visible=2, push 3.
- Row 1 follows similarly.

**Column processing (bottom‑to‑top)**
- Column 0: start empty.
  - r=1 (value 2): stack empty → visible=0, push 2.
  - r=0 (value 3): pop 2 (shorter) → visible=1, stack empty → no taller person, push 3.
- Columns 1 and 2 are analogous.

Adding row and column contributions yields the final result matrix shown in the example.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(max(m, n)) for the temporary stacks |

---

## 7. Follow-Up Questions

1. How would you modify the algorithm if visibility is required in all four directions (right, left, up, down)?
2. Can the approach be extended to handle diagonal visibility?
3. What changes are needed if the grid is extremely large and must be processed in a streaming fashion?

---

## 8. Key Takeaway

> **Monotonic stack for visibility.** Process rows and columns in reverse, pop shorter heights (visible), then count the first taller-or-equal person as also visible.
