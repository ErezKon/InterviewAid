# 3868. Minimum Cost to Equalize Arrays Using Swaps

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-equalize-arrays-using-swaps
**Companies:** Shopback, Uber

---
## Problem Description
You are given two integer arrays `nums1` and `nums2` of size `n`.

You can perform the following two operations any number of times on these two arrays:
- **Swap within the same array**: Choose two indices `i` and `j`. Then, choose either to swap `nums1[i]` and `nums1[j]`, or `nums2[i]` and `nums2[j]`. This operation is **free of charge**.
- **Swap between two arrays**: Choose an index `i`. Then, swap `nums1[i]` and `nums2[i]`. This operation **incurs a cost of 1**.

Return an integer denoting the **minimum cost** to make `nums1` and `nums2` **identical**. If this is not possible, return -1.

**Constraints:**
- `2 <= n == nums1.length == nums2.length <= 8 * 10⁴`
- `1 <= nums1[i], nums2[i] <= 8 * 10⁴`

## Examples

```
Example 1:
  Input: nums1 = [10,20], nums2 = [20,10]
  Output: 0
  Explanation:
  - Swap nums2[0] = 20 and nums2[1] = 10.
    - nums2 becomes [10, 20].
    - This operation is free of charge.
  - nums1 and nums2 are now identical. The cost is 0.
```

```
Example 2:
  Input: nums1 = [10,10], nums2 = [20,20]
  Output: 1
  Explanation:
  - Swap nums1[0] = 10 and nums2[0] = 20.
    - nums1 becomes [20, 10].
    - nums2 becomes [10, 20].
    - This operation costs 1.
  - Swap nums2[0] = 10 and nums2[1] = 20.
    - nums2 becomes [20, 10].
    - This operation is free of charge.
  - nums1 and nums2 are now identical. The cost is 1.
```

```
Example 3:
  Input: nums1 = [10,20], nums2 = [30,40]
  Output: -1
  Explanation: It is impossible to make the two arrays identical. Therefore, the answer is -1.
```

## Approach
**Algorithm:** Greedy pairing of mismatches
Classify mismatched positions into two types:
- Type A: `nums1[i] > nums2[i]`
- Type B: `nums1[i] < nums2[i]`
Pairs of opposite types can be resolved with a same-position swap (cost 1). After pairing as many as possible, any remaining mismatches must be fixed with cross-position swaps (cost 2 each).

```text
FUNCTION minCostSwaps(nums1, nums2):
    typeA ← 0  // count where nums1[i] > nums2[i]
    typeB ← 0  // count where nums1[i] < nums2[i]
    FOR i ← 0 TO LEN(nums1)-1 DO
        IF nums1[i] = nums2[i] THEN CONTINUE
        IF nums1[i] > nums2[i] THEN typeA ← typeA + 1
        ELSE typeB ← typeB + 1
    pairs ← MIN(typeA, typeB)          // same-position swaps
    remaining ← ABS(typeA - typeB)      // need cross-position swaps
    RETURN pairs * 1 + remaining * 2
```

## Walkthrough
For `nums1 = [1,2,3]`, `nums2 = [2,1,3]`:
- Index 0: 1 < 2 → typeB++
- Index 1: 2 > 1 → typeA++
- Index 2: equal → ignore
Pairs = min(1,1)=1 → cost 1, remaining 0 → total 1.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n) – single pass over the arrays |
| Space  | O(1) |

## Follow-Up Questions
1. How would the solution change if swapping any two elements across the two arrays (not necessarily one from each) had cost 1?
2. Can you extend the algorithm to handle weighted swap costs that depend on the indices involved?
3. What is the minimum cost if you are also allowed to change a value at cost 1 instead of swapping?

## Key Takeaway
Pair opposite-type mismatches first using cheap same-position swaps; any leftovers require more expensive cross-position swaps, yielding the optimal total cost.
