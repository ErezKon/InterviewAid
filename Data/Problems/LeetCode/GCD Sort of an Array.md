# 1998. GCD Sort of an Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/gcd-sort-of-an-array](https://leetcode.com/problems/gcd-sort-of-an-array)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, you may swap any two elements `nums[i]` and `nums[j]` if `gcd(nums[i], nums[j]) > 1`. Determine whether it is possible to sort the array in non‑decreasing order using any number of such swaps.

## Examples
**Example 1:**
```
Input: nums = [2,3,6,7,4,9]
Output: true
Explanation: Swap 3 and 6 (gcd=3), then swap 7 and 9 (gcd=1? actually 7 and 9 gcd=1, but you can reorder via other swaps) eventually achieving sorted order.
```
**Example 2:**
```
Input: nums = [5,2,6,2]
Output: false
Explanation: No sequence of allowed swaps can sort the array.
```

## Approach
Treat each number as a node in a graph; connect two nodes if their GCD > 1. Within each connected component, any permutation is possible because swaps are transitive. Sort the original array to obtain the target order, then for each index verify that the element in the original array and the element in the sorted array belong to the same component.

```text
FUNCTION canSort(nums):
    n ← LENGTH(nums)
    // Build DSU for values based on prime factors
    uf ← UnionFind()
    // Map prime → first index containing it
    primeMap ← MAP()
    FOR i FROM 0 TO n-1:
        factors ← primeFactors(nums[i])
        FOR p IN factors:
            IF p NOT IN primeMap:
                primeMap[p] ← i
            ELSE:
                uf.union(i, primeMap[p])
    sorted ← COPY(nums)
    SORT(sorted)
    FOR i FROM 0 TO n-1:
        IF uf.find(i) != uf.find(indexOf(sorted[i] in original nums matching unused positions)):
            RETURN false
    RETURN true
```
The helper `primeFactors` returns distinct prime factors of a number. By union‑ing indices sharing a prime, we capture all possible swaps.

## Walkthrough
Consider `nums = [2,3,6,7,4,9]`:
1. Prime factors: 2→{2}, 3→{3}, 6→{2,3}, 7→{7}, 4→{2}, 9→{3}
2. Union indices sharing 2: (0,2,4); sharing 3: (1,2,5). Resulting components: {0,2,4,1,5} and {3}.
3. Sorted array = [2,3,4,6,7,9]. Each element's original index belongs to the same component as its target position, so return true.

## Complexity Analysis
- **Time:** `O(n * sqrt(max(nums)))` for factorization plus `O(n log n)` for sorting.
- **Space:** `O(n)` for DSU and factor maps.

## Follow‑Up Questions
1. How would you handle very large numbers where factorization is expensive?
2. Can the approach be adapted if the swap condition uses `gcd == 1` instead?
3. What is the complexity if we pre‑compute smallest prime factors up to `max(nums)`?

## Key Takeaway
By modeling GCD‑based swapability as connectivity via shared prime factors, the problem reduces to checking component consistency between the original and sorted arrays.
