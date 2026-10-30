# 2176. Count Equal and Divisible Pairs in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array](https://leetcode.com/problems/count-equal-and-divisible-pairs-in-an-array)
**Companies:** Bloomberg, Google, Meta, Microsoft, Zeta Suite

---

## Problem Description
Given a **0-indexed** integer array `nums` of length `n` and an integer `k`, return *the **number of pairs*** `(i, j)` *where* `0 <= i < j < n`, *such that* `nums[i] == nums[j]` *and* `(i * j)` *is divisible by* `k`.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i], k <= 100`

## Examples
```
Example 1:
  Input: nums = [3,1,2,2,2,1,3], k = 2
  Output: 4
  Explanation:
  There are 4 pairs that meet all the requirements:
  - nums[0] == nums[6], and 0 * 6 == 0, which is divisible by 2.
  - nums[2] == nums[3], and 2 * 3 == 6, which is divisible by 2.
  - nums[2] == nums[4], and 2 * 4 == 8, which is divisible by 2.
  - nums[3] == nums[4], and 3 * 4 == 12, which is divisible by 2.
```

```
Example 2:
  Input: nums = [1,2,3,4], k = 1
  Output: 0
  Explanation: Since no value in nums is repeated, there are no pairs (i,j) that meet all the requirements.
```

## Approach
Group indices by their value using a hash map. For each group, iterate over its indices and count how many earlier indices produce a product divisible by `k`. This can be done in O(m²) per group, but because groups are typically small for an easy problem, the straightforward double loop is acceptable.

### Pseudocode
```text
FUNCTION countPairs(nums, k):
    CREATE indexMap ← EMPTY MAP  // value → list of indices
    FOR i FROM 0 TO LENGTH(nums)-1:
        APPEND i TO indexMap[nums[i]]
    SET total ← 0
    FOR each indices LIST IN indexMap VALUES:
        FOR p FROM 0 TO LENGTH(indices)-1:
            FOR q FROM p+1 TO LENGTH(indices)-1:
                SET i ← indices[p]
                SET j ← indices[q]
                IF (i * j) MOD k = 0:
                    SET total ← total + 1
    RETURN total
```

## Walkthrough
Consider `nums = [1,2,1,2,1]`, `k = 2`.
- `indexMap` becomes `{1: [0,2,4], 2: [1,3]}`.
- For value `1` indices `[0,2,4]`:
  - Pair (0,2): 0*2 % 2 = 0 → count.
  - Pair (0,4): 0*4 % 2 = 0 → count.
  - Pair (2,4): 2*4 % 2 = 0 → count.
- For value `2` indices `[1,3]`:
  - Pair (1,3): 1*3 % 2 = 1 → not counted? Actually 1*3=3, 3%2=1, so not counted. Wait example says counted, but correct check: product must be divisible by 2, so only (0,2),(0,4),(2,4) → total 3. Adjust example accordingly.
The algorithm correctly tallies the qualifying pairs.

## Complexity Analysis
Let *m* be the total number of indices across all groups (equal to *n*). In the worst case where all elements are identical, the double loop examines O(n²) pairs, giving **Time O(n²)**. The hash map stores at most *n* indices, so **Space O(n)**.

## Follow-Up Questions
1. Can you improve the time complexity using number‑theoretic properties of `k`?
2. How would you handle a streaming version where numbers arrive one by one?
3. What if the condition were `(i + j) % k == 0` instead of product?

## Key Takeaway
Grouping equal values lets you focus only on relevant index pairs, and checking the divisibility condition is a simple arithmetic test.
