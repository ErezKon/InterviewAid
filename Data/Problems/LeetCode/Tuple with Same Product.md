# 1726. Tuple with Same Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tuple-with-same-product](https://leetcode.com/problems/tuple-with-same-product)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION tupleSameProduct(nums):
    products = Counter()
    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            products[nums[i] * nums[j]] += 1

    count = 0
    FOR c IN products.values():
        count += c * (c - 1) / 2 * 8    // each pair of pairs → 8 tuples

    RETURN count
```

## Problem Description

Given an array `nums` of **distinct** positive integers, return *the number of tuples* `(a, b, c, d)` *such that* `a * b = c * d` *where* `a`*,* `b`*,* `c`*, and* `d` *are elements of* `nums`*, and* `a != b != c != d`*.*

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^4`
- All elements in `nums` are **distinct**.

## Examples

**Example 1:**
```
Input: nums = [2,3,4,6]
Output: 8
Explanation: There are 8 valid tuples:
(2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
(3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)
```

**Example 2:**
```
Input: nums = [1,2,4,5,10]
Output: 16
Explanation: There are 16 valid tuples:
(1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
(2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
(2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,5,4)
(4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)
```

## Approach
1. Iterate over all unordered pairs of indices and compute their product.
2. Store the frequency of each product in a hash map.
3. For each product with count `c`, the number of ways to pick two distinct pairs is `c choose 2`. Each such selection yields `8` ordered tuples (4! / 2!). Sum `c * (c - 1) / 2 * 8` over all products.

## Walkthrough
| Pair (i,j) | Product | Map after insertion |
|------------|---------|---------------------|
| (0,1) | 6 | {6:1}
| (0,2) | 8 | {6:1,8:1}
| (0,3) | 12| {6:1,8:1,12:1}
| (1,2) | 12| {6:1,8:1,12:2}
| (1,3) | 18| {6:1,8:1,12:2,18:1}
| (2,3) | 24| {6:1,8:1,12:2,18:1,24:1}
Only product `12` has count `2`, contributing `2*1/2*8 = 8` tuples.

## Complexity Analysis
- **Time:** `O(n^2)` for generating all pairs.
- **Space:** `O(p)` where `p` is the number of distinct products (≤ n(n-1)/2).

## Follow-Up Questions
1. How would you handle the case where `nums` can contain zeros?
2. Can the solution be optimized using number theory to avoid enumerating all pairs?
3. What if the tuple order did not matter – how would the counting change?

## Key Takeaway
Counting pair products with a hash map lets you transform the tuple-counting problem into a combinatorial calculation based on product frequencies.
