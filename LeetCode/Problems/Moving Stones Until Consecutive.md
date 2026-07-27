# 1033. Moving Stones Until Consecutive

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/moving-stones-until-consecutive](https://leetcode.com/problems/moving-stones-until-consecutive)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Math — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Three stones at positions `a`, `b`, `c`. Each move: take an endpoint stone and place it between the other two (not at the endpoints). Return `[minMoves, maxMoves]`.

**Constraints:**
- `1 <= a, b, c <= 100`, all distinct

---

## 2. Key Insight

> Sort positions. **Max** = total gaps = `(z - y - 1) + (y - x - 1)`. **Min**: if all consecutive → 0; if either gap is 1 or 2 → 1 move; otherwise → 2 moves.

---

## 3. Approach: Math — O(1) ✅

```
FUNCTION numMovesStones(a, b, c):
    x, y, z = SORT(a, b, c)
    maxMoves = (z - y - 1) + (y - x - 1)

    IF maxMoves == 0: RETURN [0, 0]
    IF (y - x <= 2) OR (z - y <= 2):
        RETURN [1, maxMoves]
    RETURN [2, maxMoves]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Three-stone puzzle reduces to gap analysis.** Max = total empty slots. Min depends on whether any gap ≤ 2 (allowing one jump to close).
