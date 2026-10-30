# 3599. Partition Array to Minimize XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-to-minimize-xor](https://leetcode.com/problems/partition-array-to-minimize-xor)
**Companies:** Google

---

## Problem Description
You are given an integer array `nums` and an integer `k`.

Your task is to partition `nums` into `k` non-empty **subarrays**. For each subarray, compute the bitwise **XOR** of all its elements.

Return the **minimum** possible value of the **maximum XOR** among these `k` subarrays.

**Constraints:**

- `1 <= nums.length <= 250`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= n`

## Examples

```
Example 1:
  Input: nums = [1,2,3], k = 2
  Output: 1
  Explanation: The optimal partition is [1] and [2, 3].
    - XOR of the first subarray is 1.
    - XOR of the second subarray is 2 XOR 3 = 1.
  The maximum XOR among the subarrays is 1, which is the minimum possible.
```

```
Example 2:
  Input: nums = [2,3,3,2], k = 3
  Output: 2
  Explanation: The optimal partition is [2], [3, 3], and [2].
    - XOR of the first subarray is 2.
    - XOR of the second subarray is 3 XOR 3 = 0.
    - XOR of the third subarray is 2.
  The maximum XOR among the subarrays is 2, which is the minimum possible.
```

```
Example 3:
  Input: nums = [1,1,2,3,1], k = 2
  Output: 0
  Explanation: The optimal partition is [1, 1] and [2, 3, 1].
    - XOR of the first subarray is 1 XOR 1 = 0.
    - XOR of the second subarray is 2 XOR 3 XOR 1 = 0.
  The maximum XOR among the subarrays is 0, which is the minimum possible.
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
