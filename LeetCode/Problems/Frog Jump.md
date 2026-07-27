# 403. Frog Jump

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/frog-jump](https://leetcode.com/problems/frog-jump)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Oracle, Otterai, Snapchat, Sprinklr, Squarepoint Capital, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP with Hash Map — O(n²) ✅](#3-approach-dp-with-hash-map--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A frog crosses a river by jumping on stones. The first jump is 1 unit. If the last jump was `k` units, the next jump can be `k-1`, `k`, or `k+1` units. Determine if the frog can reach the last stone.

**Constraints:**
- `2 <= stones.length <= 2000`
- `0 <= stones[i] <= 2³¹ - 1`

---

## 2. Key Insight

> For each stone, track which jump sizes can land on it. From each stone, try all three next jump sizes. Use a hash map (stone → set of reachable jump sizes).

---

## 3. Approach: DP with Hash Map — O(n²) ✅

```
FUNCTION canCross(stones):
    stoneSet = {s: set() for s in stones}
    stoneSet[0].ADD(0)

    FOR stone IN stones:
        FOR k IN stoneSet[stone]:
            FOR jump IN [k-1, k, k+1]:
                IF jump > 0 AND (stone + jump) IN stoneSet:
                    stoneSet[stone + jump].ADD(jump)

    RETURN len(stoneSet[stones[-1]]) > 0
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) |
| **Space** | O(n²) — jump sizes per stone |

---

## 5. Key Takeaway

> Map each stone to the set of jump sizes that can reach it. Propagate forward trying `k-1, k, k+1`. Classic DP on states `(stone, lastJump)`.
