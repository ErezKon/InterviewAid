# 2584. Split the Array to Make Coprime Products

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-the-array-to-make-coprime-products](https://leetcode.com/problems/split-the-array-to-make-coprime-products)
**Companies:** Zomato

---

## Problem Description

You are given a **0-indexed** integer array `nums` of length `n`.

A **split** at an index `i` where `0 <= i <= n - 2` is called **valid** if the product of the first `i + 1` elements and the product of the remaining elements are coprime.

- For example, if `nums = [2, 3, 3]`, then a split at the index `i = 0` is valid because `2` and `9` are coprime, while a split at the index `i = 1` is not valid because `6` and `3` are not coprime. A split at the index `i = 2` is not valid because `i == n - 1`.

Return *the smallest index* `i` *at which the array can be split validly or* `-1` *if there is no such split*.

Two values `val1` and `val2` are coprime if `gcd(val1, val2) == 1` where `gcd(val1, val2)` is the greatest common divisor of `val1` and `val2`.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 10^4`
- `1 <= nums[i] <= 10^6`

## Examples

**Example 1:**
```
Input: nums = [4,7,8,15,3,5]
Output: 2
Explanation: The table above shows the values of the product of the first i + 1 elements, the remaining elements, and their gcd at each index i.
The only valid split is at index 2.
```

**Example 2:**
```
Input: nums = [4,7,15,8,3,5]
Output: -1
Explanation: The table above shows the values of the product of the first i + 1 elements, the remaining elements, and their gcd at each index i.
There is no valid split.
```

## Approach
The two products are coprime iff no prime factor appears on both sides of the split. So for every prime, all elements containing it must lie entirely on one side. Record the **last index** at which each prime occurs; then sweep left to right, tracking `reach` = the furthest last-occurrence of any prime seen so far. If `reach == i` at index `i`, every prime in the prefix is finished, so splitting at `i` is valid.

1. Factor each number into its distinct primes using trial division up to sqrt(num).
2. Build `last[p]` = the largest index whose element is divisible by prime `p`.
3. Sweep `i` from 0 to n-2: `reach = max(reach, last[p])` for each prime `p` of `nums[i]`.
4. Return the first `i` with `reach == i`; otherwise -1.

```text
FUNCTION findValidSplit(nums):
    n <- LENGTH(nums)
    primeLists <- ARRAY of size n
    last <- EMPTY MAP
    FOR i FROM 0 TO n-1:
        primeLists[i] <- distinctPrimeFactors(nums[i])
        FOR p IN primeLists[i]:
            last[p] <- i
    reach <- 0
    FOR i FROM 0 TO n-2:
        FOR p IN primeLists[i]:
            reach <- MAX(reach, last[p])
        IF reach == i:
            RETURN i
    RETURN -1

FUNCTION distinctPrimeFactors(x):
    SET factors <- {}
    d <- 2
    WHILE d * d <= x:
        IF x MOD d == 0:
            ADD d TO factors
            WHILE x MOD d == 0:
                x <- x / d
        d <- d + 1
    IF x > 1:
        ADD x TO factors
    RETURN factors
```

## Walkthrough
**Example 1:** `nums = [4,7,8,15,3,5]`.
1. Prime factors: `[{2}, {7}, {2}, {3,5}, {3}, {5}]`.
2. Last occurrences: `last[2] = 2`, `last[7] = 1`, `last[3] = 4`, `last[5] = 5`.
3. Sweep:
   - `i=0` (4, primes {2}): `reach = 2` -> `2 != 0`.
   - `i=1` (7, primes {7}): `reach = max(2, 1) = 2` -> `2 != 1`.
   - `i=2` (8, primes {2}): `reach = max(2, 2) = 2` -> `reach == 2`, return `2`.
   (Check: prefix product `224 = 2^5 * 7`, suffix product `225 = 3^2 * 5^2`, gcd 1.)

**Example 2:** `nums = [4,7,15,8,3,5]`: `last[2] = 3`, `last[7] = 1`, `last[3] = 4`, `last[5] = 5`. `reach` goes 3, 3, 5 (15 brings in 3 and 5), 5, 5 for `i = 0..4`; it never equals `i`, so return `-1`.

## Complexity Analysis
- **Time:** O(n sqrt(A)) for trial-division factoring (A = max element, up to 10^6, so sqrt(A) <= 1000); the sweep is O(n * p) where p <= 7 distinct primes per element.
- **Space:** O(n p) for the prime lists plus the `last` map.

## Follow-Up Questions
1. How would the solution change if numbers could be up to 10⁹, requiring faster factorisation?
2. How would a smallest-prime-factor sieve up to 10^6 speed up factorisation to O(log A) per element?
3. What if we need to split into more than two parts with pairwise coprime products?

## Key Takeaway
Coprimality of the two products means no prime straddles the split; tracking each prime's last occurrence turns this into an interval-merge style sweep where the first `i` with `reach == i` is the answer.
