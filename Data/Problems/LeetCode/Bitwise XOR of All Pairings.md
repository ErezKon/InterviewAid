# 2425. Bitwise XOR of All Pairings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-xor-of-all-pairings](https://leetcode.com/problems/bitwise-xor-of-all-pairings)
**Companies:** Google, Meta, Trilogy

---

## Problem Description
You are given two **0-indexed** arrays, `nums1` and `nums2`, consisting of non-negative integers. Let there be another array, `nums3`, which contains the bitwise XOR of **all pairings** of integers between `nums1` and `nums2` (every integer in `nums1` is paired with every integer in `nums2` **exactly once**).

Return *the **bitwise XOR** of all integers in* `nums3`.

**Constraints:**
- `1 ≤ nums1.length, nums2.length ≤ 10⁵`
- `0 ≤ nums1[i], nums2[j] ≤ 10⁹`

## Examples
```
Example 1:
  Input: nums1 = [2,1,3], nums2 = [10,2,5,0]
  Output: 13
  Explanation:
  A possible nums3 array is [8,0,7,2,11,3,4,1,9,1,6,3].
  The bitwise XOR of all these numbers is 13, so we return 13.

Example 2:
  Input: nums1 = [1,2], nums2 = [3,4]
  Output: 0
  Explanation:
  All possible pairs of bitwise XORs are nums1[0] ^ nums2[0], nums1[0] ^ nums2[1], nums1[1] ^ nums2[0],
  and nums1[1] ^ nums2[1].
  Thus, one possible nums3 array is [2,5,1,6].
  2 ^ 5 ^ 1 ^ 6 = 0, so we return 0.
```

## Approach
**Parity Observation** – The final XOR depends only on the parity (odd/even) of the lengths of the two arrays. If `len(nums2)` is odd, XOR all elements of `nums1` into the result; similarly, if `len(nums1)` is odd, XOR all elements of `nums2`.

```text
FUNCTION xorAllPairs(nums1, nums2):
    SET result ← 0
    IF SIZE OF nums2 IS ODD:
        FOR val IN nums1:
            result ← result XOR val
    IF SIZE OF nums1 IS ODD:
        FOR val IN nums2:
            result ← result XOR val
    RETURN result
```

## Walkthrough
Consider `nums1 = [1,2]` (even length) and `nums2 = [3,4]` (even length). Neither condition triggers, so `result` stays `0`, matching the example.

## Complexity Analysis
- **Time:** O(n + m) where n and m are the lengths of the two arrays.
- **Space:** O(1) extra space.

## Follow‑Up 
- How would the solution change if we needed the XOR of all *triplet* combinations from three arrays?
- Can this parity trick be applied to other bitwise operations like AND or OR?

## Key Takeaway
When XOR-ing all pairwise combinations, each element’s contribution depends solely on whether the opposite array has odd length, allowing a linear‑time solution.
