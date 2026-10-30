# 1033. Moving Stones Until Consecutive

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/moving-stones-until-consecutive](https://leetcode.com/problems/moving-stones-until-consecutive)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Math — O(1)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

There are three stones in different positions on the X-axis. You are given three integers `a`, `b`, and `c`, the positions of the stones.

In one move, you pick up a stone at an endpoint (i.e., either the lowest or highest position stone), and move it to an unoccupied position between those endpoints. Formally, let's say the stones are currently at positions `x`, `y`, and `z` with `x < y < z`. You pick up the stone at either position `x` or position `z`, and move that stone to an integer position `k`, with `x < k < z` and `k != y`.

The game ends when you cannot make any more moves (i.e., the stones are in three consecutive positions).

Return *an integer array* `answer` *of length* `2` *where*:

- `answer[0]` *is the minimum number of moves you can play, and*
- `answer[1]` *is the maximum number of moves you can play*.

**Constraints:**
- `1 <= a, b, c <= 100`
- `a`, `b`, and `c` have different values.

---

## 2. Examples

```
Example 1:
  Input: a = 1, b = 2, c = 5
  Output: [1,2]
  Explanation: Move the stone from 5 to 3, or move the stone from 5 to 4 to 3.
```

```
Example 2:
  Input: a = 4, b = 3, c = 2
  Output: [0,0]
  Explanation: We cannot make any moves.
```

```
Example 3:
  Input: a = 3, b = 5, c = 1
  Output: [1,2]
  Explanation: Move the stone from 1 to 4; or move the stone from 1 to 2 to 4.
```

---

## 3. Key Insight

> Sort the positions to `x < y < z`. The **maximum** number of moves equals the total number of empty slots between the stones: `(z - y - 1) + (y - x - 1)`. The **minimum** moves follow a simple rule: if the stones are already consecutive → 0; if either gap is `1` or `2` → 1 move; otherwise → 2 moves.

---

## 4. Approach: Math — O(1) ✅

```text
FUNCTION numMovesStones(a, b, c):
    // Sort positions
    x, y, z ← SORT(a, b, c)
    // Compute maximum moves as total empty slots
    maxMoves ← (z - y - 1) + (y - x - 1)

    IF maxMoves == 0:
        RETURN [0, 0]

    // Minimum moves logic
    IF (y - x <= 2) OR (z - y <= 2):
        minMoves ← 1
    ELSE:
        minMoves ← 2
    RETURN [minMoves, maxMoves]
```

---

## 5. Walkthrough

Consider the input `[1,2,5]`.

1. **Sort:** `x=1`, `y=2`, `z=5`.
2. **Maximum moves:** `(5-2-1) + (2-1-1) = 2 + 0 = 2`.
3. **Minimum moves:** Gaps are `y-x = 1` and `z-y = 3`. Since `y-x <= 2`, we can achieve consecutiveness in a single move by moving the stone at `5` to position `3` → stones become `[1,2,3]`.
4. Result: `[minMoves, maxMoves] = [1, 2]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would the solution change if you could move any stone (not just endpoints)?
- What is the minimum number of moves if the stones can be placed on any integer line, including negative positions?
- Can you extend the problem to `k` stones and compute min/max moves efficiently?

---

## 8. Key Takeaway

> **Three‑stone puzzle reduces to simple gap analysis.** The maximum moves equal the total empty slots, while the minimum moves depend on whether any gap is ≤ 2, allowing a single jump to close the gap.
