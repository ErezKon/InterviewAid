# 1981. Minimize the Difference Between Target and Chosen Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements](https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an `m × n` matrix, pick exactly one element from each row. Minimize `|sum - target|`.

**Constraints:**
- `1 ≤ m, n ≤ 70`
- `1 ≤ matrix[i][j] ≤ 70`

---

## Key Insight

> Use DP with a **set of reachable sums**. For each row, extend every reachable sum by adding each element in that row. Prune sums that are already way above target (they can only grow larger).

---

## Approach: DP with Set of Sums ✅

```
FUNCTION minimizeTheDifference(mat, target):
    reachable ← {0}
    
    FOR row IN mat DO
        nextReachable ← SET()
        FOR s IN reachable DO
            FOR val IN row DO
                nextReachable.ADD(s + val)
        reachable ← nextReachable
        // Prune: keep sums ≤ target + some buffer, but always keep the minimum sum ≥ target
    
    RETURN MIN(ABS(s - target) FOR s IN reachable)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP with set pruning | **O(m · n · S)** | **O(S)** |

Where S is the number of distinct reachable sums (bounded by m × 70 ≈ 4900).

---

## Key Takeaway

> **DP over reachable sums** — track all possible sums row by row using a set. Prune aggressively to keep the set manageable — sums far above target can only get farther.

---
