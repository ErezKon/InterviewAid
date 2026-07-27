# 3385. Minimum Time to Break Locks II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-break-locks-ii](https://leetcode.com/problems/minimum-time-to-break-locks-ii)
**Companies:** Ivp

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hungarian Algorithm — O(n³)](#3-approach-hungarian-algorithm--on³)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION findMinimumTime(strength):
    n = len(strength)
    // Build cost matrix: cost[i][j] = ceil(strength[i] / 2^(j+1))
    cost = n × n matrix

    FOR i ← 0 TO n - 1:
        FOR j ← 0 TO n - 1:
            cost[i][j] = CEIL(strength[i] / (2 ^ (j + 1)))

    // Apply Hungarian algorithm on cost matrix
    RETURN hungarian(cost)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n³) — Hungarian algorithm |
| **Space** | O(n²) — cost matrix |

---

## 5. Key Takeaway

> **Assignment problem → Hungarian algorithm.** When bitmask DP is too slow (n > 20), model as bipartite matching. The cost of assigning lock `i` to position `j` depends only on the pair, making it a classic assignment problem.
