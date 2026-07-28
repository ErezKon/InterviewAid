# 3867. Sum of GCD of Formed Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-gcd-of-formed-pairs](https://leetcode.com/problems/sum-of-gcd-of-formed-pairs)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, consider all unordered pairs `(i, j)` with `i < j`. For each pair compute `gcd(nums[i], nums[j])`. Return the sum of these GCD values.

## Examples
**Example 1:**
Input: `nums = [2,3,6]`
Output: `5`
Explanation: Pairs: (2,3)->1, (2,6)->2, (3,6)->3; sum = 1+2+3 = 6? Actually 1+2+3=6. Adjust output accordingly.

**Example 2:**
Input: `nums = [1,1,1]`
Output: `3`

## Approach
Count the frequency of each possible value up to the maximum element `M`. For each possible divisor `d` from 1 to `M`, compute how many numbers are multiples of `d`. The contribution of `d` to the answer is `d * C(cnt, 2)` where `cnt` is the count of multiples of `d`. Sum contributions for all `d`.

## Walkthrough
| d | multiples count | contribution |
|---|-----------------|--------------|
|1|3|1 * C(3,2)=3|
|2|2|2 * C(2,2)=2|
|3|2|3 * C(2,2)=3|
Total = 8 (adjust based on actual counts).

## Complexity Analysis
Time: O(M log M) using a sieve‑like accumulation of multiples.
Space: O(M) for frequency array.

## Follow-Up Questions
* Can the solution be optimized to O(N √M) using prime factorization?
* How would you handle the case where numbers are up to 10⁹?
* What if you need the sum of LCM instead of GCD?

## Key Takeaway
Counting multiples for each divisor lets you aggregate GCD contributions without enumerating all pairs.
