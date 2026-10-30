# 3370. Smallest Number With All Set Bits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-number-with-all-set-bits](https://leetcode.com/problems/smallest-number-with-all-set-bits)

**Companies:** Amazon, Google, Microsoft
---

## Problem Description

You are given a *positive* number `n`.

Return the **smallest** number `x` **greater than** or **equal to** `n`, such that the binary representation of `x` contains only set bits.

**Constraints:**
- `1 <= n <= 1000`

## Examples

```
Example 1:
  Input: n = 5
  Output: 7
  Explanation: The binary representation of 7 is "111".
```

```
Example 2:
  Input: n = 10
  Output: 15
  Explanation: The binary representation of 15 is "1111".
```

```
Example 3:
  Input: n = 3
  Output: 3
  Explanation: The binary representation of 3 is "11".
```

## Approach: Bit Manipulation [Time: O(1), Space: O(1)]

The key insight is that the smallest number with `k` set bits is `2^k - 1`, which is a sequence of `k` ones in binary. The problem can be interpreted as finding the smallest number with a bit length filled with set bits. We can find the bit length of `n` and construct a mask of that length.

```
FUNCTION smallestNumber(n):
    // Get the number of bits required to represent n
    bits = n.bit_length()
    
    // The smallest number with 'bits' count of set bits is (1 << bits) - 1
    // e.g., if bits = 3, (1 << 3) = 8 (1000), 8 - 1 = 7 (0111)
    RETURN (1 << bits) - 1
```

## Walkthrough

Let's trace `n = 6` (binary `110`):

1.  `n.bit_length()` for `6` is `3`.
2.  `1 << 3` gives `8` (binary `1000`).
3.  `8 - 1` gives `7` (binary `0111`).
4.  Return `7`.

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **Overall** | O(1) | O(1) |

`bit_length()` and bitwise operations are constant time.

## Follow-up

- What if you had to find the smallest number greater than `n` with the *exact same* number of set bits? This is a much harder problem (see LeetCode 556. Next Greater Element III for inspiration).
