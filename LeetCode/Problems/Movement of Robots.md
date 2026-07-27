# 2731. Movement of Robots

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/movement-of-robots](https://leetcode.com/problems/movement-of-robots)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort Final Positions — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Robots on a line move left/right. When two collide, they swap directions. After `d` seconds, return the sum of all pairwise distances modulo 10⁹+7.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> **Collision = pass-through.** When two robots collide and swap, it's equivalent to them passing through each other. So each robot's final position = `pos[i] ± d` regardless of collisions. Sort final positions, then compute pairwise distances using prefix sums.

---

## 3. Approach: Sort + Prefix Sum — O(n log n) ✅

```
FUNCTION sumDistance(nums, s, d):
    MOD = 10^9 + 7
    // Compute final positions
    FOR i ← 0 TO n - 1:
        nums[i] += d IF s[i] == 'R' ELSE -d

    SORT nums
    // Sum of pairwise distances: for each position, contribution = nums[i] * i - prefix[i]
    ans = 0; prefix = 0
    FOR i ← 0 TO n - 1:
        ans = (ans + nums[i] * i - prefix) % MOD
        prefix += nums[i]

    RETURN ans
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(1) extra |

---

## 5. Key Takeaway

> **Colliding robots = passing through.** Ignore collisions, compute final positions, sort, and use the prefix sum trick to compute all pairwise distances in O(n).
