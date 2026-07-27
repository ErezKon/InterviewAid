# 191. Number of 1 Bits

**Difficulty:** 🟢 Easy
**Acceptance:** 70.0%
**LeetCode:** [https://leetcode.com/problems/number-of-1-bits](https://leetcode.com/problems/number-of-1-bits)
**Companies:** Amazon, Apple, Bloomberg, Box, Google, Ibm, Meta, Microsoft, Nvidia, Qualcomm, Verkada

---

## 1. Problem Description

Given a positive integer, return the number of set bits (1-bits) in its binary representation (Hamming weight).

---

## 2. Approach 1: Brian Kernighan's — O(k) where k = number of set bits ✅

```
FUNCTION hammingWeight(n):
    count = 0
    WHILE n != 0:
        n = n AND (n - 1)    // clears lowest set bit
        count += 1
    RETURN count
```

### Why `n & (n-1)` clears the lowest set bit

`n = ...1000`, `n-1 = ...0111` → AND clears the lowest 1 and all below.

---

## 3. Approach 2: Bit Shift — O(32)

```
FUNCTION hammingWeight(n):
    count = 0
    WHILE n != 0:
        count += n AND 1
        n = n >> 1
    RETURN count
```

---

## 4. Follow-Up

### Counting Bits (LeetCode #338)?

Return array where `result[i]` = number of 1-bits in `i`, for `i` in `[0, n]`. DP: `result[i] = result[i >> 1] + (i & 1)`.

### Hamming Distance (LeetCode #461)?

XOR two numbers, count set bits in the result.

---

## Key Takeaway

> `n & (n-1)` clears the lowest set bit — a fundamental bit manipulation trick used in many problems.
