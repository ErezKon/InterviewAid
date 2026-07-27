# 1238. Circular Permutation in Binary Representation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circular-permutation-in-binary-representation](https://leetcode.com/problems/circular-permutation-in-binary-representation)
**Companies:** Walmart Labs

---

## 1. Problem Description

Given `n` (number of bits) and `start`, return a permutation of all integers in `[0, 2^n - 1]` such that adjacent numbers (including first and last) differ by exactly one bit, starting from `start`. This is a Gray code starting at `start`.

---

## 2. Key Insight

> Standard Gray code for `i` is `i ^ (i >> 1)`. To start from `start`, XOR every Gray code value with `start`.

---

## 3. Approach: Gray Code + XOR Shift — O(2^n) ✅

```
FUNCTION circularPermutation(n, start):
    result = []
    FOR i FROM 0 TO 2^n - 1:
        result.ADD(start XOR i XOR (i >> 1))
    RETURN result
```

| Time | Space |
|------|-------|
| O(2^n) | O(2^n) |

---

## Key Takeaway

> Gray code `i ^ (i >> 1)` gives a sequence where adjacent values differ by one bit. XOR with `start` shifts the starting point while preserving the one-bit-difference property.
