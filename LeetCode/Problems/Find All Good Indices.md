# 2420. Find All Good Indices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-good-indices](https://leetcode.com/problems/find-all-good-indices)
**Companies:** Goldman Sachs

---

## Problem Description

An index `i` is **good** if the `k` elements before it are non-increasing and the `k` elements after it are non-decreasing. Return all good indices sorted.

---

## Key Insight

> Precompute two arrays: `dec[i]` = length of non-increasing run ending at `i`, and `inc[i]` = length of non-decreasing run starting at `i`. Index `i` is good if `dec[i-1] >= k` and `inc[i+1] >= k`.

---

## Approach: Prefix/Suffix Arrays — O(n) ✅

```
FUNCTION goodIndices(nums, k):
    n = len(nums)
    dec = [1] * n  // non-increasing run ending at i
    inc = [1] * n  // non-decreasing run starting at i

    FOR i ← 1 TO n - 1:
        IF nums[i] <= nums[i-1]: dec[i] = dec[i-1] + 1
    FOR i ← n-2 DOWN TO 0:
        IF nums[i] <= nums[i+1]: inc[i] = inc[i+1] + 1

    result = []
    FOR i ← k TO n - k - 1:
        IF dec[i-1] >= k AND inc[i+1] >= k:
            result.ADD(i)
    RETURN result
```

---

## Key Takeaway

> **Precompute monotonic run lengths from both directions, then check each index in O(1). Classic prefix/suffix precomputation pattern.**
