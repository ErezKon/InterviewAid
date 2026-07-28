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

```text
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

## 2. Examples

| nums | k | Output |
|------|---|--------|
| [1,1,1,1,1] | 2 | [2] |
| [2,1,1,1,3,4,5] | 2 | [3] |

*Explanation*: At index 2 (or 3), the preceding two elements are non‑increasing and the following two are non‑decreasing.

---

## 3. Walkthrough

Consider `nums = [2,1,1,1,3,4,5]`, `k = 2`.

1. Compute `dec`: [1,2,3,4,1,1,1]
2. Compute `inc`: [1,1,1,4,3,2,1]
3. Check each `i` from 2 to 4:
   - i=2: `dec[1]=2 >=2` and `inc[3]=4 >=2` → good.
   - i=3: `dec[2]=3 >=2` and `inc[4]=3 >=2` → good.
   - i=4: `dec[3]=4 >=2` but `inc[5]=2 >=2` → good.
Result indices `[2,3,4]` (depending on bounds).

---

## 4. Complexity Analysis

- **Time:** O(n) – two linear passes to build `dec` and `inc`, then a final scan.
- **Space:** O(n) for the two auxiliary arrays.

---

## Key Takeaway

> **Precompute monotonic run lengths from both directions, then check each index in O(1). Classic prefix/suffix precomputation pattern.**
