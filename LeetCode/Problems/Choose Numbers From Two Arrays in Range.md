# 2143. Choose Numbers From Two Arrays in Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/choose-numbers-from-two-arrays-in-range](https://leetcode.com/problems/choose-numbers-from-two-arrays-in-range)
**Companies:** Adobe

---

## 1. Problem Description

Given two arrays `nums1` and `nums2` of length `n`, count the number of non-empty subsets of indices such that: for each chosen index `i`, we pick a value from either `nums1[i]` or `nums2[i]`, and the sum of picked values from `nums1` minus the sum of picked values from `nums2` is in the range `[1, ∞)` (i.e., the nums1 picks sum exceeds nums2 picks sum). Return count modulo 10^9+7.

---

## 2. Key Insight

> For each index, the contribution is `+nums1[i]` if picked from array 1 or `-nums2[i]` if picked from array 2. We need subset DP tracking the running difference, offset to handle negatives.

---

## 3. Approach: DP with Offset — O(n × S) ✅

```
FUNCTION countSubsets(nums1, nums2):
    MOD = 10^9 + 7
    // dp[diff] = number of non-empty subsets with this difference
    // Use offset to handle negative diffs
    
    dp = defaultdict(int)  // diff → count
    
    FOR i FROM 0 TO n-1:
        newDp = copy of dp
        // Option 1: pick nums1[i] (add +nums1[i])
        newDp[nums1[i]] += 1  // start new subset
        FOR diff, cnt IN dp:
            newDp[diff + nums1[i]] += cnt
        // Option 2: pick nums2[i] (add -nums2[i])
        newDp[-nums2[i]] += 1  // start new subset
        FOR diff, cnt IN dp:
            newDp[diff - nums2[i]] += cnt
        dp = newDp (mod all values)
    
    RETURN SUM(dp[d] for d > 0) % MOD
```

| Time | Space |
|------|-------|
| O(n × S) where S = sum range | O(S) |

---

## Key Takeaway

> Subset selection with difference constraints maps to knapsack-style DP with offset. Using a hashmap for sparse differences keeps it practical.
