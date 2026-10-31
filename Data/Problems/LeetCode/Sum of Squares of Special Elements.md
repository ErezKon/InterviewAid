# 2778. Sum of Squares of Special Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-squares-of-special-elements](https://leetcode.com/problems/sum-of-squares-of-special-elements)
**Companies:** Google

---

## Problem Description

You are given a **1-indexed** integer array `nums` of length `n`.

An element `nums[i]` of `nums` is called **special** if `i` divides `n`, i.e. `n % i == 0`.

Return *the **sum of the squares** of all **special** elements of* `nums`.

**Constraints:**
- `1 <= nums.length == n <= 50`
- `1 <= nums[i] <= 50`

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 21
Explanation: There are exactly 3 special elements in nums: nums[1] since 1 divides 4, nums[2] since 2 divides 4, and nums[4] since 4 divides 4.
Hence, the sum of the squares of all special elements of nums is nums[1] * nums[1] + nums[2] * nums[2] + nums[4] * nums[4] = 1 * 1 + 2 * 2 + 4 * 4 = 21.
```

**Example 2:**
```
Input: nums = [2,7,1,19,18,3]
Output: 63
Explanation: There are exactly 4 special elements in nums: nums[1] since 1 divides 6, nums[2] since 2 divides 6, nums[3] since 3 divides 6, and nums[6] since 6 divides 6.
Hence, the sum of the squares of all special elements of nums is nums[1] * nums[1] + nums[2] * nums[2] + nums[3] * nums[3] + nums[6] * nums[6] = 2 * 2 + 7 * 7 + 1 * 1 + 3 * 3 = 63.
```

## Approach
Walk the 1-indexed positions `i = 1..n`. Position `i` is special exactly when `i` is a divisor of `n`, so test `n % i == 0` and add `nums[i]²` (0-indexed: `nums[i-1]²`). With `n <= 50` a single linear scan is all that's needed; enumerating divisors up to `sqrt(n)` is an optional micro-optimization.

### Pseudocode
```text
FUNCTION sumOfSquares(nums):
    n ← LENGTH(nums)
    total ← 0
    FOR i ← 1 TO n:
        IF n MOD i == 0:
            total ← total + nums[i-1] * nums[i-1]
    RETURN total
```

## Walkthrough
For `nums = [2,7,1,19,18,3]`, `n = 6`:

| i (1-indexed) | 6 % i | special? | nums[i] | square | running total |
|---|---|---|---|---|---|
| 1 | 0 | yes | 2 | 4 | 4 |
| 2 | 0 | yes | 7 | 49 | 53 |
| 3 | 0 | yes | 1 | 1 | 54 |
| 4 | 2 | no | 19 | - | 54 |
| 5 | 1 | no | 18 | - | 54 |
| 6 | 0 | yes | 3 | 9 | 63 |

Result: `63`, matching the expected output.

## Complexity Analysis
- **Time:** `O(n)` - one pass over the indices (or `O(sqrt(n))` if only divisors are enumerated).
- **Space:** `O(1)`.

## Follow-Up Questions
1. How would you enumerate only the divisors of `n` in `O(sqrt(n))` time, taking care not to double count when `i * i == n`?
2. What changes if the array were 0-indexed and the condition were `(i + 1)` divides `n`?
3. How would you answer many queries "sum of squares over indices dividing `k`" for different `k` on the same array?

## Key Takeaway
The "special" condition depends only on the index, not on the values: it is simply "index divides `n`". Recognize the 1-indexed convention, test divisibility, and sum the squares.
