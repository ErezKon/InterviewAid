# 1818. Minimum Absolute Sum Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-absolute-sum-difference](https://leetcode.com/problems/minimum-absolute-sum-difference)
**Companies:** Uber

---

## Problem Description
You are given two positive integer arrays `nums1` and `nums2`, both of length `n`.

The **absolute sum difference** of arrays `nums1` and `nums2` is defined as the **sum** of `|nums1[i] - nums2[i]|` for each `0 <= i < n` (**0-indexed**).

You can replace **at most one** element of `nums1` with **any** other element in `nums1` to **minimize** the absolute sum difference.

Return the *minimum absolute sum difference **after** replacing at most one element in the array `nums1`.* Since the answer may be large, return it **modulo** `10^9 + 7`.

`|x|` is defined as:
- `x` if `x >= 0`, or
- `-x` if `x < 0`.

**Constraints:**
- `n == nums1.length`
- `n == nums2.length`
- `1 <= n <= 10^5`
- `1 <= nums1[i], nums2[i] <= 10^5`

## Examples

```
Example 1:
  Input: nums1 = [1,7,5], nums2 = [2,3,5]
  Output: 3
  Explanation: There are two possible optimal solutions:
  - Replace the second element with the first: [1,7,5] => [1,1,5], or
  - Replace the second element with the third: [1,7,5] => [1,5,5].
  Both will yield an absolute sum difference of |1-2| + (|1-3| or |5-3|) + |5-5| = 3.
```

```
Example 2:
  Input: nums1 = [2,4,6,8,10], nums2 = [2,4,6,8,10]
  Output: 0
  Explanation: nums1 is equal to nums2 so no replacement is needed. This will result in an
  absolute sum difference of 0.
```

```
Example 3:
  Input: nums1 = [1,10,4,4,2,7], nums2 = [9,3,5,1,7,4]
  Output: 20
  Explanation: Replace the first element with the second: [1,10,4,4,2,7] => [10,10,4,4,2,7].
  This yields an absolute sum difference of |10-9| + |10-3| + |4-5| + |4-1| + |2-7| + |7-4| = 20
```

## Approach
**Sort + Binary Search – One‑Swap Optimization** – Compute the original total difference. Sort a copy of `nums1`. For each index, binary‑search the closest value in the sorted array to `nums2[i]` to determine the maximal reduction achievable by swapping that element.

```text
FUNCTION MinAbsoluteSumDiff(nums1, nums2):
    SET MOD ← 1_000_000_007
    SET n ← LENGTH(nums1)
    SET sorted1 ← SORTED(nums1)
    SET totalDiff ← 0
    SET maxSaving ← 0
    FOR i ← 0 TO n-1:
        SET origDiff ← ABS(nums1[i] - nums2[i])
        SET totalDiff ← totalDiff + origDiff
        // Binary search for closest value to nums2[i]
        SET idx ← BINARY_SEARCH_LEFT(sorted1, nums2[i])
        IF idx < n:
            SET saving ← origDiff - ABS(sorted1[idx] - nums2[i])
            SET maxSaving ← MAX(maxSaving, saving)
        IF idx > 0:
            SET saving ← origDiff - ABS(sorted1[idx-1] - nums2[i])
            SET maxSaving ← MAX(maxSaving, saving)
    RETURN (totalDiff - maxSaving) MOD MOD
```

## Walkthrough
`nums1 = [1,7,5]`, `nums2 = [2,3,5]`.
1. `sorted1 = [1,5,7]`, `totalDiff = |1-2|+|7-3|+|5-5| = 1+4+0 = 5`.
2. For each i:
   - i=0: closest to `2` is `1` → saving = `1-1 = 0`.
   - i=1: closest to `3` is `5` → saving = `4 - |5-3| = 4-2 = 2` (maxSaving=2).
   - i=2: closest to `5` is `5` → saving = `0`.
3. Result = `5 - 2 = 3`.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting and binary searches.
- **Space:** `O(n)` for the sorted copy.

## Follow‑Up Questions
1. How would the algorithm change if you could perform up to `k` replacements instead of just one?
2. Can you adapt the solution to return the actual index and value to replace for the optimal improvement?
3. What if the arrays are extremely large and must be processed in a streaming fashion?

## Key Takeaway
Sorting `nums1` and using binary search lets you evaluate the best single replacement in logarithmic time per element, achieving the optimal reduced sum.
