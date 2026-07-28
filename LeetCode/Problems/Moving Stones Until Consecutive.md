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

Three stones are placed at distinct integer positions `a`, `b`, and `c` on an infinite number line. In one move, you may take an endpoint stone (the leftmost or rightmost) and relocate it to any empty position strictly between the other two stones (it cannot land on an existing stone or remain at an endpoint). Return a two‑element array `[minMoves, maxMoves]` where `minMoves` is the smallest possible number of moves to make the stones occupy three consecutive positions, and `maxMoves` is the largest possible number of moves before they become consecutive.

**Constraints:**
- `1 <= a, b, c <= 100`
- `a`, `b`, `c` are distinct

---

## 2. Examples

| stones | Output | Explanation |
|--------|--------|-------------|
| `[1,2,5]` | `[1,2]` | Minimum 1 move (move stone at 5 to 3). Maximum 2 moves (move stone at 1 to 4, then stone at 5 to 3). |
| `[4,3,2]` | `[0,0]` | Stones are already consecutive; no moves needed. |
| `[6,5,4]` | `[0,0]` | Already consecutive in reverse order. |

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
