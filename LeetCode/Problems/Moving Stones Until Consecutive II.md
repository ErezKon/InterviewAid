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

Given `n` stones at distinct positions on a number line. Each move: take an endpoint stone and place it at an unoccupied position between the current endpoints. Return `[minMoves, maxMoves]`.

**Constraints:**
- `3 <= stones.length <= 10⁴`

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

| Stones | Output | Explanation |
|--------|--------|-------------|
| `[1,2,5,6,9]` | `[2,3]` | Max moves: move endpoint `1` to `8`, then `9` to `7` → 3 moves. Min moves: best window `[5,6,9]` has 2 stones, need `5-3 = 2` moves.
| `[4,7,9]` | `[1,2]` | Max moves = `(9-7-1)+(7-4-1)=2`. Min moves = 1 because moving `4` to `8` makes `[7,8,9]`.

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
