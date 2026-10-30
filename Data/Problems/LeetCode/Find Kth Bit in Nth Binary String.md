# 1545. Find Kth Bit in Nth Binary String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-kth-bit-in-nth-binary-string](https://leetcode.com/problems/find-kth-bit-in-nth-binary-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given two positive integers `n` and `k`, the binary string `S_n` is formed as follows:

- `S_1 = "0"`
- `S_i = S_{i-1} + "1" + reverse(invert(S_{i-1}))` for `i > 1`

Where `+` denotes the concatenation operation, `reverse(x)` returns the reversed string `x`, and `invert(x)` inverts all the bits in `x` (`0` changes to `1` and `1` changes to `0`).

For example, the first four strings in the above sequence are:

- `S_1 = "0"`
- `S_2 = "011"`
- `S_3 = "0111001"`
- `S_4 = "011100110110001"`

Return *the* `k^th` *bit in* `S_n`. It is guaranteed that `k` is valid for the given `n`.

**Constraints:**

- `1 <= n <= 20`
- `1 <= k <= 2^n - 1`

---

## Examples

```
Example 1:
  Input: n = 3, k = 1
  Output: "0"
  Explanation: S3 is "0111001".
  The 1st bit is "0".
```

```
Example 2:
  Input: n = 4, k = 11
  Output: "1"
  Explanation: S4 is "011100110110001".
  The 11th bit is "1".
```

---

## Approach: Recursive — O(n) ✅

```text
FUNCTION findKthBit(n, k):
    IF n == 1:
        RETURN '0'
    mid ← 2^(n-1)
    IF k == mid:
        RETURN '1'
    IF k < mid:
        RETURN findKthBit(n - 1, k)
    // k > mid: mirror position and invert
    mirrored ← 2 * mid - k
    bit ← findKthBit(n - 1, mirrored)
    RETURN '0' IF bit == '1' ELSE '1'
```

---

## Walkthrough

Consider `n = 3, k = 5`:
1. `mid = 2^(3-1) = 4`. Since `k > mid`, compute `mirrored = 2*4 - 5 = 3`.
2. Recurse on `findKthBit(2, 3)`.
3. For `n = 2`, `mid = 2`. `k > mid` → `mirrored = 2*2 - 3 = 1`.
4. Recurse on `findKthBit(1, 1)` → returns `'0'`.
5. Invert `'0'` → `'1'` (return from step 3).
6. Invert `'1'` → `'0'` (return from step 2).
Thus the 5th bit of `S(3)` is `'0'`.

---

## Complexity Analysis

- **Time:** Each recursive call reduces `n` by 1 → O(n).
- **Space:** Call stack depth O(n).

---

## Follow-Up Questions

1. How would you compute the bit without recursion, using an iterative approach?
2. Can you generalize the solution to return the entire string `S(n)` for small `n`?
3. What is the length of `S(n)` as a function of `n`?

---

## Key Takeaway

> **Recursively locate position: left half → recurse directly, middle → always '1', right half → mirror position in left half and flip the bit.**