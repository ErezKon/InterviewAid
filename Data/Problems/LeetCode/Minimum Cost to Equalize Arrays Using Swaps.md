# 3868. Minimum Cost to Equalize Arrays Using Swaps

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-equalize-arrays-using-swaps
**Companies:** Shopback, Uber

---
## Problem Description
You are given two integer arrays `nums1` and `nums2` of equal length. In one operation you can swap `nums1[i]` with `nums2[i]` (cost 1) or swap `nums1[i]` with `nums2[j]` for `i ≠ j` (cost 2). Determine the minimum total cost required to make the two arrays identical (i.e., `nums1[i] = nums2[i]` for all `i`).

## Examples
**Example 1**
Input: nums1 = [1,2,3], nums2 = [2,1,3]
Output: 1
Explanation: Swap `nums1[0]` with `nums2[1]` (same‑position swap) costing 1.

**Example 2**
Input: nums1 = [4,5,6], nums2 = [1,2,3]
Output: 4
Explanation: No same‑position matches; each mismatch requires a cross‑position swap costing 2, total 2 × 2 = 4.

## Approach
**Algorithm:** Greedy pairing of mismatches
Classify mismatched positions into two types:
- Type A: `nums1[i] > nums2[i]`
- Type B: `nums1[i] < nums2[i]`
Pairs of opposite types can be resolved with a same‑position swap (cost 1). After pairing as many as possible, any remaining mismatches must be fixed with cross‑position swaps (cost 2 each).

```text
FUNCTION minCostSwaps(nums1, nums2):
    typeA ← 0  // count where nums1[i] > nums2[i]
    typeB ← 0  // count where nums1[i] < nums2[i]
    FOR i ← 0 TO LEN(nums1)-1 DO
        IF nums1[i] = nums2[i] THEN CONTINUE
        IF nums1[i] > nums2[i] THEN typeA ← typeA + 1
        ELSE typeB ← typeB + 1
    pairs ← MIN(typeA, typeB)          // same‑position swaps
    remaining ← ABS(typeA - typeB)      // need cross‑position swaps
    RETURN pairs * 1 + remaining * 2
```

## Walkthrough
For `nums1 = [1,2,3]`, `nums2 = [2,1,3]`:
- Index 0: 1 < 2 → typeB++
- Index 1: 2 > 1 → typeA++
- Index 2: equal → ignore
Pairs = min(1,1)=1 → cost 1, remaining 0 → total 1.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n) – single pass over the arrays |
| Space  | O(1) |

## Follow‑Up Questions
1. How would the solution change if swapping any two elements across the two arrays (not necessarily one from each) had cost 1?
2. Can you extend the algorithm to handle weighted swap costs that depend on the indices involved?
3. What is the minimum cost if you are also allowed to change a value at cost 1 instead of swapping?

## Key Takeaway
Pair opposite‑type mismatches first using cheap same‑position swaps; any leftovers require more expensive cross‑position swaps, yielding the optimal total cost.
