# 1085. Sum of Digits in the Minimum Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-digits-in-the-minimum-number](https://leetcode.com/problems/sum-of-digits-in-the-minimum-number)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

Given an integer array `nums`, return `0` *if the sum of the digits of the minimum integer in* `nums` *is odd, or* `1` *otherwise*.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Examples

**Example 1:**
```
Input: nums = [34,23,1,24,75,33,54,8]
Output: 0
Explanation: The minimal element is 1, and the sum of those digits is 1 which is odd, so the answer is 0.
```

**Example 2:**
```
Input: nums = [99,77,33,66,55]
Output: 1
Explanation: The minimal element is 33, and the sum of those digits is 3 + 3 = 6 which is even, so the answer is 1.
```

## Approach
Find the minimum element with a single scan, sum its decimal digits by repeatedly taking `m mod 10` and dividing by 10, and return `1` if the digit sum is even, otherwise `0`.

```text
FUNCTION sumOfDigits(nums):
    m ← nums[0]
    FOR i ← 1 TO LENGTH(nums) - 1:
        m ← MIN(m, nums[i])
    s ← 0
    WHILE m > 0:
        s ← s + (m MOD 10)
        m ← m / 10            // integer division
    IF s MOD 2 == 0: RETURN 1
    ELSE: RETURN 0
```

## Walkthrough
Example 2: `nums = [99,77,33,66,55]`.

| Step | Value |
|------|-------|
| minimum `m` | 33 |
| digit 1 (`33 mod 10`) | 3, s = 3, m = 3 |
| digit 2 (`3 mod 10`) | 3, s = 6, m = 0 |
| parity of 6 | even → return 1 |

Output: `1`.

## Complexity Analysis
Time: O(n + log₁₀(min)) – one pass for the minimum plus at most 3 digit steps (values ≤ 100).
Space: O(1).

## Follow-Up Questions
* How would you return the digit-sum parity for the maximum element, or for every element?
* What if the numbers were given as very long strings (compare by length, then lexicographically)?
* Could you compute the parity directly from the digits without forming the full sum?

## Key Takeaway
Read the statement carefully: only the minimum element matters, so a linear scan plus a digit-sum loop and a parity check solve it in O(n).
