# 943. Find the Shortest Superstring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-shortest-superstring](https://leetcode.com/problems/find-the-shortest-superstring)
**Companies:** De Shaw, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask DP (TSP) — O(n²·2ⁿ) ✅](#3-approach-bitmask-dp-tsp--on²2ⁿ-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array of strings, find the shortest string that contains each string as a substring. Return any valid answer.

**Constraints:**
- `1 <= words.length <= 12`
- `1 <= words[i].length <= 20`

---

## 2. Key Insight

> This is the Shortest Superstring problem, reducible to TSP. Precompute pairwise overlaps, then use bitmask DP to find the ordering that maximizes total overlap (minimizing total length).

---

## 3. Approach: Bitmask DP (TSP) — O(n²·2ⁿ) ✅

```
FUNCTION shortestSuperstring(words):
    n ← LENGTH(words)
    // Precompute overlap[i][j] = max overlap when word j follows word i
    overlap ← n × n array
    FOR i, j: compute max k where words[i] ends with words[j][:k]

    // dp[mask][i] = max total overlap ending at word i using words in mask
    dp ← 2ⁿ × n array of 0
    parent ← track transitions for reconstruction

    FOR mask, FOR last IN mask, FOR next NOT IN mask:
        newOverlap ← dp[mask][last] + overlap[last][next]
        IF newOverlap > dp[mask | (1<<next)][next]:
            UPDATE dp and parent

    // Reconstruct path for shortest superstring
    RETURN constructed string
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n² · 2ⁿ) |
| **Space** | O(n · 2ⁿ) |

---

## 5. Key Takeaway

> **TSP via bitmask DP** — maximize total overlap between consecutive words in the ordering. With n ≤ 12, 2¹² = 4096 states are manageable.
