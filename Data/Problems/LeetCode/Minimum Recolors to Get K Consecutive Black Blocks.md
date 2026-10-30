# 2379. Minimum Recolors to Get K Consecutive Black Blocks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks](https://leetcode.com/problems/minimum-recolors-to-get-k-consecutive-black-blocks)
**Companies:** Amazon, Dailyhunt, Google, Hp, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window — O(n)](#4-approach-sliding-window--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** string `blocks` of length `n`, where `blocks[i]` is either `'W'` or `'B'`, representing the color of the `i^th` block. The characters `'W'` and `'B'` denote the colors white and black, respectively.

You are also given an integer `k`, which is the desired number of **consecutive** black blocks.

In one operation, you can **recolor** a white block such that it becomes a black block.

Return* the **minimum** number of operations needed such that there is at least **one** occurrence of *`k`* consecutive black blocks.*

**Constraints:**
- `n == blocks.length`
- `1 <= n <= 100`
- `blocks[i]` is either `'W'` or `'B'`.
- `1 <= k <= n`

---

## 2. Examples

**Example 1:**
```
Input: blocks = "WBBWWBBWBW", k = 7
Output: 3
Explanation: One way to achieve 7 consecutive black blocks is to recolor the 0th, 3rd, and 4th blocks
so that blocks = "BBBBBBBWBW".
It can be shown that there is no way to achieve 7 consecutive black blocks in less than 3 operations.
Therefore, we return 3.
```

**Example 2:**
```
Input: blocks = "WBWBBBW", k = 2
Output: 0
Explanation: No changes need to be made, since 2 consecutive black blocks already exist.
Therefore, we return 0.
```

---

## 3. Key Insight

> Sliding window of size `k`: count white blocks in the window. The minimum white count across all windows = minimum recolors needed.

---

## 4. Approach: Sliding Window — O(n) ✅

```
FUNCTION minimumRecolors(blocks, k):
    whites = blocks[:k].count('W')
    minWhites = whites
    FOR i ← k TO len(blocks) - 1:
        whites += (blocks[i] == 'W') - (blocks[i-k] == 'W')
        minWhites = MIN(minWhites, whites)
    RETURN minWhites
```

---

## 5. Walkthrough

```
blocks = "WBWBBBW", k = 2

Initial window [0,1] = "WB": whites=1
i=2: add 'W', remove 'W': whites=1
i=3: add 'B', remove 'B': whites=1... 
Wait: window [1,2]="BW" → 1, [2,3]="WB" → 1, [3,4]="BB" → 0 ← min!
i=4: whites=0 → minWhites=0
i=5: add 'B', remove 'B': whites=0
i=6: add 'W', remove 'B': whites=1

Answer = 0 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass sliding window |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Fixed-size sliding window** — count the "bad" elements (W's) in each window of size `k`. The minimum count = answer. Classic pattern for "best window of fixed size."
