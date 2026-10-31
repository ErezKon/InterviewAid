# 1998. GCD Sort of an Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/gcd-sort-of-an-array](https://leetcode.com/problems/gcd-sort-of-an-array)
**Companies:** Amazon

---

## Problem Description
You are given an integer array `nums`, and you can perform the following operation **any** number of times on `nums`:

- Swap the positions of two elements `nums[i]` and `nums[j]` if `gcd(nums[i], nums[j]) > 1` where `gcd(nums[i], nums[j])` is the **greatest common divisor** of `nums[i]` and `nums[j]`.

Return `true` *if it is possible to sort* `nums` *in **non-decreasing** order using the above swap method, or* `false` *otherwise.*

**Constraints:**
- `1 <= nums.length <= 3 * 10^4`
- `2 <= nums[i] <= 10^5`

## Examples
```
Example 1:
  Input: nums = [7,21,3]
  Output: true
  Explanation: We can sort [7,21,3] by performing the following operations:
  - Swap 7 and 21 because gcd(7,21) = 7. nums = [21,7,3]
  - Swap 21 and 3 because gcd(21,3) = 3. nums = [3,7,21]
```
```
Example 2:
  Input: nums = [5,2,6,2]
  Output: false
  Explanation: It is impossible to sort the array because 5 cannot be swapped with any other element.
```
```
Example 3:
  Input: nums = [10,5,9,3,15]
  Output: true
  Explanation: We can sort [10,5,9,3,15] by performing the following operations:
  - Swap 10 and 15 because gcd(10,15) = 5. nums = [15,5,9,3,10]
  - Swap 15 and 3 because gcd(15,3) = 3. nums = [3,5,9,15,10]
  - Swap 10 and 15 because gcd(10,15) = 5. nums = [3,5,9,10,15]
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
The helper `primeFactors` returns distinct prime factors of a number. By union-ing indices sharing a prime, we capture all possible swaps.

## Walkthrough
Consider `nums = [2,3,6,7,4,9]`:
1. Prime factors: 2→{2}, 3→{3}, 6→{2,3}, 7→{7}, 4→{2}, 9→{3}
2. Union indices sharing 2: (0,2,4); sharing 3: (1,2,5). Resulting components: {0,2,4,1,5} and {3}.
3. Sorted array = [2,3,4,6,7,9]. Each element's original index belongs to the same component as its target position, so return true.

## Complexity Analysis
- **Time:** `O(n * sqrt(max(nums)))` for factorization plus `O(n log n)` for sorting.
- **Space:** `O(n)` for DSU and factor maps.

## Follow-Up Questions
1. How would you handle very large numbers where factorization is expensive?
2. Can the approach be adapted if the swap condition uses `gcd == 1` instead?
3. What is the complexity if we pre-compute smallest prime factors up to `max(nums)`?

## Key Takeaway
By modeling GCD-based swapability as connectivity via shared prime factors, the problem reduces to checking component consistency between the original and sorted arrays.
