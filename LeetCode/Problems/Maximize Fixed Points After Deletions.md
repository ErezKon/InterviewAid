# 3920. Maximize Fixed Points After Deletions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-fixed-points-after-deletions](https://leetcode.com/problems/maximize-fixed-points-after-deletions)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a permutation `nums` of `[0, n-1]`, you can delete some elements. After deletion, the remaining elements are re-indexed `0, 1, 2, ...`. A **fixed point** is an index `i` where `nums[i] == i` (after re-indexing). Maximize the number of fixed points.

**Constraints:**
- `1 ≤ n ≤ 10⁵`

---

## Key Insight

> After deleting `d` elements before position `i`, element `nums[i]` gets new index `i - d`. So `nums[i]` becomes a fixed point when `nums[i] == i - d`, i.e., `d == i - nums[i]`. Use DP: for each element, track how many deletions have occurred so far and whether keeping this element creates a fixed point.

---

## Approach: DP — O(n) ✅

```
FUNCTION maxFixedPoints(nums):
    n = len(nums)
    // dp[d] = max fixed points using exactly d deletions so far
    dp = [-infinity] * (n + 1)
    dp[0] = 0

    FOR i ← 0 TO n - 1:
        newDp = [-infinity] * (n + 1)
        FOR d ← 0 TO i:
            IF dp[d] == -infinity: CONTINUE
            // Option 1: delete nums[i], increase deletions
            newDp[d + 1] = MAX(newDp[d + 1], dp[d])
            // Option 2: keep nums[i]
            fixed = 1 IF nums[i] == i - d ELSE 0
            newDp[d] = MAX(newDp[d], dp[d] + fixed)
        dp = newDp

    RETURN MAX(dp)
```

**Optimization:** Since `d = i - nums[i]` is the only deletion count that creates a fixed point, optimize to O(n) by tracking only feasible transitions.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP (optimized) | **O(n)** | O(n) |

---

## Key Takeaway

> **After deletions, element `nums[i]` is a fixed point iff exactly `i - nums[i]` elements before it were deleted.** This reframing turns a combinatorial problem into a DP on deletion count.
