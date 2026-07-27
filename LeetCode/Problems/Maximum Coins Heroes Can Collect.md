# 2838. Maximum Coins Heroes Can Collect

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-coins-heroes-can-collect](https://leetcode.com/problems/maximum-coins-heroes-can-collect)
**Companies:** Deutsche Bank

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Binary Search + Prefix Sum — O((n+m) log m)](#approach-sort--binary-search--prefix-sum--onm-log-m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given heroes with health values and monsters with health and coin values, each hero can defeat all monsters with health ≤ hero's health. Find the total coins each hero can collect.

---

## Key Insight

> Sort monsters by health. Build a prefix sum of coins. For each hero, binary search for the rightmost monster they can defeat and use the prefix sum to get total coins.

---

## Approach: Sort + Binary Search + Prefix Sum — O((n+m) log m) ✅

```
FUNCTION maxCoins(heroes, monsters, coins):
    // Pair and sort monsters by health
    paired = SORT(ZIP(monsters, coins) by monster health)
    prefixCoins = PREFIX_SUM([c for (_, c) in paired])

    result = []
    FOR h IN heroes:
        idx = BISECT_RIGHT(paired_healths, h) - 1
        IF idx >= 0:
            result.APPEND(prefixCoins[idx + 1])
        ELSE:
            result.APPEND(0)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Binary Search | **O((n+m) log m)** | O(m) |

---

## Key Takeaway

> **"Defeat all enemies ≤ threshold" = sort enemies, prefix sum coins, binary search per hero.** Classic sort + binary search pattern for threshold queries.
