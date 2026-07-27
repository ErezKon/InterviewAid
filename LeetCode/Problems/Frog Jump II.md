# 2498. Frog Jump II

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Skip — O(n) ✅](#3-approach-greedy-skip--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A frog jumps from stone 0 to the last stone and back. On each trip it must use a different set of intermediate stones. Minimize the maximum jump distance across both trips.

---

## 2. Key Insight

> Optimally, one trip uses even-indexed stones and the other uses odd-indexed stones. The max jump = max gap between every other stone, i.e., `max(stones[i] - stones[i-2])`.

---

## 3. Approach: Greedy Skip — O(n) ✅

```
FUNCTION maxJump(stones):
    IF len(stones) == 2: RETURN stones[1] - stones[0]
    result = 0
    FOR i ← 2 TO len(stones) - 1:
        result = MAX(result, stones[i] - stones[i-2])
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> Split stones into even/odd indexed sublists for the two trips. The bottleneck is the max gap between alternate stones.
