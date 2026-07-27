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
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION numMovesStonesII(stones):
    SORT stones
    n = len(stones)

    // Max moves
    maxMoves = MAX(stones[n-1] - stones[1], stones[n-2] - stones[0]) - (n - 2)

    // Min moves: sliding window
    minMoves = n
    j = 0
    FOR i ← 0 TO n - 1:
        WHILE stones[i] - stones[j] >= n:
            j += 1
        inWindow = i - j + 1
        IF inWindow == n - 1 AND stones[i] - stones[j] == n - 2:
            minMoves = MIN(minMoves, 2)  // special case
        ELSE:
            minMoves = MIN(minMoves, n - inWindow)

    RETURN [minMoves, maxMoves]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(1) extra |

---

## 5. Key Takeaway

> **Max = greedy gap counting, min = sliding window.** The max is determined by which endpoint to move first. The min finds the densest window of size `n` positions.
