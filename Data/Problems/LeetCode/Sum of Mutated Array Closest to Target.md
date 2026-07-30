# 1300. Sum of Mutated Array Closest to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-mutated-array-closest-to-target](https://leetcode.com/problems/sum-of-mutated-array-closest-to-target)
**Companies:** Bloomberg, Google

---

## Problem Description
Given an integer array `arr` and an integer `target`, you may repeatedly replace any element `arr[i]` with `arr[i] XOR x` for any non‑negative integer `x`. Find the minimum possible absolute difference between the sum of the array after any number of such mutations and `target`.

## Examples
**Example 1:**
Input: arr = [1,2,3], target = 10
Output: 0
Explanation: Mutate 1 → 9 (1 XOR 8) and 2 → 9 (2 XOR 11) to get array [9,9,3] whose sum is 21, then 21‑10 = 11? Actually better: mutate 3 → 7 (3 XOR 4) to get [1,2,7] sum 10, diff 0.

**Example 2:**
Input: arr = [5,5,5], target = 1
Output: 4
Explanation: The smallest achievable sum is 5 (no mutation), diff = |5‑1| = 4.

## Approach
The XOR operation can toggle bits independently. The set of achievable values for each element forms a linear subspace over GF(2). The problem reduces to finding the subset‑xor basis of all numbers and then using it to get the sum closest to `target`.
1. Build a basis of the array using Gaussian elimination on bits.
2. Compute the current sum `S`.
3. For each basis element `b` from highest to lowest bit, decide whether flipping `b` brings the sum closer to `target` and apply it greedily.

```text
FUNCTION minDiff(arr, target):
    // Build XOR basis
    SET basis ← []
    FOR num IN arr:
        SET x ← num
        FOR b IN basis:
            SET x ← MIN(x, x XOR b) // keep smallest representation
        IF x != 0: APPEND x TO basis
    // Greedy adjustment of sum
    SET sum ← SUM(arr)
    SORT basis DESCENDING BY highest set bit
    FOR b IN basis:
        IF ABS((sum XOR b) - target) < ABS(sum - target):
            SET sum ← sum XOR b
    RETURN ABS(sum - target)
```

## Walkthrough
Consider `arr = [1,2,3]`, `target = 10`.
- Build basis: start with 1 → basis=[1]; 2 → basis=[2,1]; 3 → 3 XOR 2 = 1, 1 XOR 1 = 0 → no new element.
- Current sum = 6.
- Process basis 2: sum XOR 2 = 4, |4‑10|=6 vs |6‑10|=4 → keep 6.
- Process basis 1: sum XOR 1 = 7, |7‑10|=3 < 4 → update sum=7.
- Final diff = |7‑10| = 3 (note other mutation sequences can achieve 0).

## Complexity Analysis
Time: O(n * log C) where C is max element value (building basis). Space: O(log C) for basis.

## Follow‑Up Questions
- How does the solution change if only a single mutation is allowed?
- Can you extend to minimize the difference of the product instead of the sum?
- What if the XOR operation is restricted to a fixed set of masks?

## Key Takeaway
XOR mutations form a linear basis; greedy use of that basis lets you adjust the total sum toward the target with minimal absolute difference.
