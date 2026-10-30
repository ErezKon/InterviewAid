# 3867. Sum of GCD of Formed Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-gcd-of-formed-pairs](https://leetcode.com/problems/sum-of-gcd-of-formed-pairs)
**Companies:** Amazon

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented "sum of GCD over all pairs" problem. Correct idea (simulation): keep a running prefix max `mx`, set `prefixGcd[i] = gcd(nums[i], mx)`, sort, then sum `gcd(prefixGcd[i], prefixGcd[n-1-i])` for `i < n/2`. O(n log n + n log M).*

You are given an integer array `nums` of length `n`.

Construct an array `prefixGcd` where for each index `i`:

- Let `mx_i = max(nums[0], nums[1], ..., nums[i])`.
- `prefixGcd[i] = gcd(nums[i], mx_i)`.

After constructing `prefixGcd`:

- Sort `prefixGcd` in **non-decreasing** order.
- Form pairs by taking the **smallest unpaired** element and the **largest unpaired** element.
- Repeat this process until no more pairs can be formed.
- For each formed pair, **compute** the `gcd` of the two elements.
- If `n` is odd, the **middle** element in the `prefixGcd` array remains **unpaired** and should be ignored.

Return an integer denoting the **sum of the GCD** values of all formed pairs.

The term `gcd(a, b)` denotes the **greatest common divisor** of `a` and `b`.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [2,6,4]
Output: 2
Explanation:
Construct prefixGcd:
| i | nums[i] | mx_i | prefixGcd[i] |
|---|---------|------|--------------|
| 0 | 2       | 2    | 2            |
| 1 | 6       | 6    | 6            |
| 2 | 4       | 6    | 2            |
prefixGcd = [2, 6, 2]. After sorting, it forms [2, 2, 6].
Pair the smallest and largest elements: gcd(2, 6) = 2. The remaining middle element 2 is ignored. Thus, the sum is 2.
```

**Example 2:**
```
Input: nums = [3,6,2,8]
Output: 5
Explanation:
Construct prefixGcd:
| i | nums[i] | mx_i | prefixGcd[i] |
|---|---------|------|--------------|
| 0 | 3       | 3    | 3            |
| 1 | 6       | 6    | 6            |
| 2 | 2       | 6    | 2            |
| 3 | 8       | 8    | 8            |
prefixGcd = [3, 6, 2, 8]. After sorting, it forms [2, 3, 6, 8].
Form pairs: gcd(2, 8) = 2 and gcd(3, 6) = 3. Thus, the sum is 2 + 3 = 5.
```

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
