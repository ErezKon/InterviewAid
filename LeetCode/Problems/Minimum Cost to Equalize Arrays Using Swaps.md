# 3868. Minimum Cost to Equalize Arrays Using Swaps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-equalize-arrays-using-swaps](https://leetcode.com/problems/minimum-cost-to-equalize-arrays-using-swaps)
**Companies:** Shopback, Uber

---

## Key Insight

> Swaps between two arrays can equalize elements. Analyze which elements need changes and whether same-position swaps (cost 1) or cross-position swaps (cost 2) are cheaper. Group positions by their mismatch type.

---

## Approach: Greedy Swap Pairing ✅

```
FUNCTION minCostSwaps(nums1, nums2):
    // Categorize mismatched positions
    // Same-type pairs can be fixed with 1 swap each
    // Cross-type pairs need 2 swaps each
    // Greedily pair same-type first, then handle remainder with cross-type
    
    typeA ← 0  // positions where nums1[i] > nums2[i] needs swap type A
    typeB ← 0  // positions where nums1[i] < nums2[i] needs swap type B
    
    FOR i ← 0 TO n-1 DO
        IF nums1[i] ≠ nums2[i] THEN categorize
    
    pairs ← MIN(typeA, typeB)
    // Remaining unpaired need cross-swaps (cost 2 each)
    RETURN pairs + 2 * ABS(typeA - typeB)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Pair same-type mismatches first** (1 swap each), then handle remaining with cross-type swaps (2 swaps each).

---
