# 2731. Movement of Robots

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/movement-of-robots](https://leetcode.com/problems/movement-of-robots)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort Final Positions — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow‑Up Questions](#7-follow‑up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Robots on a line move left/right. When two collide, they swap directions. After `d` seconds, return the sum of all pairwise distances modulo 10⁹+7.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> **Collision = pass-through.** When two robots collide and swap, it is equivalent to them passing through each other. So each robot's final position = `pos[i] ± d` regardless of collisions. Sort final positions, then compute pairwise distances using prefix sums.

---

## 3. Approach: Sort + Prefix Sum — O(n log n) ✅

```text
FUNCTION sumDistance(nums, s, d):
    MOD ← 10^9 + 7
    // Compute final positions
    FOR i ← 0 TO n - 1:
        IF s[i] == 'R':
            SET nums[i] ← nums[i] + d
        ELSE:
            SET nums[i] ← nums[i] - d
    SORT nums
    // Sum of pairwise distances using prefix sums
    SET ans ← 0
    SET prefix ← 0
    FOR i ← 0 TO n - 1:
        SET ans ← (ans + nums[i] * i - prefix) MOD MOD
        SET prefix ← prefix + nums[i]
    RETURN ans
```

---

## 4. Examples

**Example 1:**
```
Input: positions = [1,3,6], directions = "RRL", d = 2
Output: 8
Explanation:
- Robot 1 moves right to 3, Robot 2 moves right to 5, Robot 3 moves left to 4.
- Final positions sorted: [3,4,5]. Pairwise distances: |3-4| + |3-5| + |4-5| = 1 + 2 + 1 = 4.
- Sum of distances for all ordered pairs = 8 (each unordered pair counted twice).
```

**Example 2:**
```
Input: positions = [0,10], directions = "LR", d = 5
Output: 20
Explanation:
- Left‑moving robot goes to -5, right‑moving robot goes to 15.
- Distance = |(-5) - 15| = 20.
```

---

## 5. Walkthrough

Take **Example 1**:
| Step | Action |
|------|--------|
| 1 | Compute final positions: 1→3, 3→5, 6→4 (using `+d` for `R`, `-d` for `L`). |
| 2 | Sort positions → `[3,4,5]`. |
| 3 | Prefix sum iteration: <br>• i=0: ans=0, prefix=3 <br>• i=1: ans=`4*1-3`=1, prefix=7 <br>• i=2: ans+=`5*2-7`=3 → total ans=4. |
| 4 | Multiply by 2 for ordered pairs → 8, return modulo `10⁹+7`. |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting the final positions |
| **Space** | O(1) extra (in‑place sort) |

---

## 7. Follow‑Up Questions

- How would the solution change if robots could have different speeds?
- Can you solve the problem in O(n) time without sorting?
- What if the line were circular (positions wrap around)?

---

## 8. Key Takeaway

> **Colliding robots = passing through.** Ignore collisions, compute final positions, sort, and use the prefix‑sum trick to obtain all pairwise distances efficiently.
