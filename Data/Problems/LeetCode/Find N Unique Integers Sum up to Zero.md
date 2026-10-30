# 1304. Find N Unique Integers Sum up to Zero

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero](https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero)
**Companies:** Amazon, American Express, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an integer `n`, return **any** array containing `n` **unique** integers such that they add up to `0`.

**Constraints:**
- `1 <= n <= 1000`

## Examples
```
Example 1:
  Input: n = 5
  Output: [-7,-1,1,3,4]
  Explanation: These arrays also are accepted [-5,-1,1,2,3] , [-3,-1,2,-2,4].
```

```
Example 2:
  Input: n = 3
  Output: [-1,0,1]
```

```
Example 3:
  Input: n = 1
  Output: [0]
```

## Approach
Construct pairs of opposite numbers `i` and `-i` for `i` from `1` to `n/2`. If `n` is odd, include `0` as the middle element. This guarantees uniqueness and a total sum of zero.

## Walkthrough
For `n = 5`:
| i | Added values |
|---|--------------|
| 1 | `1`, `-1` |
| 2 | `2`, `-2` |
| (odd) | `0` |
Result: `[1,-1,2,-2,0]` (any order acceptable).

## Complexity Analysis
- **Time:** O(n) – one pass to generate the numbers.
- **Space:** O(n) for the output array.

## Follow-Up Questions
- How would you modify the algorithm to return the numbers in sorted order?
- Can you generate such a list when the numbers must lie within a specific range?
- What if the numbers must be positive and negative only (no zero) for odd `n`?

## Key Takeaway
Pairing each positive integer with its negative (and optionally adding zero) provides a simple linear‑time construction of `n` unique integers that sum to zero.
