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

You are given an integer `n` and an integer `p` representing an array `arr` of length `n` where all elements are set to 0's, except position `p` which is set to 1. You are also given an integer array `banned` containing restricted positions. Perform the following operation on `arr`:

- Reverse a **subarray** with size `k` if the single 1 is not set to a position in `banned`.

Return an integer array `answer` with `n` results where the `i^th` result is* *the **minimum** number of operations needed to bring the single 1 to position `i` in `arr`, or -1 if it is impossible.

**Constraints:**
- `1 <= n <= 10^5`
- `0 <= p <= n - 1`
- `0 <= banned.length <= n - 1`
- `0 <= banned[i] <= n - 1`
- `1 <= k <= n `
- `banned[i] != p`
- all values in `banned` are **unique**

---

## 2. Examples

**Example 1:**
```
Input: n = 4, p = 0, banned = [1,2], k = 4
Output: [0,-1,-1,1]
Explanation: - Initially 1 is placed at position 0 so the number of operations we need for position 0 is 0.
- We can never place 1 on the banned positions, so the answer for positions 1 and 2 is -1.
- Perform the operation of size 4 to reverse the whole array.
- After a single operation 1 is at position 3 so the answer for position 3 is 1.
```

**Example 2:**
```
Input: n = 5, p = 0, banned = [2,4], k = 3
Output: [0,-1,-1,-1,-1]
Explanation: - Initially 1 is placed at position 0 so the number of operations we need for position 0 is 0.
- We cannot perform the operation on the subarray positions [0, 2] because position 2 is in banned.
- Because 1 cannot be set at position 2, it is impossible to set 1 at other positions in more operations.
```

**Example 3:**
```
Input: n = 4, p = 2, banned = [0,1,3], k = 1
Output: [-1,-1,0,-1]
Explanation: Perform operations of size 1 and 1 never changes its position.
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
