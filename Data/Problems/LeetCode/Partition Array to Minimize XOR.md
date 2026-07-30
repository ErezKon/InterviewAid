# 3599. Partition Array to Minimize XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-to-minimize-xor](https://leetcode.com/problems/partition-array-to-minimize-xor)
**Companies:** Google

---

## Problem Description
Given an integer array `nums`, split it into two non‑empty contiguous subarrays `left` and `right` (i.e., choose an index `i` with `0 < i < n`). Let `xorLeft` be the XOR of all elements in `left` and `xorRight` be the XOR of all elements in `right`. Return the minimum possible value of `xorLeft + xorRight`.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 4
Explanation: Split after index 2 → left = [1,2,3] (xor = 0), right = [4] (xor = 4), sum = 4.
```
**Example 2:**
```
Input: nums = [5,1,2,3]
Output: 5
Explanation: Split after index 1 → left = [5] (xor = 5), right = [1,2,3] (xor = 0), sum = 5.
```

## Approach
Pre‑compute prefix XORs. `prefix[i]` stores XOR of `nums[0..i]`. The XOR of a subarray `l..r` equals `prefix[r] XOR prefix[l-1]`. For each split position `i` (1 ≤ i < n), compute `xorLeft = prefix[i-1]` and `xorRight = prefix[n-1] XOR prefix[i-1]`. Track the minimum of `xorLeft + xorRight`.

```text
FUNCTION minXorSum(nums):
    n ← LEN(nums)
    prefix ← ARRAY n
    prefix[0] ← nums[0]
    FOR i ← 1 TO n-1:
        prefix[i] ← prefix[i-1] XOR nums[i]
    totalXor ← prefix[n-1]
    minSum ← INFINITY
    FOR i ← 0 TO n-2:   // split after i
        xorLeft ← prefix[i]
        xorRight ← totalXor XOR prefix[i]
        minSum ← MIN(minSum, xorLeft + xorRight)
    RETURN minSum
```

## Walkthrough
For `nums = [1,2,3,4]`:
- Prefix XORs: [1, 3, 0, 4]; totalXor = 4.
- Split i=0: left xor=1, right xor=4⊕1=5 → sum=6.
- Split i=1: left xor=3, right xor=4⊕3=7 → sum=10.
- Split i=2: left xor=0, right xor=4⊕0=4 → sum=4 (minimum).

## Complexity Analysis
- **Time:** O(n) to build prefix XORs and evaluate splits.
- **Space:** O(n) for the prefix array (can be O(1) by keeping running XOR).

## Follow‑Up Questions
1. How would you modify the solution if the array could be split into more than two parts?
2. Can you solve the problem using a single pass without storing the full prefix array?
3. What if the goal is to minimize the maximum of `xorLeft` and `xorRight` instead of their sum?

## Key Takeaway
Prefix XORs let you compute subarray XORs in constant time, enabling a linear scan to find the optimal split.
