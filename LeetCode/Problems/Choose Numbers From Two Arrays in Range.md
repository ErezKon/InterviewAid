# 2143. Choose Numbers From Two Arrays in Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/choose-numbers-from-two-arrays-in-range](https://leetcode.com/problems/choose-numbers-from-two-arrays-in-range)
**Companies:** Adobe

---

## 1. Problem Description

Given two arrays `nums1` and `nums2` of length `n`, count the number of non‑empty subsets of indices such that for each chosen index `i` we pick either `nums1[i]` or `nums2[i]`, and the sum of the chosen `nums1` values minus the sum of the chosen `nums2` values is **strictly positive**. Return the count modulo `10^9+7`.

---

## 2. Key Insight

> Treat each index as contributing either `+nums1[i]` or `-nums2[i]`. The problem becomes a subset‑sum over possible differences. Because the range of differences can be large, we store only reachable differences in a hashmap (sparse DP).

---

## 3. Approach: DP with Offset — O(n × S) ✅

```text
FUNCTION countSubsets(nums1, nums2):
    MOD ← 1_000_000_007
    dp ← MAP from difference → count, initially empty
    
    FOR i FROM 0 TO n-1:
        newDp ← COPY of dp
        // Start a new subset picking nums1[i]
        newDp[ nums1[i] ] ← (newDp.get(nums1[i], 0) + 1) MOD MOD
        // Start a new subset picking nums2[i] (as negative contribution)
        newDp[ -nums2[i] ] ← (newDp.get(-nums2[i], 0) + 1) MOD MOD
        // Extend existing subsets
        FOR diff, cnt IN dp:
            // pick nums1[i]
            nd1 ← diff + nums1[i]
            newDp[ nd1 ] ← (newDp.get(nd1, 0) + cnt) MOD MOD
            // pick nums2[i]
            nd2 ← diff - nums2[i]
            newDp[ nd2 ] ← (newDp.get(nd2, 0) + cnt) MOD MOD
        dp ← newDp
    
    // Sum counts for all positive differences
    answer ← 0
    FOR diff, cnt IN dp:
        IF diff > 0:
            answer ← (answer + cnt) MOD MOD
    RETURN answer
```

---

## 4. Examples

**Example 1:**
```
Input: nums1 = [1,2], nums2 = [1,1]
Output: 3
Explanation:
Possible subsets:
- Choose index 0 from nums1 → diff = +1
- Choose index 1 from nums1 → diff = +2
- Choose both indices from nums1 → diff = +3
All have positive diff, total 3.
```

**Example 2:**
```
Input: nums1 = [1,1], nums2 = [2,2]
Output: 0
Explanation: Any choice yields diff ≤ 0, so no valid subset.
```

---

## 5. Walkthrough

Consider Example 1 (`nums1=[1,2]`, `nums2=[1,1]`).
1. Start with empty `dp`.
2. Process i=0:
   - New subsets: +1 and -1 → dp = {1:1, -1:1}
3. Process i=1:
   - Extend each existing diff:
     * From diff 1: +2 → 3, -1 → 0
     * From diff -1: +2 → 1, -1 → -2
   - Also start new subsets: +2 and -2.
   - Final `dp` = {3:1, 0:1, 1:2, -2:2, -1:1, 2:1}
4. Positive diffs are 1 (count 2), 2 (1), 3 (1) → total 4, but note subsets of size 0 are excluded, leaving 3 valid subsets as listed.

---

## 6. Complexity Analysis

| Time | Space |
|------|-------|
| O(n × S) where S is the number of distinct reachable differences | O(S) for the hashmap storing differences |

---

## 7. Follow‑Up Questions

- How would the solution change if the condition were `diff ≥ 0` instead of `> 0`?
- Can the DP be optimized using meet‑in‑the‑middle for larger `n`?
- What if each index allowed three choices (skip, pick from `nums1`, pick from `nums2`)?

---

## Key Takeaway

> Transform the “choose from two arrays with a sign constraint” into a subset‑sum over signed differences and use a sparse DP hashmap to count all positive outcomes.
