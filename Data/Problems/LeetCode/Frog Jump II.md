# 2498. Frog Jump II

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Microsoft
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

A frog jumps from stone 0 to the last stone and back. On each trip it must use a different set of intermediate stones. Minimize the maximum jump distance across both trips.

---

## 2. Key Insight

> Optimally, one trip uses even-indexed stones and the other uses odd-indexed stones. The max jump = max gap between every other stone, i.e., `max(stones[i] - stones[i-2])`.

---

## 3. Approach

```
FUNCTION maxJump(stones):
    IF len(stones) == 2: RETURN stones[1] - stones[0]
    result ← 0
    FOR i ← 2 TO len(stones) - 1:
        result ← MAX(result, stones[i] - stones[i-2])
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Examples

| stones | max jump |
|--------|----------|
| `[0,2,5,6,7,10]` | `5` |
| `[0,1,3,6,10]` | `4` |

---

## 6. Walkthrough

1. For `[0,2,5,6,7,10]` compute gaps between every second stone:
   - `stones[2] - stones[0] = 5 - 0 = 5`
   - `stones[3] - stones[1] = 6 - 2 = 4`
   - `stones[4] - stones[2] = 7 - 5 = 2`
   - `stones[5] - stones[3] = 10 - 6 = 4`
2. The maximum of these gaps is `5`, which is the minimal possible maximum jump.

---

## 7. Follow-Up Questions

1. How would the solution change if the frog could reuse stones on the return trip?
2. What if the frog must make exactly `k` trips instead of two?

---

## 8. Key Takeaway

> Split stones into even/odd indexed sublists for the two trips. The bottleneck is the max gap between alternate stones.
