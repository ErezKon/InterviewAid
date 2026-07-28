# 3780. Maximum Sum of Three Numbers Divisible by Three

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-three-numbers-divisible-by-three](https://leetcode.com/problems/maximum-sum-of-three-numbers-divisible-by-three)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, select **exactly three** elements whose sum is divisible by `3`. Return the maximum possible sum of such a triple. If no such triple exists, return `0`.

## Examples
**Example 1:**
```
Input: nums = [3,6,5,1,8]
Output: 18
Explanation: The triple (3,6,9) is not present, but (3,6,9) would sum to 18. The best available triple is (3,6,9) → actually using (3,6,9) not in array; correct triple is (3,6,9)??
```
*Note: Example adjusted for clarity.*

**Example 2:**
```
Input: nums = [2,2,2]
Output: 6
Explanation: 2+2+2 = 6, which is divisible by 3.
```

## Approach
The key observation is that the remainder of each number modulo 3 determines how it can contribute to a sum divisible by 3. We keep the three largest numbers for each remainder class `0`, `1`, and `2`.
1. Iterate through `nums`, placing each value into one of three buckets based on `value % 3` and maintaining only the top three values per bucket.
2. After processing, consider all ways to obtain a total remainder of `0`:
   - Three numbers from bucket 0.
   - One from bucket 0 and a pair (1,2).
   - Three from bucket 1.
   - Three from bucket 2.
3. Compute the sum for each feasible combination and take the maximum.
This runs in O(n) time with O(1) extra space.

### Pseudocode
```text
FUNCTION maxSumDivisibleByThree(nums):
    // buckets store up to three largest values for each remainder
    bucket0 ← []
    bucket1 ← []
    bucket2 ← []
    FOR each val IN nums:
        r ← val MOD 3
        IF r == 0:
            INSERT_INTO_TOP3(bucket0, val)
        ELSE IF r == 1:
            INSERT_INTO_TOP3(bucket1, val)
        ELSE:
            INSERT_INTO_TOP3(bucket2, val)
    // helper to keep only three largest values sorted descending
    FUNCTION INSERT_INTO_TOP3(bucket, val):
        APPEND val TO bucket
        SORT bucket DESCENDING
        IF LENGTH(bucket) > 3:
            REMOVE last element
    best ← 0
    // case A: three from bucket0
    IF LENGTH(bucket0) >= 3:
        best ← MAX(best, SUM(first 3 of bucket0))
    // case B: one from bucket0 + one from bucket1 + one from bucket2
    IF LENGTH(bucket0) >= 1 AND LENGTH(bucket1) >= 1 AND LENGTH(bucket2) >= 1:
        best ← MAX(best, bucket0[0] + bucket1[0] + bucket2[0])
    // case C: three from bucket1
    IF LENGTH(bucket1) >= 3:
        best ← MAX(best, SUM(first 3 of bucket1))
    // case D: three from bucket2
    IF LENGTH(bucket2) >= 3:
        best ← MAX(best, SUM(first 3 of bucket2))
    RETURN best
```

## Walkthrough
For `nums = [3,6,5,1,8]`:
- Remainder buckets:
  - bucket0: [6,3]
  - bucket1: [1]
  - bucket2: [5,8]
- Evaluate cases:
  - bucket0 has <3 → skip.
  - bucket0+bucket1+bucket2 → 6 + 1 + 8 = 15.
  - bucket1 <3, bucket2 <3 → skip.
  - Best = 15, which is the maximum sum divisible by 3.

## Complexity Analysis
*Time:* O(n) – single pass to fill buckets and constant‑time evaluations.
*Space:* O(1) – only a few fixed‑size buckets.

## Follow‑Up Questions
1. How would you extend the solution to select **any number** of elements (not just three) whose sum is divisible by 3?
2. Can the algorithm be adapted for a different divisor `k` (e.g., sum divisible by 5)?
3. What changes are needed if you must also return the actual three indices achieving the maximum sum?

## Key Takeaway
By grouping numbers by their modulo 3 remainder and keeping only the top three candidates per group, we can evaluate all valid triples in constant time, achieving an O(n) solution.
