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

```text
FUNCTION hammingWeight(n):
    count ← 0
    WHILE n != 0:
        n ← n AND (n - 1)  // clears lowest set bit
        count ← count + 1
    RETURN count
```

### Why `n & (n-1)` clears the lowest set bit

`n = ...1000`, `n-1 = ...0111` → AND clears the lowest 1 and all below.

---

## 3. Approach 2: Bit Shift — O(32)

```text
FUNCTION hammingWeight(n):
    count ← 0
    WHILE n != 0:
        count ← count + (n AND 1)
        n ← n >> 1
    RETURN count
```

---

## 4. Examples

| Input | Binary | Output |
|-------|--------|--------|
| 7     | 111    | 3 |
| 16    | 10000  | 1 |
| 1023  | 1111111111 | 10 |

---

## 5. Walkthrough

**Example:** `n = 7`

1. `count = 0`
2. `n & (n-1)`: `7 & 6 = 6` → `count = 1`
3. `6 & 5 = 4` → `count = 2`
4. `4 & 3 = 0` → `count = 3`
5. Loop ends, return `3`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) for Kernighan's method (k = set bits) or O(32) for bit‑shift method |
| **Space** | O(1) |

---

## 7. Follow-Up

### Counting Bits (LeetCode #338)?

Return array where `result[i]` = number of 1-bits in `i`, for `i` in `[0, n]`. DP: `result[i] = result[i >> 1] + (i AND 1)`.

### Hamming Distance (LeetCode #461)?

XOR two numbers, count set bits in the result.

---

## 8. Key Takeaway

> `n & (n-1)` clears the lowest set bit — a fundamental bit manipulation trick used in many problems.
