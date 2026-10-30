# 2498. Frog Jump II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/frog-jump-ii](https://leetcode.com/problems/frog-jump-ii)
**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** integer array `stones` sorted in **strictly increasing order** representing the positions of stones in a river.

A frog, initially on the first stone, wants to travel to the last stone and then return to the first stone. However, it can jump to any stone **at most once**.

The **length** of a jump is the absolute difference between the position of the stone the frog is currently on and the position of the stone to which the frog jumps.

- More formally, if the frog is at `stones[i]` and is jumping to `stones[j]`, the length of the jump is `|stones[i] - stones[j]|`.

The **cost** of a path is the **maximum length of a jump** among all jumps in the path.

Return *the **minimum** cost of a path for the frog*.

**Constraints:**
- `2 <= stones.length <= 10^5`
- `0 <= stones[i] <= 10^9`
- `stones[0] == 0`
- `stones` is sorted in a strictly increasing order.

**Official examples:** `stones = [0,2,5,6,7]` → `5`; `stones = [0,3,9]` → `9` (the frog can jump directly to the last stone and come back; cost 9).

---

## 2. Key Insight

> Optimally, one trip uses even-indexed stones and the other uses odd-indexed stones. The max jump = max gap between every other stone, i.e., `max(stones[i] - stones[i-2])`.

---

## 3. Approach

```
FUNCTION maxJump(stones):
    IF len(stones) == 2: RETURN stones[1] - stones[0]
    result ← 0
    FOR i ← 2 TO len(stones) - 1:
        result ← MAX(result, stones[i] - stones[i-2])
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Examples

| stones | max jump |
|--------|----------|
| `[0,2,5,6,7,10]` | `5` |
| `[0,1,3,6,10]` | `4` |

---

## 6. Walkthrough

1. For `[0,2,5,6,7,10]` compute gaps between every second stone:
   - `stones[2] - stones[0] = 5 - 0 = 5`
   - `stones[3] - stones[1] = 6 - 2 = 4`
   - `stones[4] - stones[2] = 7 - 5 = 2`
   - `stones[5] - stones[3] = 10 - 6 = 4`
2. The maximum of these gaps is `5`, which is the minimal possible maximum jump.

---

## 7. Follow-Up Questions

1. How would the solution change if the frog could reuse stones on the return trip?
2. What if the frog must make exactly `k` trips instead of two?

---

## 8. Key Takeaway

> Split stones into even/odd indexed sublists for the two trips. The bottleneck is the max gap between alternate stones.
