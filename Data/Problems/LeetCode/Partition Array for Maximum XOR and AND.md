# 3630. Partition Array for Maximum XOR and AND

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/partition-array-for-maximum-xor-and-and](https://leetcode.com/problems/partition-array-for-maximum-xor-and-and)
**Companies:** Google

---

## Problem Description
You are given an integer array `nums`.

Partition the array into **three** (possibly empty) subsequences `A`, `B`, and `C` such that every element of `nums` belongs to **exactly** one subsequence.

Your goal is to **maximize** the value of: `XOR(A) + AND(B) + XOR(C)`

where:

- `XOR(arr)` denotes the bitwise XOR of all elements in `arr`. If `arr` is empty, its value is defined as 0.
- `AND(arr)` denotes the bitwise AND of all elements in `arr`. If `arr` is empty, its value is defined as 0.

Return the **maximum** value achievable.

**Note:** If multiple partitions result in the same **maximum** sum, you can consider any one of them.

**Constraints:**

- `1 <= nums.length <= 19`
- `1 <= nums[i] <= 10^9`

## Examples

```
Example 1:
  Input: nums = [2,3]
  Output: 5
  Explanation: One optimal partition is:
    - A = [3], XOR(A) = 3
    - B = [2], AND(B) = 2
    - C = [], XOR(C) = 0
  The maximum value of: XOR(A) + AND(B) + XOR(C) = 3 + 2 + 0 = 5. Thus, the answer is 5.
```

```
Example 2:
  Input: nums = [1,3,2]
  Output: 6
  Explanation: One optimal partition is:
    - A = [1], XOR(A) = 1
    - B = [2], AND(B) = 2
    - C = [3], XOR(C) = 3
  The maximum value of: XOR(A) + AND(B) + XOR(C) = 1 + 2 + 3 = 6. Thus, the answer is 6.
```

```
Example 3:
  Input: nums = [2,3,6,7]
  Output: 15
  Explanation: One optimal partition is:
    - A = [7], XOR(A) = 7
    - B = [2,3], AND(B) = 2
    - C = [6], XOR(C) = 6
  The maximum value of: XOR(A) + AND(B) + XOR(C) = 7 + 2 + 6 = 15. Thus, the answer is 15.
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
