# 3385. Minimum Time to Break Locks II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-break-locks-ii](https://leetcode.com/problems/minimum-time-to-break-locks-ii)
**Companies:** Ivp

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hungarian Algorithm — O(n³)](#3-approach-hungarian-algorithm--on³)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below uses the right method (assignment / Hungarian) but the wrong cost. The factor `X` starts at 1 and increases by **1** after each lock (energy resets), so breaking lock `i` as the `j`-th lock (0-based) costs `ceil(strength[i] / (j + 1))`, not `/ 2^(j+1)`.*

> *Note: premium problem — statement verified via doocs/leetcode.*

Bob is stuck in a dungeon and must break `n` locks, each requiring some amount of **energy** to break. The required energy for each lock is stored in an array called `strength` where `strength[i]` indicates the energy needed to break the `i^th` lock.

To break a lock, Bob uses a sword with the following characteristics:

- The initial energy of the sword is 0.
- The initial factor `X` by which the energy of the sword increases is 1.
- Every minute, the energy of the sword increases by the current factor `X`.
- To break the `i^th` lock, the energy of the sword must reach at least `strength[i]`.
- After breaking a lock, the energy of the sword resets to 0, and the factor `X` increases by 1.

Your task is to determine the **minimum** time in minutes required for Bob to break all `n` locks and escape the dungeon.

Return the **minimum **time required for Bob to break all `n` locks.

**Constraints:**
- `n == strength.length`
- `1 <= n <= 80`
- `1 <= strength[i] <= 10^6`

---

## 2. Key Insight

> This is a **minimum-cost assignment** problem. Cost matrix: `cost[i][j] = ⌈strength[i] / 2^j⌉`. Since n can be up to 500, bitmask DP is too slow — use the **Hungarian algorithm** for minimum-cost bipartite matching.

---

## 3. Approach: Hungarian Algorithm — O(n³) ✅

```text
FUNCTION findMinimumTime(strength):
    n ← LENGTH(strength)
    // Build cost matrix: cost[i][j] = ceil(strength[i] / 2^(j+1))
    cost ← n × n matrix
    FOR i ← 0 TO n - 1:
        FOR j ← 0 TO n - 1:
            cost[i][j] ← CEIL(strength[i] / (2 ^ (j + 1)))
    // Apply Hungarian algorithm on cost matrix
    RETURN hungarian(cost)
```

---

## 4. Examples

**Example 1:**
```
Input: strength = [3,4,1]
Output: 4
Explanation:
  Time
  Energy
  X
  Action
  Updated X
  0
  0
  1
  Nothing
  1
  1
  1
  1
  Break 3^rd Lock
  2
  2
  2
  2
  Nothing
  2
  3
  4
  2
  Break 2^nd Lock
  3
  4
  3
  3
  Break 1^st Lock
  3
The locks cannot be broken in less than 4 minutes; thus, the answer is 4.
```

**Example 2:**
```
Input: strength = [2,5,4]
Output: 6
Explanation:
  Time
  Energy
  X
  Action
  Updated X
  0
  0
  1
  Nothing
  1
  1
  1
  1
  Nothing
  1
  2
  2
  1
  Break 1^st Lock
  2
  3
  2
  2
  Nothing
  2
  4
  4
  2
  Break 3^rd Lock
  3
  5
  3
  3
  Nothing
  3
  6
  6
  3
  Break 2^nd Lock
  4
The locks cannot be broken in less than 6 minutes; thus, the answer is 6.
```

---

## 5. Walkthrough

Consider `strength = [9, 3, 8]`.

| Lock (i) | Strength | Position (j) | Time = ceil(strength / 2^(j+1)) |
|----------|----------|--------------|-----------------------------------|
| 0        | 9        | 0            | 9                                 |
| 0        | 9        | 1            | 5                                 |
| 0        | 9        | 2            | 3                                 |
| 1        | 3        | 0            | 3                                 |
| 1        | 3        | 1            | 2                                 |
| 1        | 3        | 2            | 1                                 |
| 2        | 8        | 0            | 8                                 |
| 2        | 8        | 1            | 4                                 |
| 2        | 8        | 2            | 2                                 |

The Hungarian algorithm selects the minimum-cost matching: (Lock 0→Pos 2, Lock 1→Pos 0, Lock 2→Pos 1) giving total time `3 + 3 + 4 = 10`. A different optimal matching yields total `5` (Lock 0→Pos 1, Lock 1→Pos 2, Lock 2→Pos 0). The algorithm systematically improves the assignment until the minimal total is found.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n³) — Hungarian algorithm |
| **Space** | O(n²) — cost matrix |

---

## 7. Follow-Up Questions

1. How would the solution change if the sword power increased by a factor other than 2?
2. Can the problem be solved in O(n²) using a specialized greedy approach for certain strength distributions?
3. How would you adapt the algorithm for a streaming version where locks arrive online?

---

## 8. Key Takeaway

> **Assignment problem → Hungarian algorithm.** When bitmask DP is too slow (n > 20), model as bipartite matching. The cost of assigning lock `i` to position `j` depends only on the pair, making it a classic assignment problem.
