# 342. Power of Four

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/power-of-four](https://leetcode.com/problems/power-of-four)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Qualcomm, Two Sigma, Wix

---

## Problem Description
Given an integer `n`, determine whether it is a power of four. Return `true` if there exists an integer `x` such that `4^x = n`, otherwise return `false`. Constraints: `0 ≤ n ≤ 2^31 - 1`.

## Examples
**Example 1:**
Input: `n = 16`
Output: `true`
Explanation: `4^2 = 16`.

**Example 2:**
Input: `n = 5`
Output: `false`
Explanation: No integer `x` satisfies `4^x = 5`.

## Approach
Use bit‑manipulation properties:
1. `n` must be positive.
2. It must have exactly one set bit (`n & (n‑1) == 0`).
3. That set bit must be in an even position; mask `0x55555555` (binary `0101…`) isolates bits at even indices.
If all three hold, `n` is a power of four.

## Walkthrough
| Step | Check | Result |
|------|-------|--------|
|1|`n > 0`|`16 > 0` → true|
|2|`n & (n‑1) == 0`|`16 & 15 = 0` → true|
|3|`n & 0x55555555 != 0`|`16 & 0x55555555 = 16` → non‑zero → true|
All checks pass → return `true`.

## Complexity Analysis
Time: O(1) – constant‑time bit operations.
Space: O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you extend the check to determine if a number is a power of three without using loops?
2. Can you design an algorithm that works for arbitrary bases `b`?
3. What if the input range includes negative numbers?

## Key Takeaway
A power‑of‑four test reduces to three constant‑time bit checks: positivity, single set bit, and even‑position mask.
