# 3932. Count K-th Roots in a Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-k-th-roots-in-a-range](https://leetcode.com/problems/count-k-th-roots-in-a-range)
**Companies:** Google, Meta

---

## 1. Problem Description

Count integers in `[lo, hi]` that are perfect k-th powers (i.e., `x = y^k` for some integer `y ≥ 1`).

---

## 2. Approach: Count via k-th Root — O(hi^(1/k)) ✅

```
FUNCTION countKthRoots(lo, hi, k):
    // Count of perfect k-th powers in [1, n] = floor(n^(1/k))
    countUpToHi = floor(hi ^ (1/k))
    countUpToLo = floor((lo - 1) ^ (1/k))
    RETURN countUpToHi - countUpToLo
```

Use integer k-th root with care for floating-point precision (verify by computing `y^k`).

| Time | Space |
|------|-------|
| O(1) or O(log n) for precise root | O(1) |

---

## Key Takeaway

> The count of perfect k-th powers up to `n` is `⌊n^(1/k)⌋`. Use range subtraction for `[lo, hi]`. Be careful with floating-point — verify boundary values.
