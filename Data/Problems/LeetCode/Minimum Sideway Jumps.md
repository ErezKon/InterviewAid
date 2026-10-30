# 1824. Minimum Sideway Jumps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-sideway-jumps](https://leetcode.com/problems/minimum-sideway-jumps)
**Companies:** Google, Microsoft, Oracle, Ponyai, Publicis Sapient, Squarepoint Capital

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP — O(n)](#4-approach-dp--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There is a **3 lane road** of length `n` that consists of `n + 1` **points** labeled from `0` to `n`. A frog **starts** at point `0` in the **second **lane** **and wants to jump to point `n`. However, there could be obstacles along the way.

You are given an array `obstacles` of length `n + 1` where each `obstacles[i]` (**ranging from 0 to 3**) describes an obstacle on the lane `obstacles[i]` at point `i`. If `obstacles[i] == 0`, there are no obstacles at point `i`. There will be **at most one** obstacle in the 3 lanes at each point.

- For example, if `obstacles[2] == 1`, then there is an obstacle on lane 1 at point 2.

The frog can only travel from point `i` to point `i + 1` on the same lane if there is not an obstacle on the lane at point `i + 1`. To avoid obstacles, the frog can also perform a **side jump** to jump to **another** lane (even if they are not adjacent) at the **same** point if there is no obstacle on the new lane.

- For example, the frog can jump from lane 3 at point 3 to lane 1 at point 3.

Return* the **minimum number of side jumps** the frog needs to reach **any lane** at point n starting from lane `2` at point 0.*

**Note:** There will be no obstacles on points `0` and `n`.

**Constraints:**
- `obstacles.length == n + 1`
- `1 <= n <= 5 * 10^5`
- `0 <= obstacles[i] <= 3`
- `obstacles[0] == obstacles[n] == 0`

---

## 2. Examples

**Example 1:**
```
Input: obstacles = [0,1,2,3,0]
Output: 2
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps (red arrows).
Note that the frog can jump over obstacles only when making side jumps (as shown at point 2).
```

**Example 2:**
```
Input: obstacles = [0,1,1,3,3,0]
Output: 0
Explanation: There are no obstacles on lane 2. No side jumps are required.
```

**Example 3:**
```
Input: obstacles = [0,2,1,0,3,0]
Output: 2
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps.
```

---

## 3. Key Insight

> At each position, track the minimum jumps to be in each lane. A frog in a non-blocked lane can stay (0 cost) or jump from another non-blocked lane (+1 cost). Process positions left to right with 3-state DP.

---

## 4. Approach: DP — O(n) ✅

```
FUNCTION minSideJumps(obstacles):
    dp = [1, 0, 1]    // start in lane 2 (index 1)

    FOR i ← 1 TO n - 1:
        newDp = [infinity] * 3
        FOR lane ← 0 TO 2:
            IF obstacles[i] == lane + 1: CONTINUE
            // Stay in same lane
            newDp[lane] = MIN(newDp[lane], dp[lane])
        FOR lane ← 0 TO 2:
            IF obstacles[i] == lane + 1: CONTINUE
            // Jump from another lane
            FOR other ← 0 TO 2:
                IF other != lane AND obstacles[i] != other + 1:
                    newDp[lane] = MIN(newDp[lane], newDp[other] + 1)
        dp = newDp

    RETURN MIN(dp)
```

---

## 5. Walkthrough

```
obstacles = [0, 1, 2, 3, 0]
dp starts as [1, 0, 1]  (lanes 1,2,3 → costs 1,0,1)

i=1: obstacle=1 (lane 1 blocked)
  Stay: dp[1]=0, dp[2]=1
  Jump: dp[1] can jump to lane 2: min(1, 0+1)=1; lane 2→1: min(0+1,1)=1
  dp = [inf, 0, 1]

i=2: obstacle=2 (lane 2 blocked)
  Stay: dp[0]=inf, dp[2]=1
  Jump: dp[0]=min(inf, 1+1)=2; dp[2]=min(1, inf+1)=1
  dp = [2, inf, 1]

i=3: obstacle=3 (lane 3 blocked)
  Stay: dp[0]=2, dp[1]=inf
  Jump: dp[1]=min(inf, 2+1)=3
  dp = [2, 3, inf]

i=4: obstacle=0
  Stay: dp=[2,3,inf]
  Jump: dp[2]=min(inf, 2+1)=3
  dp = [2, 3, 3]

Answer = min(2, 3, 3) = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — 3 lanes × n positions, constant work per step |
| **Space** | O(1) — only 3-element DP array |

---

## 7. Key Takeaway

> **3-lane DP** — with only 3 lanes, the DP is O(1) per position. Two passes per position: first handle staying in the same lane, then handle jumps (so jumps use updated stay values).
