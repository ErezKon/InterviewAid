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

A frog starts in lane 2 (middle of 3 lanes) at position 0. Each lane may have obstacles at certain positions. The frog can move forward (free) or jump sideways (costs 1). Return the **minimum** side jumps to reach position `n`.

**Constraints:**
- `1 <= obstacles.length <= 5 × 10⁵`
- `obstacles[i] ∈ {0, 1, 2, 3}` (0 = no obstacle)

---

## 2. Examples

```
Example 1:
  Input: obstacles = [0,1,2,3,0]
  Output: 2
  Explanation: Start lane 2. At pos 1 (obstacle lane 1, ok), 
    pos 2 (obstacle lane 2, jump to 1 or 3), etc.
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
