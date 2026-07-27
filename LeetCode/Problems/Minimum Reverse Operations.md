# 2612. Minimum Reverse Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-reverse-operations](https://leetcode.com/problems/minimum-reverse-operations)
**Companies:** Infosys

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS + Sorted Set — O(n log n)](#4-approach-bfs--sorted-set--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` positions (0-indexed), a starting position `p`, a set of banned positions, and a window size `k`, in one operation you can reverse any subarray of length `k` that contains position `p`. Return the **minimum** operations to move to each position, or `-1` if unreachable.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= k <= n`

---

## 2. Examples

```
Example 1:
  Input: n = 4, p = 0, banned = [1, 2], k = 4
  Output: [0, -1, -1, 1]
  Explanation: Reverse entire array [0,1,2,3] → p moves to position 3. Positions 1,2 banned.

Example 2:
  Input: n = 5, p = 0, banned = [], k = 1
  Output: [0, -1, -1, -1, -1]
  Explanation: k=1 means no movement possible.
```

---

## 3. Key Insight

> When reversing a subarray of length `k` containing position `p`, position `p` can move to a specific new position determined by the subarray bounds. The reachable positions from `p` form a contiguous range with a **parity constraint** (positions reachable have the same parity as `p` shifted by `k-1`). Use BFS with two sorted sets (one per parity) to efficiently find unvisited reachable positions.

---

## 4. Approach: BFS + Sorted Set — O(n log n) ✅

```
FUNCTION minReverseOperations(n, p, banned, k):
    bannedSet = SET(banned)
    // Two sorted sets: one for even positions, one for odd
    available = [SortedSet(), SortedSet()]
    FOR i ← 0 TO n - 1:
        IF i != p AND i NOT IN bannedSet:
            available[i % 2].ADD(i)

    result = [-1] * n
    result[p] = 0
    queue = [p]

    WHILE queue:
        curr = queue.DEQUEUE()
        // Compute range of reachable positions
        lo = curr - (k - 1) + max(0, k - 1 - curr)... // mirror formula
        hi = curr + (k - 1) - max(0, curr + k - 1 - (n - 1))...
        // Correct parity set
        parity = lo % 2
        // Pop all available positions in [lo, hi] from sorted set
        FOR pos IN available[parity].range(lo, hi):
            result[pos] = result[curr] + 1
            queue.ENQUEUE(pos)
            available[parity].REMOVE(pos)

    RETURN result
```

---

## 5. Walkthrough

```
n=4, p=0, banned=[1,2], k=4

available[0] = {}, available[1] = {3}
(positions 1,2 banned; position 0 is start)

BFS from 0:
  Reverse subarray of length 4 starting at 0: [0,1,2,3] → 0 maps to 3
  lo=3, hi=3, parity=1
  Pop 3 from available[1]. result[3]=1.

Result: [0, -1, -1, 1] ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — each position removed from sorted set at most once |
| **Space** | O(n) — sorted sets and BFS queue |

---

## 7. Key Takeaway

> **BFS with sorted set pruning** — the key trick is maintaining unvisited positions in sorted sets (split by parity) so that each BFS level efficiently finds and removes all reachable positions. Each position is processed exactly once.
