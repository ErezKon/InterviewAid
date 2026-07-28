# 264. Ugly Number II

**Difficulty:** 🟡 Medium
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/ugly-number-ii](https://leetcode.com/problems/ugly-number-ii)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Paytm, Visa

---

## Problem Description
An *ugly number* is a positive integer whose prime factors are only `2`, `3`, or `5`. Given an integer `n`, return the `n`‑th ugly number in the sequence of ugly numbers sorted in ascending order.

## Examples
**Example 1:**
Input: `n = 10`
Output: `12`
Explanation: The first 10 ugly numbers are `[1,2,3,4,5,6,8,9,10,12]`.

**Example 2:**
Input: `n = 1`
Output: `1`
Explanation: `1` is conventionally treated as an ugly number.

## Approach
Use three pointers `i2`, `i3`, `i5` that track the index of the smallest ugly number that has not yet been multiplied by `2`, `3`, or `5` respectively. At each step compute the next candidates `next2 = ugly[i2] * 2`, `next3 = ugly[i3] * 3`, `next5 = ugly[i5] * 5`. The next ugly number is the minimum of these three. Increment any pointer whose candidate equals the chosen number to avoid duplicates.

## Walkthrough
| i | ugly[i] | next2 | next3 | next5 | chosen | pointers after |
|---|---------|-------|-------|-------|--------|----------------|
|0|1|2|3|5|2|i2→1 |
|1|2|4|3|5|3|i3→1 |
|2|3|4|6|5|4|i2→2 |
|3|4|6|6|5|5|i5→1 |
|4|5|6|6|10|6|i2→3,i3→2 |
...|...|...|...|...|...|...|
The array built this way yields the sequence of ugly numbers.

## Complexity Analysis
- **Time:** `O(n)` to generate the first `n` ugly numbers.
- **Space:** `O(n)` to store the list of ugly numbers (can be reduced to `O(1)` if only the last three pointers are kept, but the list is needed for indexing).

## Follow‑Up Questions
1. How would you extend the algorithm to include additional prime factors, e.g., `7`?
2. Can you compute the `n`‑th ugly number without generating all previous ones using a binary search?
3. What is the impact on performance if `n` is extremely large (e.g., `10^9`)?

## Key Takeaway
Maintaining separate pointers for each prime factor and always taking the minimum candidate efficiently generates ugly numbers in linear time.
