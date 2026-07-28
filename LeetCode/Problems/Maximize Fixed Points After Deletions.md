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

```text
FUNCTION maxFixedPoints(nums):
    n = len(nums)
    dp = [-infinity] * (n + 1)
    dp[0] = 0
    FOR i ← 0 TO n - 1:
        newDp = [-infinity] * (n + 1)
        FOR d ← 0 TO i:
            IF dp[d] == -infinity: CONTINUE
            // delete nums[i]
            newDp[d + 1] = MAX(newDp[d + 1], dp[d])
            // keep nums[i]
            fixed = 1 IF nums[i] == i - d ELSE 0
            newDp[d] = MAX(newDp[d], dp[d] + fixed)
        dp = newDp
    RETURN MAX(dp)
```

---

## Examples

**Example 1:**
```
Input: nums = [0,2,1]
Output: 2
Explanation: Delete element at index 1 (value 2). Remaining array [0,1] has fixed points at both indices.
```

**Example 2:**
```
Input: nums = [3,0,1,2]
Output: 1
Explanation: No deletions needed; only index 0 becomes a fixed point after re-indexing.
```

---

## Walkthrough

| Step | i | d (deletions) | nums[i] | New Index | Fixed? | dp State |
|------|---|---------------|---------|-----------|--------|----------|
| 1 | 0 | 0 | 0 | 0 | ✅ | dp[0]=1 |
| 2 | 1 | 0 | 2 | 1 | ❌ | dp unchanged |
| 3 | 2 | 1 (delete index1) | 1 | 1 | ✅ | dp[1]=2 |

The DP tracks the best count for each possible deletion count, ultimately yielding 2 fixed points.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP (optimized) | **O(n)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if deletions were limited to at most `k` elements?
- Can the problem be solved in O(1) extra space?
- What if the array is not a permutation but may contain duplicates?

---

## Key Takeaway

> **After deletions, element `nums[i]` is a fixed point iff exactly `i - nums[i]` elements before it were deleted.** This reframing turns a combinatorial problem into a DP on deletion count.
