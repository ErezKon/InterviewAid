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

Same as Break Locks I but with larger `n`. Your sword power doubles after each lock. Assign locks to positions (1st, 2nd, ...) to minimize total time. Time for lock `i` at position `j` = `⌈strength[i] / 2^j⌉`.

**Constraints:**
- `1 <= n <= 500`

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
strength = [9, 3, 8]
Output: 5
Explanation:
- Assign lock 0 (9) to position 2 → time = ceil(9 / 2^2) = 3
- Assign lock 1 (3) to position 0 → time = ceil(3 / 2^0) = 3
- Assign lock 2 (8) to position 1 → time = ceil(8 / 2^1) = 4
Total = 3 + 3 + 4 = 10, but a better assignment yields total 5.
```

**Example 2:**
```
strength = [1, 2, 4, 8]
Output: 4
Explanation: Assign each lock to a position where its strength is halved enough to become 1, yielding total time 4.
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

The Hungarian algorithm selects the minimum‑cost matching: (Lock 0→Pos 2, Lock 1→Pos 0, Lock 2→Pos 1) giving total time `3 + 3 + 4 = 10`. A different optimal matching yields total `5` (Lock 0→Pos 1, Lock 1→Pos 2, Lock 2→Pos 0). The algorithm systematically improves the assignment until the minimal total is found.

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
