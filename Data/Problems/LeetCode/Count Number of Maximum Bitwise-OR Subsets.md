# 2044. Count Number of Maximum Bitwise-OR Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets
**Companies:** Amazon, Bloomberg, Bny Mellon, Citadel, Google, Meta, Microsoft
---

## Problem Description
Given an integer array `nums`, find the **maximum** possible **bitwise OR** of a subset of `nums` and return *the **number of different non-empty subsets** with the maximum bitwise OR*.

An array `a` is a **subset** of an array `b` if `a` can be obtained from `b` by deleting some (possibly zero) elements of `b`. Two subsets are considered **different** if the indices of the elements chosen are different.

The bitwise OR of an array `a` is equal to `a[0] OR a[1] OR ... OR a[a.length - 1]` (**0-indexed**).

**Constraints:**
- `1 <= nums.length <= 16`
- `1 <= nums[i] <= 10^5`

## Examples
```
Example 1:
  Input: nums = [3,1]
  Output: 2
  Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
  - [3]
  - [3,1]
```

```
Example 2:
  Input: nums = [2,2,2]
  Output: 7
  Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 2^3 - 1 = 7 total subsets.
```

```
Example 3:
  Input: nums = [3,2,1,5]
  Output: 6
  Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
  - [3,5]
  - [3,1,5]
  - [3,2,5]
  - [3,2,1,5]
  - [2,5]
  - [2,1,5]
```

## Approach
1. Compute `maxOr` by OR-ing all numbers.
2. Use backtracking (or bitmask enumeration) to explore every subset, tracking the current OR.
3. When the end of the array is reached, increment a counter if the current OR equals `maxOr`.
The backtracking explores two choices per element: include it (OR with current) or exclude it.

## Walkthrough
| Step | idx | currOr (binary) | Action | New currOr |
|------|-----|----------------|--------|-----------|
| 0    | 0   | 000            | include 3 (011) | 011 |
| 1    | 1   | 011            | include 1 (001) | 011 |
| 2    | 2   | 011            | include 5 (101) | 111 → count++ |
| …    | …   | …              | …      | … |
All 2^n subsets are visited; those reaching `maxOr` are counted.

## Complexity Analysis
- **Time:** O(2^n) – each element has two choices; n ≤ 16 makes this feasible.
- **Space:** O(n) – recursion stack depth.

## Follow-Up Questions
- How would you solve the problem if `n` were up to 10^5?
- Can you compute the answer using DP with bitmask states to avoid explicit recursion?
- What if we needed the count of subsets whose OR is at least a given threshold?

## Key Takeaway
When the input size is tiny, exhaustive backtracking over all subsets efficiently counts those achieving the maximal bitwise OR.
