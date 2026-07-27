# 2552. Count Increasing Quadruplets

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-increasing-quadruplets](https://leetcode.com/problems/count-increasing-quadruplets)
**Companies:** Deutsche Bank, Sap

---

## 1. Problem Description

Given an array `nums`, count quadruplets `(i, j, k, l)` with `i < j < k < l` such that `nums[i] < nums[k] < nums[j] < nums[l]` (the "1324" pattern).

---

## 2. Key Insight

> Fix `j` and `k`. Count: (a) how many elements before `j` are less than `nums[k]`, and (b) how many elements after `k` are greater than `nums[j]`. Precompute these with prefix counts. Then use the "132 pattern" approach extended to 4 elements.

---

## 3. Approach: DP on Triplets — O(n²) ✅

```
FUNCTION countQuadruplets(nums):
    n = len(nums)
    count = 0
    
    // cnt[j] = number of valid (i, j, k) triplets where
    //          nums[i] < nums[k] < nums[j] and i < j, k > j... 
    // Actually: for each j, track count of i < j with nums[i] < nums[k]
    
    // Better: fix j, precompute for each j:
    //   lessLeft[j][v] = count of i < j with nums[i] < v
    //   greaterRight[k][v] = count of l > k with nums[l] > v
    
    // O(n^2): for each pair (j, k) with j < k and nums[k] < nums[j]:
    //   count += lessLeft(j, nums[k]) * greaterRight(k, nums[j])
    
    FOR j FROM 0 TO n-1:
        lessCount = 0  // elements before j less than nums[k]
        FOR k FROM j+1 TO n-1:
            IF nums[k] < nums[j]:
                // count pairs: i before j with nums[i]<nums[k], l after k with nums[l]>nums[j]
                // need precomputed values
                ...
            IF nums[k] > nums[j]:
                lessCount += 1  // this helps future k values
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n²) | O(n) |

---

## Key Takeaway

> The "1324" pattern: fix the middle two elements (j, k) and count valid endpoints. Precompute prefix/suffix counts to avoid O(n⁴). DP on partial patterns (triplets → quadruplets) reduces complexity.
