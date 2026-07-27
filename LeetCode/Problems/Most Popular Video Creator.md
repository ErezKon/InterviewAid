# 2456. Most Popular Video Creator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-popular-video-creator](https://leetcode.com/problems/most-popular-video-creator)
**Companies:** Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Maps — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given arrays `creators`, `ids`, `views`, find the creator(s) with the **highest total views**. For each, return the id of their **most viewed** video (lexicographically smallest if tie).

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Two maps: `totalViews[creator]` for total, `bestVideo[creator]` for the video with max views (smallest id for tie). Scan once, then filter creators with max total.

---

## 3. Approach: Hash Maps — O(n) ✅

```
FUNCTION mostPopularCreator(creators, ids, views):
    totalViews = {}; bestVideo = {}
    FOR i ← 0 TO n - 1:
        c, id, v = creators[i], ids[i], views[i]
        totalViews[c] = totalViews.GET(c, 0) + v
        IF c NOT IN bestVideo OR v > bestVideo[c][1]
           OR (v == bestVideo[c][1] AND id < bestVideo[c][0]):
            bestVideo[c] = (id, v)

    maxTotal = MAX(totalViews.values())
    RETURN [[c, bestVideo[c][0]] for c if totalViews[c] == maxTotal]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Dual hash maps** — track total views and best video per creator simultaneously. Single pass with composite tie-breaking.
