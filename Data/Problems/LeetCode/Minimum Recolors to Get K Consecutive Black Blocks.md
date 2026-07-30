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

Given a string `blocks` of `'W'` (white) and `'B'` (black), and integer `k`, return the **minimum** number of white blocks you need to recolor to black to get `k` consecutive black blocks.

**Constraints:**
- `1 <= blocks.length <= 100`
- `1 <= k <= blocks.length`

---

## 2. Examples

```
Example 1:
  Input: blocks = "WBBWWBBWBW", k = 7
  Output: 3
  Explanation: Window "WBBWWBB" has 3 W's → recolor 3.

Example 2:
  Input: blocks = "WBWBBBW", k = 2
  Output: 0
  Explanation: "BB" already exists at indices 3-4.
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
