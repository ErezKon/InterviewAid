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
`n <= 19`, so enumerate every subset as `B` (2^n choices) and solve the rest optimally.
- For a fixed `B`, let the remaining elements have total XOR `T`. Any split into `A` and `C` satisfies `XOR(C) = XOR(A) ^ T`.
- With `X = XOR(A)`: `X + (X ^ T) = T + 2 * (X & ~T)` (bits set in `T` contribute exactly once; bits not in `T` appear in both or neither).
- So maximize `X & ~T` over all subset XORs of the remaining elements: insert each `x & ~T` into a **XOR linear basis** and greedily take the maximum XOR.
- Value for this `B` = `AND(B) + T + 2 * maxXor`; answer is the max over all `B` (empty `B` has `AND = 0`).

```text
FUNCTION maximizeXorAndXor(nums):
    n ← LEN(nums)
    best ← 0
    FOR mask ← 0 TO 2^n - 1:
        andB ← AND of nums[i] with bit i set in mask (0 if mask = 0)
        T ← XOR of nums[i] with bit i not set in mask
        basis ← EMPTY linear basis over 30 bits
        FOR each i not in mask:
            INSERT (nums[i] AND NOT T) INTO basis
        mx ← 0
        FOR b ← 29 DOWNTO 0:
            IF basis[b] != 0 AND (mx XOR basis[b]) > mx:
                mx ← mx XOR basis[b]
        best ← MAX(best, andB + T + 2 * mx)
    RETURN best
```

## Walkthrough
Example 3: `nums = [2,3,6,7]`. A few of the 16 choices of `B`:

| B | AND(B) | Rest | T | Rest masked by ~T | maxXor | Value |
|---|--------|------|---|-------------------|--------|-------|
| [] | 0 | [2,3,6,7] | 0 | [2,3,6,7] | 7 | 0 + 0 + 14 = 14 |
| [2] | 2 | [3,6,7] | 2 | [1,4,5] | 5 | 2 + 2 + 10 = 14 |
| [2,3] | 2 | [6,7] | 1 | [6,6] | 6 | 2 + 1 + 12 = **15** |
| [7] | 7 | [2,3,6] | 7 | [0,0,0] | 0 | 7 + 7 + 0 = 14 |
| [2,6] | 2 | [3,7] | 4 | [3,3] | 3 | 2 + 4 + 6 = 12 |

For `B = [2,3]`, `maxXor = 6` corresponds to `A = [6]` (`X = 6`), `C = [7]`: `6 + 7 + 2 = 15`. No other `B` exceeds 15, so the answer is `15`.

## Complexity Analysis
- **Time:** O(2^n * n * log M) where `M = 10^9` (about 30 bits) - each subset builds a basis of the remaining elements.
- **Space:** O(log M) for the basis (O(2^n) if subset AND/XOR values are precomputed).

## Follow-Up Questions
1. How can you precompute `AND(B)` and `XOR(rest)` for all masks in O(2^n) using the lowest set bit?
2. Why does the identity `X + (X ^ T) = T + 2 * (X & ~T)` hold, and how does it decouple `A` and `C`?
3. How would the approach change if there were four groups (e.g. two AND groups)?

## Key Takeaway
Small `n` invites brute force over the "hard" group (AND), and the identity `X + (X ^ T) = T + 2(X & ~T)` turns the two-XOR split into a single max-subset-XOR problem solved by a linear basis.
