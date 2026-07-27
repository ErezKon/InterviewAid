# 1560. Most Visited Sector in a Circular Track

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-visited-sector-in-a-circular-track](https://leetcode.com/problems/most-visited-sector-in-a-circular-track)
**Companies:** Expedia, Syfe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Start/End Only — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

A circular track with `n` sectors. Given a sequence of rounds, return the sectors visited most often, sorted in ascending order.

**Constraints:**
- `2 <= n <= 100`

---

## 2. Key Insight

> Full laps contribute equally to all sectors. Only the **partial lap** (from `rounds[0]` to `rounds[-1]`) determines the most visited sectors.

---

## 3. Approach: Start/End Only — O(n) ✅

```
FUNCTION mostVisited(n, rounds):
    start = rounds[0]; end = rounds[-1]
    IF start <= end:
        RETURN [i for i in range(start, end + 1)]
    ELSE:
        RETURN [i for i in range(1, end + 1)] + [i for i in range(start, n + 1)]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Only start and end matter.** Full laps cancel out. The partial segment from first to last position determines which sectors have one extra visit.
