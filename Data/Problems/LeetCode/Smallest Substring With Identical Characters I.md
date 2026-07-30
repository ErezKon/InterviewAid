# 3398. Smallest Substring With Identical Characters I

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-substring-with-identical-characters-i](https://leetcode.com/problems/smallest-substring-with-identical-characters-i)
**Companies:** Google, Salesforce

---

## Problem Description

Given a binary string `s` and an integer `numOps`, you can flip at most `numOps` characters. Return the minimum possible length of the longest substring of identical characters. (Same as II but with smaller constraints.)

### Examples

- **Input:** `s = "000001", numOps = 1` → **Output:** `2`
- **Input:** `s = "0000", numOps = 2` → **Output:** `1`

## Approach: Binary Search + Greedy — O(n log n) ✅

**Key Insight:** Binary search on the answer. For a candidate max run length, count flips needed to break all longer runs.

```
FUNCTION minLength(s, numOps):
    lo, hi = 1, len(s)

    FUNCTION canAchieve(maxLen):
        IF maxLen == 1:
            ops = MIN(cost for '0101..' pattern, cost for '1010..' pattern)
            RETURN ops <= numOps
        ops = 0
        FOR each run of length L:
            ops += L / (maxLen + 1)
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
