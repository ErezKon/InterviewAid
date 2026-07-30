# 2179. Count Good Triplets in an Array

**Difficulty:** 🔴 Hard
**Companies:** Bloomberg, Google, Walmart Labs

---

## Problem Description
Given two permutations `nums1` and `nums2` of length `n`, count the number of **good triplets** `(i, j, k)` such that `0 \le i < j < k < n` and the relative order of the elements `nums1[i]`, `nums1[j]`, `nums1[k]` is the same in `nums2`. In other words, the three elements appear in the same order in both arrays.

## Examples
**Example 1:**
```
Input: nums1 = [1,2,3,4], nums2 = [1,2,3,4]
Output: 4
Explanation: All possible triplets (0,1,2), (0,1,3), (0,2,3), (1,2,3) preserve order.
```
**Example 2:**
```
Input: nums1 = [3,1,2], nums2 = [1,2,3]
Output: 0
Explanation: No three elements keep the same relative order.
```

## Approach
The condition can be checked by mapping each value to its index in `nums2`. Transform `nums1` into an array `pos` where `pos[i]` is the position of `nums1[i]` in `nums2`. A triplet `(i,j,k)` is good iff `pos[i] < pos[j] < pos[k]`. Counting increasing triplets in `pos` can be done with two Fenwick trees (Binary Indexed Trees): one for counts of elements to the left and one for counts of elements to the right.

### Pseudocode
```text
FUNCTION countGoodTriplets(nums1, nums2):
    n ← LENGTH(nums1)
    // map value → index in nums2
    indexMap ← EMPTY MAP
    FOR i FROM 0 TO n-1:
        indexMap[nums2[i]] ← i
    // transform nums1
    pos ← ARRAY[n]
    FOR i FROM 0 TO n-1:
        pos[i] ← indexMap[nums1[i]]
    // BIT for suffix counts
    bitRight ← BIT(n)
    FOR i FROM 0 TO n-1:
        bitRight.UPDATE(pos[i] + 1, 1)   // 1‑based BIT
    bitLeft ← BIT(n)
    result ← 0
    FOR j FROM 0 TO n-1:
        // remove current element from right side
        bitRight.UPDATE(pos[j] + 1, -1)
        leftLess ← bitLeft.QUERY(pos[j])          // count of i<j with pos[i] < pos[j]
        rightGreater ← bitRight.QUERY_RANGE(pos[j] + 2, n) // count of k>j with pos[k] > pos[j]
        result ← result + leftLess * rightGreater
        // add current element to left side for future iterations
        bitLeft.UPDATE(pos[j] + 1, 1)
    RETURN result
```

## Walkthrough
For `nums1 = [1,2,3,4]`, `nums2 = [1,2,3,4]`:
- `pos = [0,1,2,3]`.
- As we iterate `j`, `leftLess` and `rightGreater` produce counts that sum to 4 good triplets.

## Complexity Analysis
- **Time:** O(n log n) due to BIT updates and queries.
- **Space:** O(n) for the position array and two BITs.

## Follow-Up Questions
1. How would you modify the algorithm to count good **pairs** instead of triplets?
2. Can the solution be adapted for arrays that are not permutations (i.e., may contain duplicates)?
3. What is the complexity if you use a segment tree instead of a BIT?

## Key Takeaway
Transforming one permutation into index positions of the other reduces the problem to counting increasing subsequences, which BITs can handle efficiently.
