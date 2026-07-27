# 1545. Find Kth Bit in Nth Binary String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-kth-bit-in-nth-binary-string](https://leetcode.com/problems/find-kth-bit-in-nth-binary-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

`S(1) = "0"`, `S(n) = S(n-1) + "1" + reverse(invert(S(n-1)))`. Find the k-th bit of `S(n)`.

---

## Approach: Recursive — O(n) ✅

```
FUNCTION findKthBit(n, k):
    IF n == 1: RETURN '0'
    mid = 2^(n-1)
    IF k == mid: RETURN '1'
    IF k < mid: RETURN findKthBit(n - 1, k)
    RETURN '0' IF findKthBit(n - 1, 2 * mid - k) == '1' ELSE '1'
```

---

## Key Takeaway

> **Recursively locate position: left half → recurse directly, middle → always '1', right half → mirror position in left half and flip the bit.**
