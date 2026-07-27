# 3468. Find the Number of Copy Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-copy-arrays](https://leetcode.com/problems/find-the-number-of-copy-arrays)
**Companies:** Google, Traveloka

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Constraint Propagation — O(n) ✅](#3-approach-constraint-propagation--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an original array and bounds `[lo, hi]` for each element of a "copy array" where consecutive differences match the original, count how many valid copy arrays exist.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Fix copy[0] ∈ [lo[0], hi[0]]. Each subsequent element is determined by copy[0] plus the prefix sum of differences. The valid range for copy[0] is the intersection of all per-element constraints propagated back to position 0.

---

## 3. Approach: Constraint Propagation — O(n) ✅

```
FUNCTION countCopyArrays(original, bounds):
    // diff[i] = original[i] - original[i-1]
    // copy[i] = copy[0] + prefixSum[i]
    // copy[i] must be in [bounds[i][0], bounds[i][1]]
    // So copy[0] must be in [bounds[i][0] - prefix[i], bounds[i][1] - prefix[i]]

    lo ← -∞; hi ← ∞; prefix ← 0
    FOR i ← 0 TO n - 1 DO
        IF i > 0 THEN prefix += original[i] - original[i-1]
        lo ← MAX(lo, bounds[i][0] - prefix)
        hi ← MIN(hi, bounds[i][1] - prefix)

    RETURN MAX(0, hi - lo + 1)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Propagate constraints to a single free variable** (copy[0]). The answer is the size of the intersection of all intervals, computed in one pass.
