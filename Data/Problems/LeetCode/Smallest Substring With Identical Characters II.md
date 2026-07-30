# 3399. Smallest Substring With Identical Characters II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-substring-with-identical-characters-ii](https://leetcode.com/problems/smallest-substring-with-identical-characters-ii)
**Companies:** Salesforce

---

## Problem Description

Given a binary string `s` and an integer `numOps`, you can flip at most `numOps` characters. Return the minimum possible length of the longest substring of identical characters after performing at most `numOps` flips.

### Examples

- **Input:** `s = "000001", numOps = 1` → **Output:** `2`
- **Input:** `s = "0000", numOps = 2` → **Output:** `1`

## Approach: Binary Search + Greedy Check — O(n log n) ✅

**Key Insight:** Binary search on the answer (max run length). For a given target length `mid`, greedily check if we can break all runs longer than `mid` using ≤ `numOps` flips.

```
FUNCTION minLength(s, numOps):
    lo, hi = 1, len(s)

    FUNCTION canAchieve(maxLen):
        IF maxLen == 1:
            // Special: need alternating pattern, count mismatches
            ops = MIN(cost for '0101..' pattern, cost for '1010..' pattern)
            RETURN ops <= numOps
        ops = 0
        FOR each run of identical chars of length L:
            ops += L / (maxLen + 1)   // splits needed
        RETURN ops <= numOps

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canAchieve(mid): hi = mid
        ELSE: lo = mid + 1

    RETURN lo
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(1) |
