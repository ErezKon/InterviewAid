# 3639. Minimum Time to Activate String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-activate-string](https://leetcode.com/problems/minimum-time-to-activate-string)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy / Simulation](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a binary string, each second you can activate one `'0'` adjacent to an activated `'1'`. All initially `'1'` cells are activated. Return the **minimum** time to activate all cells.

**Constraints:**
- `1 <= s.length <= 10⁵`

---

## 2. Key Insight

> Each `'0'` segment between `'1'`s is activated from both ends simultaneously. The time for a segment of length `L` = `⌈L/2⌉`. The total time = max over all segments, since segments activate in parallel.

---

## 3. Approach: Segment Analysis — O(n) ✅

```
FUNCTION minTimeToActivate(s):
    maxTime = 0
    zeroLen = 0
    FOR c IN s:
        IF c == '0':
            zeroLen += 1
        ELSE:
            maxTime = MAX(maxTime, CEIL(zeroLen / 2))
            zeroLen = 0
    // Handle trailing zeros (only activated from left)
    maxTime = MAX(maxTime, zeroLen)
    // Handle leading zeros (only activated from right)
    RETURN maxTime
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Segment gap analysis** — zero-segments between ones activate from both sides (time = ⌈L/2⌉). Edge segments activate from one side only (time = L). Answer = max segment time.
