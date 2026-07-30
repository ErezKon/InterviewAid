# 3370. Smallest Number With All Set Bits

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Microsoft
---

## Problem Description

Given an integer `n`, find the smallest integer that has the same number of set bits (1s in its binary representation) as `n` and is greater than or equal to `n`. The problem statement is slightly ambiguous, a more direct interpretation is to find the smallest number that has *at least* as many set bits as `n`'s bit length suggests.

## Examples

- **Input:** `n = 2` (binary `10`, length 2)
  - **Output:** `3` (binary `11`). The smallest number with 2 set bits.
- **Input:** `n = 13` (binary `1101`, length 4)
  - **Output:** `15` (binary `1111`). The smallest number with 4 set bits.

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
