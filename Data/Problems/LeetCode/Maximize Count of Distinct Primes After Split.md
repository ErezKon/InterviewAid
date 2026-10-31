# 3569. Maximize Count of Distinct Primes After Split

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-count-of-distinct-primes-after-split](https://leetcode.com/problems/maximize-count-of-distinct-primes-after-split)
**Companies:** Google

---

## Problem Description

You are given an integer array `nums` having length `n` and a 2D integer array `queries` where `queries[i] = [idx, val]`.

For each query:

- Update `nums[idx] = val`.
- Choose an integer `k` with `1 <= k < n` to split the array into the non-empty prefix `nums[0..k-1]` and suffix `nums[k..n-1]` such that the sum of the counts of **distinct** prime values in each part is **maximum**.

**Note:** The changes made to the array in one query persist into the next query.

Return an array containing the result for each query, in the order they are given.

**Constraints:**
- `2 <= n == nums.length <= 5 * 10^4`
- `1 <= queries.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^5`
- `0 <= queries[i][0] < nums.length`
- `1 <= queries[i][1] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [2,1,3,1,2], queries = [[1,2],[3,3]]
Output: [3,4]
Explanation: - Initially nums = [2, 1, 3, 1, 2].
- After 1^st query, nums = [2, 2, 3, 1, 2]. Split nums into [2] and [2, 3, 1, 2]. [2] consists of 1 distinct prime and [2, 3, 1, 2] consists of 2 distinct primes. Hence, the answer for this query is 1 + 2 = 3.
- After 2^nd query, nums = [2, 2, 3, 3, 2]. Split nums into [2, 2, 3] and [3, 2] with an answer of 2 + 2 = 4.
- The output is [3, 4].
```

**Example 2:**
```
Input: nums = [2,1,4], queries = [[0,1]]
Output: [0]
Explanation: - Initially nums = [2, 1, 4].
- After 1^st query, nums = [1, 1, 4]. There are no prime numbers in nums, hence the answer for this query is 0.
- The output is [0].
```

---

## Approach: Sieve + Prefix Counts — O(n√M + n) ✅

```text
FUNCTION maxDistinctPrimes(nums):
    M ← MAX(nums)
    primes ← SIEVE(M)                     // set of prime numbers up to M

    n ← LENGTH(nums)
    prefixSet ← SET()
    prefixCount ← ARRAY(n)
    FOR i ← 0 TO n-1:
        IF nums[i] IN primes:
            prefixSet.ADD(nums[i])
        prefixCount[i] ← SIZE(prefixSet)

    suffixSet ← SET()
    suffixCount ← ARRAY(n)
    FOR i ← n-1 DOWNTO 0:
        IF nums[i] IN primes:
            suffixSet.ADD(nums[i])
        suffixCount[i] ← SIZE(suffixSet)

    result ← 0
    FOR i ← 0 TO n-2:                     // split after i
        result ← MAX(result, prefixCount[i] + suffixCount[i+1])
    RETURN result
```

---

## Walkthrough

Consider `nums = [2,3,4,5,6]`:
| i | nums[i] | prefix distinct primes | suffix distinct primes |
|---|---------|------------------------|------------------------|
| 0 | 2       | {2} → 1                | {2,3,5} → 3            |
| 1 | 3       | {2,3} → 2              | {3,5} → 2              |
| 2 | 4       | {2,3} → 2              | {5} → 1                |
| 3 | 5       | {2,3,5} → 3            | {} → 0                 |
| 4 | 6       | {2,3,5} → 3            | —                      |

Splits:
- After index 0 → 1 + 3 = 4 (invalid because right part length >0 but left part length 1, still allowed) actually left distinct=1, right distinct=3 → total 4, but right includes primes from left; however each part counts its own distinct primes, so total = 1+3 =4. The algorithm picks maximum 3 for split after index 2 as shown in example.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(M log log M + n) | O(M + n) |

---

## Follow-Up Questions

* How would the solution change if the split could produce more than two parts?
* Can we handle the case where the array contains negative numbers?
* What if we need to maximize the product of distinct prime counts instead of the sum?

---

## Key Takeaway

> Prefix and suffix distinct-prime counts combined with a prime sieve let us evaluate every possible split in linear time.
