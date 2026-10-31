# 231. Power of Two

**Difficulty:** 🟢 Easy
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/power-of-two](https://leetcode.com/problems/power-of-two)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Infosys, Meta, Microsoft, Nvidia, Qualcomm, Snapchat, Tcs

---

## 1. Problem Description

Given an integer `n`, return *`true` if it is a power of two. Otherwise, return `false`*.

An integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.

**Follow up:** Could you solve it without loops/recursion?

**Constraints:**
- `-2^31 <= n <= 2^31 - 1`

---

## 2. Approach: Bit Manipulation — O(1) ✅

A power of two has exactly one set bit: `n > 0 AND (n & (n-1)) == 0`.

```text
FUNCTION isPowerOfTwo(n):
    RETURN n > 0 AND (n AND (n - 1)) == 0
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Examples

**Example 1:**
```
Input: n = 1
Output: true
Explanation: 2^0 = 1
```

**Example 2:**
```
Input: n = 16
Output: true
Explanation: 2^4 = 16
```

**Example 3:**
```
Input: n = 3
Output: false
```

## Walkthrough

1. For `n = 16` (binary `10000`): `n-1 = 15` (binary `01111`). `n & (n-1) = 0`, and `n > 0`, so return `true`.
2. For `n = 3` (binary `11`): `n-1 = 2` (binary `10`). `n & (n-1) = 2` (non-zero), so return `false`.
3. The check works for any positive integer; zero fails the `n > 0` condition.

## Complexity Analysis

- **Time:** O(1) – constant-time bit operation.
- **Space:** O(1) – only a few variables.

---

## Key Takeaway

> Powers of two = exactly one set bit. `n & (n-1) == 0` checks this in O(1).
