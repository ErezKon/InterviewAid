# 3151. Special Array I

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/special-array-i
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, National Payments Coorperation India
---

## Problem Description
Given an integer array `nums`, determine whether every pair of adjacent elements has opposite parity (one even, one odd). Return `true` if the condition holds for the entire array, otherwise `false`.

## Examples
**Example 1**
```
Input: nums = [1,2,3,4]
Output: true
Explanation: 1 (odd) → 2 (even) → 3 (odd) → 4 (even) all alternate.
```

**Example 2**
```
Input: nums = [2,4,6]
Output: false
Explanation: Adjacent elements share the same parity (even).
```

## Approach
Iterate through the array and compare the parity of each element with its predecessor.

```text
FUNCTION isArraySpecial(nums):
    FOR i ← 1 TO LENGTH(nums)-1:
        IF (nums[i] MOD 2) == (nums[i-1] MOD 2):
            RETURN false
    RETURN true
```

## Walkthrough
| Index i | nums[i] | nums[i-1] parity | Same parity? |
|---------|---------|------------------|--------------|
| 1 | 2 | odd (1) | false → continue |
| 2 | 3 | even (0) | false → continue |
| 3 | 4 | odd (1) | false → continue |
All checks passed → return true.

## Complexity Analysis
- Time: `O(n)` where `n` is the length of `nums`.
- Space: `O(1)` auxiliary space.

## Follow‑Up Questions
1. How would you modify the check for a circular array where the last and first elements are also adjacent?
2. Can you solve the problem using a single bitwise operation instead of modulo?
3. How would you extend the check to ensure a pattern of length >2 repeats (e.g., odd‑even‑odd‑even‑…)?

## Key Takeaway
A simple linear scan comparing parity of consecutive elements determines if the array alternates between even and odd.
