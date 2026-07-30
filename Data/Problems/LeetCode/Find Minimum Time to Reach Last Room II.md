# 3342. Find Minimum Time to Reach Last Room II

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Uber

---

## Problem Description
You are given an `m × n` grid. From any cell you may move to its four orthogonal neighbors. The cost of each move alternates between **1** and **2** units of time: the first move costs 1, the second costs 2, the third costs 1, and so on. Additionally, each cell may have an intrinsic waiting time (as in version I) but for this variant we only consider the alternating move cost. Return the minimum total time required to travel from the top‑left cell `(0,0)` to the bottom‑right cell `(m‑1,n‑1)`.

Constraints: `1 ≤ m, n ≤ 100`.

## Examples
**Example 1**
```
Input: m = 2, n = 2
Output: 3
Explanation: Path (0,0) → (0,1) costs 1, then (0,1) → (1,1) costs 2. Total = 3.
```
**Example 2**
```
Input: m = 3, n = 3
Output: 5
Explanation: One optimal path uses costs 1,2,1,2 = 5.
```

## Approach
The alternating cost can be encoded in the state of Dijkstra’s algorithm. Each heap entry stores `(time, row, col, parity)` where `parity` indicates whether the next move will cost 1 (`parity=0`) or 2 (`parity=1`). When expanding a node:
1. Determine `stepCost ← 1` if `parity = 0` else `2`.
2. For each neighbor, compute `nextTime ← currentTime + stepCost`.
3. Push `(nextTime, nr, nc, 1‑parity)` onto the min‑heap if it improves the recorded distance for that `(nr,nc,parity)`.
The first time we pop the target cell (any parity) we have the optimal answer.

## Walkthrough
| Pop (time, cell, parity) | Neighbour | stepCost | nextTime | New parity |
|---------------------------|-----------|----------|----------|------------|
| (0,0,0)                   | (0,1)     | 1        | 1        | 1          |
| (0,0,0)                   | (1,0)     | 1        | 1        | 1          |
| (1,0,1)                   | (1,1)     | 2        | 3        | 0          |
| (0,1,1)                   | (1,1)     | 2        | 3        | 0          |
| (1,1,0) (target)          | —         | —        | 3        | —          |
The algorithm stops when `(m‑1,n‑1)` is popped.

## Complexity Analysis
Time: `O(m·n·log(m·n))` because each cell is processed for two parity states and each heap operation is logarithmic.
Space: `O(m·n)` for the distance matrix storing the best time for each parity.

## Follow‑Up Questions
1. How would the solution change if the move costs followed a different periodic pattern?
2. What if each cell also had a waiting time that must be respected before entering?
3. Can a 0‑1 BFS be used when the alternating costs are only 0 and 1?

## Key Takeaway
By extending Dijkstra’s state with a parity flag, we can handle periodic edge costs and still obtain the optimal path efficiently.
