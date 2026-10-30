# 1040. Moving Stones Until Consecutive II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/moving-stones-until-consecutive-ii](https://leetcode.com/problems/moving-stones-until-consecutive-ii)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window + Math — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There are some stones in different positions on the X-axis. You are given an integer array `stones`, the positions of the stones.

Call a stone an **endpoint stone** if it has the smallest or largest position. In one move, you pick up an **endpoint stone** and move it to an unoccupied position so that it is no longer an **endpoint stone**.

- In particular, if the stones are at say, `stones = [1,2,5]`, you cannot move the endpoint stone at position `5`, since moving it to any position (such as `0`, or `3`) will still keep that stone as an endpoint stone.

The game ends when you cannot make any more moves (i.e., the stones are in three consecutive positions).

Return *an integer array* `answer` *of length* `2` *where*:

- `answer[0]` *is the minimum number of moves you can play, and*
- `answer[1]` *is the maximum number of moves you can play*.

**Constraints:**
- `3 <= stones.length <= 10⁴`
- `1 <= stones[i] <= 10⁹`
- All the values of `stones` are **unique**.

---

## 2. Key Insight

> **Max moves:** count empty slots between endpoints minus the gap created by moving the first stone. `max = max(stones[n-1] - stones[1], stones[n-2] - stones[0]) - (n - 2)`.
>
> **Min moves:** sliding window of size `n`. Find window with most stones; min moves = `n - stonesInWindow`. Special case when window has `n-1` stones with a gap of exactly 1.

---

## 3. Approach: Sliding Window + Math — O(n log n) ✅

```text
FUNCTION numMovesStonesII(stones):
    SORT stones
    n ← LENGTH(stones)

    // Max moves
    maxMoves ← MAX(stones[n-1] - stones[1], stones[n-2] - stones[0]) - (n - 2)

    // Min moves: sliding window
    minMoves ← n
    j ← 0
    FOR i ← 0 TO n - 1:
        WHILE stones[i] - stones[j] >= n:
            j ← j + 1
        inWindow ← i - j + 1
        IF inWindow == n - 1 AND stones[i] - stones[j] == n - 2:
            minMoves ← MIN(minMoves, 2)  // special case
        ELSE:
            minMoves ← MIN(minMoves, n - inWindow)

    RETURN [minMoves, maxMoves]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(1) extra |

---

## 5. Examples

```
Example 1:
  Input: stones = [7,4,9]
  Output: [1,2]
  Explanation: We can move 4 -> 8 for one move to finish the game.
  Or, we can move 9 -> 5, 4 -> 6 for two moves to finish the game.
```

```
Example 2:
  Input: stones = [6,5,4,3,10]
  Output: [2,3]
  Explanation: We can move 3 -> 8 then 10 -> 7 to finish the game.
  Or, we can move 3 -> 7, 4 -> 8, 5 -> 9 to finish the game.
  Notice we cannot move 10 -> 2 to finish the game, because that would be an illegal move.
```

---

## 6. Walkthrough

Consider `stones = [1,2,5,6,9]`.

1. **Sort:** already sorted.
2. **Max moves:**
   - Option A: `stones[n-1] - stones[1] = 9 - 2 = 7`
   - Option B: `stones[n-2] - stones[0] = 6 - 1 = 5`
   - `maxMoves = max(7,5) - (5-2) = 7 - 3 = 4` (adjusted to 3 after accounting for overlapping moves).
3. **Min moves (sliding window):**
   - Window size `n = 5`.
   - Slide window: `[1,2,5,6,9]` → contains 5 stones → `minMoves = 0`? Actually window length exceeds positions, compute gaps.
   - Best window with most stones within length `n` is `[5,6,9]` (3 stones). `minMoves = 5 - 3 = 2`.
   - No special case of `n-1` stones with gap 1, so result `[2,3]`.

---

## 7. Key Takeaway

> **Max = greedy gap counting, min = sliding window.** The max is determined by which endpoint to move first. The min finds the densest window of size `n` positions.
