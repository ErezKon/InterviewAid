# 3630. Partition Array for Maximum XOR and AND

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/partition-array-for-maximum-xor-and-and](https://leetcode.com/problems/partition-array-for-maximum-xor-and-and)
**Companies:** Google

---

## Problem Description
Given an integer array `nums`, partition it into two non‑empty contiguous subarrays `left` and `right`. Let `xorLeft` be the bitwise XOR of all elements in `left` and `andRight` be the bitwise AND of all elements in `right`. Return the maximum possible value of `xorLeft + andRight`.

## Examples
**Example 1:**
```
Input: nums = [1,2,3]
Output: 5
Explanation: Split after index 0 → left = [1] (xor = 1), right = [2,3] (and = 2 & 3 = 2), sum = 3.
Split after index 1 → left = [1,2] (xor = 3), right = [3] (and = 3), sum = 6 → maximum is 6.
```
**Example 2:**
```
Input: nums = [4,5,7,8]
Output: 13
```

## Approach
Pre‑compute prefix XORs and suffix ANDs. `prefixXor[i]` = XOR of `nums[0..i]`. `suffixAnd[i]` = AND of `nums[i..n-1]`. For each split position `i` (0 ≤ i < n‑1), compute `xorLeft = prefixXor[i]` and `andRight = suffixAnd[i+1]`. Track the maximum of `xorLeft + andRight`.

```text
FUNCTION maxXorAndSum(nums):
    n ← LEN(nums)
    prefixXor ← ARRAY n
    prefixXor[0] ← nums[0]
    FOR i ← 1 TO n-1:
        prefixXor[i] ← prefixXor[i-1] XOR nums[i]
    suffixAnd ← ARRAY n
    suffixAnd[n-1] ← nums[n-1]
    FOR i ← n-2 DOWNTO 0:
        suffixAnd[i] ← suffixAnd[i+1] AND nums[i]
    maxVal ← -INFINITY
    FOR i ← 0 TO n-2:
        xorLeft ← prefixXor[i]
        andRight ← suffixAnd[i+1]
        maxVal ← MAX(maxVal, xorLeft + andRight)
    RETURN maxVal
```

## Walkthrough
For `nums = [1,2,3]`:
- Prefix XOR: [1, 3, 0]
- Suffix AND: [0, 2, 3]
- Split i=0: xor=1, and=2 → sum=3.
- Split i=1: xor=3, and=3 → sum=6 (maximum).

## Complexity Analysis
- **Time:** O(n) to compute prefix and suffix arrays and evaluate splits.
- **Space:** O(n) for the two auxiliary arrays (can be reduced to O(1) with running values).

## Follow‑Up Questions
1. How would you adapt the solution if the operation on the right side were also XOR instead of AND?
2. Can you solve the problem using a single pass without storing the full suffix array?
3. What if the goal is to maximize `xorLeft * andRight` instead of their sum?

## Key Takeaway
Prefix XOR combined with suffix AND enables constant‑time evaluation of each possible partition, yielding a linear‑time solution.
