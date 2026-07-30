# 2584. Split the Array to Make Coprime Products

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-the-array-to-make-coprime-products](https://leetcode.com/problems/split-the-array-to-make-coprime-products)
**Companies:** Zomato

---

## Problem Description
Given an integer array `nums`, split it into two non‑empty parts at index `i` (0 < i < n) such that the product of the left part and the product of the right part are coprime (their greatest common divisor is 1). Return the smallest possible index `i`. If no such split exists, return `-1`.

## Examples
**Example 1:**
```
Input: nums = [2,3,7,5,4,6]
Output: 3
Explanation: Split after index 3 → left = [2,3,7,5], right = [4,6].
GCD(product(left), product(right)) = GCD(210, 24) = 1.
```
**Example 2:**
```
Input: nums = [4,7,8,15,3,5]
Output: 2
Explanation: Split after index 2 → left = [4,7,8], right = [15,3,5].
GCD(224, 225) = 1.
```
**Example 3:**
```
Input: nums = [5,5,5]
Output: -1
Explanation: Any split leaves a common factor 5.
```

## Approach
The product of a segment can be represented by the multiset of its prime factors. Two products are coprime iff they share no prime factor. We can pre‑compute for each position the set of prime factors that appear in the prefix and suffix. The earliest index where the intersection of prefix‑factors and suffix‑factors is empty gives the answer.

1. Factor each number into its distinct primes using trial division up to √num.
2. Sweep from left to right, maintaining a hash set `prefixSet` of all primes seen so far.
3. Simultaneously compute `suffixSet[i]` – the set of primes appearing in the suffix starting at i.
4. For each split i (1 ≤ i < n), check `prefixSet ∩ suffixSet[i]` is empty.
5. Return the first i that satisfies; otherwise -1.

```text
FUNCTION smallestCoprimeSplit(nums):
    n ← LENGTH(nums)
    // Step 1: factor each element
    primeLists ← ARRAY of size n
    FOR i FROM 0 TO n-1:
        primeLists[i] ← distinctPrimeFactors(nums[i])
    // Step 2: build suffix sets
    suffixSets ← ARRAY of size n+1
    SET suffixSets[n] ← {}
    FOR i FROM n-1 DOWNTO 0:
        SET suffixSets[i] ← UNION(suffixSets[i+1], primeLists[i])
    // Step 3: scan prefixes
    SET prefixSet ← {}
    FOR i FROM 0 TO n-2:
        SET prefixSet ← UNION(prefixSet, primeLists[i])
        IF INTERSECTION(prefixSet, suffixSets[i+1]) IS EMPTY:
            RETURN i+1   // split after i
    RETURN -1

FUNCTION distinctPrimeFactors(x):
    SET factors ← {}
    d ← 2
    WHILE d * d <= x:
        IF x MOD d == 0:
            ADD d TO factors
            WHILE x MOD d == 0:
                x ← x / d
        d ← d + 1
    IF x > 1:
        ADD x TO factors
    RETURN factors
```

## Walkthrough
Consider `nums = [2,3,7,5,4,6]`.
1. Prime factors: `[ {2}, {3}, {7}, {5}, {2}, {2,3} ]`.
2. Build suffix sets from the end:
   - suffix[6] = {}
   - suffix[5] = {2,3}
   - suffix[4] = {2,3,2} → {2,3}
   - suffix[3] = {5,2,3}
   - suffix[2] = {7,5,2,3}
   - suffix[1] = {3,7,5,2,3} → {2,3,5,7}
   - suffix[0] = {2,3,5,7}
3. Scan prefixes:
   - i=0, prefix={2}, suffix[1]={2,3,5,7} → intersection not empty.
   - i=1, prefix={2,3}, suffix[2]={2,3,5,7} → not empty.
   - i=2, prefix={2,3,7}, suffix[3]={5,2,3} → not empty.
   - i=3, prefix={2,3,7,5}, suffix[4]={2,3} → intersection empty → split index 4 (i+1).
Thus answer 3 (0‑based) or 4 (1‑based) as required.

## Complexity Analysis
- **Time:** Factoring each number costs O(√max(nums[i])) total; the sweep is O(n). Overall roughly O(n √A) where A is max element.
- **Space:** O(n p) for storing prime factor sets, where p is average number of distinct primes per element (usually small).

## Follow‑Up Questions
1. How would the solution change if numbers could be up to 10⁹, requiring faster factorisation?
2. Can the problem be solved in O(n) time using a global prime‑frequency map instead of per‑position sets?
3. What if we need to split into more than two parts with pairwise coprime products?

## Key Takeaway
Transforming the product coprimality condition into a set‑intersection problem on prime factors enables a linear‑time scan for the earliest valid split.
