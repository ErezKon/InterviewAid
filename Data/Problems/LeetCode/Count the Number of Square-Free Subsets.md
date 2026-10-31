# 2572. Count the Number of Square-Free Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-square-free-subsets](https://leetcode.com/problems/count-the-number-of-square-free-subsets)
**Companies:** Google, Medianet

---

## Problem Description

You are given a positive integer **0-indexed** array `nums`.

A subset of the array `nums` is **square-free** if the product of its elements is a **square-free integer**.

A **square-free integer** is an integer that is divisible by no square number other than `1`.

Return *the number of square-free non-empty subsets of the array* **nums**. Since the answer may be too large, return it **modulo** `10^9 + 7`.

A **non-empty** **subset** of `nums` is an array that can be obtained by deleting some (possibly none but not all) elements from `nums`. Two subsets are different if and only if the chosen indices to delete are different.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 30`

---

## Examples

**Example 1:**
```
Input: nums = [3,4,4,5]
Output: 3
Explanation: There are 3 square-free subsets in this example:
- The subset consisting of the 0^th element [3]. The product of its elements is 3, which is a square-free integer.
- The subset consisting of the 3^rd element [5]. The product of its elements is 5, which is a square-free integer.
- The subset consisting of 0^th and 3^rd elements [3,5]. The product of its elements is 15, which is a square-free integer.
It can be proven that there are no more than 3 square-free subsets in the given array.
```

**Example 2:**
```
Input: nums = [1]
Output: 1
Explanation: There is 1 square-free subset in this example:
- The subset consisting of the 0^th element [1]. The product of its elements is 1, which is a square-free integer.
It can be proven that there is no more than 1 square-free subset in the given array.
```

---

## Approach

```
FUNCTION squareFreeSubsets(nums):
    MOD ← 10^9 + 7
    primes ← [2,3,5,7,11,13,17,19,23,29]

    FUNCTION getMask(x):
        mask ← 0
        FOR i, p IN ENUMERATE(primes):
            IF x % (p * p) == 0: RETURN -1   // contains p², invalid
            IF x % p == 0: mask ← mask OR (1 << i)
        RETURN mask

    dp ← ARRAY[0 .. (1 << 10) - 1] FILLED WITH 0
    dp[0] ← 1

    FOR x IN nums:
        m ← getMask(x)
        IF m == -1: CONTINUE
        FOR state ← (1 << 10) - 1 DOWNTO 0:
            IF (state AND m) == 0:
                dp[state OR m] ← (dp[state OR m] + dp[state]) MOD MOD

    RETURN (SUM(dp) - 1) MOD MOD   // exclude empty subset
```

---

## Walkthrough

Consider `nums = [3,4,5]`.

1. Masks: `3 → 0010`, `4 → -1 (invalid)`, `5 → 0100`.
2. Start `dp[0]=1`.
3. Process `3` (mask 0010): update `dp[0010] = dp[0010] + dp[0000] = 1`.
4. Skip `4` (invalid).
5. Process `5` (mask 0100):
   - From state `0000`: `dp[0100] += dp[0000] → 1`.
   - From state `0010`: `dp[0110] += dp[0010] → 1`.
6. Final dp non-zero states: `0010,0100,0110` → three subsets `{3},{5},{3,5}`.
7. Subtract empty subset → answer `3`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × 2^10) ≈ O(1024·n) |
| **Space** | O(2^10) ≈ O(1024) |

---

## Follow-Up Questions

- How would the solution change if numbers could be up to 100?
- Can you extend the DP to also return the actual subsets?
- What if the modulo were not prime?

---

## Key Takeaway

> **Square-free product = no prime appears twice. With values ≤ 30 only ten primes matter, so a bitmask DP on prime usage efficiently counts valid subsets.**