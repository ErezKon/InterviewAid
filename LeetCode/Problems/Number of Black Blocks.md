# 2768. Number of Black Blocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-black-blocks](https://leetcode.com/problems/number-of-black-blocks)
**Companies:** Capital One, Google, Roblox, Sig, Square, Stripe, Twitter, Uber, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Per Block — O(k)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `m × n` grid and black cell coordinates, count how many 2×2 blocks have exactly 0, 1, 2, 3, or 4 black cells.

---

## 2. Key Insight

> Each black cell at `(r, c)` affects up to 4 blocks (top-left corners at `(r, c)`, `(r-1, c)`, `(r, c-1)`, `(r-1, c-1)`). Count per block, then histogram the counts.

---

## 3. Approach: Count Per Block — O(k) ✅

```
FUNCTION countBlackBlocks(m, n, coordinates):
    blockCount = Counter()

    // Each black cell affects up to 4 blocks
    FOR [r, c] IN coordinates:
        FOR dr IN [0, -1]:
            FOR dc IN [0, -1]:
                br, bc = r + dr, c + dc
                IF 0 <= br < m - 1 AND 0 <= bc < n - 1:
                    blockCount[(br, bc)] += 1

    result = [0] * 5
    FOR count IN blockCount.values():
        result[count] += 1

    result[0] = (m - 1) * (n - 1) - SUM(result[1:])
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) — k = number of black cells |
| **Space** | O(k) |

---

## 5. Key Takeaway

> **Reverse mapping: cell → blocks.** Instead of checking every block, each black cell contributes to ≤ 4 blocks. O(k) instead of O(m·n).
