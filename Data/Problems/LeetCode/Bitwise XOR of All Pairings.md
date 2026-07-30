# 2425. Bitwise XOR of All Pairings

**Difficulty:** 🟡 Medium
**Companies:** Google, Meta, Trilogy

---

## Problem Description
Given two integer arrays `nums1` and `nums2`, compute the XOR of all possible pairwise XORs between an element from `nums1` and an element from `nums2`. Formally, return the value of \(\bigoplus_{a \in nums1}\bigoplus_{b \in nums2} (a \oplus b)\).

## Examples
- Input: `nums1 = [1,2]`, `nums2 = [3,4]` → Output: `0`. Explanation: Pairwise XORs are `1⊕3=2`, `1⊕4=5`, `2⊕3=1`, `2⊕4=6`; XOR of all these values is `2⊕5⊕1⊕6 = 0`.
- Input: `nums1 = [5]`, `nums2 = [1,2,3]` → Output: `5`. Explanation: XORs are `5⊕1=4`, `5⊕2=7`, `5⊕3=6`; XOR of all is `4⊕7⊕6 = 5`.

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
